import InvariantError from '../../exceptions/InvariantError'
import { UserRegisterPayloadSchema, UserUpdatePayloadSchema } from './schema'

const UsersValidator = {
  validateUserRegisterPayload: (payload: any): void => {
    const validationResult = UserRegisterPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validateUserUpdatePayload: (payload: any): void => {
    const validationResult = UserUpdatePayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

export default UsersValidator
