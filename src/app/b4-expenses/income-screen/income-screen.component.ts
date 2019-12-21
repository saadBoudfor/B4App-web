import {Component, OnInit} from '@angular/core';
import {IncomeBuilder} from '../builders/IncomeBuilder';

@Component({
  selector: 'income-screen',
  templateUrl: './income-screen.component.html',
  styleUrls: ['./income-screen.component.scss']
})
export class IncomeScreenComponent implements OnInit {
  public incomeBuilder = IncomeBuilder.builder;
  private VALIDATE = 'left-button';

  constructor() {
  }

  ngOnInit() {
  }

  clicked($event: string) {
    if ($event === this.VALIDATE) {
      console.log(this.incomeBuilder.build());
    }
  }
}
