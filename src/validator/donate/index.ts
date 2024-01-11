import InvariantError from '../../exceptions/InvariantError'
import { DonatePayloadSchema } from './schema'

const DonateValidator = {
  validateDonatePayload: (payload: any): void => {
    const validationResult = DonatePayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default DonateValidator
