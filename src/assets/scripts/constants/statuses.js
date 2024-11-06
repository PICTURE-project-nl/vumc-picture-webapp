
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const STATUSES = deepFreeze({
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
})

export const STATUSES_ICONS = deepFreeze({
  [`${STATUSES.SUCCESS}`]: 'check',
  [`${STATUSES.ERROR}`]: 'close',
  [`${STATUSES.LOADING}`]: 'refresh'
})
