import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

// const dbConfig = {
//   host: process.env.HOST_DB,
//   user: process.env.USER_DB,
//   password: process.env.PASS_DB,
//   database: process.env.DATABASE
// }
const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: process.env.DATABASE
}

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig)

export default pool
