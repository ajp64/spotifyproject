import express from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import { getAllHistory, getSongById, getSongByArtist } from "./models/app.js";

// import {
//   routeAll,
//   routeByID,
//   routeByArtist,
//   routeReact,
// } from "./routes/users.js";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/", function (req, res, next) {
  res.render("index", { title: "Books" });
});

app.get("/history", async function (req, res, next) {
  const history = await getAllHistory();
  res.json({ success: "true", payload: history });
});

app.get("/history/:id", async function (req, res, next) {
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

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/public/", "index.html"));
// });

// app.use("/", routeReact);
// app.use("/history", routeByArtist);
// app.use("/history", routeAll);
// app.use("/history", routeByID);

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
