import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { getAllHistory, getSongById, getSongByArtist } from "./models/app.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/** DO NOT CHANGE THIS ROUTE - it serves our front-end */
app.get("/", function (req, res, next) {
  res.render("index", { title: "Books" });
});

app.get("/all", async (req, res) => {
  const all = await getAllHistory();
  res.json({ success: true, message: "All Requests", payload: all });
});

app.get("/all/:id", async function (req, res, next) {
  console.log(req.params.id);
  const history = await getSongById(req.params.id);
  res.json({ success: "true", payload: history });
});

app.get("/artist", async function (req, res, next) {
  console.log(req.query.name);
  const name = req.query.name;
  const history = await getSongByArtist(name.toLowerCase());
  res.json({ success: "true", payload: history });
});

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});

export default app;
