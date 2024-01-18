"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDBToModelGetPosts = exports.mapDBToModel = void 0;
const mapDBToModel = ({ POST_ID, USERID, POST_BODY, POST_TIME, POST_LIKES, POST_IMAGE }) => ({
    id: POST_ID,
    userId: USERID,
    postBody: POST_BODY,
    postTime: POST_TIME,
    postLikes: POST_LIKES,
    postImage: POST_IMAGE
});
exports.mapDBToModel = mapDBToModel;
const mapDBToModelGetPosts = ({ POST_ID, USERID, POST_BODY, POST_TIME, POST_LIKES, POST_IMAGE }) => ({
    id: POST_ID,
    userId: USERID,
    postBody: POST_BODY,
    postTime: POST_TIME,
    postLikes: POST_LIKES,
    postImage: POST_IMAGE
});
exports.mapDBToModelGetPosts = mapDBToModelGetPosts;
