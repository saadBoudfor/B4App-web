import {Repository} from './Repository';
import {Income} from '../models/Income';
import * as _ from 'lodash';
import {NGXLogger} from 'ngx-logger';
import {Injectable} from '@angular/core';

@Injectable()
export class IncomeRepository implements Repository<Income, number> {
  private incomeList: Income[] = [];

  constructor(private log: NGXLogger) {
  }

  deleteData(id: number): Income[] {
    this.incomeList = _.reject(this.incomeList, income => income.id === id);
    return this.incomeList;
  }

  getAll(): Income[] {
    return this.incomeList;
  }

  getByID(id: number): Income {
    return _.find(this.incomeList, income => income.id === id);
  }

  saveData(data: Income): Income {
    const last = _.last(this.incomeList);
    data.id = last ? last.id : 1;
    this.incomeList.push(data);
    return data;
  }

  updateData(data: Income): Income {
    const $index = this.incomeList.indexOf(data);
    if ($index !== -1) {
      this.incomeList[$index] = data;
      return data;
    } else {
      this.log.warn(' Income repository [IncomeRepository] error: income not found ' + data);
      return null;
    }
  }

}
