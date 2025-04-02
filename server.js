require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());

// SQL Server Configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Set to true if using Azure SQL
    trustServerCertificate: true,
  },
};

// Test Database Connection
sql.connect(dbConfig)
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// Fetch Employee Names and Photos
// Fetch basic employee info
app.get('/employees', async (req, res) => {
  try {
      await sql.connect(dbConfig);
      const result = await sql.query(`
          SELECT E.EmployeeName, E.EmployeeID, E.Description, E.HireDate, E.JobTitle, E.PayClass, P.Status
          FROM [OFFICE].[dbo].[HREmployeeMaster] AS E
          LEFT JOIN [OFFICE].[security].[HREmployeeBadgePhotos] AS P
          ON E.EmployeeID = P.EmployeeID`);
      res.json(result.recordset);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Fetch employee details including image by EmployeeID
app.get('/employee/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
      await sql.connect(dbConfig);
      const request = new sql.Request();
      request.input('employeeId', sql.NVarChar, employeeId); // Declare parameter type explicitly

      const result = await request.query(`
          SELECT E.EmployeeName, E.EmployeeID, E.Description, E.HireDate, E.JobTitle, E.PayClass, P.Status, P.EmployeePhoto
          FROM [OFFICE].[dbo].[HREmployeeMaster] AS E
          LEFT JOIN [OFFICE].[security].[HREmployeeBadgePhotos] AS P
          ON E.EmployeeID = P.EmployeeID
          WHERE E.EmployeeID = @employeeId
      `);

      res.json(result.recordset[0] || {}); // Return empty object if no record is found
  } catch (err) {
      res.status(500).send(err.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
