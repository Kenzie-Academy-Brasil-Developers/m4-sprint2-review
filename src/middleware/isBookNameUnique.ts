import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";

export const isBookNameUnique = async (req: Request, res: Response, next: NextFunction) => {
    const query = format(`SELECT * FROM books WHERE title = %L;`, req.body.title);

    const data = await client.query(query);

    if(data.rows[0]){
        return res.status(403).json({ message: "This books is already registered."});
    }

    next();
}