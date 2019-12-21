import {Component, OnInit} from '@angular/core';
import {Currency} from '../models/Currency';
import {IncomeRepository} from '../services/IncomeRepository';
import {IncomeBuilder} from '../builders/IncomeBuilder';
import {InputModel, InputType, MessageType} from '../../b4-lib/inputs/InputModel';

@Component({
  selector: 'income-screen',
  templateUrl: './income-screen.component.html',
  styleUrls: ['./income-screen.component.scss']
})
export class IncomeScreenComponent implements OnInit {
  public inputData: InputModel = {
    isRequired: true,
    label: 'Product name',
    // icon: 'date_range',
    type: InputType.textarea,
    messages: [
      {show: false, content: 'Product name not found in database', type: MessageType.error}
    ]
  };

  constructor(private incomeRepository: IncomeRepository) {
  }

  ngOnInit() {
    const income = IncomeBuilder.builder
      .isProgrammed(false)
      .amount({value: 22.5, currency: Currency.EUR})
      .origin('Salary')
      .description('salary income from Ausy society')
      .transferDate(new Date(2019, 12, 29))
      .build();
    this.incomeRepository.saveData(income);
    console.log(this.incomeRepository.getAll());
  }

  displayOnConsole($event: string) {
    console.log($event);
  }
}
