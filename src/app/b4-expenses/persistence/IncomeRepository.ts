import {CrudService} from '../services/CrudService';
import {Income} from '../models/Income';
import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {IncomeUtils} from '../utils/IncomeUtils';
import {LocalStorageKeys} from '../constants/LocalStorageKeys';
import {ErrorUtils} from '../utils/ErrorUtils';
import {ErrorCode} from '../constants/ErrorCode';

@Injectable()
export class IncomeRepository implements CrudService<Income, number> {
  constructor() {
  }

  delete(id: number): Income[] {
    if (!id) {
      throw ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'delete', IncomeRepository.name);
    }
    const incomes = this.getAll();
    localStorage.setItem(LocalStorageKeys.INCOMES, IncomeUtils.incomesToString(_.reject(incomes, income => income.id === id)));
    return incomes;
  }

  getAll(): Income[] {
    return IncomeUtils.stringToIncomes(localStorage.getItem(LocalStorageKeys.INCOMES));
  }

  getByID(id: number): Income {
    if (!id) {
      throw ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'getByID', IncomeRepository.name);
    }
    const incomes = this.getAll();
    return _.find(incomes, income => income.id === id);
  }

  save(income: Income): Income {
    if (!income.id) {
      throw ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'save', IncomeRepository.name);
    }
    const incomes = this.getAll();
    incomes.push(income);
    localStorage.setItem(LocalStorageKeys.INCOMES, IncomeUtils.incomesToString(incomes));
    return income;
  }

  update(income: Income): Income {
    if (!income.id) {
      throw ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'update', IncomeRepository.name);
    }
    this.delete(income.id);
    return this.save(income);
  }

  clearAll() {
    localStorage.setItem(LocalStorageKeys.INCOMES, '[]');
  }
}
