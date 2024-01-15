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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const handler_1 = __importDefault(require("./handler"));
const TrashServices_1 = __importDefault(require("../../services/TrashServices"));
const UploadServices_1 = __importDefault(require("../../services/UploadServices"));
const AuthenticationError_1 = __importDefault(require("../../exceptions/AuthenticationError"));
dotenv_1.default.config({ path: '.env' });
const router = express_1.default.Router();
const trashServices = new TrashServices_1.default();
const uploadServices = new UploadServices_1.default();
const handler = new handler_1.default(trashServices, uploadServices);
const upload = (0, multer_1.default)();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trashData = yield handler.getTrashes();
        res.status(200).json({
            status: 'Success',
            message: 'Success Get Trash',
            data: {
                trashData
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/categories', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trashCategories = yield handler.getTrashCategories();
        res.status(200).json({
            status: 'Success',
            message: 'Success Get Trash',
            data: {
                trashCategories
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/ideas', upload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthenticationError_1.default('Authorization Header Required');
        const trashIdeas = yield handler.getTrashIdeas(credential, image);
        res.status(200).json({
            status: 'Success',
            message: 'Success Get Trash Ideas',
            data: {
                trashIdeas
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
