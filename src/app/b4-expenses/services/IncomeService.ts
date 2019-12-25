import {Repository} from './Repository';
import {Income} from '../models/Income';
import * as _ from 'lodash';
import {NGXLogger} from 'ngx-logger';
import {Injectable} from '@angular/core';

@Injectable()
export class IncomeService implements Repository<Income, number> {
  private incomeList: Income[] = [];

  constructor(private log: NGXLogger) {
  }

  delete(id: number): Income[] {
    this.incomeList = _.reject(this.incomeList, income => income.id === id);
    this.log.info(' Income repository [IncomeService] delete income from list, id=' + id);
    return this.incomeList;
  }

  getAll(): Income[] {
    return this.incomeList;
  }

  getByID(id: number): Income {
    return _.find(this.incomeList, income => income.id === id);
  }

  save(income: Income): Income {
    const last = _.last(this.incomeList);
    income.id = last ? last.id + 1 : 1;
    this.incomeList.push(income);
    this.log.info(' Income repository [IncomeService] add new income to list id=' + income.id);
    this.log.info(income);
    return income;
  }

  update(income: Income): Income {
    const $index = this.incomeList.indexOf(income);
    if ($index !== -1) {
      this.incomeList[$index] = income;
      this.log.info(' Income repository [IncomeService] update income' + income);
      return income;
    } else {
      this.log.error(' Income repository [IncomeService] error: income not found ' + income);
      return null;
    }
  }

  clearAll() {
    this.incomeList = [];
  }

}
