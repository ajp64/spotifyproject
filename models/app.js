import { query } from "../db/connection.js";

export async function getAllHistory() {
  const result = await query(`SELECT * FROM streamingHistory;`);
  return result.rows;
}

export async function getSongById(id) {
  const result = await query(`SELECT * FROM streamingHistory WHERE id=$1`, [
    id,
  ]);
  return result.rows;
}

export async function getSongByArtist(artist) {
  const result = await query(
    `SELECT * FROM streamingHistory WHERE LOWER(artist)=$1`,
    [artist]
  );
  return result.rows;
}
