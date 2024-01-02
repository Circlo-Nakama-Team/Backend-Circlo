import db from '../config/DBConfig'
import { type PostUserType } from '../utils/types/UserTypes'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import UploadServices from './UploadServices'

const uploadServices = new UploadServices()
dotenv.config({ path: '.env' })
export default class UserServices {
  _pool: any
  _uploadServices: any
  constructor () {
    this._pool = db
    this._uploadServices = uploadServices
  }

  async addUser (data: PostUserType): Promise<string | any> {
    const query = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?)'
    const values = [data.id, data.firstname, data.lastname, data.username, data.email, data.point, '']

    try {
      const result = await this._pool.execute(query, values)
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getUserById (id: string): Promise <any> {
    try {
      const query = 'SELECT FIRSTNAME,LASTNAME,POINT,ADDRESS FROM user WHERE USERID = ?'
      const values = [id]

      const [queryResult] = await this._pool.execute(query, values)
      const userRecord = await admin.auth().getUser(id)

      const userData = {
        id: userRecord.uid,
        firstname: queryResult[0].FIRSTNAME,
        lastname: queryResult[0].LASTNAME,
        username: userRecord.displayName,
        email: userRecord.email,
        image: userRecord.photoURL,
        point: queryResult[0].POINT,
        address: queryResult[0].ADDRESS
      }
      return userData
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateUser (id: string, payload: any): Promise<string | any> {
    try {
      const queryProperty = []
      const queryValues = []

      if (payload.username) {
        queryProperty.push('USERNAME = ?')
        queryValues.push(payload.username)
        await admin.auth().updateUser(id, {
          displayName: payload.username
        })
      }
      if (payload.address) {
        queryProperty.push('ADDRESS = ?')
        queryValues.push(payload.address)
      }
      if (payload.image) {
        const filename = await this._uploadServices.uploadUserImage(payload.image.originalname, payload.image.buffer)
        await admin.auth().updateUser(id, {
          displayName: payload.username,
          photoURL: `${process.env.GS_URL}/${filename}`
        })
      }

      const queryPropertyString: string = queryProperty.join(', ')
      queryValues.push(id)
      const query = 'UPDATE user SET ' + queryPropertyString + ' WHERE USERID = ?'

      const [queryResult] = await this._pool.execute(query, queryValues)
      return queryResult[0]
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
