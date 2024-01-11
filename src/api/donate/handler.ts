import authorize from '../../services/AuthorizationServices'
import dotenv from 'dotenv'
import UploadServices from '../../services/UploadServices'
const uploadServices = new UploadServices()
dotenv.config({ path: '.env' })
export default class DonateHandler {
  _service: any
  _uploadService: any
  _validator: any
  constructor (services: any, validator: any) {
    this._service = services
    this._uploadService = uploadServices
    this._validator = validator
  }

  async postDonateHandler (credential: string, payload: any): Promise<any> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      this._validator.validateDonatePayload(payload)
      const donateId = await this._service.addDonate(id, payload)
      return donateId
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getDonateHandler (credential: string): Promise<any> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      const donateData = await this._service.getUserDonate(id)
      return donateData
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getDonateByIdHandler (credential: string, donateId: string): Promise<any> {
    try {
      const decodedToken = await authorize(credential)
      const { uid: id }: any = decodedToken
      const donateData = await this._service.getCertainUserDonate(id, donateId)
      return donateData
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
