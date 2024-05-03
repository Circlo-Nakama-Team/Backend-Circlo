import mysql from 'mysql2/promise'
import type { DbConfigTypes } from '../utils/types/ConfigTypes'
import config from './EnvConfig'

const dbConfig = {
  host: config.HOST_DB,
  user: config.USER_DB,
  password: config.PASS_DB,
  database: config.DATABASE
}

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig)

export default pool
