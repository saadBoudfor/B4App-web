import {Income} from '../models/Income';
import * as _ from 'lodash';
import {PaymentType} from '../models/PaymentType';
import {Payment} from '../models/Payment';
import {ObjectUtils} from './ObjectUtils';

export class IncomeUtils {
  public static createId(income: Income, incomes: Income[]) {
    const last = _.last(incomes);
    income.id = last ? last.id + 1 : 1;
  }

  public static isValid(income: Income): boolean {
    return !ObjectUtils.isEmpty(income)
      && !ObjectUtils.isEmpty(income.transferDate)
      && !ObjectUtils.isEmpty(income.amount)
      && !ObjectUtils.isEmpty(income.origin);
  }

  public static setCashPayment(): Payment {
    return {type: PaymentType.CASH};
  }

  public static setCardPayment(): Payment {
    return {type: PaymentType.CARD};
  }

  public static formatDate(date: Date): string {
    if (!date) {
      return null;
    }
    return new Date(date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: '2-digit'});
  }

  /**
   * Convert income/ income list to string.
   * @param value income to convert.
   */
  public static toString(value: any): string {
    return JSON.stringify(value);
  }

  /**
   * Extract income or income array from string.
   * @param str income container
   * @return income or income list or null.
   */
  public static valueOf(str: string): any {
    if (!str) {
      return null;
    }
    const obj = JSON.parse(str);
    if (Array.isArray(obj)) {
      obj.map(income => this.parseIncome(income));
      return obj;
    } else {
      return this.parseIncome(obj);
    }
  }

  private static parseIncome(obj: Income): Income {
    if (obj.endDate) {
      obj.endDate = new Date(obj.endDate);
    }
    if (obj.transferDate) {
      obj.transferDate = new Date(obj.transferDate);
    }
    return obj;
  }
}
