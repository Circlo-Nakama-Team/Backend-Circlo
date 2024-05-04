// import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { google } from 'googleapis'
import config from '../config/EnvConfig'
import { OAuth2Client } from 'google-auth-library'
import AuthorizationError from '../exceptions/AuthorizationError'
export default class OauthServices {
  _scope: string[]
  _client: any
    // _provider: any
    // _auth: any
  constructor () {
    // this._provider = new GoogleAuthProvider()
    // this._auth = getAuth()
    this._scope = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]

    this._client = new google.auth.OAuth2(
      config.CLIENT_ID,
      config.CLIENT_SECRET,
      config.REDIRECT_URL
    )
    // this._provider.addScope(this._scope)
  }

  async getAuthUrl (): Promise<string> {
    return this._client.generateAuthUrl({
      access_type: 'offline',
      scope: this._scope,
      include_granted_scopes: true,
      prompt: 'consent'
    })
  }

  async getUserData (oauthClient: any): Promise<any> {
    const { data: userInfo } = await google.oauth2({ version: 'v2', auth: oauthClient }).userinfo.get()
    return userInfo
  }
  
  async validateToken (token: string): Promise<any> {
    try {
      const ticket = await this._client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Ensure this matches your OAuth client ID
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      throw new AuthorizationError('Invalid token');
    }
  }
  
  // async outhAuthorize (): Promise<any> {
  //   await signInWithRedirect(this._auth, this._provider)
  // }

  // async getToken (): Promise<any> {
  //   const result = await getRedirectResult(this._auth)
  //   console.log(result)
  // }
}
