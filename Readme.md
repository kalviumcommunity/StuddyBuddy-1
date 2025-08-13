
# 🎓 Study Buddy – Personalized AI Learning Mentor

**Study Buddy** is a full-stack AI-powered web application built for students. It helps them:
- Generate subject-wise study plans,
- Solve academic doubts using AI,
- Create flashcards and quizzes from topics or notes,
- Ask questions from uploaded PDF notes using RAG.

The application uses Gemini API and Embeddings to power its AI capabilities. **No LangChain** is used — all features are implemented using direct API calls and custom logic (Node.js, Express, MongoDB, FAISS, etc.).

---

## 🧠 Project Objective

To build a **personalized study assistant** that can:

1. **Answer academic questions** like Physics, Chemistry, etc.
2. **Create structured study plans** based on subjects and number of days.
3. **Generate flashcards** (Q&A pairs) for revision.
4. **Generate quizzes (MCQs)** automatically.
5. **Use PDF notes** to answer user queries via custom **RAG** (Retrieval-Augmented Generation).
6. **Do everything via GeminiAI APIs without LangChain**, maintaining full control over logic and output.

---

## ⚙️ AI Concepts Used

This project demonstrates the use of advanced AI techniques in a real-world application:

---

### 📌 1. Prompting

We use **carefully engineered prompts** to guide -AI4’s behavior. These prompts are sent directly to the GeminiAI API based on user intent. Each prompt is custom-formatted for its use case.

#### Example:
- **Study Plan Prompt:**
```text
Create a detailed 7-day study plan for Class 12 Physics and Chemistry. Return as JSON with each day having 2-3 topics.
````

* **Doubt Solving Prompt:**

```text
Explain this concept to a class 12 student: "What is Kirchhoff's Law?"
```

We craft prompts based on user inputs and route types (plan, quiz, flashcards, etc.) to make AI behave like a structured tutor.

---

### 📌 2. Structured Output

To ensure the AI's output can be parsed and used in the frontend easily, we ask AI to return **strictly structured JSON output**. This ensures seamless UI integration and reduces hallucination.

#### Example Prompts:

* **Study Plan:**

```text
Give the study plan in this JSON format:
{
  "Day 1": ["Topic 1", "Topic 2"],
  ...
}
```

* **Flashcards:**

```text
Create 5 flashcards in this JSON format:
[
  {"question": "What is Newton's Second Law?", "answer": "..."},
  ...
]
```

This structured format is parsed in the backend and directly sent to the frontend UI for display.

---

### 📌 3. Function Calling (Manual)

Instead of GeminiAI's built-in "function calling" feature or LangChain, we implement **manual function routing** using simple logic based on request type.

#### Implementation:

* Frontend sends a `type` like:

```json
{ "type": "study-plan", "subject": "Physics", "days": 10 }
```

* Backend routes this to the appropriate custom function:

```js
switch(type) {
  case 'study-plan':
    return generateStudyPlanPrompt(data);
  case 'flashcards':
    return generateFlashcardPrompt(data);
}
```

We **simulate function calling** using manual prompt routing, so we have full control over behavior.

---

### 📌 4. RAG (Retrieval-Augmented Generation)

We implement RAG manually using GeminiAI’s **embedding models** and **FAISS** for vector search.

#### Workflow:

1. 🧾 **Upload PDF** → extract text using `pdf-parse`
2. 🔍 **Generate embeddings** using `text-embedding-3-small`
3. 💾 **Store vectors** using `FAISS` locally
4. ❓ **Ask question** → search top-k relevant chunks
5. 🧠 **Send context + user question** to AI:

```text
Use the following notes to answer the question:
[Top chunks...]
Question: What is the difference between DNA and RNA?
```

This lets the AI "remember" the uploaded notes and answer questions based on them.

---

## 🧰 Stack Overview

| Layer       | Tech                      |
| ----------- | ------------------------- |
| Backend     | Node.js + Express.js      |
| AI Models   | GeminiAI AI + Embeddings |
| PDF Parsing | `pdf-parse`               |
| Vector DB   | FAISS                     |
| Frontend    | React (optional)          |
| Database    | MongoDB Atlas             |
| Auth        | JWT                       |

---

## 🔐 .env Setup

```env
GeminiAI_API_KEY=your_GeminiAI_key
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
VECTOR_STORE_PATH=./vectors
```

---

## 📦 Folder Structure

```
/backend
├── controllers/
├── routes/
├── services/
│   ├── GeminiAIService.js
│   ├── embeddingService.js
│   ├── pdfService.js
├── utils/
├── faiss/
├── server.js
```

---

## 📌 Key Endpoints

| Route                     | Method | Description                      |
| ------------------------- | ------ | -------------------------------- |
| `/api/auth/signup`        | POST   | User registration                |
| `/api/auth/login`         | POST   | Login with JWT                   |
| `/api/ai/study-plan`      | POST   | Generate structured study plan   |
| `/api/ai/flashcards`      | POST   | Create flashcards                |
| `/api/ai/create-quiz`     | POST   | Auto-generate quiz               |
| `/api/pdf/upload`         | POST   | Upload and embed PDF notes       |
| `/api/pdf/ask-from-notes` | POST   | Ask question from embedded notes |

---

## ✅ Project Goals Recap

* ✅ No LangChain or third-party RAG framework
* ✅ Custom prompts for different AI tasks
* ✅ Full control over structured responses
* ✅ Local vector store using FAISS
* ✅ PDF-based AI question answering

---

## 📜 License

MIT – Free to use, improve and contribute!

---

## 👋 Author

**Study Buddy AI**
Built with ❤️ for students who want to study smarter, not harder.

```

---


----
----

--
