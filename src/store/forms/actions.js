
import { FORMS_ACTION_TYPES } from './action-types'
import { FORMS_MUTATION_TYPES } from './mutation-types'

export const actions = {
  [FORMS_ACTION_TYPES.GET]: function ({ commit, state }, payload) {
    if (state[payload.formName]) {
      commit(FORMS_MUTATION_TYPES.CLEAR, payload)
    } else {
      commit(FORMS_MUTATION_TYPES.CREATE, payload)
    }
  },

  [FORMS_ACTION_TYPES.SET_ERROR]: function ({ commit }, payload) {
    commit(FORMS_MUTATION_TYPES.SET, {
      ...payload,
      hasError: true,
      isPending: false
    })
  },

  [FORMS_ACTION_TYPES.UNSET_ERROR]: function ({ commit }, payload) {
    commit(FORMS_MUTATION_TYPES.SET, {
      ...payload,
      hasError: false,
      message: null,
      errorApiMessages: null
    })
  },

  [FORMS_ACTION_TYPES.SET_PENDING]: function ({ commit }, payload) {
    commit(FORMS_MUTATION_TYPES.SET, {
      ...payload,
      hasError: false,
      message: null,
      errorApiMessages: null,
      isPending: true
    })
  },

  [FORMS_ACTION_TYPES.UNSET_PENDING]: function ({ commit }, payload) {
    commit(FORMS_MUTATION_TYPES.SET, {
      ...payload,
      isPending: false
    })
  },

  [FORMS_ACTION_TYPES.SET_SUCCESS]: function ({ commit }, payload) {
    commit(FORMS_MUTATION_TYPES.SET, {
      ...payload,
      hasSuccess: true
    })
  },

  [FORMS_ACTION_TYPES.CLEAR]: function ({ commit }, payload) {
    commit(FORMS_MUTATION_TYPES.CLEAR, payload)
  }
}
