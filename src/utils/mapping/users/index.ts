import type { MapDBModelUserType } from '../../types/UserTypes'
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
export default mapDBToModel
