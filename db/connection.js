import pg from "pg";
import "dotenv/config";
const connectionString = process.env.DB_STRING;

const pool = new pg.Pool({
  connectionString: process.env.DB_STRING,
  ssl: true,
});

export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
