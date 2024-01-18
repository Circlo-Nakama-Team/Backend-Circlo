import Joi from 'joi'

const UserPostPayloadSchema = Joi.object({
  postBody: Joi.string(),
  image: Joi.string().valid('image/apng', 'image/avif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp')
})

export { UserPostPayloadSchema }
