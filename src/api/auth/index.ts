import express, { type Request, type Response, type NextFunction } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth'
import { sendEmailVerificationLink } from '../../services/EmailServices'
import axios from 'axios'

import UserServices from '../../services/UserServices'
import admin from '../../config/FirebaseAdmin'
import app from '../../config/FirebaseConfig'
import UsersValidator from '../../validator/user'
import { type PostUserType, type CreateUserRequestBodyType, type LoginBodyType, type CreateUserGoogleRequestBodyType } from '../../utils/types/UserTypes'

import AuthenticationServices from '../../services/AuthenticationServices'
import AuthenticationError from '../../exceptions/AuthenticationError'

dotenv.config({ path: '.env' })
const params = new URLSearchParams()
const router = express.Router()
const upload = multer()
const userServices = new UserServices()
const auth = getAuth(app)

const actionCodeSettings = {
  url: 'http://localhost:5000' // Set the URL where the user will be directed after clicking the email verification link
  // android: {
  //   packageName: 'com.nakama.circlo',
  //   installApp: true,
  //   minimumVersion: '12'
  // },
}

router.post('/register', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    UsersValidator.validateUserRegisterPayload(req.body)
    const { firstname, lastname, username, email, password }: CreateUserRequestBodyType = req.body
    const id = `user-${nanoid(10)}`
    const userData: PostUserType = {
      id,
      firstname,
      lastname: lastname || null,
      username,
      email,
      point: 0
    }
    // const userRecord = await createUserWithEmailAndPassword(auth, email, password)
    // console.log(userRecord.user)
    // await sendEmailVerification(userRecord.user)
    const userRecord: any = await admin.auth().createUser({
      uid: id,
      displayName: username,
      email,
      password,
      photoURL: `${process.env.GS_URL}/User/profil.jpg`,
      disabled: false
    })
    // await admin.auth().createUser({
    //   uid: id,
    //   displayName: username,
    //   email,
    //   password,
    //   photoURL: `${process.env.GS_URL}/User/profil.jpg`,
    //   disabled: true
    // }).then(async (userRecord: any): Promise<any> => {
    //   console.log(userRecord)
    //   await admin.auth().generateEmailVerificationLink(userRecord.email, actionCodeSettings).then(async (link): Promise<any> => {
    //     console.log(link)
    //     await sendEmailVerificationLink(userRecord.email, userRecord.displayName, link)
    //   })
    // })
    await userServices.addUser(userData)

    res.status(201).send({
      status: 'Success',
      message: 'Success Add User',
      data: {
        userId: userRecord.uid
      }
    })
    // res.status(201).send({
    //   status: 'Success',
    //   message: 'Please verify your email, The link has been sent to your email'
    // })
  } catch (error: any) {
    console.log(error)
    next(error)
  }
})

router.post('/register-google', async (req: Request, res: Response, next: NextFunction) => {
  try {
    UsersValidator.validateUserRegisterGooglePayload(req.body)
    const userData: PostUserType = {
      id: req.body.userId,
      firstname: req.body.firstname,
      lastname: req.body.lastname || null,
      username: req.body.username,
      email: req.body.email,
      point: 0
    }
    await userServices.addUser(userData)

    res.status(201).send({
      status: 'Success',
      message: 'Success Add User',
      data: {
        userId: req.body.userId
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    UsersValidator.validateUserLoginPayload(req.body)
    const user: LoginBodyType = {
      email: req.body.email,
      password: req.body.password
    }
    // const isEmailVerified = await admin.auth().getUserByEmail(user.email)
    // console.log(isEmailVerified)
    const signInResponse = await signInWithEmailAndPassword(auth, user.email, user.password)
    const credential = await signInResponse.user.getIdToken(true)
    const refreshToken = signInResponse.user.refreshToken
    res.status(200).send({
      status: 'success',
      message: 'Masuk Berhasil',
      data: {
        credential,
        refreshToken
      }
    })
  } catch (error: any) {
    console.log(error)
    next(error)
  }
})

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization
    if (!token) throw new AuthenticationError('Request Missing Auth Header')

    const decodedToken = await AuthenticationServices(token)
    const { uid: userId } = decodedToken

    try {
      await admin.auth().revokeRefreshTokens(userId)
      res.status(200).json({ status: 'success', message: 'Logout Berhasil' })
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body

    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refreshToken)

    const refreshingToken = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    res.status(201).json({ status: 'Success', message: 'Refreshing Access Token Success', credential: refreshingToken.data.access_token })
  } catch (error) {
    next(error)
  }
})

export default router
