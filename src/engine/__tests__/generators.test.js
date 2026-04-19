/**
 * generators.test.js — Run every grade generator 3× and verify output shape
 */
import { describe, it, expect } from 'vitest';
import { grade1 } from '../grades/grade1.js';
import { grade2 } from '../grades/grade2.js';
import { grade3 } from '../grades/grade3.js';
import { grade4 } from '../grades/grade4.js';
import { grade5 } from '../grades/grade5.js';
import { grade6 } from '../grades/grade6.js';

const VALID_TYPES = ['calc', 'fill', 'mc', 'short', 'work'];

const ALL_GRADES = [
  { label: 'grade1', obj: grade1 },
  { label: 'grade2', obj: grade2 },
  { label: 'grade3', obj: grade3 },
  { label: 'grade4', obj: grade4 },
  { label: 'grade5', obj: grade5 },
  { label: 'grade6', obj: grade6 },
];

ALL_GRADES.forEach(({ label, obj }) => {
  describe(`${label} generators`, () => {
    Object.entries(obj).forEach(([topicId, gens]) => {
      gens.forEach((gen, idx) => {
        it(`${topicId}[${idx}] — runs 3× without error, valid shape`, () => {
          for (let run = 0; run < 3; run++) {
            let q;
            expect(() => { q = gen(); }).not.toThrow();
            // Must return an object
            expect(q).toBeTruthy();
            expect(typeof q).toBe('object');
            // Required fields
            expect(q).toHaveProperty('tp');
            expect(q).toHaveProperty('q');
            expect(q).toHaveProperty('a');
            expect(q).toHaveProperty('sc');
            // tp must be a valid question type
            expect(VALID_TYPES).toContain(q.tp);
            // q (question text) must be a non-empty string
            expect(typeof q.q).toBe('string');
            expect(q.q.length).toBeGreaterThan(0);
            // a (answer) must be a non-empty string
            expect(typeof q.a).toBe('string');
            expect(q.a.length).toBeGreaterThan(0);
            // sc (score) must be 1, 2, or 3
            expect([1, 2, 3]).toContain(q.sc);
            // d (difficulty), if present, must be 1, 2, or 3
            if (q.d !== undefined) {
              expect([1, 2, 3]).toContain(q.d);
            }
            // MC questions must have opts array
            if (q.isMC) {
              expect(Array.isArray(q.opts)).toBe(true);
              expect(q.opts.length).toBeGreaterThan(0);
              // Exactly one correct option
              const correct = q.opts.filter(o => o.c);
              expect(correct.length).toBe(1);
              // Answer label must match a correct option
              expect(q.opts.some(o => o.l === q.a)).toBe(true);
            }
          }
        });
      });
    });
  });
});
