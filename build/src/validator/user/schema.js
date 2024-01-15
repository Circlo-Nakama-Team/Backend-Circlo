"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterGooglePayloadSchema = exports.UserAddressPayloadSchema = exports.UserLoginPayloadSchema = exports.UserUpdatePayloadSchema = exports.UserRegisterPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const UserRegisterPayloadSchema = joi_1.default.object({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.UserRegisterPayloadSchema = UserRegisterPayloadSchema;
const UserRegisterGooglePayloadSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required()
});
exports.UserRegisterGooglePayloadSchema = UserRegisterGooglePayloadSchema;
const UserLoginPayloadSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.UserLoginPayloadSchema = UserLoginPayloadSchema;
const UserUpdatePayloadSchema = joi_1.default.object({
    username: joi_1.default.string(),
    addressId: joi_1.default.string(),
    image: joi_1.default.string().valid('image/apng', 'image/avif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
});
exports.UserUpdatePayloadSchema = UserUpdatePayloadSchema;
const UserAddressPayloadSchema = joi_1.default.object({
    address: joi_1.default.string().required(),
    detail_address: joi_1.default.string().required()
});
exports.UserAddressPayloadSchema = UserAddressPayloadSchema;
