import pg from "pg";
import { creds } from "../config.js";
import "dotenv/config";

const pool = new pg.Pool({
  user: creds.user,
  host: creds.host,
  database: creds.database,
  password: creds.password,
  port: creds.port,
  ssl: { rejectUnauthorized: false },
  // connectionString: creds.database, //|| 'postgresql://postgres:<your admin password>@localhost:5432/<your db name>',
  // ssl: creds.database ? true : false,
});

export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
