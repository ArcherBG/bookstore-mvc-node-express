import * as mongodb from "mongodb";

export class DbConfig {
     static initMongoDb(connectionString:string): Promise<mongodb.Db>{
       let promise =  mongodb.connect(connectionString);
       return promise;
     }
}