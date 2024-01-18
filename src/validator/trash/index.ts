import InvariantError from '../../exceptions/InvariantError'
import { UploadImagePredict } from './schema'

const TrashValidator = {
  validateImagePredictPayload: (payload: any): void => {
    const validationResult = UploadImagePredict.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }

}

export default TrashValidator
