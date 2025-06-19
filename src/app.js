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

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));

import authRoutes from "./Routes/auth.route";
app.use("/api/v1/user", authRoutes);

export { app };
