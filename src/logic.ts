import { Request, Response } from "express";
import { IBook } from "./interface";
import { dbQuery } from "./utils/dbQuery";

export const getOneBook = async (req: Request, res: Response): Promise<Response> => {
   return res.status(200).json(res.locals.book);
};

export const getBooks = async (req: Request, res: Response): Promise<Response> => {
   let query = `SELECT * FROM books;`;
   let variables = [];

   if (req.query.category) {
      query = `SELECT * FROM books WHERE category ILIKE %L;`;
      variables.push(req.query.category);
   }

   const data = await dbQuery(query, variables);

   return res.status(200).json({ count: data.rowCount, books: data.rows });
};

export const createBook = async (req: Request, res: Response): Promise<Response> => {
   /* const queryString = `INSERT INTO books (title, bio, category, createdat, updatedat)
   VALUES ($1, $2, $3, $4, $5)` */

   const date = new Date();

   const newBook: Omit<IBook, "id"> = {
      title: req.body.title,
      bio: req.body.bio,
      category: req.body.category,
      createdat: date,
      updatedat: date,
   };

   const data = await dbQuery(`INSERT INTO books (%I) VALUES (%L) RETURNING *;`, [
      Object.keys(newBook),
      Object.values(newBook),
   ]);

   return res.status(201).json(data.rows[0]);
};

export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
   await dbQuery(`DELETE FROM books WHERE id = %L;`, [req.params.id]);

   return res.status(204).json();
};

export const updateBook = async (req: Request, res: Response): Promise<Response> => {
   const date = new Date();

   const updatedData: Omit<IBook, "id"> = {
      title: req.body.title,
      bio: req.body.bio,
      category: req.body.category,
      createdat: res.locals.book.createdat,
      updatedat: date,
   };

   const data = await dbQuery(
      `UPDATE books SET (%I) = ROW (%L) WHERE id = %L RETURNING *;`,
      [Object.keys(updatedData), Object.values(updatedData), req.params.id]
   );

   return res.status(200).json(data.rows[0]);
};
