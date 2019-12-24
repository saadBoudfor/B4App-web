import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationModel} from './NavigationModel';
import {ButtonType} from './ButtonType';
import {NGXLogger} from 'ngx-logger';
import {StringUtils} from '../utils/StringUtils';

@Component({
  selector: 'nav-component',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public submitButton: string = ButtonType[ButtonType.SUBMIT];
  public cancelButton: string = ButtonType[ButtonType.CANCEL];

  @Output()
  public action = new EventEmitter<ButtonType>();

  @Input()
  public navigationModel: NavigationModel;

  constructor(public logger: NGXLogger) {
  }

  private static isEmpty(navigationModel: NavigationModel) {
    return navigationModel
      && StringUtils.isEmpty(navigationModel.title)
      && StringUtils.isEmpty(navigationModel.subtitle)
      && StringUtils.isEmpty(navigationModel.icon);
  }

  ngOnInit() {
    if (NavigationComponent.isEmpty(this.navigationModel)) {
      this.logger.error('Navigation component was called with empty model');
    }
  }

  onClick(button: string) {
    this.action.emit(ButtonType[button]);
  }

}
