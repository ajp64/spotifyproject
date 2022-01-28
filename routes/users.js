import express from "express";
const router = express.Router();
import { getAllHistory, getSongById, getSongByArtist } from "../models/app.js";

/* GET users listing. */

export const routeReact = router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

export const routeAll = router.get("/", async function (req, res, next) {
  const history = await getAllHistory();
  res.json({ success: "true", payload: history });
});

export const routeByID = router.get("/id/:id", async function (req, res, next) {
  console.log(req.params.id);
  const history = await getSongById(req.params.id);
  res.json({ success: "true", payload: history });
});

export const routeByArtist = router.get(
  "/artist",
  async function (req, res, next) {
    console.log(req.query.name);
    const name = req.query.name;
    const history = await getSongByArtist(name.toLowerCase());
    res.json({ success: "true", payload: history });
  }
);
