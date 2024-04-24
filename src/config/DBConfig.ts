import mysql from 'mysql2/promise'
import type { DbConfigTypes } from '../utils/types/ConfigTypes'
import config from './EnvConfig'
// const dbConfig = {
//   host: process.env.HOST_DB,
//   user: process.env.USER_DB,
//   password: process.env.PASS_DB,
//   database: process.env.DATABASE
// }
const dbConfig: DbConfigTypes = {
  host: config.HOST_DB ? config.HOST_DB : '34.101.218.217',
  user: config.USER_DB ? config.USER_DB : 'root',
  password: config.PASS_DB ? config.PASS_DB : 'Rebirth07',
  database: config.DATABASE,
}

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig)

export default pool
