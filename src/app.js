import express from "express";
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

import authRoutes from "./Routes/auth.route.js";
app.use("/api/v1/user", authRoutes);

export { app };
