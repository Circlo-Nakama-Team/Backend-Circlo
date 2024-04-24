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
const trash_1 = require("../utils/mapping/trash");
class DonateServices {
    constructor() {
        this._pool = DBConfig_1.default;
    }
    getTrashList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT trash.TRASHID, trash.TRASH_TYPE, categories.CATEGORIES_NAME, categories.REWARD_POINT FROM trash
        INNER JOIN categories ON trash.CATEGORIESID = categories.CATEGORIESID`;
                const [result] = yield this._pool.execute(query);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getTrashCategoriesList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM categories';
                const [result] = yield this._pool.execute(query);
                const formattedResult = yield result.map(trash_1.mapDBModelTrashCategories);
                return formattedResult;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getCertainTrashData(trashId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT trash.TRASH_TYPE AS trashType, categories.CATEGORIES_NAME AS category, trash.IMAGE AS image, categories.REWARD_POINT AS rewardPoint FROM trash 
      INNER JOIN categories ON trash.CATEGORIESID = categories.CATEGORIESID 
      WHERE TRASHID = ?`;
                const values = [trashId];
                const [result] = yield this._pool.execute(query, values);
                return result[0];
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getTrashIdeas(trashId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT IDEASID AS ideasId, IDEAS_NAME AS ideasName, IMAGE AS ideasImage, DESCRIPTION AS ideasDescription, PRICE AS potensial_price FROM ideas
      WHERE ideas.TRASHID = ?`;
                const values = [trashId];
                const [result] = yield this._pool.execute(query, values);
                if (result.length !== 0) {
                    const queryLink = 'SELECT TITLE AS title, LINK AS tutorialLink, SOURCE AS linkSource, CREATOR AS creator FROM tutorial WHERE IDEASID = ?';
                    const queryBenefits = 'SELECT DESCRIPTION AS description FROM ideas_benefit WHERE IDEASID = ?';
                    yield Promise.all(result.map((trash) => __awaiter(this, void 0, void 0, function* () {
                        const linkAndBenefitsValues = [trash.ideasId];
                        const [linkResult] = yield this._pool.execute(queryLink, linkAndBenefitsValues);
                        const [benefitsResult] = yield this._pool.execute(queryBenefits, linkAndBenefitsValues);
                        const formattedBenefitList = yield benefitsResult.map((benefit) => benefit.description);
                        trash.link = linkResult;
                        trash.benefits = formattedBenefitList;
                    })));
                }
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = DonateServices;
