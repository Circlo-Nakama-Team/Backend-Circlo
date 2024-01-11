import db from '../config/DBConfig'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import moment from 'moment'
import { mapDBToModelUserDonate } from '../utils/mapping/donate'
import NotFoundError from '../exceptions/NotFoundError'
dotenv.config({ path: '.env' })
export default class DonateServices {
  _pool: any
  _uploadServices: any
  constructor () {
    this._pool = db
  }

  async addDonate (userId: string, data: any): Promise<any> {
    try {
      const addressDetail = data.address_detail ? data.address_detail : null
      const donateStatus = data.donate_method === 'self-delivery' ? 'Waiting To Be Delivered To Circlo Point' : 'Waiting To Be Picked Up'
      const currentTime = new Date().toLocaleString()
      const formattedCurrentTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss')
      const donateTime = moment(currentTime).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss')

      const id = `donate_${nanoid(16)}`
      const query = 'INSERT INTO donate VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      const values = [id, data.trashId, userId, null, data.address, addressDetail, data.donate_method, donateStatus, 0, donateTime, formattedCurrentTime]

      await this._pool.execute(query, values)
      return id
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getUserDonate (userId: string): Promise<any> {
    try {
      const query = 'SELECT * FROM donate WHERE USERID = ?'
      const values = [userId]

      const [queryResult] = await this._pool.execute(query, values)
      const formattedDonateData = queryResult.map(mapDBToModelUserDonate)
      return formattedDonateData
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getCertainUserDonate (userId: string, donateId: string): Promise<any> {
    try {
      const query = `SELECT donate.*, user.FIRSTNAME, user.LASTNAME, user.EMAIL, trash.TRASH_TYPE, categories.CATEGORIES_NAME, categories.REWARD_POINT FROM donate 
      INNER JOIN user ON donate.USERID = user.USERID
      INNER JOIN trash ON donate.TRASHID = trash.TRASHID
      INNER JOIN categories ON trash.CATEGORIESID = categories.CATEGORIESID
      WHERE donate.USERID = ? AND donate.DONATEID = ?`
      const values = [userId, donateId]

      const [queryResult] = await this._pool.execute(query, values)
      console.log(queryResult)
      const formattedDonateData = queryResult.map(mapDBToModelUserDonate)
      return formattedDonateData[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async verifyDonateExist (donateId: string): Promise<any> {
    try {
      const query = 'SELECT * FROM donate WHERE DONATEID = ?'
      const values = [donateId]
      const [queryResult] = await this._pool.execute(query, values)

      if (queryResult.length === 0) {
        console.log(queryResult)
        throw new NotFoundError('Donate not found')
      }
      // return queryResult[0].DONATEID
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
