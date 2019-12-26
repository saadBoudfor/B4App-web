/**
 *  Crud operation
 */
export interface CrudService<T, H> {
  getAll(): T[];

  getByID(id: H): T;

  save(data: T): T;

  delete(data: H): T[];

  update(data: T): T;

  clearAll();
}
