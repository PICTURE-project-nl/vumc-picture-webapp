import { BRAIN_MAP_VIEWER_ACTION_TYPES } from '@/store/brain-map-viewer/action-types'

export const shareBrainMapUrl = {}

shareBrainMapUrl.get = {

  methods: {
    getShareUrl: function () {
      const paramsObject = {
        axi: this.$store.state.brainMapViewer.coordinates.axi,
        cor: this.$store.state.brainMapViewer.coordinates.cor,
        sag: this.$store.state.brainMapViewer.coordinates.sag,
        threshold: this.$store.state.brainMapViewer.threshold,
        brainDefaultToggle: this.$store.state.brainMapViewer.brainDefaultToggle,
        brainDefault: this.$store.state.brainMapViewer.brainDefault,
        colorOverlay: this.$store.state.brainMapViewer.colorOverlay,
        masking: this.$store.state.brainMapViewer.masking
      }

      return window.location.href.split('?')[0] + this.getUrlParams(paramsObject)
    },
    getUrlParams: function (paramsObject) {
      return '?' + Object.keys(paramsObject).map(function (param) {
        return encodeURIComponent(param) + '=' + encodeURIComponent(paramsObject[param])
      }).join('&')
    }
  }
}

shareBrainMapUrl.set = {
  created: function () {
    document.addEventListener('volume-viewer-displays-loaded', this.setUrlQueryParams)
  },
  beforeDestroy: function () {
    document.removeEventListener('volume-viewer-displays-loaded', this.setUrlQueryParams)
  },
  methods: {
    setUrlQueryParams: function () {
      // if (Object.keys(this.$route.query).length === 0) return

      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COORDINATES, {
        isEventFromBrainBrowser: false,
        coordinates: {
          axi: Number(this.$route.query.axi) || this.$store.state.brainMapViewer.coordinates.axi,
          cor: Number(this.$route.query.cor) || this.$store.state.brainMapViewer.coordinates.cor,
          sag: Number(this.$route.query.sag) || this.$store.state.brainMapViewer.coordinates.sag
        }
      })

      let brainDefaultToggleValue = this.$store.state.brainMapViewer.brainDefaultToggle
      if (this.$route.query.brainDefaultToggle === 'false') brainDefaultToggleValue = false
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_BRAIN_DEFAULT_TOGGLE, brainDefaultToggleValue)

      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_THRESHOLD, this.$route.query.threshold ? this.$route.query.threshold.split(',') : this.$store.state.brainMapViewer.threshold)
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_MASKING, this.$route.query.masking || this.$store.state.brainMapViewer.masking)
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_BRAIN_DEFAULT, Number(this.$route.query.brainDefault) || this.$store.state.brainMapViewer.brainDefault)
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COLOR_OVERLAY, Number(this.$route.query.colorOverlay) || this.$store.state.brainMapViewer.colorOverlay)
    }
  }
}
