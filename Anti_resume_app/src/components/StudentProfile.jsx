// src/components/StudentProfile.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import '../styles/StudentProfile.css'

export default function StudentProfile() {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      const snapshot = await getDocs(collection(db, "mcq_papers"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPapers(data);
    };
    fetchPapers();
  }, []);

  return (
    <div className="container">
      <h2>Available Skill Challenges</h2>
      <div className="cards">
        {papers.map(paper => (
          <div className="card" key={paper.id} onClick={() => navigate(`/challenge/${paper.id}`)}>
            <h3>{paper.skill}</h3>
            <p>Start Test →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
