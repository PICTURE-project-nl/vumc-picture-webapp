
import Vue from 'vue'

import { formModel } from './model'
import { FORMS_MUTATION_TYPES } from './mutation-types'

export const mutations = {
  [FORMS_MUTATION_TYPES.CREATE]: function (state, payload) {
    // Using Vue.set makes the newly added form reactive.
    Vue.set(state, payload.formName, {
      ...formModel
    })
  },

  [FORMS_MUTATION_TYPES.SET]: function (state, payload) {
    const formName = payload.formName

    delete payload.formName

    state[formName] = {
      ...state[formName],
      ...payload
    }
  },

  [FORMS_MUTATION_TYPES.CLEAR]: function (state, payload) {
    state[payload.formName] = {
      ...formModel
    }
  }
}
