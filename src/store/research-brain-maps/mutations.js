import { RESEARCH_BRAIN_MAPS_MUTATION_TYPES } from './mutation-types'

export const mutations = {
  [RESEARCH_BRAIN_MAPS_MUTATION_TYPES.SET_RESEARCH_BRAIN_MAPS]: function (state, payload) {

    let id = payload.id;
    state.researchBrainMaps[id] = payload;

    //state.researchBrainMaps = { ...state.researchBrainMaps, ...payload}
  },

 [RESEARCH_BRAIN_MAPS_MUTATION_TYPES.GET_RESEARCH_BRAIN_MAPS]: function (state, payload) {
    // Set the current brain map here for a given id

    // payload should be an id
    const mystate = JSON.parse(JSON.stringify(state));
    const myResearchMaps = mystate.researchBrainMaps;
    //const brainMapViewer = mystate.brainMapViewer;
    const currentBrainMapViewer='';

    let currentBrainMap = myResearchMaps[payload];
    let brainMapViewer = {...state.brainMapViewer}

    // state.brainMapViewer=brainMapViewer;
    //state.researchBrainMaps = { ...state.researchBrainMaps, ...payload}
    // }

   },
}
