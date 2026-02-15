import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    steps: [
      {
        type: String,
        enum: ["clean", "summarize", "extract", "tag"],
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Custom validation for step count
workflowSchema.pre("save", function () {
  if (this.steps.length < 2 || this.steps.length > 4) {
    throw new Error("Workflow must contain between 2 and 4 steps.");
  }
});

const Workflow = mongoose.model("Workflow", workflowSchema);

export default Workflow;
