import { uploadStepsModel } from './model'
import { UPLOAD_BRAIN_MAP_MUTATION_TYPES } from './mutation-types'

export const mutations = {
  [UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_STATUS]: function (state, payload) {
    state.uploadStatus = payload
  },
  [UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_CLASSIFY_FILES]: function (state, payload) {
    state.classifyFiles = payload
  },
  [UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_ID]: function (state, payload) {
    state.uploadId = payload
  },
  [UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_DATA]: function (state) {
    Object.assign(state, uploadStepsModel)
  },
  [UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_CLASSIFY_DATA]: function (state) {
    Object.assign(state.classifyFiles, uploadStepsModel.classifyFiles)
  }
}
