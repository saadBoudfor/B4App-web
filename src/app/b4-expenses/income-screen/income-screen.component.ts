import {Component, OnInit} from '@angular/core';
import {IncomeBuilder} from '../builders/IncomeBuilder';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../models/Currency';
import {IncomeService} from '../services/IncomeService';
import {Income} from '../models/Income';
import {IncomeUtils} from '../utils/IncomeUtils';
import {ButtonPosition} from '../../b4-lib/navigation/ButtonPosition';

@Component({
  selector: 'income-screen',
  templateUrl: './income-screen.component.html',
  styleUrls: ['./income-screen.component.scss']
})
export class IncomeScreenComponent implements OnInit {
  public navigationModel: NavigationModel;
  public incomeForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private incomeService: IncomeService) {
  }

  ngOnInit() {
    this.navigationModel = new NavigationModel('income.form.add.title', 'income.form.add.subtitle', 'swap_horiz', [{
      icon: 'close',
      name: 'cancel',
      position: ButtonPosition.RIGHT
    }]);
    this.incomeForm = this.formBuilder.group({
      origin: ['', Validators.required],
      isCardPayment: [''],
      description: [''],
      transferDate: ['', Validators.required],
      amount: ['', Validators.required],
      isProgrammed: [''],
      endDate: ['']
    });
  }

  submitIncomeForm(): Income {
    if (this.incomeForm.valid) {
      const income = IncomeBuilder
        .builder
        .origin(this.incomeForm.value.origin)
        .description(this.incomeForm.value.description)
        .transferDate(this.incomeForm.value.transferDate)
        .amount({value: this.incomeForm.value.amount, currency: Currency.EUR})
        .isProgrammed(this.incomeForm.value.isProgrammed)
        .endDate(this.incomeForm.value.endDate)
        .payment(this.incomeForm.value.isCardPayment ? IncomeUtils.setCardPayment() : IncomeUtils.setCashPayment())
        .build();
      const newIncome = this.incomeService.save(income);
      if (newIncome) {
        this.incomeForm.reset();
      }
      return income;
    }
  }
}
