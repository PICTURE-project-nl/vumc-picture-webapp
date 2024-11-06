
import { getAuthenticationCookie } from '@/assets/scripts/utils/authentication'
import { userModel } from './model'

export const state = {
  ...userModel,
  apiKey: getAuthenticationCookie()
}
