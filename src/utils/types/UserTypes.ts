export interface CreateUserRequestBodyType {
  firstname: string
  lastname: string
  username: string
  email: string
  password: string
}

export interface CreateUserGoogleRequestBodyType {
  userId: string
  firstname: string
  lastname: string
  username: string
  email: string
}

export interface LoginBodyType {
  email: string
  password: string
  fcmToken: string
}

export interface PostUserType {
  id: string
  firstname: string
  lastname: any
  username: string
  email: string
  point: number
}

export interface MapDBModelUserType {
  USERID: string
  FIRSTNAME: string
  LASTNAME: string
  USERNAME: string
  EMAIL: string
  POINT: number
  ADDRESS: string
}

export interface MapDBModelUserAddressType {
  ADDRESSID: string
  USERID: string
  ADDRESS: string
  DETAIL_ADDRESS: string
  TITLE: string
}
