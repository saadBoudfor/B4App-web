import {ErrorCode} from '../constants/ErrorCode';
import {ObjectUtils} from './ObjectUtils';

export class ErrorUtils {
  public static getException(code: ErrorCode, methodName: string, className: string, obj: any = null): Error {
    return new Error('[' + className + '#' + methodName + ']: ' + code + ': \n' + (obj ? ObjectUtils.toString(obj) : ''));
  }
}
