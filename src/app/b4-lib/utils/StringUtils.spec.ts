import {StringUtils} from './StringUtils';

describe('Test empty function', () => {
  it('Should return true for undefined object', () => {
    expect(StringUtils.isEmpty(undefined)).toBeFalsy();
  });
  it('Should return true for null object', () => {
    expect(StringUtils.isEmpty(null)).toBeFalsy();

  });
  it('Should return true for empty string object', () => {
    expect(StringUtils.isEmpty('')).toBeFalsy();

  });
  it('Should return false for non empty string object', () => {
    expect(StringUtils.isEmpty('not_empty')).toBeTruthy();

  });
});
