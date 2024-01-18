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
const StorageConfig_1 = __importDefault(require("../config/StorageConfig"));
const bucket = StorageConfig_1.default.bucket('circlo-bucket');
class UploadServices {
    constructor() {
        this._pool = DBConfig_1.default;
    }
    uploadUserImage(filename, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = bucket.file(`User/${filename}`);
                yield file.save(buffer);
                return file.name;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    uploadPostImage(filename, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = bucket.file(`Post/${filename}`);
                yield file.save(buffer);
                return file.name;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    uploadDonateImage(filename, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = bucket.file(`Donate/${filename}`);
                yield file.save(buffer);
                return file.name;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    uploadPredictImage(filename, buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = bucket.file(`Predict/${filename}`);
                yield file.save(buffer);
                return { filename: file.name, file };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = UploadServices;
