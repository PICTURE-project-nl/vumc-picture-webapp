
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const USER_ACTION_TYPES = deepFreeze({
  REGISTER: 'user/action/register',
  FORGOT_PASSWORD: 'user/action/forgot-password',
  CHECK_RESET_PASSWORD: 'user/action/check-reset-password',
  LOGIN: 'user/action/login',
  GET: 'user/action/get',
  UPDATE: 'user/action/update',
  CHANGE_PASSWORD: 'user/action/change-password',
  DELETE: 'user/action/delete',
  LOGOUT: 'user/action/logout'
})
