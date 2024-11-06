
export const getters = {
  userHasData: function (state) {
    return Boolean(state.email)
  },
  userIsAuthenticated: function (state) {
    return Boolean(state.apiKey)
  }
}
