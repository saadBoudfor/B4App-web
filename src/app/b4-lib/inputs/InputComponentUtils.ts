import {InputModel} from './InputModel';
import * as _ from 'lodash';

export class InputComponentUtils {
  static checkIfCanLoad(inputData: InputModel): any {
    let errorLogMessage = '[Input component] B4InputComponent, errors: \n';
    const loadErrors = [
      {reason: 'Input model is required to load component.', condition: !inputData},
      {
        reason: 'cannot display more than one message.',
        condition: inputData && inputData.messages && inputData.messages.length !== 1
      }
    ];
    const errors = loadErrors.filter(error => error.condition);
    errors.forEach(error => errorLogMessage += '- ' + error.reason);
    return {canLoad: _.isEmpty(errors), message: errorLogMessage};
  }
}
