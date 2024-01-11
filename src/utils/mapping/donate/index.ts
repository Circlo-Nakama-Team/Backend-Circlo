import { type MapDBModelUserDonateType } from '../../types/DonateTypes'
const mapDBToModelUserDonate = ({
  DONATEID,
  TRASHID,
  USERID,
  DONATE_WEIGHT,
  DONATE_ADDRESS,
  DONATE_ADDRESS_DETAIL,
  DONATE_METHOD,
  DONATE_STATUS,
  DONATE_POINT,
  DONATE_TIME,
  CREATED_AT,
  FIRSTNAME,
  LASTNAME,
  EMAIL,
  TRASH_TYPE,
  CATEGORIES_NAME,
  REWARD_POINT

}: MapDBModelUserDonateType): any => ({
  donateId: DONATEID,
  trash: {
    trashId: TRASHID,
    trashType: TRASH_TYPE,
    trashCategory: CATEGORIES_NAME,
    rewardPoint: REWARD_POINT
  },
  user: {
    userId: USERID,
    donorName: `${FIRSTNAME} ${LASTNAME}`,
    donorEmail: EMAIL
  },
  donateWeight: DONATE_WEIGHT,
  donateAddress: DONATE_ADDRESS,
  donateAddressDetail: DONATE_ADDRESS_DETAIL,
  donateMethod: DONATE_METHOD,
  donateStatus: DONATE_STATUS,
  donatePoint: DONATE_POINT,
  donateTime: DONATE_TIME,
  createdAt: CREATED_AT
})

export { mapDBToModelUserDonate }
