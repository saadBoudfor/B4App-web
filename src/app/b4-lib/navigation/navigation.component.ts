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

  private static hasContent(navigationModel: NavigationModel) {
    return navigationModel
      && StringUtils.hasContent(navigationModel.title)
      && StringUtils.hasContent(navigationModel.subtitle)
      && StringUtils.hasContent(navigationModel.icon);
  }

  ngOnInit() {
    if (!NavigationComponent.hasContent(this.navigationModel)) {
      this.logger.error('Navigation component was called with empty model');
    }
  }

  onClick(button: string) {
    this.action.emit(ButtonType[button]);
  }

}
