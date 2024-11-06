
import { BRAIN_MAP_VIEWER_ACTION_TYPES } from './action-types'
import { BRAIN_MAP_VIEWER_MUTATION_TYPES } from './mutation-types'
import { brainMapViewerModel } from './model'
import { apiBrainMaps } from '@/api/brain-maps'
import { BRAIN_MAPS_ACTION_TYPES } from '@/store/brain-maps/action-types'
import { brainMapModel } from '@/store/brain-maps/model'

const errorHandler = ({ error, commit, payload }) => {
  // Set loader to error with payload.loadingTarget
  if (error) {
    if (error.response.status === 401) {
      commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.ERROR_CURRENT_BRAIN_MAP, 401)
    }
  }
  console.error(error, payload || 'no payload')
}

const successHandler = ({ action, payload }) => {
  // Set loader to success payload.loadingTarget
  // console.log(`SUCCESS: ${action}`, payload)
}

export const actions = {
  [BRAIN_MAP_VIEWER_ACTION_TYPES.GET_BRAIN_MAP_DATA]: function ({ commit }, payload) {
    apiBrainMaps.getOne(
      payload,
      (error) => {
        errorHandler({ error, commit })
      },
      (data) => {
        commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_CURRENT_BRAIN_MAP, data.data)
        successHandler({ action: BRAIN_MAPS_ACTION_TYPES.GET_BRAIN_MAP_DATA, payload: data.data })
      }
    )
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.CHANGE_BRAIN_MAP_DATA]:function({commit},payload){
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_CURRENT_BRAIN_MAP, {...payload});
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_BRAIN_MAP_DATA]: function ({ commit }) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_CURRENT_BRAIN_MAP, { ...brainMapModel })
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COORDINATES]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_LOADING, false)
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_COORDINATES, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_ALL_COORDINATES]: function ({ commit }) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_ALL_COORDINATES, brainMapViewerModel.coordinates)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_THRESHOLD]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_THRESHOLD, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_ALL_FILTERS]: function ({ commit }) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_THRESHOLD, brainMapViewerModel.threshold)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_MASKING]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_MASKING, payload)
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_LOADING, true)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_LOADING]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_LOADING, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_MASKING]: function ({ commit }) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_MASKING, brainMapViewerModel.masking)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_BRAIN_DEFAULT]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_BRAIN_DEFAULT, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COLOR_OVERLAY]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_COLOR_OVERLAY, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_BRAIN_DEFAULT_TOGGLE]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_BRAIN_DEFAULT_TOGGLE, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_LAYERS]: function ({ commit }) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_BRAIN_DEFAULT, brainMapViewerModel.brainDefault)
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_COLOR_OVERLAY, brainMapViewerModel.colorOverlay)
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_BRAIN_DEFAULT_TOGGLE, brainMapViewerModel.brainDefaultToggle)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_RESOLUTION]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_RESOLUTION, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_PROBABILITY]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_PROBABILITY, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_PATIENT_AMOUNT]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_PATIENT_AMOUNT, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_MAIN_VIEW]: function ({ commit }, payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_MAIN_VIEW, payload)
  },
  [BRAIN_MAP_VIEWER_ACTION_TYPES.SET_RESEARCH_BRAIN_MAP]: function ({ commit },payload) {
    commit(BRAIN_MAP_VIEWER_MUTATION_TYPES.UPDATE_CURRENT_BRAIN_MAP,payload)
  },
}
