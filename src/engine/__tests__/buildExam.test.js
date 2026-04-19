/**
 * buildExam.test.js — Exam builder correctness tests
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { buildExam } from '../exam.js';
import { TOPICS, EXAM_TARGETS } from '../config.js';

// sessionStorage is not available in node — provide a minimal stub
beforeAll(() => {
  if (typeof globalThis.sessionStorage === 'undefined') {
    const store = {};
    globalThis.sessionStorage = {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = v; },
      removeItem: (k) => { delete store[k]; },
    };
  }
});

const EXAM_TYPES = ['practice', 'test', 'exam'];
const GRADES = [1, 2, 3, 4, 5, 6];
// ±3 tolerance on question count (section rounding)
const TOLERANCE = 3;

GRADES.forEach(grade => {
  const allTopics = (TOPICS[grade] || []).map(t => t.id);

  describe(`buildExam — grade ${grade}`, () => {
    EXAM_TYPES.forEach(examType => {
      it(`${examType} — returns sections with correct structure`, () => {
        const secs = buildExam(grade, allTopics, examType, 2);

        // Must return a non-empty array
        expect(Array.isArray(secs)).toBe(true);
        expect(secs.length).toBeGreaterThan(0);

        // Each section has required fields
        secs.forEach(sec => {
          expect(sec).toHaveProperty('id');
          expect(sec).toHaveProperty('label');
          expect(sec).toHaveProperty('nm');
          expect(sec).toHaveProperty('qs');
          expect(Array.isArray(sec.qs)).toBe(true);
          expect(sec.qs.length).toBeGreaterThan(0);
        });
      });

      it(`${examType} — total questions within target ±${TOLERANCE}`, () => {
        const secs = buildExam(grade, allTopics, examType, 2);
        const total = secs.reduce((s, sec) => s + sec.qs.length, 0);
        const target = EXAM_TARGETS[examType];
        expect(total).toBeGreaterThanOrEqual(target - TOLERANCE);
        expect(total).toBeLessThanOrEqual(target + TOLERANCE);
      });

      it(`${examType} — no duplicate q+a within a single exam`, () => {
        const secs = buildExam(grade, allTopics, examType, 2);
        const keys = secs.flatMap(s => s.qs).map(q => q.q + '|' + q.a);
        const unique = new Set(keys);
        expect(unique.size).toBe(keys.length);
      });

      it(`${examType} — all questions have valid tp and non-empty answer`, () => {
        const secs = buildExam(grade, allTopics, examType, 2);
        const VALID_TYPES = ['calc', 'fill', 'mc', 'short', 'work'];
        secs.forEach(sec => {
          sec.qs.forEach(q => {
            expect(VALID_TYPES).toContain(q.tp);
            expect(typeof q.a).toBe('string');
            expect(q.a.length).toBeGreaterThan(0);
          });
        });
      });
    });
  });
});

describe('buildExam — edge cases', () => {
  it('returns [] for empty topic list', () => {
    const secs = buildExam(1, [], 'practice', 2);
    expect(secs).toEqual([]);
  });

  it('returns [] for invalid topic list', () => {
    const secs = buildExam(1, ['NONEXISTENT'], 'practice', 2);
    expect(secs).toEqual([]);
  });

  it('section labels are from 甲乙丙丁戊 set', () => {
    const secs = buildExam(4, (TOPICS[4] || []).map(t => t.id), 'exam', 2);
    const validLabels = ['甲', '乙', '丙', '丁', '戊'];
    secs.forEach(sec => {
      expect(validLabels).toContain(sec.label);
    });
  });

  it('difficulty 1 (basic) — produces questions', () => {
    const topics = (TOPICS[3] || []).map(t => t.id);
    const secs = buildExam(3, topics, 'practice', 1);
    expect(secs.length).toBeGreaterThan(0);
  });

  it('difficulty 3 (challenge) — produces questions', () => {
    const topics = (TOPICS[5] || []).map(t => t.id);
    const secs = buildExam(5, topics, 'practice', 3);
    expect(secs.length).toBeGreaterThan(0);
  });
});
