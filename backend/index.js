import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router as userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


let app = express();
let DB = process.env.DB_URI;
let port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Routes
app.use("/api/auth", userRoutes);

mongoose
  .connect(DB, { dbName: "Auth" })
  .then(() => {
    console.log("DB connected");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started ${port}`);
    });
  });
