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
class UserHandler {
    constructor(services, validator) {
        this._service = services;
        this._validator = validator;
    }
    getUserHandler(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid } = decodedToken;
                const user = yield this._service.getUserById(uid);
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUserByIdHandler(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._service.getUserById(userId);
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    updateUserHandler(credential, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userImage = null;
                if (payload.image) {
                    userImage = payload.image;
                    payload.image = payload.image.mimetype;
                }
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                this._validator.validateUserUpdatePayload(payload);
                payload.image = userImage;
                console.log(payload.image);
                yield this._service.updateUser(id, payload);
                return id;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    postAddressHandler(credential, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                this._validator.validateUserAddressPayload(payload);
                const addressId = yield this._service.addAddressUser(id, payload);
                return addressId;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getAddressHandler(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield this._service.getUserAddressByUserId(id);
                return address;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getAddressByIdHandler(credential, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                const address = yield this._service.getCertainUserAddress(id, addressId);
                return address;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deleteAddressHandler(credential, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                yield this._service.deleteAddressUser(id, addressId);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = UserHandler;
