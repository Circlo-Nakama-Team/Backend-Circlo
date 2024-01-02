import express, { type Request, type Response } from 'express'
import multer from 'multer'
import app from '../../config/FirebaseConfig'
import { getAuth } from 'firebase/auth'
import dotenv from 'dotenv'

import UserHandler from './handler'
import UserServices from '../../services/UserServices'
import UsersValidator from '../../validator/user'

import AuthenticationError from '../../exceptions/AuthenticationError'

dotenv.config({ path: '.env' })
const router = express.Router()
const upload = multer()
const userServices = new UserServices()
const handler = new UserHandler(userServices, UsersValidator)
const auth = getAuth(app)

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')

    const user: any = await handler.getUserHandler(credential)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User',
      data: {
        user
      }
    })
  } catch (error: any) {
    res.status(error.statusCode | 500).json({
      status: 'Failed',
      message: error
    })
  }
})

router.put('/', upload.single('image'), async (req: Request, res: Response): Promise<any> => {
  try {
    if (req.file) {
      req.body.image = req.file
    }

    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')

    const userId = await handler.updateUserHandler(credential, req.body)

    res.status(200).json({
      status: 'Success',
      message: 'Success Update User',
      data: {
        userId
      }
    })
  } catch (error: any) {
    res.status(error.statusCode | 500).json({
      status: 'Failed',
      message: error
    })
  }
})
export default router
