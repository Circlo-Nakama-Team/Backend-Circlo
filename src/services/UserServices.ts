import db from '../config/DBConfig'
import { type PostUserType } from '../utils/types/UserTypes'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import UploadServices from './UploadServices'
import { nanoid } from 'nanoid'
import NotFoundError from '../exceptions/NotFoundError'
import { mapDBToModelUserAddress } from '../utils/mapping/users'
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
    try {
      const query = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?)'
      const values = [data.id, data.firstname, data.lastname, data.username, data.email, data.point, null]

      await this._pool.execute(query, values)
    } catch (error) {
      console.error(error)
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
      if (payload.addressId) {
        queryProperty.push('MAIN_ADDRESSID = ?')
        queryValues.push(payload.addressId)
      }
      if (payload.image) {
        const filename = await this._uploadServices.uploadUserImage(payload.image.originalname, payload.image.buffer)
        const encodedFilename = filename.replace(/ /g, '%20')
        await admin.auth().updateUser(id, {
          photoURL: `${process.env.GS_URL}/${encodedFilename}`
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

  async addAddressUser (idUser: string, payload: any): Promise<string | any> {
    try {
      const id = `address-${nanoid(10)}`
      const query = 'INSERT INTO address VALUES (?, ?, ?, ?, ?)'
      const values = [id, idUser, payload.address, payload.detail_address, payload.addressTitle]

      await this._pool.execute(query, values)

      const addressId = await this.verifiedAddressExist(id)
      return addressId
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(error)
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
      console.log(queryResult)
      return formattedQueryResult
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteAddressUser (userId: string, addressId: string): Promise<void> {
    try {
      const query = 'DELETE FROM address WHERE USERID = ? AND ADDRESSID = ?'
      const values = [userId, addressId]
      await this._pool.execute(query, values)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
