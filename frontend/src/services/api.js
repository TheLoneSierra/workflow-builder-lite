const BASE_URL = "http://localhost:5000/api";

export async function fetchWorkflows() {
  const res = await fetch(`${BASE_URL}/workflows`);
  return res.json();
}

export async function createWorkflow(data) {
  const res = await fetch(`${BASE_URL}/workflows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function runWorkflow(data) {
  const res = await fetch(`${BASE_URL}/runs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function fetchRuns() {
  const res = await fetch(`${BASE_URL}/runs`);
  return res.json();
}

export async function fetchHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}
