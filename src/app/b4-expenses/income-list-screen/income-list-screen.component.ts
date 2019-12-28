import {Component, Input, OnInit} from '@angular/core';
import {Income} from '../models/Income';
import {IncomeUtils} from '../utils/IncomeUtils';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';
import {NavigationButton} from '../../b4-lib/navigation/NavigationButton';
import {ButtonPosition} from '../../b4-lib/navigation/ButtonPosition';

@Component({
  selector: 'income-list-screen',
  templateUrl: './income-list-screen.component.html',
  styleUrls: ['./income-list-screen.component.scss']
})
export class IncomeListScreenComponent implements OnInit {

  @Input()
  public incomeList: Income[];
  public navigationModel: NavigationModel;
  public utils = IncomeUtils;

  /**
   * Income details card:
   *  - Origin            - Amount
   *  - transferDate      - Payment type.
   */
  constructor() {
  }

  ngOnInit() {
    const navigationButton: NavigationButton[] = [
      {name: 'add', icon: 'add', position: ButtonPosition.RIGHT},
      {name: 'back', icon: 'arrow_back_ios', position: ButtonPosition.LEFT},
    ];
    this.navigationModel = new NavigationModel('income.list.title', '', '', navigationButton);
  }
}
