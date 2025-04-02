import React from "react";

const EmployeeDetail = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "400px" }}>
        <h2>{employee.EmployeeName}</h2>
        <p><strong>Job Title:</strong> {employee.JobTitle || "N/A"}</p>
        <p><strong>Hire Date:</strong> {employee.HireDate || "N/A"}</p>
        <p><strong>Pay Class:</strong> {employee.PayClass || "N/A"}</p>
        <p><strong>Status:</strong> {employee.Status || "N/A"}</p>
        {employee.EmployeePhoto && (
          <img
            src={`data:image/jpeg;base64,${employee.EmployeePhoto}`}
            alt="Employee"
            style={{ width: "100%", height: "auto", marginTop: "10px" }}
          />
        )}
        <button onClick={onClose} style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}>Close</button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
