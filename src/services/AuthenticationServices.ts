import db from '../config/DBConfig'
export default class AuthenticationServices {
  _pool: any
  constructor () {
    this._pool = db
  }
}
