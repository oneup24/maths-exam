/**
 * gradeRules.js — Per-grade number constraints for question generators and validation
 *
 * Based on HK EDB Primary Mathematics Curriculum (2018 KS1 / 2020 KS2).
 * Use validateQuestion(grade, q) to check a generated question before serving.
 */

export const GRADE_RULES = {
  1: {
    maxNumber:       100,       // P1: numbers up to 100 (1N3)
    allowNegative:   false,
    allowDecimal:    false,
    allowFraction:   false,
    allowMultiply:   false,
    allowDivide:     false,
    maxMultiplier:   null,
    maxDivisor:      null,
    maxAddend:       100,
    note: 'P1: 20以內加減 (1N2), 100以內數 (1N3/1N4)',
  },
  2: {
    maxNumber:       9999,      // P2: 三位數 + 四位數 (2N1/2N4)
    allowNegative:   false,
    allowDecimal:    false,
    allowFraction:   true,      // 2N5: halves/thirds/quarters
    allowMultiply:   true,      // 2N3: times tables 1-9
    allowDivide:     true,      // 2N6: basic division with remainder
    maxMultiplier:   9,
    maxDivisor:      9,
    maxAddend:       999,
    note: 'P2: 三位數加減, 乘法表1-9, 基本除法, 簡單分數',
  },
  3: {
    maxNumber:       99999,     // P3: 大數到100,000 (3N1)
    allowNegative:   false,
    allowDecimal:    true,      // 3N6: tenths only
    maxDecimalPlaces: 1,
    allowFraction:   true,      // 3N5: unit fractions + simple fractions
    allowMultiply:   true,      // 3N2: 2-digit × 1-digit, then 3-digit × 1-digit
    allowDivide:     true,      // 3N3: with remainder
    maxMultiplier:   99,
    maxDivisor:      9,
    maxAddend:       99999,
    note: 'P3: 大數到十萬, 乘除, 分數, 小數(一位)',
  },
  4: {
    maxNumber:       9999999,   // P4: large numbers in context
    allowNegative:   false,
    allowDecimal:    true,      // 4N78: decimals to 2 d.p.
    maxDecimalPlaces: 2,
    allowFraction:   true,      // 4N6: proper/improper, mixed numbers
    allowMultiply:   true,      // 4N1: 4-digit × 2-digit
    allowDivide:     true,      // 4N2: 4-digit ÷ 2-digit
    maxMultiplier:   99,
    maxDivisor:      99,
    maxAddend:       9999999,
    note: 'P4: 大數, 小數(兩位), 分數, 長乘短除, 周界面積',
  },
  5: {
    maxNumber:       999999999, // P5: 億位 (5N1)
    allowNegative:   false,
    allowDecimal:    true,      // 5N4: decimal multiplication/division
    maxDecimalPlaces: 3,
    allowFraction:   true,      // 5N2/5N3/5N5: add/subtract/multiply/divide fractions
    allowMultiply:   true,
    allowDivide:     true,
    maxMultiplier:   999,
    maxDivisor:      99,
    maxAddend:       999999999,
    note: 'P5: 億以下大數, 異分母分數四則, 小數乘除, 代數',
  },
  6: {
    maxNumber:       null,      // P6: no hard max; decimals and percentages
    allowNegative:   true,      // 6A1 equations may involve negative intermediate steps
    allowDecimal:    true,
    maxDecimalPlaces: 3,
    allowFraction:   true,      // 6N1/6N2: fraction↔decimal conversion
    allowPercent:    true,      // 6N34: percentages
    allowMultiply:   true,
    allowDivide:     true,
    maxMultiplier:   null,
    maxDivisor:      null,
    note: 'P6: 小數除法, 分數小數互換, 百分數, 方程, 圓形面積, 速率',
  },
};

/**
 * validateQuestion(grade, q) — check a generated question against grade rules.
 * Returns { ok: true } or { ok: false, reason: string }.
 *
 * Currently checks: answer is non-negative (unless grade allows), answer is
 * non-empty string, numeric answer is within maxNumber.
 * Extend this as generators grow more sophisticated.
 */
export function validateQuestion(grade, q) {
  const rules = GRADE_RULES[grade];
  if (!rules) return { ok: false, reason: `No rules for grade ${grade}` };

  if (!q || !q.a) return { ok: false, reason: 'Missing answer' };

  // For multi-part answers, validate the first numeric part
  const firstPart = String(q.a).split(/[,，]/)[0].trim();
  const num = parseFloat(firstPart);

  if (!isNaN(num)) {
    if (!rules.allowNegative && num < 0) {
      return { ok: false, reason: `Negative answer (${num}) not allowed in P${grade}` };
    }
    if (rules.maxNumber !== null && Math.abs(num) > rules.maxNumber) {
      return { ok: false, reason: `Answer ${num} exceeds maxNumber ${rules.maxNumber} for P${grade}` };
    }
    if (!rules.allowDecimal && !Number.isInteger(num)) {
      return { ok: false, reason: `Decimal answer (${num}) not allowed in P${grade}` };
    }
    if (rules.allowDecimal && rules.maxDecimalPlaces != null) {
      const dp = (firstPart.split('.')[1] || '').length;
      if (dp > rules.maxDecimalPlaces) {
        return { ok: false, reason: `${dp} decimal places exceeds max ${rules.maxDecimalPlaces} for P${grade}` };
      }
    }
  }

  return { ok: true };
}

// Export: GRADE_RULES, validateQuestion
