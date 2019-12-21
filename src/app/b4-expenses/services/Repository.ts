export interface Repository<T, H> {
  getAll(): T[];

  getByID(id: H): T;

  saveData(data: T): T;

  deleteData(data: H): T[];

  updateData(data: T): T;
}
