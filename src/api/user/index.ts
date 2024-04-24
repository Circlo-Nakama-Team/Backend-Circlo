import express, { type Request, type Response, type NextFunction } from 'express'
import multer from 'multer'
import app from '../../config/FirebaseConfig'
import { getAuth } from 'firebase/auth'
import dotenv from 'dotenv'

import UserHandler from './handler'
import UserServices from '../../services/UserServices'
import UsersValidator from '../../validator/user'

import CommunityServices from '../../services/CommunityServices'

import AuthenticationError from '../../exceptions/AuthenticationError'

dotenv.config({ path: '.env' })
const router = express.Router()
const upload = multer()
const userServices = new UserServices()
const communityServices = new CommunityServices()
const handler = new UserHandler(userServices, UsersValidator)
const auth = getAuth(app)

router.get('/profile', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')

    const user: any = await handler.getUserHandler(credential)
    const postHistory: any = await communityServices.getPostHistory(user.id)
    const address: any = await handler.getAddressHandler(user.id)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User',
      data: {
        user,
        postHistory,
        address
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/profile', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id: userId } = req.params
    const user: any = await handler.getUserByIdHandler(userId)
    const postHistory: any = await communityServices.getPostHistory(user.id)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User',
      data: {
        user,
        postHistory
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/profile', upload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/profile/address', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')
    const addressData = await handler.postAddressHandler(credential, req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Success Add User Address',
      data: {
        ...addressData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/profile/address/:id', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')
    const addressData = await handler.getAddressByIdHandler(credential, id)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User Address',
      data: {
        addressData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/profile/address/:id', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id: addressId } = req.params
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')
    await handler.putAddressHandler(credential, addressId, req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Success Update User Address'
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/profile/address/:addressId', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')
    const { addressId } = req.params
    await handler.deleteAddressHandler(credential, addressId)
    res.status(200).json({
      status: 'Success',
      message: 'Success Delete User Address'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/fcm-token', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')
    const { fcmToken } = req.body
    await handler.updateFcmToken(credential, fcmToken)
    res.status(200).json({
      status: 'Success',
      message: 'Success Update FCM Token'
    })
  } catch (error) {
    next(error)
  }
})
export default router
