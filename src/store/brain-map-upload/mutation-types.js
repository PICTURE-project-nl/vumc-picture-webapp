
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const UPLOAD_BRAIN_MAP_MUTATION_TYPES = deepFreeze({
  SET_UPLOAD_STATUS: 'upload-brain-map/mutation/set-upload-status',
  SET_CLASSIFY_FILES: 'upload-brain-map/mutation/set-classify-files',
  SET_UPLOAD_ID: 'upload-brain-map/mutation/set-upload-id',
  RESET_UPLOAD_DATA: 'upload-brain-map/mutation/reset-upload-data',
  RESET_UPLOAD_CLASSIFY_DATA: 'upload-brain-map/mutation/reset-upload-classify-data'
})
