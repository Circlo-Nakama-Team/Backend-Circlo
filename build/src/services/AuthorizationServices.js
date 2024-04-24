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
const AuthorizationError_1 = __importDefault(require("../exceptions/AuthorizationError"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const OauthServices_1 = __importDefault(require("./OauthServices"));
const UserServices_1 = __importDefault(require("./UserServices"));
const oauthServices = new OauthServices_1.default();
const userServices = new UserServices_1.default();
const authorize = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const checkRevoked = true;
    const token = credential.split(' ')[1];
    try {
        console.log(credential);
        const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(token, checkRevoked);
        return decodedToken;
    }
    catch (error) {
        try {
            const { payload } = yield oauthServices.validateToken(token);
            const { email } = payload;
            console.log(email);
            const userId = yield userServices.getUserIdByEmail(email);
            console.log(userId);
            return { uid: userId };
        }
        catch (error) {
            throw new AuthorizationError_1.default('Unauthorized Request');
        }
    }
});
exports.default = authorize;
