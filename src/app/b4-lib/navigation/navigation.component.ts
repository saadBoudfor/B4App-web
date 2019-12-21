import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output()
  public action = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(button: string) {
    this.action.emit(button);
  }
}
