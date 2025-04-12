import React from 'react';

const CandidateModal = ({ candidate, onClose }) => {
  return (
    <div style={{ background: "#000000aa", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div style={{ background: "white", margin: "10% auto", padding: "20px", width: "300px" }}>
        <h2>Candidate Details</h2>
        <p><strong>ID:</strong> {candidate.id}</p>
        <p><strong>Name:</strong> {candidate.name}</p>
        <p><strong>Marks:</strong> {candidate.marks}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        {/* Add more fields as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CandidateModal;