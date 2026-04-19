/**
 * chkAns.test.js — Answer checker unit tests
 */
import { describe, it, expect } from 'vitest';
import { chkAns } from '../core.js';

describe('chkAns — exact match', () => {
  it('matches identical strings', () => expect(chkAns('42', '42')).toBe(true));
  it('ignores leading/trailing whitespace', () => expect(chkAns('  42  ', '42')).toBe(true));
  it('rejects wrong answer', () => expect(chkAns('43', '42')).toBe(false));
  it('rejects empty student answer', () => expect(chkAns('', '42')).toBe(false));
  it('rejects null student answer', () => expect(chkAns(null, '42')).toBe(false));
});

describe('chkAns — unit stripping', () => {
  it('strips cm from student answer', () => expect(chkAns('15cm', '15')).toBe(true));
  it('strips cm² from student answer', () => expect(chkAns('48cm²', '48')).toBe(true));
  it('strips $ from student answer', () => expect(chkAns('$120', '120')).toBe(true));
  it('strips 個 from student answer', () => expect(chkAns('5個', '5')).toBe(true));
  it('strips km/h', () => expect(chkAns('60km/h', '60')).toBe(true));
  it('strips 分鐘', () => expect(chkAns('30分鐘', '30')).toBe(true));
  it('strips 公斤', () => expect(chkAns('2公斤', '2')).toBe(true));
});

describe('chkAns — fraction parsing', () => {
  it('matches simple fraction 1/2', () => expect(chkAns('1/2', '1/2')).toBe(true));
  it('matches mixed number 1又1/2', () => expect(chkAns('1又1/2', '1又1/2')).toBe(true));
  it('matches 0.5 against 1/2 (within tolerance)', () => expect(chkAns('0.5', '1/2')).toBe(true));
  it('matches 0.25 against 1/4', () => expect(chkAns('0.25', '1/4')).toBe(true));
  it('matches 1.5 against 3/2', () => expect(chkAns('1.5', '3/2')).toBe(true));
  it('rejects 0.6 against 1/2 (outside tolerance)', () => expect(chkAns('0.6', '1/2')).toBe(false));
  it('matches within decimal tolerance', () => expect(chkAns('3.14', '3.141')).toBe(true));
});

describe('chkAns — multi-part answers', () => {
  it('matches comma-separated two-part', () => expect(chkAns('15,30', '15,30')).toBe(true));
  it('matches with space separator', () => expect(chkAns('15 30', '15,30')).toBe(true));
  it('matches three-part answer', () => expect(chkAns('A,5', 'A,5')).toBe(true));
  it('rejects wrong first part', () => expect(chkAns('14,30', '15,30')).toBe(false));
  it('rejects wrong second part', () => expect(chkAns('15,29', '15,30')).toBe(false));
  it('matches units stripped in multi-part', () => expect(chkAns('15cm,30cm²', '15,30')).toBe(true));
  it('matches remainder notation', () => expect(chkAns('5...2', '5...2')).toBe(true));
  it('matches 餘 as remainder', () => expect(chkAns('5餘2', '5...2')).toBe(true));
});

describe('chkAns — fullwidth normalisation', () => {
  it('normalises fullwidth comma', () => expect(chkAns('15，30', '15,30')).toBe(true));
  it('normalises fullwidth slash', () => expect(chkAns('1／2', '1/2')).toBe(true));
  it('normalises 又 to _ in mixed numbers', () => expect(chkAns('1_1/2', '1又1/2')).toBe(true));
});

describe('chkAns — letter answers (MC)', () => {
  it('matches A', () => expect(chkAns('A', 'A')).toBe(true));
  it('matches lowercase a to A (case insensitive)', () => expect(chkAns('a', 'A')).toBe(true));
  it('rejects wrong option', () => expect(chkAns('B', 'A')).toBe(false));
});

describe('chkAns — edge cases', () => {
  it('matches zero', () => expect(chkAns('0', '0')).toBe(true));
  it('matches negative number', () => expect(chkAns('-5', '-5')).toBe(true));
  it('matches decimal 3.14', () => expect(chkAns('3.14', '3.14')).toBe(true));
  it('matches Chinese answer 多', () => expect(chkAns('多', '多')).toBe(true));
  it('matches 補 angle type', () => expect(chkAns('補', '補')).toBe(true));
  it('rejects completely wrong', () => expect(chkAns('abc', '42')).toBe(false));
});
