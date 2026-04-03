import { describe, it, expect } from 'vitest';
import { Q } from './engine.js';

const ITERATIONS = 1000;

describe('4N5 generators produce non-negative results', () => {
  const gens = Q[4]['4N5'];

  it('Generator 0 (d:1): (a+b)*c is always >= 0', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const q = gens[0]();
      const ans = Number(q.a);
      expect(ans).toBeGreaterThanOrEqual(0);
    }
  });

  it('Generator 1 (d:2): a - b*c + d — final answer is always >= 0', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const q = gens[1]();
      const ans = Number(q.a);
      expect(ans).toBeGreaterThanOrEqual(0);
    }
  });

  it('Generator 1 (d:2): a - b*c + d — no negative intermediate step', () => {
    // Expression format: "a − b × c + d = ?"
    // Intermediate step after applying precedence: a - (b*c) must be >= 0
    for (let i = 0; i < ITERATIONS; i++) {
      const q = gens[1]();
      const match = q.q.match(/^(\d+) − (\d+) × (\d+) \+ (\d+)/);
      expect(match).not.toBeNull();
      const [, a, b, c] = match.map(Number);
      const intermediate = a - b * c;
      expect(intermediate).toBeGreaterThanOrEqual(0);
    }
  });

  it('Generator 2 (d:2 word problem): (small+big)*n is always >= 0', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const q = gens[2]();
      const ans = Number(q.a);
      expect(ans).toBeGreaterThanOrEqual(0);
    }
  });

  it('Generator 3 (d:3 word problem): (girls-leave)*ratio is always >= 0', () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const q = gens[3]();
      const ans = Number(q.a);
      expect(ans).toBeGreaterThanOrEqual(0);
    }
  });
});
