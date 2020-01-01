import {IncomeService} from './IncomeService';
import {incomeRepositoryMock, loggerMock} from '../../common/utils/testUtils/mocks/Mock';
import {IncomeData} from '../../common/utils/testUtils/data/IncomeData';
import {PaymentType} from '../models/PaymentType';

let incomeService: IncomeService;
let logger;
let incomeRepository;

describe('Income service: testing curd operation on ', () => {
  beforeEach(() => {
    logger = loggerMock(jasmine);
    incomeRepository = incomeRepositoryMock(jasmine);
    incomeService = new IncomeService(logger, incomeRepository);
  });
  /**
   * I. testing IncomeService#delete:
   *  - should warning log income's id.
   *  - should call incomePersistence#delete with the right id.
   */
  it('should warning log income\'s id', () => {
    // given:
    incomeService.delete(0);
    // when-then:
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  it('should call incomePersistence#delete with the right id', () => {
    // given:
    incomeService.delete(0);
    // when-then:
    expect(incomeRepository.delete).toHaveBeenCalledWith(0);
    expect(incomeRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should call incomePersistence#getByID with the right id', () => {
    // given:
    incomeService.getByID(1);
    // when-then:
    expect(incomeRepository.getByID).toHaveBeenCalledTimes(1);
    expect(incomeRepository.getByID).toHaveBeenCalledWith(1);
  });

  it('should call incomePersistence#getAll', () => {
    // given:
    incomeService.getAll();
    // when-then:
    expect(incomeRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should call incomePersistence#update with the right income', () => {
    // given:
    const income = IncomeData.validIncome();
    // when:
    incomeService.update(income);
    // then:
    expect(incomeRepository.update).toHaveBeenCalledTimes(1);
    expect(incomeRepository.update).toHaveBeenCalledWith(income);
  });

  it('should call incomePersistence#save with the right income', () => {
    // given:
    const income = IncomeData.validIncome();
    // when:
    incomeService.save(income);
    // then:
    expect(incomeRepository.save).toHaveBeenCalledTimes(1);
    expect(incomeRepository.save).toHaveBeenCalledWith(income);
  });

  it('should log debug with income to save', () => {
    // given:
    const income = IncomeData.validIncome();
    // when:
    incomeService.save(income);
    // then:
    expect(logger.debug).toHaveBeenCalledTimes(1);
    expect(logger.debug).toHaveBeenCalled();
  });

  it('should set default payment type before save', () => {
    // given:
    const income = IncomeData.validIncome();
    // when:
    expect(income.payment).toBeUndefined();

    incomeService.save(income);
    // then:
    expect(income.payment.type).toEqual(PaymentType.CASH);
  });
});
