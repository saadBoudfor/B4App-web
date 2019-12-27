import {IncomeBuilder} from './IncomeBuilder';
import {PaymentType} from '../models/PaymentType';
import {Currency} from '../models/Currency';
import {Income} from '../models/Income';

describe('Income builder', () => {
  it('should return the correct income', () => {
    const transferDateT = new Date();
    const endDateT = new Date();
    const incomeByBuilder: Income = IncomeBuilder
      .builder
      .id(1)
      .origin('origin')
      .description('description')
      .endDate(endDateT)
      .transferDate(transferDateT)
      .isProgrammed(true)
      .payment({type: PaymentType.CARD})
      .amount({value: 111, currency: Currency.EUR})
      .build();

    const expected: Income = {
      id: 1,
      origin: 'origin',
      description: 'description',
      endDate: endDateT,
      transferDate: transferDateT,
      isProgrammed: true,
      payment: {type: PaymentType.CARD},
      amount: {value: 111, currency: Currency.EUR}
    };

    expect(incomeByBuilder.origin).toEqual(expected.origin);
    expect(incomeByBuilder.description).toEqual(expected.description);
    expect(incomeByBuilder.endDate).toEqual(expected.endDate);
    expect(incomeByBuilder.payment).toEqual(expected.payment);
    expect(incomeByBuilder.transferDate).toEqual(expected.transferDate);
    expect(incomeByBuilder.endDate).toEqual(expected.endDate);
    expect(incomeByBuilder.amount).toEqual(expected.amount);
    expect(incomeByBuilder.id).toEqual(expected.id);
  });
});
