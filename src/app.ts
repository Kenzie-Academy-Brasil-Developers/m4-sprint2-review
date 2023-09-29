import "dotenv/config";
import express from "express";
import { connectDatabase, createTables } from "./database";
import { booksRoutes } from "./routes/books.routes";

const app = express();

app.use(express.json());

app.use("/books", booksRoutes);

const port = 3000;

app.listen(port, async () => {
    console.log(`API sucessfully started at port ${port}`);
    await connectDatabase();
    await createTables();
})