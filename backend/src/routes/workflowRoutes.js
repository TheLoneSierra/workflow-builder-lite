import express from "express";
import Workflow from "../models/Workflow.js";

const router = express.Router();

// Create workflow
router.post("/", async (req, res) => {
  try {
    const { name, steps } = req.body;

    if (!name || !steps) {
      return res.status(400).json({ message: "Name and steps are required." });
    }

    const workflow = await Workflow.create({ name, steps });

    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all workflows
router.get("/", async (req, res) => {
  try {
    const workflows = await Workflow.find().sort({ createdAt: -1 });
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
