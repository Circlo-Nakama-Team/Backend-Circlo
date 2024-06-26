import db from '../config/DBConfig'
import gc from '../config/StorageConfig'

const bucket = gc.bucket('circlo-bucket')
export default class UploadServices {
  _pool: any
  constructor () {
    this._pool = db
  }

  async uploadUserImage (filename: string, buffer: any): Promise<string | any> {
    try {
      const file = bucket.file(`User/${filename}`)
      await file.save(buffer)
      return file.name
    } catch (error) {
      throw error
    }
  }

  async uploadPostImage (filename: string, buffer: any): Promise<string | any> {
    try {
      const file = bucket.file(`Post/${filename}`)
      await file.save(buffer)
      return file.name
    } catch (error) {
      throw error
    }
  }

  async uploadDonateImage (filename: string, buffer: any): Promise<string | any> {
    try {
      const file = bucket.file(`Donate/${filename}`)
      await file.save(buffer)
      return file.name
    } catch (error) {
      throw error
    }
  }

  async uploadPredictImage (filename: string, buffer: any): Promise<any> {
    try {
      const file = bucket.file(`Predict/${filename}`)
      await file.save(buffer)
      return { filename: file.name, file }
    } catch (error) {
      throw error
    }
  }
}
