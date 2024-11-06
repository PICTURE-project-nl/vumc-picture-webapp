
import { RESEARCH_BRAIN_MAPS_VIEWER_ACTION_TYPES } from './action-types'
import { RESEARCH_BRAIN_MAPS_MUTATION_TYPES } from './mutation-types'

export const actions = {
[RESEARCH_BRAIN_MAPS_VIEWER_ACTION_TYPES.SET_RESEARCH_BRAIN_MAPS]:function({commit},payload){
     commit(RESEARCH_BRAIN_MAPS_MUTATION_TYPES.SET_RESEARCH_BRAIN_MAPS,payload)

   },

   [RESEARCH_BRAIN_MAPS_VIEWER_ACTION_TYPES.GET_RESEARCH_BRAIN_MAPS]:function({commit},payload){
       if(payload){
         commit(RESEARCH_BRAIN_MAPS_MUTATION_TYPES.GET_RESEARCH_BRAIN_MAPS,payload)
       }


    }
}
