import { useEffect, useState } from "react";
import { fetchRuns } from "../services/api";

export default function History() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    loadRuns();
  }, []);

  async function loadRuns() {
    const data = await fetchRuns();
    setRuns(data);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Run History
        </h1>
        <p className="text-gray-500 mt-2">
          Last 5 workflow executions.
        </p>
      </div>

      {runs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p className="text-gray-500">No runs yet.</p>
        </div>
      ) : (
        runs.map((run) => (
          <div
            key={run._id}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-blue-600">
                {run.workflowName}
              </h2>
              <span className="text-sm text-gray-400">
                {new Date(run.createdAt).toLocaleString()}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Input
              </h3>
              <p className="bg-gray-50 p-3 rounded border border-gray-200 text-gray-700 whitespace-pre-wrap">
                {run.inputText}
              </p>
            </div>

            <div className="space-y-3">
              {run.stepOutputs.map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg"
                >
                  <h4 className="font-semibold text-gray-700 capitalize mb-2">
                    Step {index + 1} – {step.step}
                  </h4>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {step.output}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
