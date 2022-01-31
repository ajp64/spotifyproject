import pg from "pg";
import { creds } from "../config.js";
import "dotenv/config";
const connectionString = creds.string;

const pool = new pg.Pool({
  // user: creds.user,
  // host: creds.host,
  // database: creds.database,
  // password: creds.password,
  // port: creds.port,
  connectionString,
  ssl: { rejectUnauthorized: false },
  // connectionString: creds.database, //|| 'postgresql://postgres:<your admin password>@localhost:5432/<your db name>',
  // ssl: creds.database ? true : false,
});

export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
