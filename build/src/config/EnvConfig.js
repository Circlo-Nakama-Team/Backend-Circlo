"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env.test' });
const config = {
    PORT: process.env.PORT,
    GS_URL: process.env.GS_URL,
    DOMAIN: process.env.DOMAIN,
    ML_SERVER: process.env.ML_SERVER,
    HOST_DB: process.env.HOST_DB,
    USER_DB: process.env.USER_DB,
    PASS_DB: process.env.PASS_DB,
    DATABASE: process.env.DATABASE,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URL: process.env.REDIRECT_URL
};
exports.default = config;
