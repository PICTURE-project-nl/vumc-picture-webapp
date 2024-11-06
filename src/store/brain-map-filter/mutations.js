import { BRAIN_MAP_FILTER_MUTATION_TYPES } from './mutation-types'
export const mutations = {
  [BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTER_DATA]: function (state, payload)
            {
              state.status = Object.assign({},payload.status);
              if(payload.status == 'OK')
              {
                state.filterData =payload.result
              }
            },
  [BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTER_STATUS]: function (state, payload)
            {
               let clone = Object.assign({}, payload);
               state.status = payload

            },

  [BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTERABLE_OPTIONS]:function(state,payload){
              state.filterableOptions = payload;
              let clone = Object.assign({}, payload);

  }
}
