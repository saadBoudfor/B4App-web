import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputModel} from '../inputs/InputModel';

@Component({
  selector: 'switch-elt',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Output()
  public value = new EventEmitter<string>();

  @Input()
  public inputData: InputModel;

  constructor() {
  }

  ngOnInit() {
  }

  onChange($event: any) {
    this.value.emit($event.srcElement.checked);
  }
}
