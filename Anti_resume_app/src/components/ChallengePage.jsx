// src/components/ChallengePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import '../styles/challengePage.css'

export default function ChallengePage() {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchPaper = async () => {
      const docSnap = await getDoc(doc(db, "mcq_papers", paperId));
      if (docSnap.exists()) {
        setPaper(docSnap.data());
        setAnswers(Array(docSnap.data().questions.length).fill(""));
      }
    };
    fetchPaper();
  }, [paperId]);

  const handleSubmit = async () => {
    let marks = 0;
    paper.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) marks += 1;
    });

    setScore(marks);
    setSubmitted(true);

    await addDoc(collection(db, "student_attempts"), {
      studentId: auth.currentUser?.uid || "anonymous",
      paperId,
      answers,
      marks,
      submittedAt: new Date()
    });
  };

  if (!paper) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Test: {paper.skill}</h2>
      {paper.questions.map((q, idx) => (
        <div key={idx} className="question-box">
          <p><strong>Q{idx + 1}:</strong> {q.question}</p>
          {q.options.map((opt, optIdx) => (
            <div key={optIdx}>
              <label>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={opt}
                  checked={answers[idx] === opt}
                  onChange={(e) => {
                    const newAns = [...answers];
                    newAns[idx] = e.target.value;
                    setAnswers(newAns);
                  }}
                  disabled={submitted}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      {!submitted ? (
        <button onClick={handleSubmit}>Submit</button>
      ) : (
        <h3>Your Score: {score} / {paper.questions.length}</h3>
      )}
    </div>
  );
}
