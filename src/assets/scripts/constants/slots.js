
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const SLOT_EXPECTS = deepFreeze({
  ANYTHING: 'anything',
  COMPONENTS: 'component(s)',
  STRING: 'string'
})
