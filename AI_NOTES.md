# AI_NOTES.md

This document explains how AI tools were used during development and how LLM integration decisions were made.

---

## 1. LLM Provider and Model Choice

The application uses Groq as the LLM provider.

Model used:
- `openai/gpt-oss-120b`

### Why Groq?

- Cost-effective compared to traditional API providers
- Fast inference
- Open-weight model support
- Suitable for structured text tasks such as summarization and tagging

The model chosen is more than sufficient for:
- Text cleaning
- Summarization
- Key point extraction
- Category tagging

For this assignment, accuracy consistency and predictable response formatting were prioritized over cutting-edge reasoning capabilities.

---

## 2. How AI Was Used During Development

AI tools were used in the following ways:

- Refining prompt wording for clarity and consistency
- Reviewing API integration patterns
- Debugging environment variable configuration issues
- Improving UI layout structure
- Reviewing backend architecture decisions
- Identifying common error causes (e.g., Mongoose validation, ES module loading order)

AI was not used to blindly generate the entire application. All architectural decisions, validation logic, route structure, and database schema were reviewed and implemented intentionally.

---

## 3. Prompt Design Approach

Each workflow step uses a fixed system prompt to ensure deterministic behavior:

- Clean → normalize text without altering meaning
- Summarize → concise and clear output
- Extract → structured bullet points
- Tag → single short category label

Temperature was kept low (0.3) to ensure stable outputs suitable for workflow chaining.

---

## 4. What Was Verified Manually

The following aspects were tested and verified manually:

- Workflow validation (2–4 steps only)
- Step sequencing logic (output chaining)
- MongoDB persistence
- Run history ordering (latest 5 only)
- Health check endpoint validation
- Frontend-backend integration flow

---

## 5. Limitations

- No advanced prompt templating
- No dynamic user-defined prompts
- No LLM response schema enforcement
- No streaming responses

The implementation focuses on simplicity, clarity, and meeting assignment requirements.

---

## 6. Overall Philosophy

The goal was to:

- Build a minimal but clean architecture
- Avoid unnecessary feature creep
- Keep the system modular and readable
- Demonstrate practical LLM integration in a structured workflow system
