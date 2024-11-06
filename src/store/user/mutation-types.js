
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const USER_MUTATION_TYPES = deepFreeze({
  SET: 'user/mutation/set',
  LOGOUT: 'user/mutation/logout'
})
