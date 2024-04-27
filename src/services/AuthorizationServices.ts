import AuthorizationError from '../exceptions/AuthorizationError'
import admin from 'firebase-admin'
import OauthServices from './OauthServices'
import UserServices from './UserServices'

const oauthServices = new OauthServices()
const userServices = new UserServices()

const authorize = async (credential: string): Promise<any> => {
  const checkRevoked = true
  if (!credential) throw new AuthorizationError('Unathorized Request. Please pass Auth header')
  const token = credential.split(' ')[1]
  console.log(token)
  try {
    const decodedToken = await admin.auth().verifyIdToken(token, checkRevoked)
    return decodedToken
  } catch (error) {
    try {
      const { email } = await oauthServices.validateToken(token)
      console.log(email)
      const userId = await userServices.getUserIdByEmail(email)
      return { uid: userId }
    } catch (error) {
      console.log(error)
      throw new AuthorizationError('Unauthorized Request. Your Token Invalid')
    }
  }
}

export default authorize
