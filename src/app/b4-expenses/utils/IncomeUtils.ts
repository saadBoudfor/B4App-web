import {Income} from '../models/Income';
import * as _ from 'lodash';
import {PaymentType} from '../models/PaymentType';
import {Payment} from '../models/Payment';

export class IncomeUtils {
  public static incomesToString(incomes: Income[]): string {
    return JSON.stringify(incomes);
  }

  public static stringToIncomes(incomeStr: string): Income[] {
    return JSON.parse(incomeStr);
  }
  public static createId(income: Income, incomes: Income[]) {
    const last = _.last(incomes);
    income.id = last ? last.id + 1 : 1;
  }

  static setCashPayment(): Payment {
    return {type: PaymentType.CASH};
  }

  static setCardPayment(): Payment {
    return {type: PaymentType.CARD};
  }
}
