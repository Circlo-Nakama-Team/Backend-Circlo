"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDBModelTrashCategories = void 0;
const mapDBModelTrashCategories = ({ CATEGORIESID, CATEGORIES_NAME, REWARD_POINT }) => ({
    categoryId: CATEGORIESID,
    categoryName: CATEGORIES_NAME,
    rewardPoint: REWARD_POINT
});
exports.mapDBModelTrashCategories = mapDBModelTrashCategories;
