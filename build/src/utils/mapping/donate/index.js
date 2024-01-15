"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDBModelDonateSchedule = exports.mapDBToModelUserDonate = void 0;
const mapDBToModelUserDonate = ({ DONATEID, TRASHCATEGORIESID, USERID, DONATE_WEIGHT, DONATE_ADDRESS, DONATE_ADDRESS_DETAIL, DONATE_METHOD, DONATE_DESCRIPTION, DONATE_STATUS, DONATE_POINT, DONATE_DATE, CREATED_AT, START_TIME, END_TIME, FIRSTNAME, LASTNAME, EMAIL, CATEGORIES_NAME, REWARD_POINT }) => ({
    donateId: DONATEID,
    trashCategories: {
        categoryId: TRASHCATEGORIESID,
        categoryName: CATEGORIES_NAME,
        rewardPoint: REWARD_POINT
    },
    user: {
        userId: USERID,
        donorName: `${FIRSTNAME} ${LASTNAME}`,
        donorEmail: EMAIL
    },
    donateWeight: DONATE_WEIGHT,
    donateAddress: DONATE_ADDRESS,
    donateAddressDetail: DONATE_ADDRESS_DETAIL,
    donateDescription: DONATE_DESCRIPTION,
    donateMethod: DONATE_METHOD,
    donateStatus: DONATE_STATUS,
    donatePoint: DONATE_POINT,
    donateDate: DONATE_DATE,
    donateTime: {
        startTime: START_TIME,
        endTime: END_TIME
    },
    createdAt: CREATED_AT
});
exports.mapDBToModelUserDonate = mapDBToModelUserDonate;
const mapDBModelDonateSchedule = ({ SCHEDULEID, START_TIME, END_TIME }) => ({
    scheduleId: SCHEDULEID,
    scheduleStart: START_TIME,
    scheduleEnd: END_TIME
});
exports.mapDBModelDonateSchedule = mapDBModelDonateSchedule;
