import {Component, OnInit} from '@angular/core';
import {IncomeBuilder} from '../builders/IncomeBuilder';
import {NavigationModel} from '../../b4-lib/navigation/NavigationModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Currency} from '../models/Currency';
import {IncomeService} from '../services/IncomeService';

@Component({
  selector: 'income-screen',
  templateUrl: './income-screen.component.html',
  styleUrls: ['./income-screen.component.scss']
})
export class IncomeScreenComponent implements OnInit {
  public navigationModel: NavigationModel;
  private incomeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private incomeService: IncomeService) {
  }

  ngOnInit() {
    this.navigationModel = new NavigationModel('Source de revenue', 'Primes, ventes, salaire, ...', 'swap_horiz');
    this.incomeForm = this.formBuilder.group({
      origin: ['', Validators.required],
      description: [''],
      transferDate: ['', Validators.required],
      amount: ['', Validators.required],
      isProgrammed: [''],
      endDate: ['']
    });
  }

  submitIncomeForm() {
    if (this.incomeForm.valid) {
      const income = IncomeBuilder
        .builder
        .origin(this.incomeForm.value.origin)
        .description(this.incomeForm.value.description)
        .transferDate(this.incomeForm.value.transferDate)
        .amount({value: this.incomeForm.value.amount, currency: Currency.EUR})
        .isProgrammed(this.incomeForm.value.isProgrammed)
        .endDate(this.incomeForm.value.endDate)
        .build();
      const newIncome = this.incomeService.save(income);
      if (newIncome) {
        this.incomeForm.reset();
      }
    }
  }
}
