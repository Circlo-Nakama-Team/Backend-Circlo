import type { MapDBModelUserType, MapDBModelUserAddressType } from '../../types/UserTypes'
const mapDBToModel = ({
  USERID,
  FIRSTNAME,
  LASTNAME,
  USERNAME,
  EMAIL,
  POINT,
  ADDRESS
}: MapDBModelUserType): any => ({
  id: USERID,
  firstname: FIRSTNAME,
  lastname: LASTNAME,
  username: USERNAME,
  email: EMAIL,
  point: POINT,
  address: ADDRESS
})

const mapDBToModelUserAddress = ({
  ADDRESSID,
  USERID,
  ADDRESS,
  DETAIL_ADDRESS,
  TITLE
}: MapDBModelUserAddressType): any => ({
  addressId: ADDRESSID,
  userId: USERID,
  address: ADDRESS,
  detailAddress: DETAIL_ADDRESS,
  title: TITLE
})
export { mapDBToModel, mapDBToModelUserAddress }
