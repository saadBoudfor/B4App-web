import {IncomeRepository} from './IncomeRepository';
import {Currency} from '../models/Currency';
import {Income} from '../models/Income';
import {LocalStorageKeyStore} from '../configuration/LocalStorageKeyStore';

let incomeRepository: IncomeRepository;

describe('IncomeRepository testing income persistence functions', () => {
  beforeEach(() => {
    incomeRepository = new IncomeRepository();
    incomeRepository.clearAll();
  });

  it('should save in localstorage if save function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    expect(JSON.parse(localStorage.getItem(LocalStorageKeyStore.INCOMES))).toEqual([income]);
  });

  it('should delete from localstorage if delete function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    incomeRepository.delete(income.id);
    expect(localStorage.getItem(LocalStorageKeyStore.INCOMES)).toEqual('[]');
  });

  it('should update in localstorage if update function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    income.amount.value = 333;
    expect(JSON.parse(localStorage.getItem(LocalStorageKeyStore.INCOMES))).not.toEqual([income]);
    incomeRepository.update(income);
    expect(JSON.parse(localStorage.getItem(LocalStorageKeyStore.INCOMES))).toEqual([income]);
  });

  it('should clear  localstorage if clearAll function called', () => {
    incomeRepository.clearAll();
    expect(localStorage.getItem(LocalStorageKeyStore.INCOMES)).toEqual('[]');
  });

  it('should get in localstorage if getByID function called', () => {
    const income: Income = {id: 1, amount: {value: 222, currency: Currency.EUR}};
    incomeRepository.save(income);
    expect(incomeRepository.getByID(income.id)).toEqual(income);
  });
});
