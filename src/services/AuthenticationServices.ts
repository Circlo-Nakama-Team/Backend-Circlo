import AuthenticationError from '../exceptions/AuthenticationError'
import admin from 'firebase-admin'
const authenticate = async (credential: string): Promise<any> => {
  try {
    const checkRevoked = true
    const token = credential.split(' ')[1]
    const decodedToken = await admin.auth().verifyIdToken(token, checkRevoked)
    return decodedToken
  } catch (error) {
    throw new AuthenticationError('Unauthenticate')
  }
}

export default authenticate
