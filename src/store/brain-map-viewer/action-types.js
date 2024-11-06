
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const BRAIN_MAP_VIEWER_ACTION_TYPES = deepFreeze({
  GET_BRAIN_MAP_DATA: 'brain-map-viewer/action/get-brain-map-data',
  RESET_BRAIN_MAP_DATA: 'brain-map-viewer/action/reset-brain-map-data',

  CHANGE_BRAIN_MAP_DATA:'brain-map-viewer/action/change-brain-map-data',
  RESET_ALL_COORDINATES: 'brain-map-viewer/action/reset-all-coordinates',
  SET_COORDINATES: 'brain-map-viewer/action/set-coordinates',
  SET_THRESHOLD: 'brain-map-viewer/action/set-thresholds',
  RESET_ALL_FILTERS: 'brain-map-viewer/action/reset-all-filters',
  RESET_MASKING: 'brain-map-viewer/action/reset-masking',
  SET_MASKING: 'brain-map-viewer/action/set-masking',
  SET_LOADING: 'brain-map-viewer/action/set-loading',
  SET_BRAIN_DEFAULT: 'brain-map-viewer/action/set-brain-default',
  SET_COLOR_OVERLAY: 'brain-map-viewer/action/set-color-overlay',
  SET_BRAIN_DEFAULT_TOGGLE: 'brain-map-viewer/action/set-brain-default-toggle',
  RESET_LAYERS: 'brain-map-viewer/action/reset-layers',
  SET_RESOLUTION: 'brain-map-viewer/action/set-resolution',
  SET_PROBABILITY: 'brain-map-viewer/action/set-probability',
  SET_PATIENT_AMOUNT: 'brain-map-viewer/action/set-patient-amount',
  SET_MAIN_VIEW: 'brain-map-viewer/action/set-main-view',

  SET_RESEARCH_BRAIN_MAP:'brain-map-viewer/action/set-research-brain-map',

  
 
})
