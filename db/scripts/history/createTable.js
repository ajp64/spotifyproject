import { query } from "../../connection.js";

const table = `CREATE TABLE IF NOT EXISTS streamingHistory (id SERIAL PRIMARY KEY, endtime TIMESTAMP, artist TEXT, track TEXT);`;

async function createTable() {
  const res = await query(table);
  console.log("created table", res);
}

createTable();
