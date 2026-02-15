import express from "express";
import mongoose from "mongoose";
import { executeStep } from "../services/llmService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const status = {
    backend: "ok",
    database: "ok",
    llm: "ok",
  };

  try {
    if (mongoose.connection.readyState !== 1) {
      status.database = "failed";
    }

    await executeStep("summarize", "Health check test");
  } catch (error) {
    status.llm = "failed";
  }

  res.json(status);
});

export default router;
