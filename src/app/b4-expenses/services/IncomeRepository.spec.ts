import {IncomeService} from './IncomeService';
import {Currency} from '../models/Currency';

let incomeService: IncomeService;
describe('Income repository: testing curd operation on ', () => {
  beforeEach(() => {
    const logger = jasmine.createSpyObj(['error', 'info']);
    logger.error.and.callFake(console.error);
    logger.info.and.callFake(console.log);
    incomeService = new IncomeService(logger);
    incomeService.clearAll();
  });
  it('Should add object to class is save function is called', () => {
    const newIncome = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome);
    expect(incomeService.getAll().length).toEqual(1);
    expect(incomeService.getAll()).toEqual([{id: 1, amount: {value: 222, currency: Currency.EUR}}]);
  });

  it('Should add object to class is save function is called and client had already registered incomes', () => {
    const newIncome1 = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome1);
    const newIncome2 = {amount: {value: 333, currency: Currency.EUR}};
    incomeService.save(newIncome2);
    expect(incomeService.getAll().length).toEqual(2);
    expect(incomeService.getAll()).toEqual([
      {id: 1, amount: {value: 222, currency: Currency.EUR}},
      {id: 2, amount: {value: 333, currency: Currency.EUR}}
    ]);
  });

  it('Should delete object to class is delete function is called ', () => {
    const newIncome1 = {amount: {value: 222, currency: Currency.EUR}};
    incomeService.save(newIncome1);
    const newIncome2 = {amount: {value: 333, currency: Currency.EUR}};
    incomeService.save(newIncome2);

    incomeService.delete(2);
    expect(incomeService.getAll().length).toEqual(1);

    expect(incomeService.getAll()).toEqual([
      {id: 1, amount: {value: 222, currency: Currency.EUR}}
    ]);
  });

  it('Should update object to class if update function is called', () => {
    const newIncome = {amount: {value: 222, currency: Currency.EUR}};
    const saved = incomeService.save(newIncome);
    saved.amount.value = 150;
    incomeService.update(saved);
    expect(incomeService.getAll()).toEqual([{id: 1, amount: {value: 150, currency: Currency.EUR}}]);
  });
});
