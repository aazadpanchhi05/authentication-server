import express from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (_, res) => {
  res.send("app is running..");
});

app.use("/**", (_, res) => {
  res.status(400).json({
    message: "Request API Not Found",
    status: 400,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}..`);
});
