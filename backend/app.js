import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import "./connection/conn.js"; 
import auth from "./routes/auth.js";
import list from "./routes/list.js";

const app = express();

// dirname handle for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve Vite build (dist folder)
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
