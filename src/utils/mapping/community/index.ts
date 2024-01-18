import type { MapDBModelUserPostType } from '../../types/CommunityTypes'
const mapDBToModel = ({
  POST_ID,
  USERID,
  POST_BODY,
  POST_TIME,
  POST_LIKES,
  POST_IMAGE
}: MapDBModelUserPostType): any => ({
  id: POST_ID,
  userId: USERID,
  postBody: POST_BODY,
  postTime: POST_TIME,
  postLikes: POST_LIKES,
  postImage: POST_IMAGE
})

const mapDBToModelGetPosts = ({
  POST_ID,
  USERID,
  POST_BODY,
  POST_TIME,
  POST_LIKES,
  POST_IMAGE
}: MapDBModelUserPostType): any => ({
  id: POST_ID,
  userId: USERID,
  postBody: POST_BODY,
  postTime: POST_TIME,
  postLikes: POST_LIKES,
  postImage: POST_IMAGE
})

export { mapDBToModel, mapDBToModelGetPosts }
