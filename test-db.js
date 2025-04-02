require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false, // Set to true if using Azure SQL
        trustServerCertificate: true
    }
};

// Use Windows Authentication if no DB_USER is provided
if (process.env.DB_USER) {
    dbConfig.user = process.env.DB_USER;
    dbConfig.password = process.env.DB_PASSWORD || ''; // Leave empty if Windows Auth
}

async function testConnection() {
    try {
        await sql.connect(dbConfig);
        console.log('✅ Connected to SQL Server successfully!');
        const result = await sql.query('SELECT TOP 1 * FROM Employees');
        console.log('Sample Employee Data:', result.recordset);
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    } finally {
        sql.close();
    }
}

testConnection();
