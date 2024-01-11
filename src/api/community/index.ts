import express, { type Request, type Response, type NextFunction } from 'express'
import admin from '../../config/FirebaseAdmin'
import multer from 'multer'
import app from '../../config/FirebaseConfig'
import { getAuth } from 'firebase/auth'
import dotenv from 'dotenv'

import CommunityHandler from './handler'
import CommunityServices from '../../services/CommunityServices'
import CommunityValidator from '../../validator/community'

import AuthenticationError from '../../exceptions/AuthenticationError'

dotenv.config({ path: '.env' })
const router = express.Router()
const upload = multer()
const communityServices = new CommunityServices()
const handler = new CommunityHandler(communityServices, CommunityValidator)
const auth = getAuth(app)

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const posts = await handler.getPostsHandler()
    res.status(200).json({
      status: 'Success',
      message: 'Success Get Posts',
      data: {
        posts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/post', upload.single('image'), async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    if (req.file) req.body.image = req.file
    const credential: string | undefined = req.headers.authorization
    if (!credential) throw new AuthenticationError('Authorization Header Required')

    await handler.addPostHandler(credential, req.body)
    res.status(200).json({
      status: 'Success',
      message: 'Success Add Post'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/post/:id/likes/add', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id: idPost } = req.params
    await handler.addPostLikeHandler(idPost)
    res.status(200).json({
      status: 'Success',
      message: 'Success Add Like Post'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/post/:id/likes/dec', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id: idPost } = req.params
    await handler.decPostLikeHandler(idPost)
    res.status(200).json({
      status: 'Success',
      message: 'Success Unlike Post'
    })
  } catch (error) {
    next(error)
  }
})

export default router
