import Joi from 'joi'

const UserRegisterPayloadSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
const UserRegisterGooglePayloadSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fcmToken: Joi.string().required()
})
const UserLoginPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fcmToken: Joi.string().required()
})
const UserUpdatePayloadSchema = Joi.object({
  username: Joi.string(),
  addressId: Joi.string(),
  image: Joi.string().valid('image/apng', 'image/avif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
})

const UserAddressPayloadSchema = Joi.object({
  address: Joi.string().required(),
  detail_address: Joi.string().required(),
  addressTitle: Joi.string().required()
})

const UpdateUserAddressPayloadSchema = Joi.object({
  address: Joi.string(),
  detail_address: Joi.string(),
  addressTitle: Joi.string()
})

const updateUserPointPayloadSchema = Joi.object({
  point: Joi.number().required()
})

export { UserRegisterPayloadSchema, UserUpdatePayloadSchema, UserLoginPayloadSchema, UserAddressPayloadSchema, UserRegisterGooglePayloadSchema, UpdateUserAddressPayloadSchema, updateUserPointPayloadSchema }
