import db from '../config/DBConfig'
import { nanoid } from 'nanoid'
import moment from 'moment'
import { mapDBToModelUserDonate, mapDBModelDonateSchedule } from '../utils/mapping/donate'
import NotFoundError from '../exceptions/NotFoundError'
export default class DonateServices {
  _pool: any
  _uploadServices: any
  constructor () {
    this._pool = db
  }

  async addDonate (userId: string, data: any): Promise<any> {
    try {
      const addressDetail = data.address_detail ? data.address_detail : null
      const donateStatus = data.donate_method.toLowerCase() === 'self-delivery' ? 'Waiting To Be Delivered To Circlo Point' : 'Waiting To Be Picked Up'
      const currentTime = new Date().toLocaleString()
      const formattedCurrentTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss')

      const id = `donate_${nanoid(16)}`
      const query = 'INSERT INTO donate VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      const values = [id, data.trashCategoriesId, userId, null, data.address, addressDetail, data.donate_method, data.donate_description, donateStatus, 0, data.donate_date, data.donate_schedule, formattedCurrentTime]

      await this._pool.execute(query, values)
      return id
    } catch (error) {
      throw error
    }
  }

  async getUserDonate (userId: string): Promise<any> {
    try {
      const query = `SELECT donate.DONATEID, donate.TRASHCATEGORIESID, donate.USERID,
      donate.DONATE_WEIGHT, donate.DONATE_ADDRESS, donate.DONATE_ADDRESS_DETAIL,
      donate.DONATE_METHOD, donate.DONATE_DESCRIPTION, donate.DONATE_STATUS, 
      donate.DONATE_POINT, donate.DONATE_DATE, donate.CREATED_AT,
      donate_schedule.START_TIME, donate_schedule.END_TIME, 
      user.FIRSTNAME, user.LASTNAME, user.EMAIL,
      categories.CATEGORIES_NAME, categories.REWARD_POINT FROM donate 
      INNER JOIN donate_schedule ON donate.SCHEDULEID = donate_schedule.SCHEDULEID
      INNER JOIN user ON donate.USERID = user.USERID
      INNER JOIN categories ON donate.TRASHCATEGORIESID = categories.CATEGORIESID
      WHERE donate.USERID = ?`
      const values = [userId]

      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0) throw new NotFoundError('Donate Data not found')
      const formattedDonateData = queryResult.map(mapDBToModelUserDonate)
      return formattedDonateData
    } catch (error) {
      throw error
    }
  }

  async getCertainUserDonate (userId: string, donateId: string): Promise<any> {
    try {
      const query = `SELECT donate.DONATEID, donate.TRASHCATEGORIESID, donate.USERID,
      donate.DONATE_WEIGHT, donate.DONATE_ADDRESS, donate.DONATE_ADDRESS_DETAIL,
      donate.DONATE_METHOD, donate.DONATE_DESCRIPTION, donate.DONATE_STATUS, 
      donate.DONATE_POINT, donate.DONATE_DATE, donate.CREATED_AT,
      donate_schedule.START_TIME, donate_schedule.END_TIME, 
      user.FIRSTNAME, user.LASTNAME, user.EMAIL,
      categories.CATEGORIES_NAME, categories.REWARD_POINT FROM donate 
      INNER JOIN donate_schedule ON donate.SCHEDULEID = donate_schedule.SCHEDULEID
      INNER JOIN user ON donate.USERID = user.USERID
      INNER JOIN categories ON donate.TRASHCATEGORIESID = categories.CATEGORIESID
      WHERE donate.USERID = ? AND donate.DONATEID = ?`
      const values = [userId, donateId]

      const [queryResult] = await this._pool.execute(query, values)
      if (queryResult.length === 0) throw new NotFoundError('Donate Data not found')

      const formattedDonateData = queryResult.map(mapDBToModelUserDonate)
      return formattedDonateData[0]
    } catch (error) {
      throw error
    }
  }

  async getDonateSchedule (): Promise<any> {
    try {
      const query = 'SELECT * FROM donate_schedule'
      const [queryResult] = await this._pool.execute(query)
      if (queryResult.length === 0) throw new NotFoundError('Donate schedule not found')

      const formattedDonateData = queryResult.map(mapDBModelDonateSchedule)
      return formattedDonateData
    } catch (error) {
      throw error
    }
  }

  async addDonateImage (donateId: string, imageId: string, link: string): Promise<any> {
    try {
      const query = 'INSERT INTO donate_trash_image VALUES (?, ?, ?)'
      const values = [imageId, donateId, link]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async getDonateImage (donateId: string): Promise<any> {
    try {
      const query = 'SELECT LINK FROM donate_trash_image WHERE DONATEID = ?'
      const values = [donateId]
      const [queryResult] = await this._pool.execute(query, values)
      const donateImage = await Promise.all(queryResult.map((image: any) => image.LINK))
      return donateImage
    } catch (error) {
      throw error
    }
  }

  async verifyDonateExist (donateId: string): Promise<any> {
    try {
      const query = 'SELECT * FROM donate WHERE DONATEID = ?'
      const values = [donateId]
      const [queryResult] = await this._pool.execute(query, values)

      if (queryResult.length === 0) {
        throw new NotFoundError('Donate not found')
      }
      // return queryResult[0].DONATEID
    } catch (error) {
      throw error
    }
  }

  async updateDonateStatus (id: string, status: string): Promise<void> {
    try {
      const query = 'UPDATE donate SET DONATE_STATUS = ? WHERE DONATEID = ?'
      const values = [status, id]
      await this._pool.execute(query, values)
    } catch (error) {
      throw error
    }
  }

  async getUserIdByDonateId (id: string): Promise<any> {
    try {
      const query = 'SELECT USERID FROM donate WHERE DONATEID = ?'
      const values = [id]
      const [queryResult] = await this._pool.execute(query, values)
      return queryResult[0].USERID
    } catch (error) {
      throw error
    }
  }
}
