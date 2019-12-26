import {IncomeService} from './IncomeService';
import {Currency} from '../models/Currency';
import {Income} from '../models/Income';
import * as _ from 'lodash';
import {CrudService} from './CrudService';
import {PaymentType} from '../models/PaymentType';

let incomeService: IncomeService;
let logger;

class IncomeRepositoryMock implements CrudService<Income, number> {
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

}

describe('Income service: testing curd operation on ', () => {
  beforeEach(() => {
    logger = jasmine.createSpyObj(['error', 'info', 'debug']);
    logger.error.and.callFake(console.error);
    logger.info.and.callFake(console.log);
  });
  it('Should add object to class is save function is called', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const newIncome = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome);
    expect(incomeService.getAll().length).toEqual(1);
    expect(incomeService.getAll())
      .toEqual(
        [{id: 1, amount: {value: 222, currency: Currency.EUR}, payment: {type: PaymentType.CASH}}]
      )
    ;
  });

  it('Should  create id if no id was provided', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const newIncome = {amount: {value: 222, currency: Currency.EUR}};
    const saved = incomeService.save(newIncome);
    expect(saved.id).toEqual(1);
  });

  it('Should set payment to Cash if no payment was specified', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const newIncome = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome);
    expect(incomeService.getByID(1).payment.type).toEqual(PaymentType.CASH);
  });

  it('Should add object to class is save function is called and client had already registered incomes', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const newIncome1 = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome1);
    const newIncome2 = {amount: {value: 333, currency: Currency.EUR}};
    incomeService.save(newIncome2);
    expect(incomeService.getAll().length).toEqual(2);
    expect(incomeService.getAll()).toEqual([
      {id: 1, amount: {value: 222, currency: Currency.EUR}, payment: {type: PaymentType.CASH}},
      {id: 2, amount: {value: 333, currency: Currency.EUR}, payment: {type: PaymentType.CASH}}
    ]);
  });

  it('Should delete object to class is delete function is called ', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const newIncome1 = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome1);
    const newIncome2 = {amount: {value: 333, currency: Currency.EUR}};
    incomeService.save(newIncome2);

    incomeService.delete(2);

    expect(incomeService.getAll().length).toEqual(1);

    expect(incomeService.getAll()).toEqual([
      {id: 1, amount: {value: 222, currency: Currency.EUR}, payment: {type: PaymentType.CASH}}
    ]);
  });

  it('Should update object to class if update function is called', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const newIncome = {amount: {value: 222, currency: Currency.EUR}};
    const saved = incomeService.save(newIncome);
    saved.amount.value = 150;
    incomeService.update(saved);
    expect(incomeService.getAll()).toEqual([{id: 1, amount: {value: 150, currency: Currency.EUR}, payment: {type: PaymentType.CASH}}]);
  });

  it('Should get right  object when get by id function  is called', () => {
    incomeService = new IncomeService(logger, new IncomeRepositoryMock());
    incomeService.clearAll();
    const savedIncome = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(savedIncome);
    expect(incomeService.getByID(savedIncome.id)).toEqual(savedIncome);
  });
});
