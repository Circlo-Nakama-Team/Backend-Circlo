import authorize from '../../services/AuthorizationServices'

export default class UserHandler {
  _service: any
  _validator: any
  constructor (services: any, validator: any) {
    this._service = services
    this._validator = validator
  }

  async getUserHandler (credential: string): Promise<any> {
    try {
      const decodedToken = await authorize(credential)
      const { uid }: any = decodedToken
      const user = await this._service.getUserById(uid)
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateUserHandler (credential: string, payload: any): Promise<string> {
    try {
      const userImage = payload.image
      payload.image = payload.image.mimetype
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      this._validator.validateUserUpdatePayload(payload)
      payload.image = userImage
      console.log(payload.image)
      await this._service.updateUser(id, payload)

      return id
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
