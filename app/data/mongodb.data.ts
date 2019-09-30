import { Collection, Db } from "mongodb";
import { BaseData } from './base/base.data';
import { ModelFuncs } from './utils/model.funcs.base';

export class MongoDbData<T> implements BaseData<T>{
    db: Db;       
    collection: Collection;
    modelFuncs: ModelFuncs<T>;

    constructor(db: Db, Klass:Function, modelFuncs: ModelFuncs<T>){
        this.db = db;
        const collectionName = this.getCollectionName(Klass);
        this.collection = this.db.collection(collectionName);
        this.modelFuncs = modelFuncs;
    }
    getAll(): Promise<T[]>{
        return this.collection
        .find()
        .toArray()
        .then(models => {
            return models.map(model => this.modelFuncs.fromModel(model));
        });
    }
    
    getAllById(id:string):Promise<T>{
        return this.collection.findOne({_id:id})
        .then(model => this.modelFuncs.fromModel(model));
    }
    add(item: T):Promise<T>{
        return this.collection.insertOne(item)
        .then(result => {
            return item;
        });
    }
    

    private getCollectionName(Klass: Function): string{
        const klassName = Klass.prototype.constructor.name;
        return (klassName).toLowerCase() + "s"; 
    }
}