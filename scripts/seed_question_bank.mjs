/**
 * seed_question_bank.mjs — Seed the Supabase question_bank table
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_KEY=your_service_role_key \
 *   node scripts/seed_question_bank.mjs
 *
 * The service role key bypasses RLS — never expose it client-side.
 * Run this once to seed ~2000+ questions from all generators.
 */

import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';

// ── Dynamic imports (ESM engine modules) ──────────────────────
const { grade1 } = await import('../src/engine/grades/grade1.js');
const { grade2 } = await import('../src/engine/grades/grade2.js');
const { grade3 } = await import('../src/engine/grades/grade3.js');
const { grade4 } = await import('../src/engine/grades/grade4.js');
const { grade5 } = await import('../src/engine/grades/grade5.js');
const { grade6 } = await import('../src/engine/grades/grade6.js');
const { validateQuestion } = await import('../src/engine/gradeRules.js');

const ALL_GRADES = [
  { grade: 1, obj: grade1 },
  { grade: 2, obj: grade2 },
  { grade: 3, obj: grade3 },
  { grade: 4, obj: grade4 },
  { grade: 5, obj: grade5 },
  { grade: 6, obj: grade6 },
];

// ── Supabase client (service role) ────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

// ── Helpers ───────────────────────────────────────────────────
function hashQuestion(q, a) {
  return createHash('sha256').update(`${q}|${a}`).digest('hex').slice(0, 32);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Seed ──────────────────────────────────────────────────────
const RUNS_PER_GENERATOR = 8; // run each generator N times for variety
const BATCH_SIZE = 50;        // upsert rows at a time

let totalAttempted = 0;
let totalInserted  = 0;
let totalSkipped   = 0;
let totalInvalid   = 0;

const seen = new Set(); // in-memory dedup within this run

for (const { grade, obj } of ALL_GRADES) {
  for (const [topicId, gens] of Object.entries(obj)) {
    const batch = [];

    for (const [idx, gen] of gens.entries()) {
      for (let run = 0; run < RUNS_PER_GENERATOR; run++) {
        totalAttempted++;
        let q;
        try { q = gen(); } catch (e) {
          console.warn(`  SKIP grade${grade} ${topicId}[${idx}] run${run}: generator threw — ${e.message}`);
          totalInvalid++;
          continue;
        }

        if (!q || !q.q || !q.a) { totalInvalid++; continue; }

        // Grade rules validation
        const v = validateQuestion(grade, q);
        if (!v.ok) {
          totalInvalid++;
          continue;
        }

        const hash = hashQuestion(q.q, q.a);
        if (seen.has(hash)) { totalSkipped++; continue; }
        seen.add(hash);

        batch.push({
          grade,
          topic_id:       topicId,
          difficulty:     q.d || 2,
          q_type:         q.tp,
          question_json:  q,
          source:         'hardcode',
          hash,
          context_version: 1,
          quality_score:  50,
          status:         'verified',
        });
      }
    }

    if (!batch.length) continue;

    // Upsert in batches
    for (let i = 0; i < batch.length; i += BATCH_SIZE) {
      const chunk = batch.slice(i, i + BATCH_SIZE);
      const { error, data } = await supabase
        .from('question_bank')
        .upsert(chunk, { onConflict: 'hash', ignoreDuplicates: true })
        .select('id');

      if (error) {
        console.error(`  ERROR upserting grade${grade} ${topicId}: ${error.message}`);
      } else {
        const inserted = data?.length ?? 0;
        totalInserted += inserted;
        totalSkipped  += chunk.length - inserted;
      }
      await sleep(50); // stay under Supabase rate limits
    }

    console.log(`  ✓ grade${grade} ${topicId} — ${batch.length} candidates processed`);
  }
}

console.log('\n══════════════════════════════════');
console.log(`Seed complete`);
console.log(`  Attempted : ${totalAttempted}`);
console.log(`  Inserted  : ${totalInserted}`);
console.log(`  Skipped   : ${totalSkipped}  (duplicates or already exist)`);
console.log(`  Invalid   : ${totalInvalid}  (failed grade rules or generator error)`);
console.log('══════════════════════════════════');
