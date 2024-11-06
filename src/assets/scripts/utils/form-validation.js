
import { staticContent } from '@/data/static-content'
import { replaceKeyInString } from '@/assets/scripts/utils/replace'

export const getValidationProperties = ({ formData, validations }) => {
  return Object.keys(formData).reduce((result, key) => {
    const validation = validations[key]
    if (validation) {
      result[key] = validations[key]
    } else {
      console.error('There is no type validation for the field with name:', key)
    }
    return result
  }, {})
}

export const hasInputValidationError = ({ input, validationType }) => {
  return input.$params[validationType] && !input[validationType]
}

export const getInputValidationMessage = ({ input, customText }) => {
  if (hasInputValidationError({ input, validationType: 'required' })) {
    return customText || staticContent.formValidation.required
  }

  if (hasInputValidationError({ input, validationType: 'email' })) {
    return customText || staticContent.formValidation.email
  }

  if (hasInputValidationError({ input, validationType: 'minLength' })) {
    return customText || replaceKeyInString({
      key: 'amount',
      replaceWith: input.$params.minLength.min,
      string: staticContent.formValidation.minLength
    })
  }

  if (hasInputValidationError({ input, validationType: 'maxLength' })) {
    return customText || replaceKeyInString({
      key: 'amount',
      replaceWith: input.$params.maxLength.max,
      string: staticContent.formValidation.maxLength
    })
  }

  if (hasInputValidationError({ input, validationType: 'sameAsPassword' })) {
    return customText || staticContent.formValidation.sameAsPassword
  }

  if (hasInputValidationError({ input, validationType: 'isChecked' })) {
    return customText || staticContent.formValidation.isChecked
  }

  return staticContent.formValidation.generic
}
