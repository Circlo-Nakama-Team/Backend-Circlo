"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const UserPostPayloadSchema = joi_1.default.object({
    postBody: joi_1.default.string(),
    image: joi_1.default.string().valid('image/apng', 'image/avif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
});
exports.UserPostPayloadSchema = UserPostPayloadSchema;
