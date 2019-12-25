import {CrudService} from '../services/CrudService';
import {Income} from '../models/Income';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {IncomeUtils} from '../utils/IncomeUtils';
import {LocalStorageKeyStore} from '../configuration/LocalStorageKeyStore';

@Injectable()
export class IncomeRepository implements CrudService<Income, number> {
  constructor() {
  }

  delete(id: number): Income[] {
    const incomes = this.getAll();
    localStorage.setItem(LocalStorageKeyStore.INCOMES, IncomeUtils.incomesToString(_.reject(incomes, income => income.id === id)));
    return incomes;
  }

  getAll(): Income[] {
    const incomes = IncomeUtils.stringToIncomes(localStorage.getItem(LocalStorageKeyStore.INCOMES));
    return incomes ? incomes : [];
  }

  getByID(id: number): Income {
    const incomes = this.getAll();
    return _.find(incomes, income => income.id === id);
  }

  save(income: Income): Income {
    const incomes = this.getAll();
    incomes.push(income);
    localStorage.setItem(LocalStorageKeyStore.INCOMES, IncomeUtils.incomesToString(incomes));
    return income;
  }

  update(income: Income): Income {
    this.delete(income.id);
    return this.save(income);
  }

  clearAll() {
    localStorage.setItem(LocalStorageKeyStore.INCOMES, '');
  }
}
