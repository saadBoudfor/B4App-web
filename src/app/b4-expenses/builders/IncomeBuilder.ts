import {Income} from '../models/Income';
import {Amount} from '../models/Amount';

export class IncomeBuilder {
  public static builder = new IncomeBuilder();

  private income: Income = new Income();

  id(id: number): IncomeBuilder {
    this.income.id = id;
    return this;
  }

  origin(origin: string): IncomeBuilder {
    this.income.origin = origin;
    return this;
  }

  description(description: string): IncomeBuilder {
    this.income.description = description;
    return this;
  }

  transferDate(transferDate: Date): IncomeBuilder {
    this.income.transferDate = transferDate;
    return this;
  }

  amount(amount: Amount): IncomeBuilder {
    this.income.amount = amount;
    return this;
  }

  endDate(endDate: Date): IncomeBuilder {
    this.income.endDate = endDate;
    return this;
  }

  isProgrammed(isProgrammed: boolean): IncomeBuilder {
    this.income.isProgrammed = isProgrammed;
    return this;
  }

  build() {
    return this.income;
  }
}
