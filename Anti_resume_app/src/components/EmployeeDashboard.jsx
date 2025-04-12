import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import CandidateModal from './Candidate';

const EmployeeDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const snapshot = await getDocs(collection(db, "candidates"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.marks}</td>
              <td>
                <button onClick={() => setSelectedCandidate(candidate)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCandidate && (
        <CandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      )}
    </div>
  );
};

export default EmployeeDashboard;