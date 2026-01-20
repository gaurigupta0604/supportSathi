import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/database.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "SupportSathi backend running",
    time: new Date().toISOString()
  });
});

// Emergency API
app.post("/emergency", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  db.prepare(
    "INSERT INTO emergencies (message) VALUES (?)"
  ).run(message);

  res.json({ success: true });
});

// Fetch all emergencies
app.get("/emergencies", (req, res) => {
  const rows = db
    .prepare("SELECT * FROM emergencies ORDER BY created_at DESC")
    .all();

  res.json(rows);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
