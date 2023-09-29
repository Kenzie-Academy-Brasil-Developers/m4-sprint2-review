import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";

export const isBookIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const query = format(`SELECT * FROM books WHERE id = %L;`, req.params.id);
    
    const data = await client.query(query);

    if(!data.rows[0]){
        return res.status(404).json({ message: "Book not found."});
    }

    res.locals.book = data.rows[0];

    next();
}