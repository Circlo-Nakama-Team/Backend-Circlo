export interface MapDBModelUserDonateType {
  DONATEID: string
  TRASHCATEGORIESID: string
  USERID: string
  DONATE_WEIGHT: string
  DONATE_ADDRESS: string
  DONATE_ADDRESS_DETAIL: string
  DONATE_METHOD: string
  DONATE_DESCRIPTION: string
  DONATE_STATUS: string
  DONATE_POINT: string
  DONATE_DATE: string
  START_TIME: string
  END_TIME: string
  CREATED_AT: string
  FIRSTNAME: string
  LASTNAME: string
  EMAIL: string
  CATEGORIES_NAME: string
  REWARD_POINT: number
}

export interface MapDBModelDonateScheduleType {
  SCHEDULEID: string
  START_TIME: string
  END_TIME: string
}

export interface MapDBModelDonateImageType {
  IMAGEID: string
  DONATEID: string
  LINK: string
}
