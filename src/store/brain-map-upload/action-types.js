
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'

export const UPLOAD_BRAIN_MAP_ACTION_TYPES = deepFreeze({
  SET_UPLOAD_STATUS: 'upload-brain-map/action/set-upload-status',
  UPLOAD_FILE: 'upload-brain-map/action/upload-file',
  GET_UPLOAD: 'upload-brain-map/action/upload-get',
  DELETE_UPLOAD: 'upload-brain-map/action/upload-delete',
  SEND_CLASSIFICATIONS: 'upload-brain-map/action/send-classifications',
  SEND_META_DATA: 'upload-brain-map/action/send-meta-data'
})
