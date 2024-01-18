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
const handler_1 = __importDefault(require("./handler"));
const CommunityServices_1 = __importDefault(require("../../services/CommunityServices"));
const community_1 = __importDefault(require("../../validator/community"));
const AuthenticationError_1 = __importDefault(require("../../exceptions/AuthenticationError"));
dotenv_1.default.config({ path: '.env' });
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
const communityServices = new CommunityServices_1.default();
const handler = new handler_1.default(communityServices, community_1.default);
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield handler.getPostsHandler();
        res.status(200).json({
            status: 'Success',
            message: 'Success Get Posts',
            data: {
                posts
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/post', upload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file)
            req.body.image = req.file;
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        yield handler.addPostHandler(credential, req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Success Add Post'
        });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/post/:id/likes/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: idPost } = req.params;
        yield handler.addPostLikeHandler(idPost);
        res.status(200).json({
            status: 'Success',
            message: 'Success Add Like Post'
        });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/post/:id/likes/dec', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: idPost } = req.params;
        yield handler.decPostLikeHandler(idPost);
        res.status(200).json({
            status: 'Success',
            message: 'Success Unlike Post'
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
