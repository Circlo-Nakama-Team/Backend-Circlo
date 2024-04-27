import axios from 'axios'
import { Readable } from 'stream'
import FormData from 'form-data'
import config from '../../config/EnvConfig'

import authorize from '../../services/AuthorizationServices'
import TrashValidator from '../../validator/trash'
export default class TrashHandler {
  _service: any
  _uploadServices: any
  _validator: any
  constructor (services: any, uploadServices: any) {
    this._service = services
    this._uploadServices = uploadServices
    this._validator = TrashValidator
  }

  async getTrashes (): Promise<any> {
    try {
      const trashData = await this._service.getTrashList()
      return trashData
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashCategories (): Promise<any> {
    try {
      const trashData = await this._service.getTrashCategoriesList()
      return trashData
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashIdeas (credential: string, image: any): Promise<any> {
    try {
      await authorize(credential)

      const { originalname, buffer, mimetype } = image
      await this._validator.validateImagePredictPayload({ image: mimetype })
      const { filename, file: filePredict } = await this._uploadServices.uploadPredictImage(originalname, buffer)
      const signedUrl = await filePredict.getSignedUrl({
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000 // 15 minutes
      })

      const response = await axios.get(signedUrl[0], {
        responseType: 'arraybuffer' // Ensure the response is treated as binary data
      })

      const formData = new FormData()

      // Convert the ArrayBuffer to a Node.js Readable Stream
      const stream = new Readable()
      stream.push(Buffer.from(response.data))
      stream.push(null)

      formData.append('file', stream, { filename })

      // Make the HTTP request using axios and the FormData object
      const predictionResponse = await axios.post(`${config.ML_SERVER}/predict/image`, formData, {
        headers: {
          ...formData.getHeaders()
        },
        responseType: 'json'
      })

      const predictResult = predictionResponse.data.detections
      const array = Object.values(predictResult)
      const uniqueTrashObjects = [...new Set(array.map((trash: any) => trash.label))].map(label => ({ trashId: label }))
      // const uniqueTrashObjects = array.map((trash: any): any => {
      //   if
      // })
      // const uniqueArray = array.filter((value: any, index: any, self: any) => {
      //   return index === self.findIndex((t: any) => (
      //     t.label === value.label
      //   ))
      // })
      const formattedArray = await Promise.all(uniqueTrashObjects.map(async (trash: any): Promise<any> => {
        const trashData = await this._service.getCertainTrashData(trash.trashId)
        const ideas = await this._service.getTrashIdeas(trash.trashId)
        // trash.ideas = ideas
        return {
          ...trash,
          ...trashData,
          ideas
        }
      }))
      return formattedArray
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashExplorer (): Promise<any> {
    try {
      const trashData = await this._service.getTrashExplorer()
      return trashData
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getTrashQuestions (): Promise<any> {
    try {
      const questionsData = await this._service.getTrashQuestions()
      const formattedData = questionsData.replaceAll(/`/g, '').replace(/json/g, '')
      const formattedQuestion = JSON.parse(formattedData)
      console.log(formattedQuestion)
      return formattedQuestion
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
