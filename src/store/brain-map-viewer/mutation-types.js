
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const BRAIN_MAP_VIEWER_MUTATION_TYPES = deepFreeze({
  UPDATE_CURRENT_BRAIN_MAP: 'brain-maps/mutations/update-current-brain-map',
  ERROR_CURRENT_BRAIN_MAP: 'brain-maps/mutations/error-current-brain-map',
  UPDATE_COORDINATES: 'brain-maps/mutations/update-coordinates',
  UPDATE_ALL_COORDINATES: 'brain-maps/mutations/update-all-coordinates',
  UPDATE_THRESHOLD: 'brain-maps/mutations/update-threshold',
  UPDATE_MASKING: 'brain-maps/mutations/update-masking',
  UPDATE_LOADING: 'brain-maps/mutations/update-loading',
  UPDATE_BRAIN_DEFAULT: 'brain-maps/mutations/update-brain-default',
  UPDATE_COLOR_OVERLAY: 'brain-maps/mutations/update-color-overlay',
  UPDATE_BRAIN_DEFAULT_TOGGLE: 'brain-maps/mutations/update-brain-default-toggle',
  UPDATE_RESOLUTION: 'brain-maps/mutations/update-resolution',
  UPDATE_PROBABILITY: 'brain-maps/mutations/update-probability',
  UPDATE_PATIENT_AMOUNT: 'brain-maps/mutations/update-patient-amount',
  UPDATE_MAIN_VIEW: 'brain-maps/mutations/update-main-view'
})
