import {IncomeUtils} from './IncomeUtils';
import {PaymentType} from '../models/PaymentType';

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
});
