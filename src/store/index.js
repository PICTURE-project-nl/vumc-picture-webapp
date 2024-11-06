
import Vuex from 'vuex'

import * as formsStore from '@/store/forms'
import * as userStore from '@/store/user'
import * as brainMapsStore from '@/store/brain-maps'
import * as brainMapViewerStore from '@/store/brain-map-viewer'
import * as uploadBrainMapStore from '@/store/brain-map-upload'
import * as brainMapFilterStore from '@/store/brain-map-filter'



import * as researchBrainMapStore from '@/store/research-brain-maps'
/*
This store uses modules and strict mode.

Modules, see: https://vuex.vuejs.org/guide/modules.html
Strict mode, see: https://vuex.vuejs.org/guide/strict.html
 */
const createStore = () => {
  return new Vuex.Store({
    modules: {
      forms: {
        actions: formsStore.actions,
        mutations: formsStore.mutations,
        state: formsStore.state
      },
      user: {
        actions: userStore.actions,
        mutations: userStore.mutations,
        state: userStore.state,
        getters: userStore.getters
      },
      brainMaps: {
        actions: brainMapsStore.actions,
        mutations: brainMapsStore.mutations,
        state: brainMapsStore.state,
        getters: brainMapsStore.getters
      },
      uploadBrainMap: {
        actions: uploadBrainMapStore.actions,
        mutations: uploadBrainMapStore.mutations,
        state: uploadBrainMapStore.state,
        getters: uploadBrainMapStore.getters
      },
      brainMapViewer: {
        actions: brainMapViewerStore.actions,
        mutations: brainMapViewerStore.mutations,
        state: brainMapViewerStore.state
      },
      brainMapFilter:{
        actions: brainMapFilterStore.actions,
        mutations: brainMapFilterStore.mutations,
        state: brainMapFilterStore.state
      },
      researchBrainMaps:{
        actions: researchBrainMapStore.actions,
        mutations: researchBrainMapStore.mutations,
        state: researchBrainMapStore.state
      }
    },
    strict: process.env.NODE_ENV !== 'production'
  })
}

export default createStore
