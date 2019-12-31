import {Component, OnInit} from '@angular/core';
import {Income} from '../models/Income';
import {IncomeUtils} from '../utils/IncomeUtils';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';
import {NavigationButton} from '../../b4-lib/navigation/NavigationButton';
import {ButtonPosition} from '../../b4-lib/navigation/ButtonPosition';
import {IncomeService} from '../services/IncomeService';
import {ExpensesRouterService} from '../expenses-routing/expenses-router.service';

@Component({
  selector: 'income-list-screen',
  templateUrl: './income-list-screen.component.html',
  styleUrls: ['./income-list-screen.component.scss']
})
export class IncomeListScreenComponent implements OnInit {

  public incomeList: Income[];
  public navigationModel: NavigationModel;
  public utils = IncomeUtils;

  /**
   * Income details card:
   *  - Origin            - Amount
   *  - transferDate      - Payment type.
   */
  constructor(private incomeService: IncomeService, private expenseRouter: ExpensesRouterService) {
  }

  ngOnInit() {
    const navigationButton: NavigationButton[] = [
      {name: 'add', icon: 'add', position: ButtonPosition.RIGHT},
      {name: 'back', icon: 'arrow_back_ios', position: ButtonPosition.LEFT},
    ];
    this.navigationModel = new NavigationModel('income.list.title', '', '', navigationButton);
    this.incomeList = this.incomeService.getAll();
  }

  onNavigationClick($event: string) {
    if ($event === 'add') {
      this.expenseRouter.goTo('add-income');
    }
  }

  onCardClick(income: Income) {
    this.expenseRouter.goTo('show-income', {key: 'income', value: income});
  }
}
