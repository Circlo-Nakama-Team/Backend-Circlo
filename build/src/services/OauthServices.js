"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth'
const googleapis_1 = require("googleapis");
const EnvConfig_1 = __importDefault(require("../config/EnvConfig"));
class OauthServices {
    // _provider: any
    // _auth: any
    constructor() {
        // this._provider = new GoogleAuthProvider()
        // this._auth = getAuth()
        this._scope = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ];
        this._client = new googleapis_1.google.auth.OAuth2(EnvConfig_1.default.CLIENT_ID, EnvConfig_1.default.CLIENT_SECRET, EnvConfig_1.default.REDIRECT_URL);
        // this._provider.addScope(this._scope)
    }
    getAuthUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._client.generateAuthUrl({
                access_type: 'offline',
                scope: this._scope,
                include_granted_scopes: true,
                prompt: 'consent'
            });
        });
    }
    getUserData(oauthClient) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: userInfo } = yield googleapis_1.google.oauth2({ version: 'v2', auth: oauthClient }).userinfo.get();
            console.log(userInfo);
            return userInfo;
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._client.verifyIdToken({ idToken: token, audience: process.env.CLIENT_ID });
        });
    }
}
exports.default = OauthServices;
