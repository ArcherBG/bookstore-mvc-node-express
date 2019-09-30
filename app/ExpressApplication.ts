import * as express from "express";

import { Book } from "./models/book.model";
import { BaseData } from "./data/base/base.data";
import { Application } from "./base/application";
import { BaseRoute } from "./routes/base/base.route";

export class ExpressApplication implements Application {
 
  app: express.Application;

  constructor() {
    this.app = express();
  }

  start(port: number | string) {
    port = +port; // if it is string parse to number
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve();
      });
    });
  }

  public addRoute(route: BaseRoute) {
    let router = route.getRouter();
    this.app.use(router);
  }

  set(key: string, value: any) {
   this.app.set(key, value);
  }

  useMiddleware(middleware: any) {
    this.app.use(middleware);
  }
}
