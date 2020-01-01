import {CrudService} from '../../../../b4-expenses/services/CrudService';
import {Income} from '../../../../b4-expenses/models/Income';
import * as _ from 'lodash';

export class IncomeRepositoryMock implements CrudService<Income, number> {
  private incomeList: Income[] = [];

  getAll() {
    return this.incomeList;
  }

  clearAll() {
    return [];
  }

  save(income: Income) {
    this.incomeList.push(income);
    return income;
  }

  getByID(id: number): Income {
    return _.find(this.incomeList, income => income.id === id);
  }

  update(data: Income): Income {
    this.delete(data.id);
    this.save(data);
    return data;
  }

  delete(id: number): Income[] {
    this.incomeList = _.reject(this.incomeList, income => income.id === id);
    return this.incomeList;
  }

  init(incomes: Income[]) {
    this.incomeList = incomes;
  }

}
