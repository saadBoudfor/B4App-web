import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputModel} from '../InputModel';
import {NGXLogger} from 'ngx-logger';
import {InputComponentUtils} from '../InputComponentUtils';

/**
 * Text Input component.
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
 *    - type: date/number/text aria/text
 *    - add icon
 *  - Outputs:
 *    - given value
 */
@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input()
  public inputData: InputModel;

  @Output()
  public value: EventEmitter<string> = new EventEmitter<string>();

  public canLoad = false;

  constructor(private logger: NGXLogger) {
  }

  ngOnInit() {
    const componentState = InputComponentUtils.checkIfCanLoad(this.inputData);
    this.canLoad = componentState.canLoad;
    if (!componentState.canLoad) {
      this.logger.error(componentState.message);
    }
  }


  onKeyUp($event) {
    this.value.emit($event.target.value);
  }

  requiredMessage(): string {
    return this.inputData.isRequired ? ' (obligatoire)' : '';
  }
}
