import { Request, Response } from "express";
import { BaseController } from "./base/base.controller";
import { Book } from "../models/book.model";
import { BaseData } from "../data/base/base.data";

export class BooksController implements BaseController<Book> {
  data: BaseData<Book>;

  constructor(data: BaseData<Book>){
    this.data = data;
  }

  getAll(req: Request, res: Response) {
    this.data.getAll()
    .then((books: Book[]) => {
        const model = {
            model : books
        };
      return res.render("books/books-all", model);
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
    return res.render("books/book-add");
  }
}