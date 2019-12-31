import {Income} from '../../../../b4-expenses/models/Income';
import {IncomeBuilder} from '../../../../b4-expenses/builders/IncomeBuilder';
import {Currency} from '../../../../b4-expenses/models/Currency';

export class IncomeData {
  static validIncome(): Income {
    return new IncomeBuilder()
      .id(1)
      .amount({value: 111, currency: Currency.EUR})
      .origin('origin')
      .transferDate(new Date())
      .build();
  }

  static validIncomeArray(length: number): Income[] {
    const incomes: Income[] = [];
    for (let i = 1; i < length; i++) {
      incomes.push(new IncomeBuilder()
        .id(i)
        .amount({value: i + 111, currency: Currency.EUR})
        .origin('origin')
        .transferDate(new Date())
        .build());
    }
    return incomes;
  }

  static invalidIncome(): Income {
    return new IncomeBuilder()
      .id(1)
      .origin('origin')
      .build();
  }

  static validIncomeWithoutID(): Income {
    return new IncomeBuilder()
      .amount({value: 111, currency: Currency.EUR})
      .origin('origin')
      .transferDate(new Date())
      .build();
  }
}
