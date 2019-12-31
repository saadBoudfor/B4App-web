import {Component, Input, OnInit} from '@angular/core';
import {IncomeBuilder} from '../builders/IncomeBuilder';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../models/Currency';
import {IncomeService} from '../services/IncomeService';
import {Income} from '../models/Income';
import {IncomeUtils} from '../utils/IncomeUtils';
import {ButtonPosition} from '../../b4-lib/navigation/ButtonPosition';
import {PaymentType} from '../models/PaymentType';
import {ExpensesRouterService} from '../expenses-routing/expenses-router.service';

@Component({
  selector: 'income-screen',
  templateUrl: './income-screen.component.html',
  styleUrls: ['./income-screen.component.scss']
})
export class IncomeScreenComponent implements OnInit {
  public navigationModel: NavigationModel;
  public incomeForm: FormGroup;

  @Input()
  public incomeToUpdate: Income;

  constructor(private formBuilder: FormBuilder,
              private incomeService: IncomeService, private expenseRouter: ExpensesRouterService) {
  }

  ngOnInit() {
    this.navigationModel = new NavigationModel('income.form.add.title', 'income.form.add.subtitle', 'swap_horiz', [{
      icon: 'close',
      name: 'cancel',
      position: ButtonPosition.RIGHT
    }]);
    let controlsConfig = {
      origin: ['', Validators.required],
      isCardPayment: [''],
      description: [''],
      transferDate: ['', Validators.required],
      amount: ['', Validators.required],
      isProgrammed: [''],
      endDate: ['']
    };
    if (this.incomeToUpdate) {
      // @ts-ignore
      controlsConfig = {
        origin: [this.incomeToUpdate.origin, Validators.required],
        isCardPayment: [(this.incomeToUpdate.payment.type === PaymentType.CARD) ? 'true' : 'false'],
        description: [this.incomeToUpdate.description],
        transferDate: [this.incomeToUpdate.transferDate.toISOString(), Validators.required],
        amount: [this.incomeToUpdate.amount.value.toString(), Validators.required],
        isProgrammed: [this.incomeToUpdate.isProgrammed ? 'true' : 'false'],
        endDate: [this.incomeToUpdate.endDate ? this.incomeToUpdate.endDate.toISOString() : '']
      };
    }
    this.incomeForm = this.formBuilder.group(controlsConfig);
  }

  submitIncomeForm(): Income {
    if (this.incomeForm.valid) {
      const income = new IncomeBuilder()
        .origin(this.incomeForm.value.origin)
        .description(this.incomeForm.value.description)
        .transferDate(new Date(this.incomeForm.value.transferDate))
        .amount({value: this.incomeForm.value.amount, currency: Currency.EUR})
        .isProgrammed(this.incomeForm.value.isProgrammed)
        .endDate(new Date(this.incomeForm.value.endDate))
        .payment(this.incomeForm.value.isCardPayment ? IncomeUtils.setCardPayment() : IncomeUtils.setCashPayment())
        .build();
      const newIncome = this.incomeService.save(income);
      if (newIncome) {
        this.incomeForm.reset();
        this.expenseRouter.goTo('show-income', {key: 'income', value: newIncome});
      }
      return income;
    }
  }

  goTo($event: string) {
    if ($event === 'cancel') {
      this.expenseRouter.goTo('show-income-list');
    }
  }
}
