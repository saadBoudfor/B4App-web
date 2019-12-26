import {ErrorCode} from '../constants/ErrorCode';

export class ErrorUtils {
  public static getError(code: ErrorCode, methodName: string, className: string): Error {
    return new Error('[' + className + '#' + methodName + ']: ' + code);
  }
}
