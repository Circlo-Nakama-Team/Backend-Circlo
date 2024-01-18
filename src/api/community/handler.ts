import authorize from '../../services/AuthorizationServices'
import { nanoid } from 'nanoid'
import moment from 'moment'
import dotenv from 'dotenv'
import UploadServices from '../../services/UploadServices'
const uploadServices = new UploadServices()
dotenv.config({ path: '.env' })
export default class CommunityHandler {
  _service: any
  _uploadService: any
  _validator: any
  constructor (services: any, validator: any) {
    this._service = services
    this._uploadService = uploadServices
    this._validator = validator
  }

  async getPostsHandler (): Promise<any> {
    try {
      const posts = await this._service.getPosts()
      return posts
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addPostHandler (credential: string, payload: any): Promise<void> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: userId }: any = decodedToken
      let image = null

      if (payload.image) {
        image = payload.image
        payload.image = payload.image.mimetype
      }
      this._validator.validateUserPostPayload(payload)
      const postTime = new Date().toLocaleString()

      payload.postId = `post-${nanoid(16)}`
      payload.postTime = moment(postTime).format('YYYY-MM-DD HH:mm:ss')
      payload.postLikes = 0

      if (image !== null) {
        const imageFilename = await this._uploadService.uploadPostImage(image.originalname, image.buffer)
        const encodedFilename = imageFilename.replace(/ /g, '%20')
        payload.postImage = `${process.env.GS_URL}/${encodedFilename}`
      }

      await this._service.addPost(userId, payload)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addPostLikeHandler (idPost: string): Promise<void> {
    await this._service.checkPostExist(idPost)
    await this._service.addPostLike(idPost)
  }

  async decPostLikeHandler (idPost: string): Promise<void> {
    await this._service.checkPostExist(idPost)
    await this._service.decPostLike(idPost)
  }
}
