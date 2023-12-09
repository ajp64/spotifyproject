import pg from "pg";
import { creds } from "../config.js";
import "dotenv/config";
const connectionString = process.env.DB_STRING;

const pool = new pg.Pool({
  connectionString,
  ssl: false,
});

export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
