
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const BRAIN_MAPS_ACTION_TYPES = deepFreeze({
  GET_BRAIN_MAPS_DATA: 'brainMaps/action/get-brain-maps-data',
  GET_RESEARCH_BRAIN_MAPS_DATA: 'brainMaps/action/get-research-brain-maps-data',
  UPDATE_SELECTED_FOLDER: 'brainMaps/action/update-selected-folder',
  UPDATE_INFO: 'brainMaps/action/update-info',
  DELETE: 'brainMaps/action/delete'
})
