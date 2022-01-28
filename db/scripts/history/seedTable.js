import { query } from "../../connection.js";
import music from "../../../data.js";

async function seedTable() {
  for (let i = 0; i < music.length; i++) {
    let res = await query(
      `INSERT INTO streamingHistory (endtime, artist, track) VALUES ($1,$2,$3)`,
      [music[i].endTime, music[i].artistName, music[i].trackName]
    );
    console.log("seeded table", res);
  }
}

seedTable();
