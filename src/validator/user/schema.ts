import Joi from 'joi'

const UserRegisterPayloadSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
})
const UserUpdatePayloadSchema = Joi.object({
  username: Joi.string(),
  address: Joi.string(),
  image: Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
})

export { UserRegisterPayloadSchema, UserUpdatePayloadSchema }
