const oracledb = require("oracledb");
require("dotenv").config();

// Optional: improves performance
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT
};

// Function to get DB connection
async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Connected to OracleDB");
    return connection;
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    throw err;
  }
}

module.exports = getConnection;
