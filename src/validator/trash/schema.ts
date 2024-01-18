import Joi from 'joi'

const UploadImagePredict = Joi.object({
  image: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg')
})

export { UploadImagePredict }
