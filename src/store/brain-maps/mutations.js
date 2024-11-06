
import { BRAIN_MAPS_MUTATION_TYPES } from './mutation-types'

export const mutations = {
  [BRAIN_MAPS_MUTATION_TYPES.SET_BRAIN_MAPS]: function (state, payload) {
    state.list = payload
  },
  [BRAIN_MAPS_MUTATION_TYPES.SET_FOLDERS]: function (state, payload) {
    state.folders = payload
  },
  [BRAIN_MAPS_MUTATION_TYPES.SET_SELECTED_FOLDER]: function (state, payload) {
    state.selectedFolderId = payload
  },
  [BRAIN_MAPS_MUTATION_TYPES.SET_INFO]: function (state, payload) {
    state.list.map(item => {
      if (item.id === payload.id) {
        Object.assign(item, payload.data)
      }
    })
  },
  [BRAIN_MAPS_MUTATION_TYPES.DELETE]: function (state, payload) {
    state.list = state.list.filter(item => {
      if (item.id !== payload) {
        return item
      }
    })
  },


  [BRAIN_MAPS_MUTATION_TYPES.SET_FILTERED_BRAIN_MAPS]:function( state,payload){
    JSON.parse(JSON.stringify(state.list)).filter(item =>{
      if(item.id == payload["payloadId"]){
        let result =  JSON.parse(JSON.stringify (payload['res']));
        item.lowResBrainMap['probabilityMapFileURL'] = result.result.probability_map;
      }
    })

  }
}
