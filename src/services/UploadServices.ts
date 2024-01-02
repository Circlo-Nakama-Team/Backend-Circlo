import db from '../config/DBConfig'
import admin from 'firebase-admin'
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
      console.log(error)
      throw error
    }
  }

  async uploadPostImage (filename: string, buffer: any): Promise<string | any> {
    try {
      const file = bucket.file(`Post/${filename}`)
      await file.save(buffer)
      return file.name
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
