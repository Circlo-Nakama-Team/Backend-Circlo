import Joi from 'joi'

const DonatePayloadSchema = Joi.object({
  trashCategoriesId: Joi.string().required(),
  address: Joi.string().required(),
  address_detail: Joi.string(),
  donate_method: Joi.string().required(),
  donate_description: Joi.string(),
  donate_date: Joi.string().required(),
  donate_schedule: Joi.string().required(),
  image: Joi.array().items(Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/webp').required())
})

export { DonatePayloadSchema }
