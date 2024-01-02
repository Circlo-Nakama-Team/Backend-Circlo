import db from '../config/DBConfig'
import { type UserPostType } from '../utils/types/CommunityTypes'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import UploadServices from './UploadServices'

const uploadServices = new UploadServices()
dotenv.config({ path: '.env' })
export default class CommunityServices {
  _pool: any
  _uploadServices: any
  constructor () {
    this._pool = db
    this._uploadServices = uploadServices
  }

  async getPosts (): Promise<any> {
    try {
      const query = 'SELECT * FROM post'
      const [queryResult] = await this._pool.execute(query)
      console.log(queryResult)
      return queryResult
    } catch (error) {
      console.error(error)
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
      console.error(error)
      throw error
    }
  }
}
