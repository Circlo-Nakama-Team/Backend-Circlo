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
const axios_1 = __importDefault(require("axios"));
const stream_1 = require("stream");
const form_data_1 = __importDefault(require("form-data"));
const EnvConfig_1 = __importDefault(require("../../config/EnvConfig"));
const AuthorizationServices_1 = __importDefault(require("../../services/AuthorizationServices"));
const trash_1 = __importDefault(require("../../validator/trash"));
class TrashHandler {
    constructor(services, uploadServices) {
        this._service = services;
        this._uploadServices = uploadServices;
        this._validator = trash_1.default;
    }
    getTrashes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trashData = yield this._service.getTrashList();
                return trashData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getTrashCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trashData = yield this._service.getTrashCategoriesList();
                return trashData;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getTrashIdeas(credential, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, AuthorizationServices_1.default)(credential);
                const { originalname, buffer, mimetype } = image;
                yield this._validator.validateImagePredictPayload({ image: mimetype });
                const { filename, file: filePredict } = yield this._uploadServices.uploadPredictImage(originalname, buffer);
                const signedUrl = yield filePredict.getSignedUrl({
                    action: 'read',
                    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
                });
                const response = yield axios_1.default.get(signedUrl[0], {
                    responseType: 'arraybuffer' // Ensure the response is treated as binary data
                });
                const formData = new form_data_1.default();
                // Convert the ArrayBuffer to a Node.js Readable Stream
                const stream = new stream_1.Readable();
                stream.push(Buffer.from(response.data));
                stream.push(null);
                formData.append('file', stream, { filename });
                // Make the HTTP request using axios and the FormData object
                const predictionResponse = yield axios_1.default.post(`${EnvConfig_1.default.ML_SERVER}/predict/image`, formData, {
                    headers: Object.assign({}, formData.getHeaders()),
                    responseType: 'json'
                });
                const predictResult = predictionResponse.data.detections;
                const array = Object.values(predictResult);
                const uniqueTrashObjects = [...new Set(array.map((trash) => trash.label))].map(label => ({ trashId: label }));
                // const uniqueTrashObjects = array.map((trash: any): any => {
                //   if
                // })
                // const uniqueArray = array.filter((value: any, index: any, self: any) => {
                //   return index === self.findIndex((t: any) => (
                //     t.label === value.label
                //   ))
                // })
                const formattedArray = yield Promise.all(uniqueTrashObjects.map((trash) => __awaiter(this, void 0, void 0, function* () {
                    const trashData = yield this._service.getCertainTrashData(trash.trashId);
                    const ideas = yield this._service.getTrashIdeas(trash.trashId);
                    // trash.ideas = ideas
                    return Object.assign(Object.assign(Object.assign({}, trash), trashData), { ideas });
                })));
                return formattedArray;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = TrashHandler;
