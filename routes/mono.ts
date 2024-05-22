import { pool } from "../lib/bdpg";
import { Request, Response, Router } from "express";

export async function saveMonography2(req: Request, res: Response) {
  const client = await pool.connect();
  const book = req.body;
  console.log(book);
  const reader = JSON.stringify(book.author);
 
  try {
    const response = await client.query(
      `insert INTO monographs2 (title, author) VALUES ('${book.title}','${reader}' ) RETURNING *`,
    );
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error});
  } finally {
    client.release();
  }
}
export const listMonography2 = async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const products = await client.query(`select * from monographs2`)
      if (products.rowCount === 0) {
        return res.status(404).json({ message: "não encontrado" });
      }
      return res.status(200).json(products.rows);
    }catch(error){
      console.log(error)
    }finally{
      client.release;
    }
  }
  export async function saveAuthor2(req: Request, res: Response) {
    const client = await pool.connect();
    const reader = req.body;
    console.log(reader);
    const phone = JSON.stringify(reader.address);

    try {
      const response = await client.query(
        `insert INTO authors2 (name, address) VALUES ('${reader.name}', '${phone}' ) RETURNING *`,
      );
      console.log(response.rows[0]);
      res.status(201).json(response.rows[0]);
    } catch (error) {
      res.status(400).json({ message: 'Dados inválidos:', error});
    } finally {
      client.release();
    }
  }
  export const listAuthor2 = async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const categories = await client.query(`select * from authors2`)
      if (categories.rowCount === 0) {
        return res.status(404).json({ message: "não encontrado" });
      }
      return res.status(200).json(categories.rows);
    }catch(error){
      console.log(error)
    }finally{
      client.release;
    }
  }


  