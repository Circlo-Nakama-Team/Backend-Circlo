import AuthenticationError from '../exceptions/AuthenticationError'
import admin from 'firebase-admin'
import OauthServices from './OauthServices'
import UserServices from './UserServices'
import ClientError from '../exceptions/ClientError'

const oauthServices = new OauthServices()
const userServices = new UserServices()
const authenticate = async (credential: string): Promise<any> => {
  const checkRevoked = true
  if (!credential) throw new AuthenticationError('Unauthenticate Request. Please pass Auth header')
  const token = credential.split(' ')[1]
  try {
    const decodedToken = await admin.auth().verifyIdToken(token, checkRevoked)
    return decodedToken
  } catch (error) {
    try {
      const { email } = await oauthServices.validateToken(token)
      const userId = await userServices.getUserIdByEmail(email)
      return { uid: userId }
    } catch (error) {
      throw new ClientError('invalid token')
    }
  }
}

export default authenticate
