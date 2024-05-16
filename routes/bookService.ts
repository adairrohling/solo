import { pool } from "../lib/bdpg";
//tirar pasta route, próxima versao
import { Request, Response, Router } from "express";
import { z } from "zod";
const AuthorSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1)
});

// extract the inferred type like this
type Author = z.infer<typeof AuthorSchema>;

const Book = z.object({
  title: z.string(),
  author: z.array(AuthorSchema)
});


export async function allBooks(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const response = await client.query(`select * from books`);
    res.send(response.rows);
  } catch (error) {
    console.error("Erro durante a Busca:", error);
    return res.status(500).json({ error });
  } finally {
    client.release();
  }
}