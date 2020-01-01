import {IncomeUtils} from './IncomeUtils';
import {PaymentType} from '../models/PaymentType';
import {Income} from '../models/Income';
import {IncomeData} from '../../common/utils/testUtils/data/IncomeData';

describe('Income utils', () => {
  it('Should return card payment', () => {
    expect(IncomeUtils.setCardPayment()).toEqual({type: PaymentType.CARD});
  });
  it('Should return cash payment', () => {
    expect(IncomeUtils.setCashPayment()).toEqual({type: PaymentType.CASH});
  });
  it('Should format date to dd/mm/yyyy', () => {
    expect(IncomeUtils.formatDate(new Date(1991, 11, 12))).toEqual('12 déc. 1991');
  });

  it('should convert income to string successfully', () => {
    const income: Income = IncomeData.validIncome();
    expect(IncomeUtils.toString(income)).not.toBeNull();
    expect(IncomeUtils.toString(income).length).not.toEqual(0);
  });

  it('should convert string to income success', () => {
    const income: Income = IncomeData.validIncome();
    const str = IncomeUtils.toString(income);
    expect(IncomeUtils.valueOf(str)).toEqual(income);
  });

  it('should convert string to income success', () => {
    const income: Income = IncomeData.validIncome();
    const str = IncomeUtils.toString([income, income, income]);
    expect(IncomeUtils.valueOf(str)).toEqual([income, income, income]);
  });
  it('should return true if income is valid, when he has at least origin, transfer date and amount', () => {
    const income = IncomeData.validIncome();
    expect(IncomeUtils.isValid(income)).toBeTruthy();
  });
  it('should return false if income is invalid, when origin, transfer date or amount are missing', () => {
    const income = IncomeData.invalidIncome();
    expect(IncomeUtils.isValid(income)).toBeFalsy();
  });

  /**
   * Testing IncomeUtils#createID:
   * - should return 1 for the first income.
   * - should provide new id, if incomes are already saved.
   */
  it('should return 1 for the first income', () => {
    const incomes = [];
    expect(IncomeUtils.createId(incomes)).toEqual(1);
  });

  it('should provide new id, if incomes are already saved', () => {
    const incomes = IncomeData.validIncomeArray(8);
    expect(IncomeUtils.createId(incomes)).toEqual(8);
  });
});
