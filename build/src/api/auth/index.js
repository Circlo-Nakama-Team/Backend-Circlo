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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const nanoid_1 = require("nanoid");
const auth_1 = require("firebase/auth");
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const FirebaseAdmin_1 = __importDefault(require("../../config/FirebaseAdmin"));
const FirebaseConfig_1 = __importDefault(require("../../config/FirebaseConfig"));
const user_1 = __importDefault(require("../../validator/user"));
const AuthenticationServices_1 = __importDefault(require("../../services/AuthenticationServices"));
const AuthenticationError_1 = __importDefault(require("../../exceptions/AuthenticationError"));
dotenv_1.default.config({ path: '.env' });
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
const userServices = new UserServices_1.default();
const auth = (0, auth_1.getAuth)(FirebaseConfig_1.default);
const actionCodeSettings = {
    url: 'http://localhost:5000' // Set the URL where the user will be directed after clicking the email verification link
    // android: {
    //   packageName: 'com.nakama.circlo',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
};
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_1.default.validateUserRegisterPayload(req.body);
        const { firstname, lastname, username, email, password } = req.body;
        const id = `user-${(0, nanoid_1.nanoid)(10)}`;
        const userData = {
            id,
            firstname,
            lastname: lastname || null,
            username,
            email,
            point: 0
        };
        // const userRecord = await createUserWithEmailAndPassword(auth, email, password)
        // console.log(userRecord.user)
        // await sendEmailVerification(userRecord.user)
        const userRecord = yield FirebaseAdmin_1.default.auth().createUser({
            uid: id,
            displayName: username,
            email,
            password,
            photoURL: `${process.env.GS_URL}/User/profil.jpg`,
            disabled: false
        });
        // await admin.auth().createUser({
        //   uid: id,
        //   displayName: username,
        //   email,
        //   password,
        //   photoURL: `${process.env.GS_URL}/User/profil.jpg`,
        //   disabled: true
        // }).then(async (userRecord: any): Promise<any> => {
        //   console.log(userRecord)
        //   await admin.auth().generateEmailVerificationLink(userRecord.email, actionCodeSettings).then(async (link): Promise<any> => {
        //     console.log(link)
        //     await sendEmailVerificationLink(userRecord.email, userRecord.displayName, link)
        //   })
        // })
        yield userServices.addUser(userData);
        res.status(201).send({
            status: 'Success',
            message: 'Success Add User',
            data: {
                userId: userRecord.uid
            }
        });
        // res.status(201).send({
        //   status: 'Success',
        //   message: 'Please verify your email, The link has been sent to your email'
        // })
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
router.post('/register-google', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_1.default.validateUserRegisterGooglePayload(req.body);
        const userData = {
            id: req.body.userId,
            firstname: req.body.firstname,
            lastname: req.body.lastname || null,
            username: req.body.username,
            email: req.body.email,
            point: 0
        };
        yield userServices.addUser(userData);
        res.status(201).send({
            status: 'Success',
            message: 'Success Add User',
            data: {
                userId: req.body.userId
            }
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_1.default.validateUserLoginPayload(req.body);
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        // const isEmailVerified = await admin.auth().getUserByEmail(user.email)
        // console.log(isEmailVerified)
        const signInResponse = yield (0, auth_1.signInWithEmailAndPassword)(auth, user.email, user.password);
        const credential = yield signInResponse.user.getIdToken(true);
        const refreshToken = signInResponse.user.refreshToken;
        res.status(200).send({
            status: 'success',
            message: 'Masuk Berhasil',
            data: {
                credential,
                refreshToken
            }
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
router.post('/logout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token)
            throw new AuthenticationError_1.default('Request Missing Auth Header');
        const decodedToken = yield (0, AuthenticationServices_1.default)(token);
        const { uid: userId } = decodedToken;
        try {
            yield FirebaseAdmin_1.default.auth().revokeRefreshTokens(userId);
            res.status(200).json({ status: 'success', message: 'Logout Berhasil' });
        }
        catch (error) {
            next(error);
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
