import AuthorizationError from '../exceptions/AuthorizationError'
import admin from 'firebase-admin'

const authorize = async (credential: string): Promise<any> => {
  try {
    const checkRevoked = true
    const token = credential.split(' ')[1]
    const decodedToken = await admin.auth().verifyIdToken(token, checkRevoked)
    return decodedToken
  } catch (error) {
    throw new AuthorizationError('Unauthorized Request')
  }
}

export default authorize
