import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const connection = await mysql.createConnection({
      host: "borrow-db",
      user: "root",
      password: "1234",
      database: "borrow-db",
    });

    const [rows] = await connection.execute<mysql.RowDataPacket[]>("SELECT * FROM users");
    await connection.end();

    if (rows.length === 0) {
      res.status(404).json({ message: "No data found" });
    } else {
      res.status(200).json({ message: (rows[0] as { message: string }).message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}