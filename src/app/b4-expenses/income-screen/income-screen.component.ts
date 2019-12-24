import {Component, OnInit} from '@angular/core';
import {IncomeBuilder} from '../builders/IncomeBuilder';
import {ButtonType} from '../../b4-lib/navigation/ButtonType';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';

@Component({
  selector: 'income-screen',
  templateUrl: './income-screen.component.html',
  styleUrls: ['./income-screen.component.scss']
})
export class IncomeScreenComponent implements OnInit {
  public incomeBuilder = IncomeBuilder.builder;
  public navigationModel: NavigationModel = new NavigationModel('Source de revenue', 'Primes, ventes, salaire, ...', 'swap_horiz');

  constructor() {
  }

  ngOnInit() {
  }

  clicked($event: ButtonType) {
    if ($event === ButtonType.SUBMIT) {
      console.log(this.incomeBuilder.build());
    }
  }
}
