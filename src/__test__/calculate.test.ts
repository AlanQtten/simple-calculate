import { test, expect } from 'vitest';
import { calculate } from '../main'; // for coverage
import preCheck from '../pre-check';

test('test calculate function', () => {
  // positive number
  expect(calculate('0.1+0.2')).toBe('0.3');
  expect(calculate('1+2+3+4+5+6')).toBe('21');
  expect(calculate('6/2*3')).toBe('9');
  expect(calculate('6/(2*3)')).toBe('1');
  expect(calculate('6/(3-2)')).toBe('6');

  // negative number
  expect(calculate('-1+1')).toBe('0');
  expect(calculate('1--1')).toBe('2');
  expect(calculate('1*-1')).toBe('-1');
  expect(calculate('1/-1')).toBe('-1');
  expect(calculate('(-1+1)--1')).toBe('1');
  expect(calculate('-100*1')).toBe('-100');
  expect(calculate('1*-100.1')).toBe('-100.1');

  // other situation
  expect(calculate('6/(3-2')).toBe('');
  expect(calculate('(0.1+-0.1)+((1+2)*3)')).toBe('9');
});

test('test pre-check', () => {
  expect(preCheck('sinA')).toEqual(false);
  expect(preCheck('1.2 + 2.1')).toEqual(false);
  expect(preCheck('1.2+2.1')).toEqual(true);
  expect(preCheck('1+2*3/4-5')).toEqual(true);
});
