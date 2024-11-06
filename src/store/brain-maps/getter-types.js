
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const BRAIN_MAPS_GETTER_TYPES = deepFreeze({
  GET_FOLDER_BRAIN_MAPS: 'brainMaps/getters/get-folder-brain-maps',
  GET_FOLDER_NAME: 'brainMaps/getters/get-folder-name',
  GET_RESEARCH_FOLDERS: 'brainMaps/getters/get-research-folder',
  GET_USER_FOLDERS: 'brainMaps/getters/get-user-folder',
  GET_BRAIN_MAP_BY_ID: 'brainMaps/getters/get-brain-map-by-id'
})
