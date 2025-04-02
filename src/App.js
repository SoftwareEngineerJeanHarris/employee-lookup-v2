// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Directory</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {employees.map((employee) => (
          <div key={employee.EmployeeID} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <h3>{employee.EmployeeName}</h3>
            <p><strong>Job Title:</strong> {employee.JobTitle || "N/A"}</p>
            <p><strong>Hire Date:</strong> {employee.HireDate || "N/A"}</p>
            <p><strong>Pay Class:</strong> {employee.PayClass || "N/A"}</p>
            <p><strong>Status:</strong> {employee.Status || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
