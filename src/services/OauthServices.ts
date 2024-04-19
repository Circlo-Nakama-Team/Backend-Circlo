// import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth'
import { google } from 'googleapis'

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
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
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
    console.log(userInfo)
    return userInfo
  }
  
  async validateToken (token: string): Promise<any> {
    return this._client.verifyIdToken({ idToken: token, audience: process.env.CLIENT_ID })
  }

  // async outhAuthorize (): Promise<any> {
  //   await signInWithRedirect(this._auth, this._provider)
  // }

  // async getToken (): Promise<any> {
  //   const result = await getRedirectResult(this._auth)
  //   console.log(result)
  // }
}
