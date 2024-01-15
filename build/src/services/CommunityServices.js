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
const DBConfig_1 = __importDefault(require("../config/DBConfig"));
const community_1 = __importDefault(require("../utils/mapping/community"));
const dotenv_1 = __importDefault(require("dotenv"));
const UploadServices_1 = __importDefault(require("./UploadServices"));
const uploadServices = new UploadServices_1.default();
dotenv_1.default.config({ path: '.env' });
class CommunityServices {
    constructor() {
        this._pool = DBConfig_1.default;
        this._uploadServices = uploadServices;
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM post
      ORDER BY POST_TIME DESC`;
                const [queryResult] = yield this._pool.execute(query);
                console.log(queryResult);
                return queryResult;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getPostHistory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postQuery = 'SELECT * FROM post WHERE USERID = ?';
                const values = [id];
                const [postResult] = yield this._pool.execute(postQuery, values);
                const post = postResult.map(community_1.default);
                return post;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addPost(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO post VALUES (?, ?, ?, ?, ?, ?)';
            const values = [data.postId, userId, data.postBody, data.postTime, data.postLikes];
            data.postImage ? values.push(data.postImage) : values.push('');
            try {
                yield this._pool.execute(query, values);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addPostLike(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'UPDATE post SET POST_LIKES = POST_LIKES + 1 WHERE POST_ID = ?';
                const values = [idPost];
                yield this._pool.execute(query, values);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    decPostLike(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'UPDATE post SET POST_LIKES = POST_LIKES - 1 WHERE POST_ID = ?';
                const values = [idPost];
                yield this._pool.execute(query, values);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = CommunityServices;
