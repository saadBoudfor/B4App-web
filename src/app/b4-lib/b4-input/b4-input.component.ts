import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {InputModel} from './InputModel';
import * as _ from 'lodash';

/**
 * Input component.
 *  - Get value from component on keyup.
 *  - add required mention if input is required
 *  - apply valid style if information are valid.
 *  - apply invalid style if given information are invalid.
 *  - show error/info/warning messages.
 *  - Inputs:
 *    - isRequired ? (default to false)
 *    - placeholder (required)
 *    - message to display / when display them.
 *    - isValid ?
 *  - Outputs:
 *    - given value
 */
@Component({
  selector: 'b4-input',
  templateUrl: './b4-input.component.html',
  styleUrls: ['./b4-input.component.scss']
})
export class B4InputComponent implements OnInit {

  @Input()
  public inputData: InputModel;

  @Output()
  public value: EventEmitter<string> = new EventEmitter<string>();

  public canLoad = false;

  constructor(private logger: NGXLogger) {
  }

  ngOnInit() {
    this.canLoad = this.checkIfCanLoad();
  }

  private checkIfCanLoad(): boolean {
    let errorLogMessage = '[Input component] B4InputComponent, errors: \n';
    const loadErrors = [
      {reason: 'Input model is required to load component.', condition: !this.inputData},
      {
        reason: 'cannot display more than one message.',
        condition: this.inputData && this.inputData.messages && this.inputData.messages.length !== 1
      }
    ];
    const errors = loadErrors.filter(error => error.condition);
    errors.forEach(error => errorLogMessage += '- ' + error.reason);
    if (!_.isEmpty(errors)) {
      this.logger.fatal(errorLogMessage);
    }
    return _.isEmpty(errors);
  }

  onKeyUp($event) {
    this.value.emit($event.target.value);
  }

  requiredMessage(): string {
    return this.inputData.isRequired ? ' *' : '';
  }
}
