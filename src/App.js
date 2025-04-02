import React, { useEffect, useState } from "react";
import EmployeeDetail from "./EmployeeDetail";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleEmployeeClick = (employeeId) => {
    fetch(`http://localhost:5000/employee/${employeeId}`)
      .then((response) => response.json())
      .then((data) => setSelectedEmployee(data))
      .catch((error) => console.error("Error fetching employee details:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Directory</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {employees.map((employee) => (
          <div key={employee.EmployeeID}
               onClick={() => handleEmployeeClick(employee.EmployeeID)}
               style={{
                 border: "1px solid #ddd", padding: "10px", borderRadius: "8px",
                 cursor: "pointer", backgroundColor: "#f9f9f9"
               }}>
            <h3>{employee.EmployeeName}</h3>
            <p><strong>Job Title:</strong> {employee.JobTitle || "N/A"}</p>
            <p><strong>Hire Date:</strong> {employee.HireDate || "N/A"}</p>
            <p><strong>Pay Class:</strong> {employee.PayClass || "N/A"}</p>
            <p><strong>Status:</strong> {employee.Status || "N/A"}</p>
          </div>
        ))}
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && <EmployeeDetail employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />}
    </div>
  );
};

export default App;
