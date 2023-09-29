import { NextFunction, Request, Response } from "express";
import { dbQuery } from "../utils/dbQuery";

export const isBookNameUnique = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const data = await dbQuery(`SELECT * FROM books WHERE title = %L;`, [req.body.title]);

   if (data.rows[0]) {
      return res.status(403).json({ message: "This books is already registered." });
   }

   next();
};
