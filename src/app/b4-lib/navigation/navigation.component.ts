import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationModel} from './NavigationModel';
import {ButtonType} from './ButtonType';
import {NGXLogger} from 'ngx-logger';

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


  ngOnInit() {
    if (!this.navigationModel || !this.navigationModel.hasContent()) {
      this.logger.error('Navigation component was called with empty model');
    }
  }

  onClick(button: string) {
    this.action.emit(ButtonType[button]);
  }

}
