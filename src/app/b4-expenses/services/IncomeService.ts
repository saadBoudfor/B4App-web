import {CrudService} from './CrudService';
import {Income} from '../models/Income';
import {NGXLogger} from 'ngx-logger';
import {Injectable} from '@angular/core';
import {IncomeRepository} from '../persistence/IncomeRepository';
import {IncomeUtils} from '../utils/IncomeUtils';

@Injectable()
export class IncomeService implements CrudService<Income, number> {

  constructor(private log: NGXLogger, private incomePersistence: IncomeRepository) {
  }

  delete(id: number): Income[] {
    this.log.info(' Income repository [IncomeService] delete income from list, id=' + id);
    return this.incomePersistence.delete(id);
  }

  getAll(): Income[] {
    return this.incomePersistence.getAll();
  }

  getByID(id: number): Income {
    return this.incomePersistence.getByID(id);
  }

  save(income: Income): Income {
    IncomeUtils.createId(income, this.getAll());
    this.log.info(' Income repository [IncomeService] try to add new income with id=' + income.id);
    return this.incomePersistence.save(income);
  }

  update(income: Income): Income {
    return this.incomePersistence.update(income);
  }

  clearAll() {
    this.incomePersistence.clearAll();
  }
}
