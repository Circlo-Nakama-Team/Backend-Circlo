import authorize from '../../services/AuthorizationServices'
import dotenv from 'dotenv'
import UploadServices from '../../services/UploadServices'
import { nanoid } from 'nanoid'
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

      const { image } = payload
      payload.image = await Promise.all(payload.image.map((image: any) => image.mimetype))

      this._validator.validateDonatePayload(payload)
      const donateId = await this._service.addDonate(id, payload)
      await Promise.all(image.map(async (image: any): Promise<void> => {
        const imageId = `${donateId}_${nanoid(10)}`
        const filename = `${imageId}_${image.originalname}`

        const file = await this._uploadService.uploadDonateImage(filename, image.buffer)
        const link = `${process.env.GS_URL}/${file}`
        console.log(link)
        this._service.addDonateImage(donateId, imageId, link)
        return
      }))
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
      const fixedDonateData = await Promise.all(donateData.map(async (donateData: any): Promise<any> => {
        const image = await this._service.getDonateImage(donateData.donateId)
        donateData.image = image
        return donateData
      }))
      return fixedDonateData
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
      const image = await this._service.getDonateImage(donateData.donateId)
      const fixedDonateData = {
        ...donateData,
        image
      }
      return fixedDonateData
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getDonateScheduleHandler (): Promise<any> {
    try {
      const donateData = await this._service.getDonateSchedule()
      return donateData
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
