import express, { type Request, type Response, type NextFunction } from 'express'
import dotenv from 'dotenv'

import DonateHandler from './handler'
import DonateServices from '../../services/DonateServices'
import DonateValidator from '../../validator/donate'

import AuthorizationError from '../../exceptions/AuthorizationError'

dotenv.config({ path: '.env' })
const router = express.Router()
const donateServices = new DonateServices()
const handler = new DonateHandler(donateServices, DonateValidator)

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthorizationError('Authorization Header Required')
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

export default router
