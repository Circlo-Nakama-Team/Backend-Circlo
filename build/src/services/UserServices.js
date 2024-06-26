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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const UploadServices_1 = __importDefault(require("./UploadServices"));
const nanoid_1 = require("nanoid");
const NotFoundError_1 = __importDefault(require("../exceptions/NotFoundError"));
const users_1 = require("../utils/mapping/users");
const EnvConfig_1 = __importDefault(require("../config/EnvConfig"));
const uploadServices = new UploadServices_1.default();
class UserServices {
    constructor() {
        this._pool = DBConfig_1.default;
        this._uploadServices = uploadServices;
    }
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [data.id, data.firstname, data.lastname, data.username, data.email, data.point, null, null];
                yield this._pool.execute(query, values);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userQuery = 'SELECT FIRSTNAME,LASTNAME,POINT,MAIN_ADDRESSID FROM user WHERE USERID = ?';
                const values = [id];
                const userRecord = yield firebase_admin_1.default.auth().getUser(id);
                const [queryResult] = yield this._pool.execute(userQuery, values);
                if (queryResult.length === 0)
                    throw new NotFoundError_1.default('User Not Found!');
                const lastname = queryResult[0].LASTNAME ? queryResult[0].LASTNAME : null;
                const userData = {
                    id: userRecord.uid,
                    firstname: queryResult[0].FIRSTNAME,
                    lastname,
                    username: userRecord.displayName,
                    email: userRecord.email,
                    image: userRecord.photoURL,
                    point: queryResult[0].POINT,
                    main_addressId: queryResult[0].MAIN_ADDRESSID
                };
                return userData;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getUserIdByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userQuery = 'SELECT USERID FROM user WHERE EMAIL = ?';
            const values = [email];
            const [queryResult] = yield this._pool.execute(userQuery, values);
            console.log(queryResult);
            return queryResult[0].USERID;
        });
    }
    updateUser(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryProperty = [];
                const queryValues = [];
                if (payload.username) {
                    queryProperty.push('USERNAME = ?');
                    queryValues.push(payload.username);
                    yield firebase_admin_1.default.auth().updateUser(id, {
                        displayName: payload.username
                    });
                }
                if (payload.addressId) {
                    queryProperty.push('MAIN_ADDRESSID = ?');
                    queryValues.push(payload.addressId);
                }
                if (payload.image) {
                    const filename = yield this._uploadServices.uploadUserImage(payload.image.originalname, payload.image.buffer);
                    const encodedFilename = filename.replace(/ /g, '%20');
                    yield firebase_admin_1.default.auth().updateUser(id, {
                        photoURL: `${EnvConfig_1.default.GS_URL}/${encodedFilename}`
                    });
                }
                const queryPropertyString = queryProperty.join(', ');
                queryValues.push(id);
                const query = 'UPDATE user SET ' + queryPropertyString + ' WHERE USERID = ?';
                const [queryResult] = yield this._pool.execute(query, queryValues);
                return queryResult[0];
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addAddressUser(idUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = `address-${(0, nanoid_1.nanoid)(10)}`;
                const query = 'INSERT INTO address VALUES (?, ?, ?, ?, ?)';
                const values = [id, idUser, payload.address, payload.detail_address, payload.addressTitle];
                yield this._pool.execute(query, values);
                const addressId = yield this.verifiedAddressExist(id);
                return addressId;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    updateAddressUser(id, addressId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryState = [];
                const queryValues = [];
                if (payload.address) {
                    queryState.push('ADDRESS = ?');
                    queryValues.push(payload.address);
                }
                if (payload.detail_address) {
                    queryState.push('DETAIL_ADDRESS = ?');
                    queryValues.push(payload.detail_address);
                }
                if (payload.addressTitle) {
                    queryState.push('TITLE = ?');
                    queryValues.push(payload.addressTitle);
                }
                const queryPropertyString = queryState.join(', ');
                queryValues.push(id);
                queryValues.push(addressId);
                const query = `UPDATE address SET ${queryPropertyString} WHERE USERID = ? AND ADDRESSID = ?`;
                yield this._pool.execute(query, queryValues);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    checkUserAddressExist(idAddress, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT ADDRESSID,USERID FROM address WHERE ADDRESSID = ? AND USERID = ?';
            const values = [idAddress, userId];
            const [queryResult] = yield this._pool.execute(query, values);
            if (queryResult.length === 0) {
                throw new NotFoundError_1.default('User Address Not Found!');
            }
        });
    }
    verifiedAddressExist(idAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT ADDRESSID,USERID FROM address WHERE ADDRESSID = ?';
                const values = [idAddress];
                const [queryResult] = yield this._pool.execute(query, values);
                if (queryResult.length === 0) {
                    throw new NotFoundError_1.default('User Address Not Found!');
                }
                return {
                    userId: queryResult[0].USERID,
                    addressId: queryResult[0].ADDRESSID
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUserAddressByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM address WHERE USERID = ?';
                const values = [userId];
                const [queryResult] = yield this._pool.execute(query, values);
                const formattedQueryResult = queryResult.map(users_1.mapDBToModelUserAddress);
                return formattedQueryResult;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getCertainUserAddress(id, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM address WHERE USERID = ? AND ADDRESSID = ?';
                const values = [id, addressId];
                const [queryResult] = yield this._pool.execute(query, values);
                if (queryResult.length === 0)
                    throw new NotFoundError_1.default('User Address Not Found!');
                const formattedQueryResult = queryResult.map(users_1.mapDBToModelUserAddress);
                console.log(queryResult);
                return formattedQueryResult;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deleteAddressUser(userId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'DELETE FROM address WHERE USERID = ? AND ADDRESSID = ?';
                const values = [userId, addressId];
                yield this._pool.execute(query, values);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFcmToken(id, fcmToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'UPDATE user SET FCM_TOKEN = ? WHERE USERID = ?';
                const values = [fcmToken, id];
                yield this._pool.execute(query, values);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFcmToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT FCM_TOKEN FROM user WHERE USERID = ?';
                const values = [id];
                const [queryResult] = yield this._pool.execute(query, values);
                return queryResult[0].FCM_TOKEN;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserServices;
