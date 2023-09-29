import { NextFunction, Request, Response } from "express";
import { dbQuery } from "../utils/dbQuery";

export const isBookIdValid = async (req: Request, res: Response, next: NextFunction) => {
   
    const data = await dbQuery(`SELECT * FROM books WHERE id = %L;`, [req.params.id]);

    if(!data.rows[0]){
        return res.status(404).json({ message: "Book not found."});
    }

    res.locals.book = data.rows[0];

    next();
}