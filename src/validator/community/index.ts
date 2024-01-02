import InvariantError from '../../exceptions/InvariantError'
import { UserPostPayloadSchema } from './schema'

const CommunityValidator = {
  validateUserPostPayload: (payload: any): void => {
    const validationResult = UserPostPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default CommunityValidator
