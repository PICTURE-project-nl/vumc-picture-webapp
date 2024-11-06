
export const browserResizeEvent = {
  timeout: false, // holder for timeout id
  delay: 250, // delay after event is "complete" to run callback
  callback: null,

  init: function (callback) {
    this.callback = callback
    // window.resize event listener
    window.addEventListener('resize', this.resizeHandler.bind(this))
  },
  remove: function () {
    window.removeEventListener('resize', this.resizeHandler.bind(this))
  },
  resizeHandler: function () {
    // clear the timeout
    clearTimeout(this.timeout)
    // start timing for event "completion"
    this.timeout = setTimeout(this.callback, this.delay)
  }
}
