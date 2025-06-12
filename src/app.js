import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

export { app };
