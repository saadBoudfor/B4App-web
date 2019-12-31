import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationModel} from './NavigationModel';
import {ButtonPosition} from './ButtonPosition';
import {NGXLogger} from 'ngx-logger';
import {NavigationButton} from './NavigationButton';
import * as _ from 'lodash';
import {ErrorCode} from '../../b4-expenses/constants/ErrorCode';

@Component({
  selector: 'nav-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public leftButton: NavigationButton;
  public rightButton: NavigationButton;

  @Output()
  public action = new EventEmitter<string>();

  @Input()
  public navigationModel: NavigationModel;

  constructor(public logger: NGXLogger) {
  }


  ngOnInit() {
    if (!this.navigationModel) {
      this.logger.error(ErrorCode.NAVIGATION_MODEL_EMPTY);
    } else {
      this.leftButton = this.getLeftButton();
      this.rightButton = this.getRightButton();
    }

  }

  getLeftButton(): NavigationButton {
    const list = this.navigationModel.buttonList;
    if (list && list.length !== 0) {
      return _.findLast(list, button => button.position === ButtonPosition.LEFT);
    }
    return null;
  }

  getRightButton(): NavigationButton {
    const list = this.navigationModel.buttonList;
    if (list && list.length !== 0) {
      return _.findLast(list, button => button.position === ButtonPosition.RIGHT);
    }
    return null;
  }

  onClick(button: string) {
    this.action.emit(button);
  }

}
