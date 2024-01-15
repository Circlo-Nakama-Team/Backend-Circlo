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
const FirebaseConfig_1 = __importDefault(require("../../config/FirebaseConfig"));
const auth_1 = require("firebase/auth");
const dotenv_1 = __importDefault(require("dotenv"));
const handler_1 = __importDefault(require("./handler"));
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const user_1 = __importDefault(require("../../validator/user"));
const CommunityServices_1 = __importDefault(require("../../services/CommunityServices"));
const AuthenticationError_1 = __importDefault(require("../../exceptions/AuthenticationError"));
dotenv_1.default.config({ path: '.env' });
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
const userServices = new UserServices_1.default();
const communityServices = new CommunityServices_1.default();
const handler = new handler_1.default(userServices, user_1.default);
const auth = (0, auth_1.getAuth)(FirebaseConfig_1.default);
router.get('/profile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        const user = yield handler.getUserHandler(credential);
        const postHistory = yield communityServices.getPostHistory(user.id);
        const address = yield handler.getAddressHandler(user.id);
        res.status(200).json({
            status: 'Success',
            message: 'Success Get User',
            data: {
                user,
                postHistory,
                address
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id/profile', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userId } = req.params;
        const user = yield handler.getUserByIdHandler(userId);
        const postHistory = yield communityServices.getPostHistory(user.id);
        res.status(200).json({
            status: 'Success',
            message: 'Success Get User',
            data: {
                user,
                postHistory
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/profile', upload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            req.body.image = req.file;
        }
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        const userId = yield handler.updateUserHandler(credential, req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Success Update User',
            data: {
                userId
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/profile/address', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        const addressData = yield handler.postAddressHandler(credential, req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Success Add User Address',
            data: Object.assign({}, addressData)
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/profile/address/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        const addressData = yield handler.getAddressByIdHandler(credential, id);
        res.status(200).json({
            status: 'Success',
            message: 'Success Get User Address',
            data: {
                addressData
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/profile/address/:addressId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        const { addressId } = req.params;
        yield handler.deleteAddressHandler(credential, addressId);
        res.status(200).json({
            status: 'Success',
            message: 'Success Delete User Address'
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
