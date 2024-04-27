import db from '../config/DBConfig'
import { mapDBModelTrashCategories } from '../utils/mapping/trash'
import NotFoundError from '../exceptions/NotFoundError'
import { GoogleGenerativeAI } from '@google/generative-ai'
import config from '../config/EnvConfig'
export default class TrashServices {
  _pool: any
  _AIClient: any
  constructor () {
    this._pool = db
    this._AIClient = new GoogleGenerativeAI(config.AI_KEY ? config.AI_KEY : '')
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

  async getTrashCategoriesList (): Promise<any> {
    try {
      const query = 'SELECT * FROM categories'
      const [result] = await this._pool.execute(query)
      const formattedResult = await result.map(mapDBModelTrashCategories)
      return formattedResult
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
      const query = `SELECT IDEASID AS ideasId, IDEAS_NAME AS ideasName, IMAGE AS ideasImage, DESCRIPTION AS ideasDescription, PRICE AS potensial_price FROM ideas
      WHERE ideas.TRASHID = ?`
      const values = [trashId]
      const [result] = await this._pool.execute(query, values)

      if (result.length !== 0) {
        const queryLink = 'SELECT TITLE AS title, LINK AS tutorialLink, SOURCE AS linkSource, CREATOR AS creator FROM tutorial WHERE IDEASID = ?'
        const queryBenefits = 'SELECT DESCRIPTION AS description FROM ideas_benefit WHERE IDEASID = ?'
        await Promise.all(result.map(async (trash: any): Promise<any> => {
          const linkAndBenefitsValues = [trash.ideasId]
          const [linkResult] = await this._pool.execute(queryLink, linkAndBenefitsValues)
          const [benefitsResult] = await this._pool.execute(queryBenefits, linkAndBenefitsValues)
          const formattedBenefitList = await benefitsResult.map((benefit: any) => benefit.description)
          trash.link = linkResult
          trash.benefits = formattedBenefitList
        }))
      }
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashExplorer (): Promise<any> {
    try {
      const model = this._AIClient.getGenerativeModel({ model: 'gemini-pro' })
      const prompt = `Can you provide informations of crafts that made 
      from some waste and its accessible product image url,give information about how much potential price in markets if 
      we sell it and how to make it?. Don't hallusinate, just give information based on data you have`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      return text
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashQuestions (): Promise<any> {
    try {
      const model = this._AIClient.getGenerativeModel({ model: 'gemini-pro' })
      const prompt = `Can you provide 3 Questions about trash with 4 possible answers, provide the correct answer and give the explanation?.
      provide my request with json format.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      return text
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
