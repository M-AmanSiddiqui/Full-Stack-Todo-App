import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import conn from "./connection/conn.js";
import auth from "./routes/auth.js";
import list from "./routes/list.js";

// ✅ Load .env
dotenv.config();

// ✅ MongoDB connect
conn();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ __dirname fix (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// ✅ Serve frontend build (dist folder after vite build)
app.use(express.static(path.resolve(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/frontenddist/index.html"));
});

// ✅ Export app for vercel
export default app;

// ✅ Local run ke liye (sirf jab node se run karo, vercel me nahi)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 1000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
