import express, { type Request, type Response } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import UserServices from '../../services/UserServices'
import admin from '../../config/FirebaseAdmin'
import app from '../../config/FirebaseConfig'
import UsersValidator from '../../validator/user'
import { type PostUserType, type CreateUserRequestBodyType, type LoginBodyType } from '../../utils/types/UserTypes'

dotenv.config({ path: '.env' })
const router = express.Router()
const upload = multer()
const userServices = new UserServices()
const auth = getAuth(app)

router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    UsersValidator.validateUserRegisterPayload(req.body)
    const { firstname, lastname, username, email, password }: CreateUserRequestBodyType = req.body
    const id = `user-${nanoid(10)}`
    const userData: PostUserType = {
      id,
      firstname,
      lastname,
      username,
      email,
      point: 0
    }

    await userServices.addUser(userData)

    const userRecord = await admin.auth().createUser({
      uid: id,
      displayName: username,
      email,
      password,
      photoURL: `${process.env.GS_URL}/User/profil.jpg`,
      emailVerified: true,
      disabled: false
    })
    res.status(201).send({
      status: 'Success',
      message: 'User Created',
      data: {
        id: userRecord.uid
      }
    })
  } catch (error: any) {
    console.log(error)
    res.status(error.statusCode | 500).send({
      status: 'Failed',
      message: error
    })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const user: LoginBodyType = {
      email: req.body.email,
      password: req.body.password
    }
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
    res.status(error.statusCode | 500).send({ error: error.message })
  }
})

export default router
