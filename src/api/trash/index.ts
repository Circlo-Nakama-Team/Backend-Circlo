import express, { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import multer from 'multer'

import TrashHandler from './handler'
import TrashServices from '../../services/TrashServices'

import UploadServices from '../../services/UploadServices'

import CommunityServices from '../../services/CommunityServices'

dotenv.config({ path: '.env' })
const router = express.Router()
const trashServices = new TrashServices()
const uploadServices = new UploadServices()
const communityServices = new CommunityServices()
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

router.get('/ideas', upload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const image = req.file
    const trashIdeas = await handler.getTrashIdeas(image)
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

export default router