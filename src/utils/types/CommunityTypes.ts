export interface UserPostType {
  postId: string
  postBody: string
  postTime: string
  postLikes: number
  postImage: string
}

export interface MapDBModelUserPostType {
  POST_ID: string
  USERID: string
  POST_BODY: string
  POST_TIME: string
  POST_LIKES: number
  POST_IMAGE: string
}
