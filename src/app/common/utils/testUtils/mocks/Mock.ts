export function loggerMock(jasmine) {
  const logger = jasmine.createSpyObj(['error', 'info', 'warn', 'debug']);
  logger.error.and.callFake(console.error);
  logger.info.and.callFake(console.log);
  logger.warn.and.callFake(console.log);
  logger.debug.and.callFake(console.log);
  return logger;
}

export function incomeRepositoryMock(jasmine) {
  const incomeRepository = jasmine.createSpyObj(['delete', 'save', 'getAll', 'getByID', 'update']);
  incomeRepository.delete.and.callFake(console.warn);
  incomeRepository.save.and.callFake(console.log);
  incomeRepository.getAll.and.callFake(console.log);
  incomeRepository.update.and.callFake(console.log);
  incomeRepository.getByID.and.callFake(console.log);
  return incomeRepository;
}
