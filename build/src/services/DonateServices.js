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
const dotenv_1 = __importDefault(require("dotenv"));
const nanoid_1 = require("nanoid");
const moment_1 = __importDefault(require("moment"));
const donate_1 = require("../utils/mapping/donate");
const NotFoundError_1 = __importDefault(require("../exceptions/NotFoundError"));
dotenv_1.default.config({ path: '.env' });
class DonateServices {
    constructor() {
        this._pool = DBConfig_1.default;
    }
    addDonate(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addressDetail = data.address_detail ? data.address_detail : null;
                const donateStatus = data.donate_method.toLowerCase() === 'self-delivery' ? 'Waiting To Be Delivered To Circlo Point' : 'Waiting To Be Picked Up';
                const currentTime = new Date().toLocaleString();
                const formattedCurrentTime = (0, moment_1.default)(currentTime).format('YYYY-MM-DD HH:mm:ss');
                const id = `donate_${(0, nanoid_1.nanoid)(16)}`;
                const query = 'INSERT INTO donate VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const values = [id, data.trashCategoriesId, userId, null, data.address, addressDetail, data.donate_method, data.donate_description, donateStatus, 0, data.donate_date, data.donate_schedule, formattedCurrentTime];
                yield this._pool.execute(query, values);
                return id;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getUserDonate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT donate.DONATEID, donate.TRASHCATEGORIESID, donate.USERID,
      donate.DONATE_WEIGHT, donate.DONATE_ADDRESS, donate.DONATE_ADDRESS_DETAIL,
      donate.DONATE_METHOD, donate.DONATE_DESCRIPTION, donate.DONATE_STATUS, 
      donate.DONATE_POINT, donate.DONATE_DATE, donate.CREATED_AT,
      donate_schedule.START_TIME, donate_schedule.END_TIME, 
      user.FIRSTNAME, user.LASTNAME, user.EMAIL,
      categories.CATEGORIES_NAME, categories.REWARD_POINT FROM donate 
      INNER JOIN donate_schedule ON donate.SCHEDULEID = donate_schedule.SCHEDULEID
      INNER JOIN user ON donate.USERID = user.USERID
      INNER JOIN categories ON donate.TRASHCATEGORIESID = categories.CATEGORIESID
      WHERE donate.USERID = ?`;
                const values = [userId];
                const [queryResult] = yield this._pool.execute(query, values);
                if (queryResult.length === 0)
                    throw new NotFoundError_1.default('Donate Data not found');
                console.log(queryResult);
                const formattedDonateData = queryResult.map(donate_1.mapDBToModelUserDonate);
                return formattedDonateData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getCertainUserDonate(userId, donateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT donate.DONATEID, donate.TRASHCATEGORIESID, donate.USERID,
      donate.DONATE_WEIGHT, donate.DONATE_ADDRESS, donate.DONATE_ADDRESS_DETAIL,
      donate.DONATE_METHOD, donate.DONATE_DESCRIPTION, donate.DONATE_STATUS, 
      donate.DONATE_POINT, donate.DONATE_DATE, donate.CREATED_AT,
      donate_schedule.START_TIME, donate_schedule.END_TIME, 
      user.FIRSTNAME, user.LASTNAME, user.EMAIL,
      categories.CATEGORIES_NAME, categories.REWARD_POINT FROM donate 
      INNER JOIN donate_schedule ON donate.SCHEDULEID = donate_schedule.SCHEDULEID
      INNER JOIN user ON donate.USERID = user.USERID
      INNER JOIN categories ON donate.TRASHCATEGORIESID = categories.CATEGORIESID
      WHERE donate.USERID = ? AND donate.DONATEID = ?`;
                const values = [userId, donateId];
                const [queryResult] = yield this._pool.execute(query, values);
                if (queryResult.length === 0)
                    throw new NotFoundError_1.default('Donate Data not found');
                const formattedDonateData = queryResult.map(donate_1.mapDBToModelUserDonate);
                return formattedDonateData[0];
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDonateSchedule() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM donate_schedule';
                const [queryResult] = yield this._pool.execute(query);
                if (queryResult.length === 0)
                    throw new NotFoundError_1.default('Donate schedule not found');
                const formattedDonateData = queryResult.map(donate_1.mapDBModelDonateSchedule);
                return formattedDonateData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addDonateImage(donateId, imageId, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'INSERT INTO donate_trash_image VALUES (?, ?, ?)';
                const values = [imageId, donateId, link];
                yield this._pool.execute(query, values);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDonateImage(donateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT LINK FROM donate_trash_image WHERE DONATEID = ?';
                const values = [donateId];
                const [queryResult] = yield this._pool.execute(query, values);
                const donateImage = yield Promise.all(queryResult.map((image) => image.LINK));
                return donateImage;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    verifyDonateExist(donateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM donate WHERE DONATEID = ?';
                const values = [donateId];
                const [queryResult] = yield this._pool.execute(query, values);
                if (queryResult.length === 0) {
                    throw new NotFoundError_1.default('Donate not found');
                }
                // return queryResult[0].DONATEID
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.default = DonateServices;
