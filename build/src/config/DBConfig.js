"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const dbConfig = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE
};
// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   database: process.env.DATABASE
// }
// Create a MySQL connection pool
const pool = promise_1.default.createPool(dbConfig);
exports.default = pool;
