import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import groupRoutes from "./routes/groupRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// API Routes
app.use("/api", userRoutes);
app.use("/api", groupRoutes);
app.use("/api", friendRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
 });
