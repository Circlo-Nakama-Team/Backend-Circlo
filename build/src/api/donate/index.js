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
const DonateServices_1 = __importDefault(require("../../services/DonateServices"));
const donate_1 = __importDefault(require("../../validator/donate"));
const AuthorizationError_1 = __importDefault(require("../../exceptions/AuthorizationError"));
dotenv_1.default.config({ path: '.env' });
const upload = (0, multer_1.default)();
const router = express_1.default.Router();
const donateServices = new DonateServices_1.default();
const handler = new handler_1.default(donateServices, donate_1.default);
router.post('/', upload.array('image', 3), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthorizationError_1.default('Authorization Header Required');
        if (req.files)
            req.body.image = req.files;
        const donateId = yield handler.postDonateHandler(credential, req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Success Add Donate',
            data: {
                donateId
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthorizationError_1.default('Authorization Header Required');
        const donateData = yield handler.getDonateHandler(credential);
        res.status(200).json({
            status: 'Success',
            message: 'Success Get User Donate',
            data: {
                donateData
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const credential = req.headers.authorization;
        if (!credential)
            throw new AuthorizationError_1.default('Authorization Header Required');
        const donateData = yield handler.getDonateByIdHandler(credential, id);
        res.status(200).json({
            status: 'Success',
            message: 'Success Get User Donate',
            data: {
                donateData
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/schedule/time', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donateSchedule = yield handler.getDonateScheduleHandler();
        res.status(200).json({
            status: 'Success',
            message: 'Success Get User Donate',
            data: {
                donateSchedule
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
