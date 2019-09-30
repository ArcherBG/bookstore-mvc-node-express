import { connectionString, port } from "./app/config";
import { DbConfig } from "./app/db";
import { BaseData } from "./app/data/base/base.data";
import { MongoDbData } from "./app/data/mongodb.data";
import { Book } from "./app/models/book.model";
import { Application } from "./app/base/application";
import { ExpressApplication } from "./app/ExpressApplication";
import { BooksRoute } from "./app/routes/book.route";
import { BaseController } from './app/controllers/base/base.controller';
import { BooksController } from './app/controllers/books.controller';
import * as path from "path";
import * as bodyParser from "body-parser";
import { Author } from './app/models/author.model';
import { AuthorsController } from "./app/controllers/authors.controller";
import { AuthorsRoute } from './app/routes/authors.route';

let db;
let booksData: BaseData<Book>;
let authorsData: BaseData<Author>;

let app: Application;
let booksController: BaseController<Book>;
let authorsController: BaseController<Author>;

DbConfig.initMongoDb(connectionString)
  // init
  .then(dbInstance => {
    db = dbInstance;
    booksData = new MongoDbData<Book>(db, Book, Book);
    authorsData = new MongoDbData<Author>(db, Author, Author);
    app = new ExpressApplication();
  })
  // add view engine
  .then(() => {
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "app", "views"));
  })

  //TODO  add authentication

  // add middlewares
  .then(()=> {
    app.useMiddleware(bodyParser.json());
    app.useMiddleware(bodyParser.urlencoded({extended:true}))
  })

  //init controller 
  .then(() => {
    booksController = new BooksController(booksData);
    authorsController = new AuthorsController(authorsData);
  })

  // add routes
  .then(() => {
    let booksRoute = new BooksRoute(booksController);
    app.addRoute(booksRoute);
    let authorsRoute = new AuthorsRoute(authorsController);
    app.addRoute(authorsRoute);
  })

  // Start application
  .then(() => {
    return app.start(port);
  })
  .then(() => {
    console.log(`Server running at: ${port} `);
  });
