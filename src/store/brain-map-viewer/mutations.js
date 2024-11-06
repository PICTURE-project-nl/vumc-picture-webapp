
import { BRAIN_MAP_VIEWER_MUTATION_TYPES } from './mutation-types'

export const mutations = {
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_CURRENT_BRAIN_MAP]: function (state, payload) {
    state.currentBrainMap = {
      ...payload
    }
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.ERROR_CURRENT_BRAIN_MAP]: function (state, payload) {
    state.currentBrainMap.error = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_COORDINATES]: function (state, payload) {
    state.isEventFromBrainBrowser = payload.isEventFromBrainBrowser
    state.coordinates = payload.coordinates
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_ALL_COORDINATES]: function (state, payload) {
    state.coordinates = { ...payload }
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_THRESHOLD]: function (state, payload) {
    state.threshold = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_MASKING]: function (state, payload) {
    state.masking = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_LOADING]: function (state, payload) {
    state.loading = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_BRAIN_DEFAULT]: function (state, payload) {
    state.brainDefault = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_COLOR_OVERLAY]: function (state, payload) {
    state.colorOverlay = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_BRAIN_DEFAULT_TOGGLE]: function (state, payload) {
    state.brainDefaultToggle = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_RESOLUTION]: function (state, payload) {
    state.resolution = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_PROBABILITY]: function (state, payload) {
    state.probability = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_PATIENT_AMOUNT]: function (state, payload) {
    state.patientAmount = payload
  },
  [BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_MAIN_VIEW]: function (state, payload) {
    state.mainView = payload
  }
}
