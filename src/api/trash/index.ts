import express, { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import cheerio from 'cheerio'
import puppeteer from 'puppeteer'

import TrashHandler from './handler'
import TrashServices from '../../services/TrashServices'

import UploadServices from '../../services/UploadServices'

import AuthenticationError from '../../exceptions/AuthenticationError'
import axios from 'axios'

dotenv.config({ path: '.env' })
const router = express.Router()
const trashServices = new TrashServices()
const uploadServices = new UploadServices()
const handler = new TrashHandler(trashServices, uploadServices)

const upload = multer()

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const trashData = await handler.getTrashes()
    res.status(200).json({
      status: 'Success',
      message: 'Success Get Trash',
      data: {
        trashData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/categories', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const trashCategories = await handler.getTrashCategories()
    res.status(200).json({
      status: 'Success',
      message: 'Success Get Trash',
      data: {
        trashCategories
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/ideas', upload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const image = req.file

    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')

    const trashIdeas = await handler.getTrashIdeas(credential, image)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get Trash Ideas',
      data: {
        trashIdeas
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/explorer', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const trashData = await handler.getTrashExplorer()
    res.status(200).json({
      status: 'Success',
      message: 'Success Get Trash Explorer',
      data: {
        trashData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/article', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const url = 'https://www.letsrecycle.com/'
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const articles: Array<{ title: string, link: string, image: string, desc: string, date: string }> = []

    for (let index = 0; index < $('.article-card').length; index++) {
      // Stop when the articles array reaches a length of 7
      if (articles.length >= 7) {
        break
      }
      const element = $('.article-card')[index]
      const link = $(element).find('.article-meta a').attr('href')
      const desc = $(element).find('.article-meta a').text()
      const image = $(element).find('.article-image img').attr('data-lazy-src')
      const title = $(element).find('.article-details h3').text()
      const date = $(element).find('.article-details .article-meta .post-date').text()
      if (link && image && title && date) {
        articles.push({
          title,
          link,
          image,
          desc,
          date
        })
      }
    }

    res.status(200).json({
      status: 'Success',
      message: 'Success Get Articles',
      data: {
        articles
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/game', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { questions } = await handler.getTrashQuestions()
    res.status(200).json({
      status: 'Success',
      message: 'Success Get Trash Explorer',
      data: {
        questions
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
