import { useEffect, useState } from "react";
import {
  fetchWorkflows,
  createWorkflow,
  runWorkflow,
} from "../services/api";

export default function Home() {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);

  const [name, setName] = useState("");
  const [steps, setSteps] = useState([]);

  const stepOptions = ["clean", "summarize", "extract", "tag"];

  useEffect(() => {
    loadWorkflows();
  }, []);

  async function loadWorkflows() {
    const data = await fetchWorkflows();
    setWorkflows(data);
  }

  async function handleCreateWorkflow(e) {
    e.preventDefault();

    if (steps.length < 2 || steps.length > 4) {
      alert("Workflow must have 2–4 steps");
      return;
    }

    await createWorkflow({ name, steps });
    setName("");
    setSteps([]);
    loadWorkflows();
  }

  async function handleRunWorkflow() {
    if (!selectedWorkflow || !inputText) {
      alert("Select workflow and enter text");
      return;
    }

    const data = await runWorkflow({
      workflowId: selectedWorkflow,
      inputText,
    });

    setResults(data.stepOutputs || []);
  }

  function toggleStep(step) {
    if (steps.includes(step)) {
      setSteps(steps.filter((s) => s !== step));
    } else {
      if (steps.length < 4) {
        setSteps([...steps, step]);
      }
    }
  }

  return (
    <div className="space-y-10">

      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Workflow Builder Lite
        </h1>
        <p className="text-gray-500 mt-2">
          Create and execute simple LLM-powered workflows.
        </p>
      </div>

      {/* Create Workflow */}
      <form
        onSubmit={handleCreateWorkflow}
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Create Workflow
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Workflow Name
          </label>
          <input
            type="text"
            placeholder="e.g. Blog Processor"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Steps (2–4)
          </label>

          <div className="grid grid-cols-2 gap-3">
            {stepOptions.map((step) => (
              <button
                type="button"
                key={step}
                onClick={() => toggleStep(step)}
                className={`p-3 rounded-lg border transition text-sm capitalize ${
                  steps.includes(step)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg">
          Save Workflow
        </button>
      </form>

      {/* Run Workflow */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Run Workflow
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Workflow
          </label>
          <select
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg"
            value={selectedWorkflow}
            onChange={(e) => setSelectedWorkflow(e.target.value)}
          >
            <option value="">Choose workflow</option>
            {workflows.map((wf) => (
              <option key={wf._id} value={wf._id}>
                {wf.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Input Text
          </label>
          <textarea
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none p-3 rounded-lg"
            rows="4"
            placeholder="Enter text to process..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <button
          onClick={handleRunWorkflow}
          className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg"
        >
          Run Workflow
        </button>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Results
            </h3>

            {results.map((r, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg"
              >
                <h4 className="font-semibold text-blue-600 capitalize mb-2">
                  Step {index + 1} – {r.step}
                </h4>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {r.output}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
