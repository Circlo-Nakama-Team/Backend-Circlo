"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvariantError_1 = __importDefault(require("../../exceptions/InvariantError"));
const schema_1 = require("./schema");
const UsersValidator = {
    validateUserRegisterPayload: (payload) => {
        const validationResult = schema_1.UserRegisterPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
    validateUserRegisterGooglePayload: (payload) => {
        const validationResult = schema_1.UserRegisterGooglePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
    validateUserLoginPayload: (payload) => {
        const validationResult = schema_1.UserLoginPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
    validateUserUpdatePayload: (payload) => {
        const validationResult = schema_1.UserUpdatePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    },
    validateUserAddressPayload: (payload) => {
        const validationResult = schema_1.UserAddressPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.default(validationResult.error.message);
        }
    }
};
exports.default = UsersValidator;
