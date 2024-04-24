import AuthorizationError from '../exceptions/AuthorizationError'
import admin from 'firebase-admin'
import OauthServices from './OauthServices'
import UserServices from './UserServices'

const oauthServices = new OauthServices()
const userServices = new UserServices()

const authorize = async (credential: string): Promise<any> => {
  const checkRevoked = true
  const token = credential.split(' ')[1]
  console.log(token)
  try {
    const decodedToken = await admin.auth().verifyIdToken(token, checkRevoked)
    return decodedToken
  } catch (error) {
    try {
      const { payload } = await oauthServices.validateToken(token)
      const { email } = payload
      console.log(email)
      const userId = await userServices.getUserIdByEmail(email)
      console.log(userId)
      return { uid: userId }
    } catch (error) {
      console.log(error)
      throw new AuthorizationError('Unauthorized Request')
    }
  }
}

export default authorize
