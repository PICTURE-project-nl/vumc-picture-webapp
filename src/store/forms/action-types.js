
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const FORMS_ACTION_TYPES = deepFreeze({
  GET: 'forms/action/get',
  SET_ERROR: 'forms/action/set-error',
  UNSET_ERROR: 'forms/action/unset-error',
  SET_PENDING: 'forms/action/set-pending',
  UNSET_PENDING: 'forms/action/unset-pending',
  SET_SUCCESS: 'forms/action/set-success',
  CLEAR: 'forms/action/clear'
})
