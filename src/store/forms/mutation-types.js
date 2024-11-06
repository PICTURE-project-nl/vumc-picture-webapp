
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const FORMS_MUTATION_TYPES = deepFreeze({
  CREATE: 'forms/mutation/create',
  SET: 'forms/mutation/set',
  CLEAR: 'forms/mutation/clear'
})
