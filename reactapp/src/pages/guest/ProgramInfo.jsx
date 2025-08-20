import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProgramInfo() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/academic-programs")
      .then(res => {
        setPrograms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching programs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading programs...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Academic Programs</h1>
      {programs.length === 0 ? (
        <p>No programs found.</p>
      ) : (
        <ul>
          {programs.map(program => (
            <li key={program.id}>
              <strong>{program.programName}</strong> ({program.degreeType})<br />
              <em>Department:</em> {program.department}<br />
              <em>Credits Required:</em> {program.creditHoursRequired}<br />
              <p>{program.programDescription}</p>
              <small>Admission Requirements: {program.admissionRequirements}</small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
