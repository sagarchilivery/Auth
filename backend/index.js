import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import { router as userRoutes } from "./routes/userRoutes.js";

let app = express();
let DB = process.env.DB_URI;
let port = process.env.PORT;

app.use(express.json());

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
