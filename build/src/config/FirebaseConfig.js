"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const EnvConfig_1 = __importDefault(require("./EnvConfig"));
const firebaseConfig = {
    apiKey: EnvConfig_1.default.API_KEY,
    authDomain: EnvConfig_1.default.AUTH_DOMAIN,
    projectId: EnvConfig_1.default.PROJECT_ID,
    storageBucket: EnvConfig_1.default.STORAGE_BUCKET,
    messagingSenderId: EnvConfig_1.default.MESSAGING_SENDER_ID,
    appId: EnvConfig_1.default.APP_ID,
    measurementId: EnvConfig_1.default.MEASUREMENT_ID
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.default = app;
