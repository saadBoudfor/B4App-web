import {CrudService} from '../services/CrudService';
import {Income} from '../models/Income';
import {Injectable} from '@angular/core';
import {IncomeUtils} from '../utils/IncomeUtils';
import {LocalStorageKeys} from '../constants/LocalStorageKeys';
import {ErrorUtils} from '../utils/ErrorUtils';
import {ErrorCode} from '../constants/ErrorCode';
import * as _ from 'lodash';


@Injectable()
export class IncomeRepository implements CrudService<Income, number> {
  constructor() {
  }

  clearAll() {
    localStorage.removeItem(LocalStorageKeys.INCOMES);
  }

  delete(id: number): Income[] {
    if (!id) {
      throw ErrorUtils.getException(ErrorCode.ID_NOT_FOUND, 'delete', IncomeRepository.name);
    }
    const found = this.getByID(id);
    if (!found) {
      throw ErrorUtils.getException(ErrorCode.INCOME_NOT_FOUND, 'delete', IncomeRepository.name, IncomeUtils.toString(id));
    }
    const newList = _.reject(this.getAll(), income => income.id === id);
    localStorage.setItem(LocalStorageKeys.INCOMES, IncomeUtils.toString(newList));
    return newList;
  }

  getAll(): Income[] {
    const incomes: Income[] = IncomeUtils.valueOf(localStorage.getItem(LocalStorageKeys.INCOMES));
    return incomes ? incomes : [];
  }

  getByID(id: number): Income {
    return _.findLast(this.getAll(), income => income.id === id);
  }

  save(income: Income): Income {
    if (!income.id) {
      throw ErrorUtils.getException(ErrorCode.ID_NOT_FOUND, 'save', IncomeRepository.name, IncomeUtils.toString(income));
    }
    if (!IncomeUtils.isValid(income)) {
      throw ErrorUtils.getException(ErrorCode.INVALID_INCOME, 'save', IncomeRepository.name, IncomeUtils.toString(income));
    }
    const incomes: Income[] = this.getAll();
    if (incomes.filter(elt => elt.id === income.id).length !== 0) {
      throw ErrorUtils.getException(ErrorCode.ID_ALREADY_EXIST, 'save', IncomeRepository.name, IncomeUtils.toString(income));
    }
    incomes.push(income);
    localStorage.setItem(LocalStorageKeys.INCOMES, IncomeUtils.toString(incomes));
    return income;
  }

  update(data: Income): Income {
    return undefined;
  }

}
