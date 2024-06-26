import db from '../config/DBConfig'
import { type PostUserType } from '../utils/types/UserTypes'
import admin from 'firebase-admin'
import UploadServices from './UploadServices'
import { nanoid } from 'nanoid'
import NotFoundError from '../exceptions/NotFoundError'
import { mapDBToModelUserAddress } from '../utils/mapping/users'
import config from '../config/EnvConfig'

const uploadServices = new UploadServices()

export default class UserServices {
  _pool: any
  _uploadServices: any
  constructor () {
    this._pool = db
    this._uploadServices = uploadServices
  }

  async addUser (data: PostUserType): Promise<string | any> {
    try {
      const lastname = data.lastname ? data.lastname : null

      const query = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?)'
      const values = [data.id, data.firstname, lastname, data.username, data.email, data.point, null]

      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async getUserById (id: string): Promise <any> {
    try {
      const userQuery = 'SELECT FIRSTNAME,LASTNAME,POINT,MAIN_ADDRESSID FROM user WHERE USERID = ?'
      const values = [id]

      const userRecord = await admin.auth().getUser(id)
      const [queryResult] = await this._pool.execute(userQuery, values)
      if (queryResult.length === 0) throw new NotFoundError('User Not Found!')
      const lastname = queryResult[0].LASTNAME ? queryResult[0].LASTNAME : null
      const userData = {
        id: userRecord.uid,
        firstname: queryResult[0].FIRSTNAME,
        lastname,
        username: userRecord.displayName,
        email: userRecord.email,
        image: userRecord.photoURL,
        point: queryResult[0].POINT,
        main_addressId: queryResult[0].MAIN_ADDRESSID
      }
      return userData
    } catch (error) {
      throw error
    }
  }

  async getUserIdByEmail (email: string): Promise<any> {
    const userQuery = 'SELECT USERID FROM user WHERE EMAIL = ?'
    const values = [email]

    const [queryResult] = await this._pool.execute(userQuery, values)
    console.log(queryResult)
    if (queryResult.length === 0) return null
    return queryResult[0].USERID
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
      if (payload.addressId) {
        queryProperty.push('MAIN_ADDRESSID = ?')
        queryValues.push(payload.addressId)
      }
      if (payload.image) {
        const filename = await this._uploadServices.uploadUserImage(payload.image.originalname, payload.image.buffer)
        const encodedFilename = filename.replace(/ /g, '%20')
        await admin.auth().updateUser(id, {
          photoURL: `${config.GS_URL}/${encodedFilename}`
        })
      }

      const queryPropertyString: string = queryProperty.join(', ')
      queryValues.push(id)
      const query = 'UPDATE user SET ' + queryPropertyString + ' WHERE USERID = ?'

      const [queryResult] = await this._pool.execute(query, queryValues)
      return queryResult[0]
    } catch (error) {
      throw error
    }
  }

  async updateUserPoint (id: string, point: number): Promise<void> {
    try {
      const currentPoint = await this.getUserPoint(id)
      const newPoint = currentPoint + point
      const query = 'UPDATE user SET POINT = ? WHERE USERID = ?'
      const values = [newPoint, id]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async addAddressUser (idUser: string, payload: any): Promise<string | any> {
    try {
      const id = `address-${nanoid(10)}`
      const query = 'INSERT INTO address VALUES (?, ?, ?, ?, ?)'
      const values = [id, idUser, payload.address, payload.detail_address, payload.addressTitle]

      await this._pool.execute(query, values)

      const addressId = await this.verifiedAddressExist(id)
      return addressId
    } catch (error) {
      throw error
    }
  }

  async updateAddressUser (id: string, addressId: string, payload: any): Promise<void> {
    try {
      const queryState = []
      const queryValues = []
      if (payload.address) {
        queryState.push('ADDRESS = ?')
        queryValues.push(payload.address)
      }
      if (payload.detail_address) {
        queryState.push('DETAIL_ADDRESS = ?')
        queryValues.push(payload.detail_address)
      }
      if (payload.addressTitle) {
        queryState.push('TITLE = ?')
        queryValues.push(payload.addressTitle)
      }

      const queryPropertyString: string = queryState.join(', ')
      queryValues.push(id)
      queryValues.push(addressId)
      const query = `UPDATE address SET ${queryPropertyString} WHERE USERID = ? AND ADDRESSID = ?`
      await this._pool.execute(query, queryValues)
    } catch (error) {
      throw error
    }
  }

  async checkUserAddressExist (idAddress: string, userId: string): Promise<void> {
    const query = 'SELECT ADDRESSID,USERID FROM address WHERE ADDRESSID = ? AND USERID = ?'
    const values = [idAddress, userId]
    const [queryResult] = await this._pool.execute(query, values)
    if (queryResult.length === 0) {
      throw new NotFoundError('User Address Not Found!')
    }
  }

  async verifiedAddressExist (idAddress: string): Promise <string | any> {
    try {
      const query = 'SELECT ADDRESSID,USERID FROM address WHERE ADDRESSID = ?'
      const values = [idAddress]
      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0) {
        throw new NotFoundError('User Address Not Found!')
      }
      return {
        userId: queryResult[0].USERID,
        addressId: queryResult[0].ADDRESSID
      }
    } catch (error) {
      throw error
    }
  }

  async getUserAddressByUserId (userId: string): Promise <any> {
    try {
      const query = 'SELECT * FROM address WHERE USERID = ?'
      const values = [userId]
      const [queryResult] = await this._pool.execute(query, values)
      const formattedQueryResult = queryResult.map(mapDBToModelUserAddress)
      return formattedQueryResult
    } catch (error) {
      throw error
    }
  }

  async getCertainUserAddress (id: string, addressId: any): Promise<any> {
    try {
      const query = 'SELECT * FROM address WHERE USERID = ? AND ADDRESSID = ?'
      const values = [id, addressId]

      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0) throw new NotFoundError('User Address Not Found!')

      const formattedQueryResult = queryResult.map(mapDBToModelUserAddress)
      return formattedQueryResult
    } catch (error) {
      throw error
    }
  }

  async deleteAddressUser (userId: string, addressId: string): Promise<void> {
    try {
      const query = 'DELETE FROM address WHERE USERID = ? AND ADDRESSID = ?'
      const values = [userId, addressId]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async addFcmToken (idFcmToken: string, id: string, fcmToken: string): Promise<void> {
    try {
      const query = 'INSERT INTO fcm_token VALUES (?, ?, ?)'
      const values = [idFcmToken, id, fcmToken]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async checkFcmTokenExist (id: string): Promise<boolean> {
    try {
      const query = 'SELECT TOKEN FROM fcm_token WHERE USERID = ?'
      const values = [id]
      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0) return false
      return true
    } catch (error) {
      throw error
    }
  }

  async getFcmToken (id: string, mode?: string): Promise<any> {
    try {
      const query = 'SELECT TOKEN FROM fcm_token WHERE USERID = ?'
      const values = [id]
      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0 && mode !== 'login') throw new NotFoundError('User FCM Token Not Found!')
      return queryResult
    } catch (error) {
      throw error
    }
  }

  async getUserPoint (id: string): Promise<any> {
    try {
      const query = 'SELECT POINT FROM user WHERE USERID = ?'
      const values = [id]
      const [queryResult] = await this._pool.execute(query, values)
      const numPoint = Number(queryResult[0].POINT)
      return numPoint
    } catch (error) {
      throw error
    }
  }
}
