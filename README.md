# Workflow Builder Lite

Workflow Builder Lite is a simple web application that allows users to create and execute LLM-powered text workflows.

The app enables users to:
- Create a workflow with 2–4 processing steps
- Run the workflow on input text
- View output of each step
- View the last 5 workflow runs
- Check backend, database, and LLM health status

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Groq API (LLM provider)

### LLM Model
- `openai/gpt-oss-120b` via Groq

---

## 🧠 Workflow Steps Supported

- Clean Text
- Summarize
- Extract Key Points
- Tag Category

Each step runs sequentially, passing the output of the previous step as input to the next.

---

## 🩺 Health Check

The `/status` page checks:
- Backend availability
- Database connection
- LLM connection

---

## 📦 How to Run Locally

### 1. Clone Repository
### 2. Backend Setup
### 3. Run backend
### 4. Frontend Setup

## 🧾 What Is Done

- Workflow creation (2–4 steps)
- Workflow execution
- Run history (last 5 runs)
- System health endpoint
- Persistent storage using MongoDB Atlas
- Hosted-ready architecture

---

## ❗ What Is Not Included

- Authentication
- Workflow editing/deletion
- Advanced validation
- Drag-and-drop workflow builder
- Production deployment configuration (can be added)

---

## 🌍 Hosting

Backend can be deployed to:
- Render / Railway

Frontend can be deployed to:
- Vercel

MongoDB Atlas used for cloud database.

---

## 👤 Author

Aanchal Pal
