const port:number = 3000;
const connectionString:string = "mongodb://localhost/books-db";
const dbConnectionObject = {
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "root",
    database: "warehouse"
  };

export {
    port,
    connectionString,
    dbConnectionObject
};