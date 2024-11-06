export const pleaseDontGoMixins = {
  created: function () {
    window.onbeforeunload = function () {
      return true
    }
  },
  beforeDestroy: function () {
    window.onbeforeunload = function () {}
  }
}
