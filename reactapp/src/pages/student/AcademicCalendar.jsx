import React from 'react';

const calendarData = [
  { date: '2025-08-25', event: 'Semester Begins' },
  { date: '2025-09-05', event: 'Orientation Day' },
  { date: '2025-10-10', event: 'Midterm Exams' },
  { date: '2025-12-15', event: 'Final Exams' },
  { date: '2025-12-20', event: 'Winter Break Starts' },
];

export default function AcademicCalendar() {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Academic Calendar</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Event</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((item, index) => (
            <tr key={index} style={styles.tr}>
              <td style={styles.td}>{item.date}</td>
              <td style={styles.td}>{item.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#e0e7ff',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '10px',
  },
};
