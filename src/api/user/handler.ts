import { type } from 'os'
import authorize from '../../services/AuthorizationServices'
import InvariantError from '../../exceptions/InvariantError'

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
      throw error
    }
  }

  async getUserByIdHandler (userId: string): Promise<any> {
    try {
      const user = await this._service.getUserById(userId)
      return user
    } catch (error) {
      throw error
    }
  }

  async updateUserHandler (credential: string, payload: any): Promise<string> {
    try {
      let userImage = null
      if (payload.image) {
        userImage = payload.image
        payload.image = payload.image.mimetype
      }
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      this._validator.validateUserUpdatePayload(payload)
      payload.image = userImage
      await this._service.updateUser(id, payload)

      return id
    } catch (error) {
      throw error
    }
  }

  async postAddressHandler (credential: string, payload: any): Promise<any> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      this._validator.validateUserAddressPayload(payload)
      const addressId = await this._service.addAddressUser(id, payload)
      return addressId
    } catch (error) {
      throw error
    }
  }

  async getAddressHandler (id: string): Promise<any> {
    try {
      const address = await this._service.getUserAddressByUserId(id)
      return address
    } catch (error) {
      throw error
    }
  }

  async getAddressByIdHandler (credential: string, addressId: any): Promise<any> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      const address = await this._service.getCertainUserAddress(id, addressId)
      return address
    } catch (error) {
      throw error
    }
  }

  async putAddressHandler (credential: string, addressId: string, payload: any): Promise<void> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      this._validator.validateUpdateUserAddressPayload(payload)
      await this._service.checkUserAddressExist(addressId, id)
      await this._service.updateAddressUser(id, addressId, payload)
    } catch (error) {
      throw error
    }
  }

  async deleteAddressHandler (credential: string, addressId: string): Promise<void> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      await this._service.checkUserAddressExist(addressId, id)
      await this._service.deleteAddressUser(id, addressId)
    } catch (error) {
      throw error
    }
  }

  async updateFcmToken (credential: string, fcmToken: string): Promise<void> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      await this._service.updateFcmToken(id, fcmToken)
    } catch (error) {
      throw error
    }
  }

  async updatePoint (credential: string, payload: any): Promise<void> {
    try {
      this._validator.validateUserUpdatePointPayload(payload)
      const { point } = payload
      if (typeof point === 'string') throw new InvariantError('Point must be a number')
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      await this._service.updateUserPoint(id, point)
    } catch (error) {
      throw error
    }
  }
}
