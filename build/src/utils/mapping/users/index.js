"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDBToModelUserAddress = exports.mapDBToModel = void 0;
const mapDBToModel = ({ USERID, FIRSTNAME, LASTNAME, USERNAME, EMAIL, POINT, ADDRESS }) => ({
    id: USERID,
    firstname: FIRSTNAME,
    lastname: LASTNAME,
    username: USERNAME,
    email: EMAIL,
    point: POINT,
    address: ADDRESS
});
exports.mapDBToModel = mapDBToModel;
const mapDBToModelUserAddress = ({ ADDRESSID, USERID, ADDRESS, DETAIL_ADDRESS }) => ({
    addressId: ADDRESSID,
    userId: USERID,
    address: ADDRESS,
    detailAddress: DETAIL_ADDRESS
});
exports.mapDBToModelUserAddress = mapDBToModelUserAddress;
