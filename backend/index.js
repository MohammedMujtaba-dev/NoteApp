import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ConnectDB from "./database/db.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.listen(PORT, () => {
  ConnectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
