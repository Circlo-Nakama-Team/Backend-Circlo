import db from '../config/DBConfig'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { mapDBToModelUserDonate } from '../utils/mapping/donate'
import NotFoundError from '../exceptions/NotFoundError'
dotenv.config({ path: '.env' })
export default class DonateServices {
  _pool: any
  constructor () {
    this._pool = db
  }

  async getTrashList (): Promise<any> {
    try {
      const query = `SELECT trash.TRASHID, trash.TRASH_TYPE, categories.CATEGORIES_NAME, categories.REWARD_POINT FROM trash
        INNER JOIN categories ON trash.CATEGORIESID = categories.CATEGORIESID`
      const [result] = await this._pool.execute(query)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getCertainTrashData (trashId: string): Promise<any> {
    try {
      const query = `SELECT trash.TRASH_TYPE AS trashType, categories.CATEGORIES_NAME AS category, trash.IMAGE AS image, categories.REWARD_POINT AS rewardPoint FROM trash 
      INNER JOIN categories ON trash.CATEGORIESID = categories.CATEGORIESID 
      WHERE TRASHID = ?`
      const values = [trashId]
      const [result] = await this._pool.execute(query, values)
      return result[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashIdeas (trashId: string): Promise<any> {
    try {
      const query = `SELECT IDEASID AS ideasId, IDEAS_NAME AS ideasName, IMAGE AS ideasImage, DESCRIPTION AS ideasDescription FROM ideas
      WHERE ideas.TRASHID = ?`
      const values = [trashId]
      const [result] = await this._pool.execute(query, values)

      if (result.length !== 0) {
        const queryLink = 'SELECT LINK AS tutorialLink, SOURCE AS linkSource FROM tutorial WHERE IDEASID = ?'
        await Promise.all(result.map(async (trash: any): Promise<any> => {
          const linkValues = [trash.ideasId]
          const [Linkresult] = await this._pool.execute(queryLink, linkValues)
          trash.link = Linkresult
        }))
      }
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
