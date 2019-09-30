import { Request, Response } from "express";
import { BaseController } from "./base/base.controller";
import { Author } from "../models/author.model";
import { BaseData } from "../data/base/base.data";

export class AuthorsController implements BaseController<Author> {
  data: BaseData<Author>;

  constructor(data: BaseData<Author>){
    this.data = data;
  }

  getAll(req: Request, res: Response) {
    this.data.getAll()
    .then((authors: Author[]) => {
        const model = {
            model : authors
        };
      return res.render("authors/authors-all", model);
    });
  }

  getById(req: any, res: any) {
    throw new Error("Method not implemented.");
  }

  add(req: any, res: any) {
   let body = req.body;
   this.data.add(body)
   .then(book => {
     res.redirect("/");
   })
  }

  getForm(req: Request, res: Response) {
    return res.render("authors/author-add");
  }
}