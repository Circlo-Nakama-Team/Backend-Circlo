import express, { type Request, type Response, type NextFunction } from 'express'
import { nanoid } from 'nanoid'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { sendEmailVerificationLink, sendPasswordResetLink } from '../../services/EmailServices'
import axios from 'axios'

import UserServices from '../../services/UserServices'
import admin from '../../config/FirebaseAdmin'
import app from '../../config/FirebaseConfig'
import UsersValidator from '../../validator/user'
import { type PostUserType, type CreateUserRequestBodyType, type LoginBodyType, type CreateUserGoogleRequestBodyType } from '../../utils/types/UserTypes'

import AuthenticationServices from '../../services/AuthenticationServices'
import AuthenticationError from '../../exceptions/AuthenticationError'

import OauthServices from '../../services/OauthServices'
import config from '../../config/EnvConfig'
import ClientError from '../../exceptions/ClientError'
import NotFoundError from '../../exceptions/NotFoundError'

const params = new URLSearchParams()
const router = express.Router()
const userServices = new UserServices()
const oauthServices = new OauthServices()
const Oauth2Client = oauthServices._client
const auth = getAuth(app)

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
    const userRecord: any = await admin.auth().createUser({
      uid: id,
      displayName: username,
      email,
      password,
      photoURL: `${config.GS_URL}/User/profil.jpg`,
      disabled: false,
      emailVerified: false
    })
    const actionCodeSettings = {
      url: `${config.BASE_URL}/auth/redirect`,
      handleCodeInApp: true
    }

    const emailVerificationLink: string = await admin.auth().generateEmailVerificationLink(userRecord.email, actionCodeSettings)
    await sendEmailVerificationLink(userRecord.email, userRecord.displayName, emailVerificationLink)
    await userServices.addUser(userData)

    res.status(201).send({
      status: 'Success',
      message: 'Please verify your email before login, The link has been sent to your email'
    })
  } catch (error: any) {
    next(error)
  }
})

router.post('/register-google', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isUserExist = await userServices.getUserIdByEmail(req.body.email)
    UsersValidator.validateUserRegisterGooglePayload(req.body)
    const { uid } = await admin.auth().getUserByEmail(req.body.email)
    const idFcmToken = `fcm-${nanoid(10)}`
    if (isUserExist) {
      const userFcmTokens = await userServices.getFcmToken(uid)
      const isUserFcmTokenExist = userFcmTokens.some((token: any) => token.TOKEN === req.body.fcmToken)

      if (!isUserFcmTokenExist) {
        await userServices.addFcmToken(idFcmToken, uid, req.body.fcmToken)
      }

      throw new ClientError('User Already Exist')
    }
    await userServices.addFcmToken(idFcmToken, uid, req.body.fcmToken)
    const userData: PostUserType = {
      id: uid,
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
        userId: userData.id
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/oauth', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUrl = await oauthServices.getAuthUrl()
    res.redirect(authUrl)
  } catch (error) {
    next(error)
  }
})

// router.get('/google/callback', async (req: Request, res: Response, next: NextFunction) => {
//   const { code } = req.query
//   console.log(code)
//   const oAuth2Client = oauthServices._client
//   const { tokens } = await oAuth2Client.getToken(code)
//   oAuth2Client.setCredentials(tokens)
//   const userData = await oauthServices.getUserData(oAuth2Client)
//   // const redirectUri = `circloapp://auth/callback?credential=${tokens.id_token}&refreshToken=${tokens.refresh_token}`
//   // const redirectUri = `https://23ee-103-3-222-110.ngrok-free.app/?credential=${tokens.id_token}&refreshToken=${tokens.refresh_token}`

//   // res.redirect(redirectUri)
//   res.status(200).send({
//     status: 'success',
//     message: 'Masuk Berhasil',
//     data: {
//       token: {
//         credential: tokens.id_token,
//         accessToken: tokens.access_token,
//         refreshToken: tokens.refresh_token
//       },
//       userData: {
//         name: userData.given_name,
//         email: userData.email,
//         image: userData.picture
//       }
//     }
//   })
// })
router.get('/google/callback', async (req: Request, res: Response, next: NextFunction) => {
  const { code }: { code?: string } = req.query || {}
  if (code) {
    try {
      const oAuth2Client = oauthServices._client

      // Retrieve tokens using the authorization code
      const { tokens } = await oAuth2Client.getToken(code)

      // Set credentials with the obtained tokens
      oAuth2Client.setCredentials(tokens)

      // Construct the redirect URI with tokens
      // const redirectUri = `circloapp://auth/callback?credential=${encodeURIComponent(tokens.id_token)}&refreshToken=${encodeURIComponent(tokens.refresh_token)}`
      const redirectUri = `http://localhost:5000/?credential=${encodeURIComponent(tokens.id_token)}&refreshToken=${encodeURIComponent(tokens.refresh_token)}`
      // Redirect to the custom URI scheme URL
      res.redirect(redirectUri)
    } catch (error) {
      next(error)
    }
  } else {
    // Handle case where 'code' is missing or undefined
    const errorMessage = 'Authorization code (code) is missing or invalid'
    res.status(500).send({ error: errorMessage })
  }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    UsersValidator.validateUserLoginPayload(req.body)
    const user: LoginBodyType = {
      email: req.body.email,
      password: req.body.password,
      fcmToken: req.body.fcmToken
    }
    const { emailVerified } = await admin.auth().getUserByEmail(user.email)
    if (!emailVerified) throw new ClientError('Email Not Verified')

    const signInResponse = await signInWithEmailAndPassword(auth, user.email, user.password)
    const { uid } = signInResponse.user
    const credential = await signInResponse.user.getIdToken(true)
    const refreshToken = signInResponse.user.refreshToken

    let isUserFcmTokenExist
    const userFcmTokens = await userServices.getFcmToken(uid, 'login')
    if (userFcmTokens.length > 0) {
      isUserFcmTokenExist = userFcmTokens.some((token: any) => token.TOKEN === req.body.fcmToken)
    }

    if (!isUserFcmTokenExist || userFcmTokens.length === 0) {
      const idFcmToken = `fcm-${nanoid(10)}`
      await userServices.addFcmToken(idFcmToken, uid, req.body.fcmToken)
    }
    res.status(200).send({
      status: 'success',
      message: 'Masuk Berhasil',
      data: {
        credential,
        refreshToken
      }
    })
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
      // Handle the specific FirebaseError
      // You can create a custom error message here
      const customErrorMessage = 'Invalid credentials. Please check your username and password.'
      // You can also throw a new Error with your custom message if needed
      next(new ClientError(customErrorMessage))
    } else {
      next(error)
    }
  }
})

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization
  if (!token) throw new AuthenticationError('Request Missing Auth Header')

  const decodedToken = await AuthenticationServices(token)
  const { uid: userId } = decodedToken
  try {
    await admin.auth().revokeRefreshTokens(userId)
    res.status(200).json({ status: 'success', message: 'Logout Berhasil' })
  } catch (error) {
    try {
      await Oauth2Client.revokeToken(token)
    //   oAuth2Client.revokeToken(a.refresh_token);
    // oAuth2Client.revokeCredentials();
    } catch (error) {
      next(error)
    }
  }
})

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body

    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refreshToken)

    const refreshingToken = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${config.API_KEY}`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    res.status(201).json({ status: 'Success', message: 'Refreshing Access Token Success', credential: refreshingToken.data.access_token })
  } catch (error) {
    next(error)
  }
})

router.post('/forget-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const actionCodeSettings = {
      url: `${config.BASE_URL}/auth/redirect`,
      handleCodeInApp: true
    }

    const resetPassLink: string = await admin.auth().generatePasswordResetLink(email, actionCodeSettings)
    const { displayName } = await admin.auth().getUserByEmail(req.body.email)
    if (!displayName) {
      throw new NotFoundError('User not found')
    }
    await sendPasswordResetLink(email, displayName, resetPassLink)
    res.status(200).json({ status: 'Success', message: 'Please Check Your Email To Reset Password' })
  } catch (error) {
    next(error)
  }
})

router.get('/redirect', async (req: Request, res: Response, next: NextFunction) => {
  const redirectLink = config.MOBILE_APP_URL ? config.MOBILE_APP_URL : 'circloapp://auth/callback'
  res.redirect(redirectLink)
})

export default router
