import express from "express";
import Workflow from "../models/Workflow.js";
import Run from "../models/Run.js";
import executeWorkflow from "../services/workflowExecutor.js";

const router = express.Router();

// Execute workflow
router.post("/", async (req, res) => {
  try {
    const { workflowId, inputText } = req.body;

    if (!workflowId || !inputText) {
      return res.status(400).json({ message: "workflowId and inputText are required." });
    }

    const workflow = await Workflow.findById(workflowId);

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found." });
    }

    const stepOutputs = await executeWorkflow(workflow.steps, inputText);

    const run = await Run.create({
      workflowId: workflow._id,
      workflowName: workflow.name,
      workflowSteps: workflow.steps,
      inputText,
      stepOutputs,
    });

    res.status(201).json(run);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get last 5 runs
router.get("/", async (req, res) => {
  try {
    const runs = await Run.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(runs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
