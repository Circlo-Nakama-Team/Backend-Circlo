import db from '../config/DBConfig'
import { type UserPostType } from '../utils/types/CommunityTypes'
import { mapDBToModel, mapDBToModelGetPosts } from '../utils/mapping/community'
import UploadServices from './UploadServices'
import NotFoundError from '../exceptions/NotFoundError'
import admin from '../config/FirebaseAdmin'

const uploadServices = new UploadServices()
export default class CommunityServices {
  _pool: any
  _uploadServices: any
  constructor () {
    this._pool = db
    this._uploadServices = uploadServices
  }

  async getPosts (): Promise<any> {
    try {
      const query = `SELECT post.POST_ID, post.USERID, user.USERNAME, post.POST_BODY, post.POST_TIME, post.POST_LIKES, post.POST_IMAGE
      FROM post
      INNER JOIN user ON user.USERID = post.USERID
      ORDER BY post.POST_TIME DESC`
      const [queryResult] = await this._pool.execute(query)
      if (queryResult.length === 0) throw new NotFoundError('Post not found')
      const formattedResult = await Promise.all(queryResult.map(async (post: any) => {
        const { photoURL } = await admin.auth().getUser(post.USERID)
        return {
          id: post.POST_ID,
          user: {
            userId: post.USERID,
            username: post.USERNAME,
            image: photoURL
          },
          postBody: post.POST_BODY,
          postTime: post.POST_TIME,
          postLikes: post.POST_LIKES,
          postImage: post.POST_IMAGE
        }
      }))
      return formattedResult
    } catch (error) {
      throw error
    }
  }

  async getPostHistory (id: string): Promise<any> {
    try {
      const postQuery = 'SELECT * FROM post WHERE USERID = ?'
      const values = [id]
      const [postResult] = await this._pool.execute(postQuery, values)
      const post = postResult.map(mapDBToModel)
      return post
    } catch (error: any) {
      throw error
    }
  }

  async addPost (userId: string, data: UserPostType): Promise<void> {
    const query = 'INSERT INTO post VALUES (?, ?, ?, ?, ?, ?)'
    const values = [data.postId, userId, data.postBody, data.postTime, data.postLikes]
    data.postImage ? values.push(data.postImage) : values.push('')

    try {
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async addPostLike (idPost: string): Promise<void> {
    try {
      const query = 'UPDATE post SET POST_LIKES = POST_LIKES + 1 WHERE POST_ID = ?'
      const values = [idPost]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async decPostLike (idPost: string): Promise<void> {
    try {
      const query = 'UPDATE post SET POST_LIKES = POST_LIKES - 1 WHERE POST_ID = ?'
      const values = [idPost]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async checkPostExist (idPost: string): Promise<void> {
    const query = 'SELECT POST_ID FROM post WHERE POST_ID = ?'
    const values = [idPost]
    try {
      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0) {
        throw new NotFoundError('Post Not Found!')
      }
    } catch (error) {
      throw error
    }
  }
}
