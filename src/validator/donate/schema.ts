import Joi from 'joi'

const DonatePayloadSchema = Joi.object({
  trashId: Joi.string().required(),
  address: Joi.string().required(),
  address_detail: Joi.string(),
  donate_method: Joi.string().required()
})

export { DonatePayloadSchema }
