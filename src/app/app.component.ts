import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Income} from './b4-expenses/models/Income';
import {IncomeBuilder} from './b4-expenses/builders/IncomeBuilder';
import {Currency} from './b4-expenses/models/Currency';
import {PaymentType} from './b4-expenses/models/PaymentType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public income: Income;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.income = IncomeBuilder
      .builder
      .amount({value: 2111.1, currency: Currency.EUR})
      .transferDate(new Date())
      .origin('Ausy TS')
      .description('Salaire poste Ingénieur études et développement expérimenté')
      .isProgrammed(true)
      .endDate(new Date(2020, 12, 31))
      .payment({type: PaymentType.CARD})
      .build();
  }
}
