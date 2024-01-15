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
const AuthorizationServices_1 = __importDefault(require("../../services/AuthorizationServices"));
const nanoid_1 = require("nanoid");
const moment_1 = __importDefault(require("moment"));
const dotenv_1 = __importDefault(require("dotenv"));
const UploadServices_1 = __importDefault(require("../../services/UploadServices"));
const uploadServices = new UploadServices_1.default();
dotenv_1.default.config({ path: '.env' });
class CommunityHandler {
    constructor(services, validator) {
        this._service = services;
        this._uploadService = uploadServices;
        this._validator = validator;
    }
    getPostsHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this._service.getPosts();
                return posts;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addPostHandler(credential, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: userId } = decodedToken;
                let image = null;
                if (payload.image) {
                    image = payload.image;
                    payload.image = payload.image.mimetype;
                }
                this._validator.validateUserPostPayload(payload);
                const postTime = new Date().toLocaleString();
                payload.postId = `post-${(0, nanoid_1.nanoid)(16)}`;
                payload.postTime = (0, moment_1.default)(postTime).format('YYYY-MM-DD HH:mm:ss');
                payload.postLikes = 0;
                if (image !== null) {
                    const imageFilename = yield this._uploadService.uploadPostImage(image.originalname, image.buffer);
                    payload.postImage = `${process.env.GS_URL}/${imageFilename}`;
                }
                yield this._service.addPost(userId, payload);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addPostLikeHandler(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.addPostLike(idPost);
        });
    }
    decPostLikeHandler(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service.decPostLike(idPost);
        });
    }
}
exports.default = CommunityHandler;
