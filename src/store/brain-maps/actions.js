
import { apiBrainMaps } from '@/api/brain-maps'
import { BRAIN_MAPS_ACTION_TYPES } from './action-types'
import { BRAIN_MAPS_MUTATION_TYPES } from './mutation-types'
import { formHandlers } from '@/store/forms/handlers'

const errorHandler = ({ error, payload }) => {
  // Set loader to error with payload.loadingTarget
  console.error(error, payload || 'no payload')
}

const successHandler = ({ action, payload }) => {
  // Set loader to success payload.loadingTarget
  // console.log(`SUCCESS: ${action}`, payload)
}

export const actions = {
  [BRAIN_MAPS_ACTION_TYPES.GET_RESEARCH_BRAIN_MAPS_DATA]: function ({ commit }) {
    apiBrainMaps.getAll(
       (data)=>{console.log(" GOT local data ",data);}
      // (error) => {
      //   errorHandler({ error })
      // },
      // (data) => {
      //   console.log(" actions ",data.brainMaps);
      //   commit(BRAIN_MAPS_MUTATION_TYPES.SET_BRAIN_MAPS, data['brainMaps'])
      //   commit(BRAIN_MAPS_MUTATION_TYPES.SET_FOLDERS, data['folders'])
      //   if (data['folders'].length > 0 ) {
      //     commit(BRAIN_MAPS_MUTATION_TYPES.SET_SELECTED_FOLDER, data['folders'][0].id)
      //   }
      //   successHandler({ action: BRAIN_MAPS_ACTION_TYPES.GET, payload: data })
      // }
    )
  },

  [BRAIN_MAPS_ACTION_TYPES.GET_BRAIN_MAPS_DATA]: function ({ commit }) {
    apiBrainMaps.get(
      null,
      (error) => {
        errorHandler({ error })
      },
      (data) => {

        commit(BRAIN_MAPS_MUTATION_TYPES.SET_BRAIN_MAPS, data['brainMaps'])
        commit(BRAIN_MAPS_MUTATION_TYPES.SET_FOLDERS, data['folders'])
        if (data['folders'].length > 0 ) {
          commit(BRAIN_MAPS_MUTATION_TYPES.SET_SELECTED_FOLDER, data['folders'][0].id)
        }
        successHandler({ action: BRAIN_MAPS_ACTION_TYPES.GET, payload: data })
      }
    )
  },
  [BRAIN_MAPS_ACTION_TYPES.UPDATE_SELECTED_FOLDER]: function ({ commit }, payload) {
    commit(BRAIN_MAPS_MUTATION_TYPES.SET_SELECTED_FOLDER, payload)
  },
  [BRAIN_MAPS_ACTION_TYPES.UPDATE_INFO]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiBrainMaps.update(
      payload,
      (error) => {
        formHandlers.errorHandler({ error, context, payload })
        errorHandler({ error })
      },
      (data) => {
        formHandlers.successHandler({ context, payload })
        successHandler({ action: BRAIN_MAPS_ACTION_TYPES.GET, payload: data })
      }
    )
  },
  [BRAIN_MAPS_ACTION_TYPES.DELETE]: function ({ commit }, payload) {
    // post deleted brain map to server. If oke commit to store:
    apiBrainMaps.delete(
      { brainMapId: payload },
      (response) => {
        console.error('error on delete upload:', response)
      },
      () => {
        commit(BRAIN_MAPS_MUTATION_TYPES.DELETE, payload)
      }
    )
  }
}
