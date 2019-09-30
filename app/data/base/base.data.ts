export interface BaseData<T> {
    getAll(): Promise<T[]>;
    getAllById(id:string):Promise<T>;
    add(item: T):Promise<T>;
}