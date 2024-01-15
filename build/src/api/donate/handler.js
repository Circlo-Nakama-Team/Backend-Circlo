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
const dotenv_1 = __importDefault(require("dotenv"));
const UploadServices_1 = __importDefault(require("../../services/UploadServices"));
const nanoid_1 = require("nanoid");
const uploadServices = new UploadServices_1.default();
dotenv_1.default.config({ path: '.env' });
class DonateHandler {
    constructor(services, validator) {
        this._service = services;
        this._uploadService = uploadServices;
        this._validator = validator;
    }
    postDonateHandler(credential, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                const { image } = payload;
                payload.image = yield Promise.all(payload.image.map((image) => image.mimetype));
                this._validator.validateDonatePayload(payload);
                const donateId = yield this._service.addDonate(id, payload);
                yield Promise.all(image.map((image) => __awaiter(this, void 0, void 0, function* () {
                    const imageId = `${donateId}_${(0, nanoid_1.nanoid)(10)}`;
                    const filename = `${imageId}_${image.originalname}`;
                    const file = yield this._uploadService.uploadDonateImage(filename, image.buffer);
                    const link = `${process.env.GS_URL}/${file}`;
                    console.log(link);
                    this._service.addDonateImage(donateId, imageId, link);
                    return;
                })));
                return donateId;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDonateHandler(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                const donateData = yield this._service.getUserDonate(id);
                const fixedDonateData = yield Promise.all(donateData.map((donateData) => __awaiter(this, void 0, void 0, function* () {
                    const image = yield this._service.getDonateImage(donateData.donateId);
                    donateData.image = image;
                    return donateData;
                })));
                return fixedDonateData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDonateByIdHandler(credential, donateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decodedToken = yield (0, AuthorizationServices_1.default)(credential);
                const { uid: id } = decodedToken;
                const donateData = yield this._service.getCertainUserDonate(id, donateId);
                const image = yield this._service.getDonateImage(donateData.donateId);
                const fixedDonateData = Object.assign(Object.assign({}, donateData), { image });
                return fixedDonateData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getDonateScheduleHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donateData = yield this._service.getDonateSchedule();
                return donateData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = DonateHandler;
