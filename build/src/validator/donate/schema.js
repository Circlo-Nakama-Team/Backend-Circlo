"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonatePayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const DonatePayloadSchema = joi_1.default.object({
    trashCategoriesId: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    address_detail: joi_1.default.string(),
    donate_method: joi_1.default.string().required(),
    donate_description: joi_1.default.string(),
    donate_date: joi_1.default.string().required(),
    donate_schedule: joi_1.default.string().required(),
    image: joi_1.default.array().items(joi_1.default.string().valid('image/apng', 'image/avif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required())
});
exports.DonatePayloadSchema = DonatePayloadSchema;
