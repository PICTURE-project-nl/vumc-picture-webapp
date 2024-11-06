
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const BRAIN_MAPS_MUTATION_TYPES = deepFreeze({
  SET_BRAIN_MAPS: 'brainMaps/mutations/set-brain-maps',
  SET_FOLDERS: 'brainMaps/mutations/set-folders',
  SET_SELECTED_FOLDER: 'brainMaps/mutations/set-selected-folder',
  SET_INFO: 'brainMaps/mutations/set-info',
  DELETE: 'brainMaps/mutations/delete',
  SET_FILTERED_BRAIN_MAPS:'brainMaps/mutations/set-filtered-brain-maps'
})
