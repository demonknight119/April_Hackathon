// Firebase setup
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Main component
import React, { useState } from "react";

export default function EmployeeDashboard() {
  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, () => ({ question: "", options: ["", "", "", ""], correctAnswer: "" }))
  );
  const [skill, setSkill] = useState("");
  const [status, setStatus] = useState(null);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question" || field === "correctAnswer") {
      newQuestions[index][field] = value;
    } else {
      newQuestions[index].options[field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!skill.trim()) {
      setStatus("Skill name is required.");
      return;
    }

    for (let q of questions) {
      if (!q.question || q.options.some(opt => !opt) || !q.correctAnswer) {
        setStatus("All questions must be completely filled.");
        return;
      }
    }

    try {
      await addDoc(collection(db, "mcq_papers"), {
        skill,
        questions,
        createdAt: new Date()
      });

      setStatus("Paper submitted successfully!");
      setSkill("");
      setQuestions(Array.from({ length: 10 }, () => ({ question: "", options: ["", "", "", ""], correctAnswer: "" })));
    } catch (error) {
      setStatus("Error submitting paper: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Create MCQ Paper</h2>
      {status && <p>{status}</p>}

      <div style={{ marginBottom: "20px" }}>
        <label>Skill Name</label>
        <br />
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      {questions.map((q, idx) => (
        <div key={idx} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "20px" }}>
          <h4>Question {idx + 1}</h4>
          <textarea
            value={q.question}
            onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
            rows={2}
            style={{ width: "100%", marginBottom: "10px" }}
          />

          {q.options.map((opt, optIdx) => (
            <div key={optIdx}>
              <label>Option {optIdx + 1}</label>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleQuestionChange(idx, optIdx, e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
          ))}

          <label>Correct Answer</label>
          <input
            type="text"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(idx, "correctAnswer", e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      ))}

      <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "teal", color: "white", border: "none", cursor: "pointer" }}>
        Submit Paper
      </button>
    </div>
  );
}