import {Component, OnInit} from '@angular/core';
import {InputModel, MessageType} from './b4-lib/b4-input/InputModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: string;
  public inputData: InputModel = {
    isRequired: true,
    placeholder: 'Product name (ex: Coca cola)',
    messages: [
      {show: true, content: 'Product name not found in database', type: MessageType.error}
    ]
  };
  display(data) {
   this.data = data;
  }

  ngOnInit(): void {
  }
}
