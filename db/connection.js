import pg from "pg";
import { creds } from "../config.js";
import "dotenv/config";
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
