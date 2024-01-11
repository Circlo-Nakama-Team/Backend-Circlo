import InvariantError from '../../exceptions/InvariantError'
import { UserRegisterPayloadSchema, UserUpdatePayloadSchema, UserLoginPayloadSchema, UserAddressPayloadSchema } from './schema'

const UsersValidator = {
  validateUserRegisterPayload: (payload: any): void => {
    const validationResult = UserRegisterPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },
  validateUserLoginPayload: (payload: any): void => {
    const validationResult = UserLoginPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validateUserUpdatePayload: (payload: any): void => {
    const validationResult = UserUpdatePayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validateUserAddressPayload: (payload: any): void => {
    const validationResult = UserAddressPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }

}

export default UsersValidator
