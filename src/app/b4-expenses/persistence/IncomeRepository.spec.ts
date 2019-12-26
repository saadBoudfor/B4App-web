import {IncomeRepository} from './IncomeRepository';
import {Currency} from '../models/Currency';
import {Income} from '../models/Income';
import {LocalStorageKeys} from '../constants/LocalStorageKeys';
import {ErrorCode} from '../constants/ErrorCode';
import {ErrorUtils} from '../utils/ErrorUtils';

let incomeRepository: IncomeRepository;

describe('IncomeRepository testing income persistence functions', () => {
  beforeEach(() => {
    incomeRepository = new IncomeRepository();
    incomeRepository.clearAll();
  });

  it('should save in localstorage if save function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    expect(JSON.parse(localStorage.getItem(LocalStorageKeys.INCOMES))).toEqual([income]);
  });

  it('should delete from localstorage if delete function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    incomeRepository.delete(income.id);
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).toEqual('[]');
  });

  it('should update in localstorage if update function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    income.amount.value = 333;
    expect(JSON.parse(localStorage.getItem(LocalStorageKeys.INCOMES))).not.toEqual([income]);
    incomeRepository.update(income);
    expect(JSON.parse(localStorage.getItem(LocalStorageKeys.INCOMES))).toEqual([income]);
  });

  it('should clear  localstorage if clearAll function called', () => {
    incomeRepository.clearAll();
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).toEqual('[]');
  });

  it('should get in localstorage if getByID function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    expect(incomeRepository.getByID(income.id)).toEqual(income);
  });

  it('should throw error if id is not provided', () => {
    const incomeWithoutID = {amount: {value: 222, currency: Currency.EUR}};
    expect(() => incomeRepository.save(incomeWithoutID))
      .toThrow(ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'save', IncomeRepository.name));
    expect(() => incomeRepository.delete(null))
      .toThrow(ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'delete', IncomeRepository.name));
    expect(() => incomeRepository.update(incomeWithoutID))
      .toThrow(ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'update', IncomeRepository.name));
    expect(() => incomeRepository.getByID(null))
      .toThrow(ErrorUtils.getError(ErrorCode.ID_NOT_FOUND, 'getByID', IncomeRepository.name));
  });
});
