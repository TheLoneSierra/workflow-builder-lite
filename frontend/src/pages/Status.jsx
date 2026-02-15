import { useEffect, useState } from "react";
import { fetchHealth } from "../services/api";

export default function Status() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    const data = await fetchHealth();
    setStatus(data);
  }

  function StatusItem({ label, value }) {
    const isOk = value === "ok";

    return (
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow border border-gray-100">
        <span className="font-medium text-gray-700">{label}</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isOk
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value?.toUpperCase()}
        </span>
      </div>
    );
  }

  if (!status) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          System Status
        </h1>
        <p className="text-gray-500 mt-2">
          Backend, database and LLM health check.
        </p>
      </div>

      <StatusItem label="Backend" value={status.backend} />
      <StatusItem label="Database" value={status.database} />
      <StatusItem label="LLM" value={status.llm} />
    </div>
  );
}
