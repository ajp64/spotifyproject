import pg from "pg";
import { creds } from "../config.js";
import "dotenv/config";
const connectionString =
  "postgres://wcpgpbnyvagioy:a0dcbd49eea1193c1ccd8e28d7360bbbc7110360ebcbaa0fa2858c74d2c0d4e2@ec2-54-220-243-77.eu-west-1.compute.amazonaws.com:5432/da6m34tf5d8bar";

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
