import {IncomeRepository} from './IncomeRepository';
import {IncomeData} from '../../common/utils/testUtils/data/IncomeData';
import {Income} from '../models/Income';
import {IncomeUtils} from '../utils/IncomeUtils';
import {LocalStorageKeys} from '../constants/LocalStorageKeys';
import {ErrorUtils} from '../utils/ErrorUtils';
import {ErrorCode} from '../constants/ErrorCode';


let incomeRepository: IncomeRepository;

describe('IncomeRepository: testing income persistence functions', () => {
  beforeEach(() => {
    incomeRepository = new IncomeRepository();
    incomeRepository.clearAll();
  });

  /**
   * I. testing IncomeRepository#save:
   *  - save only income with id and valid.
   *  - throw error if save fail, with error code and income to save.
   *  - insure that the incomes already saved are not altered when adding new income
   *  - insure to not saving two incomes with the save id.
   */

  it('should save valid income with a new id successfully', () => {
    // given:
    const income: Income = IncomeData.validIncome();
    // when:
    incomeRepository.save(income);
    // then:
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).toEqual(IncomeUtils.toString([income]));
  });

  it('should throw error if try to save new valid income without id', () => {
    // given:
    const income: Income = IncomeData.validIncomeWithoutID();
    // when - then:
    expect(() => incomeRepository.save(income))
      .toThrow(ErrorUtils.getException(ErrorCode.ID_NOT_FOUND, 'save', IncomeRepository.name, IncomeUtils.toString(income)));
  });

  it('should throw error if try to save new valid income with an existing id', () => {
    // given:
    const income: Income = IncomeData.validIncome();
    // when:
    incomeRepository.save(income);
    // then:
    expect(() => incomeRepository.save(income))
      .toThrow(ErrorUtils.getException(ErrorCode.ID_ALREADY_EXIST, 'save', IncomeRepository.name, IncomeUtils.toString(income)));
  });

  it('should throw error if try to save invalid income', () => {
    // given:
    const income: Income = IncomeData.invalidIncome();
    // when - then:
    expect(() => incomeRepository.save(income))
      .toThrow(ErrorUtils.getException(ErrorCode.INVALID_INCOME, 'save', IncomeRepository.name, IncomeUtils.toString(income)));
  });

  it('should save multiple incomes successfully', () => {
    // given:
    const incomes = IncomeData.validIncomeArray(6);
    // when:
    incomes.forEach(income => incomeRepository.save(income));
    // then:
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).not.toBeNull();
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).toEqual(IncomeUtils.toString(incomes));
  });

  it('should insure that the incomes already saved are not altered when adding new income', () => {
    // given:
    const incomes = IncomeData.validIncomeArray(6);
    // when:
    incomes.forEach(income => incomeRepository.save(income));
    const newIncome = IncomeData.validIncome();
    newIncome.id = 22;
    incomeRepository.save(newIncome);
    incomes.push(newIncome);
    // then:
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).not.toBeNull();
    expect(localStorage.getItem(LocalStorageKeys.INCOMES)).toEqual(IncomeUtils.toString(incomes));
  });

  /**
   * II. testing IncomeRepository#getAll:
   *  - should retrieve all object successfully from localStorage.
   */

  it('should retrieve all object successfully from localStorage', () => {
    // given:
    const incomes = IncomeData.validIncomeArray(8);
    // when:
    incomes.forEach(income => incomeRepository.save(income));
    // then:
    expect(incomeRepository.getAll()).not.toBeNull();
    expect(incomeRepository.getAll()).toEqual(incomes);
  });

  /**
   * III. testing IncomeRepository#getByID:
   *  - get stored object.
   *  - get the right object.
   *  - return null if id not found.
   */
  it('should retrieve the right income in database', () => {
    // given:
    const incomes = IncomeData.validIncomeArray(8);
    // when:
    incomes.forEach(income => incomeRepository.save(income));
    // then:
    expect(incomeRepository.getByID(3)).not.toBeNull();
    expect(incomeRepository.getByID(3)).toEqual(incomes[2]);
    expect(incomeRepository.getByID(99)).toBeUndefined();
  });

  /**
   * IV. testing IncomeRepository#delete:
   *  - delete saved object.
   *  - throw error if id not found or id null.
   */
  it('should delete the right object', () => {
    // given:
    const incomes = IncomeData.validIncomeArray(8);
    // when:
    incomes.forEach(income => incomeRepository.save(income));
    incomeRepository.delete(1);
    // then:
    expect(incomeRepository.getAll()).not.toBeNull();
    expect(incomeRepository.getByID(1)).toBeUndefined();
  });

  it('should throw error if id not found', () => {
    // given:
    const incomes = IncomeData.validIncomeArray(8);
    incomes.forEach(income => incomeRepository.save(income));
    // then:
    expect(() => incomeRepository.delete(99))
      .toThrow(ErrorUtils.getException(ErrorCode.INCOME_NOT_FOUND, 'delete', IncomeRepository.name, IncomeUtils.toString(99)));
  });

  it('should throw error if id null', () => {
    // given-when-then:
    expect(() => incomeRepository.delete(null))
      .toThrow(ErrorUtils.getException(ErrorCode.ID_NOT_FOUND, 'delete', IncomeRepository.name));
  });
});
