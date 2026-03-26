import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchLogs = (pageNum = 0) => {
    axios.get(`http://localhost:8080/api/audit-logs?page=${pageNum}&size=5`)
      .then(res => {
        setLogs(res.data.content);
        setTotalPages(res.data.totalPages);
        setPage(res.data.number);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Audit Logs</h1>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Old Value</th>
            <th>New Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.user?.username || "N/A"}</td>
              <td>{log.action}</td>
              <td>{log.entityType} (ID: {log.entityId})</td>
              <td>{log.oldValue}</td>
              <td>{log.newValue}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button disabled={page === 0} onClick={() => fetchLogs(page - 1)}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page === totalPages - 1} onClick={() => fetchLogs(page + 1)}>Next</button>
      </div>
    </div>
  );
}
