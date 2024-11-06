
import { userModel } from './model'
import { USER_MUTATION_TYPES } from './mutation-types'

export const mutations = {
  [USER_MUTATION_TYPES.SET]: function (state, payload) {
    Object.assign(state, payload)
  },

  [USER_MUTATION_TYPES.LOGOUT]: function (state) {
    Object.assign(state, userModel)
  }
}
