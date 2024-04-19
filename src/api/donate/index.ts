import express, { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'
import multer from 'multer'

import DonateHandler from './handler'
import DonateServices from '../../services/DonateServices'
import DonateValidator from '../../validator/donate'

import AuthorizationError from '../../exceptions/AuthorizationError'
import admin from '../../config/FirebaseAdmin'
import { getMessaging } from 'firebase-admin/messaging'

dotenv.config({ path: '.env' })
const upload = multer()
const router = express.Router()
const donateServices = new DonateServices()
const handler = new DonateHandler(donateServices, DonateValidator)

router.post('/', upload.array('image', 3), async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthorizationError('Authorization Header Required')
    if (req.files) req.body.image = req.files
    const donateId = await handler.postDonateHandler(credential, req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Success Add Donate',
      data: {
        donateId
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthorizationError('Authorization Header Required')
    const donateData = await handler.getDonateHandler(credential)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User Donate',
      data: {
        donateData
      }
    })
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthorizationError('Authorization Header Required')
    const donateData = await handler.getDonateByIdHandler(credential, id)
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User Donate',
      data: {
        donateData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/schedule/time', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const donateSchedule = await handler.getDonateScheduleHandler()
    res.status(200).json({
      status: 'Success',
      message: 'Success Get User Donate',
      data: {
        donateSchedule
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/send', async (req, res) => {
  console.log('hcalll')
  const message = {
    token: 'fQeeM5awProE2UuPgmlLBr:APA91bE6DjZO3NC2g3MPdbGpTHVtn80p1gkU6IbTkuFt1ufcJoz1hUq3ErdIG7Yy_C9u-4FwJ3mgJB3OIyd9GkZlTH8ak8X1R693PA8tk9v8z0_HuiD2HiA2SaKxUgSy6NNxZRj_4hRX',
    notification: {
      title: 'Notif',
      body: 'This is a Test Notification'
    },
  }
  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: 'Successfully sent message'
      })
      console.log('Successfully sent message:', response)
    })
    .catch((error) => {
      res.status(400)
      res.send(error)
      console.log('Error sending message:', error)
    })
})

export default router
