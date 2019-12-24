import {StringUtils} from './StringUtils';

describe('Test empty function', () => {
  it('Should return true for undefined object', () => {
    expect(StringUtils.hasContent(undefined)).toBeFalsy();
  });
  it('Should return true for null object', () => {
    expect(StringUtils.hasContent(null)).toBeFalsy();

  });
  it('Should return true for empty string object', () => {
    expect(StringUtils.hasContent('')).toBeFalsy();

  });
  it('Should return false for non empty string object', () => {
    expect(StringUtils.hasContent('not_empty')).toBeTruthy();

  });
});
