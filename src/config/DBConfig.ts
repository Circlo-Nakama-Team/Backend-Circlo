import mysql from 'mysql2/promise'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'hackfest'
}

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig)

export default pool
