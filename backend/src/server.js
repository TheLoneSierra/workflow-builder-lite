import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import workflowRoutes from "./routes/workflowRoutes.js";
import runRoutes from "./routes/runRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/workflows", workflowRoutes);
app.use("/api/runs", runRoutes);
app.use("/api/health", healthRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Workflow Builder API running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
