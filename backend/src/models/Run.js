import mongoose from "mongoose";

const runSchema = new mongoose.Schema(
  {
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },
    workflowName: {
      type: String,
      required: true,
    },
    workflowSteps: [
      {
        type: String,
        enum: ["clean", "summarize", "extract", "tag"],
      },
    ],
    inputText: {
      type: String,
      required: true,
    },
    stepOutputs: [
      {
        step: String,
        output: String,
      },
    ],
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

export default Run;
