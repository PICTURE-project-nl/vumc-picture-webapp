
import { email, minLength, maxLength, required, sameAs } from 'vuelidate/lib/validators'

export const userValidations = {
  email: {
    required,
    email
  },
  name: {
    required
  },
  institute: {
    required,
    maxLength: maxLength(30)
  },
  password: {
    required,
    minLength: minLength(8)
  },
  passwordRepeat: {
    required,
    sameAsPassword: sameAs('password')
  },
  oldPassword: {
    required,
    minLength: minLength(8)
  },
  newPassword: {
    required,
    minLength: minLength(8)
  },
  newPasswordRepeat: {
    required,
    sameAsPassword: sameAs('newPassword')
  },
  policiesAreAccepted: {
    isChecked: sameAs(() => true)
  }
}
