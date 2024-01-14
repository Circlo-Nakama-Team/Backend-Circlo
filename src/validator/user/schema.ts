import Joi from 'joi'

const UserRegisterPayloadSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
const UserRegisterGooglePayloadSchema = Joi.object({
  userId: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string(),
  username: Joi.string().required(),
  email: Joi.string().email().required()
})
const UserLoginPayloadSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
const UserUpdatePayloadSchema = Joi.object({
  username: Joi.string(),
  addressId: Joi.string(),
  image: Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
})

const UserAddressPayloadSchema = Joi.object({
  address: Joi.string().required(),
  detail_address: Joi.string().required()
})

export { UserRegisterPayloadSchema, UserUpdatePayloadSchema, UserLoginPayloadSchema, UserAddressPayloadSchema, UserRegisterGooglePayloadSchema }
