import { BRAIN_MAP_VIEWER_ACTION_TYPES } from '@/store/brain-map-viewer/action-types'

const brainMapsViewerMixins = {}

brainMapsViewerMixins.info = {

  computed: {
    getCurrentBrainMapName: function () {
      return this.$store.state.brainMapViewer.currentBrainMap.brainMapName
    },
    getCurrentBrainMap: function(){
      return this.$store.state.brainMapViewer.currentBrainMap;
    },
    getCurrentBrainMapUrl: function () {
      if (this.$store.state.brainMapViewer.masking === 'probabilityMap') {

        return this.$store.state.brainMapViewer.currentBrainMap.lowResBrainMap.probabilityMapFileURL
      } else if (this.$store.state.brainMapViewer.masking === 'shapeMap') {
        return this.$store.state.brainMapViewer.currentBrainMap.lowResBrainMap.binaryMapFileURL
      } else if (this.$store.state.brainMapViewer.masking === 'patientAmount') {
        return this.$store.state.brainMapViewer.currentBrainMap.lowResBrainMap.nrOfPatientsFileURL
      }
    }
  }
}

brainMapsViewerMixins.emitters = {
  methods: {
    setBrainDefault: function (payload) {
      this.$emit('setBrainDefault', payload)
    },
    setColorOverlay: function (payload) {
      this.$emit('setColorOverlay', payload)
    },
    setBrainDefaultToggle: function (payload) {
      this.$emit('setBrainDefaultToggle', payload)
    },
    resetLayers: function () {
      this.$emit('resetLayers')
    },
    setCoordinates: function (payload) {
      this.$emit('setCoordinates', payload)
    },
    resetCoordinates: function () {
      this.$emit('resetCoordinates')
    },
    setThreshold: function (payload) {
      this.$emit('setThreshold', payload)
    },
    resetFilters: function () {
      this.$emit('resetFilters')
    },
    setMasking: function (payload) {
      this.$emit('setMasking', payload)
    },
    resetMasking: function () {
      this.$emit('resetMasking')
    },
    openShare: function () {
      this.$emit('openShare')
    },
    openDownload: function () {
      this.$emit('openDownload')
    }
  }
}

brainMapsViewerMixins.controls = {
  computed: {
    getCoordinates: function () {
      return this.$store.state.brainMapViewer.coordinates
    },
    getThresholdValue: function () {
      return this.$store.state.brainMapViewer.threshold
    },
    getMaskingValue: function () {
      return this.$store.state.brainMapViewer.masking
    },
    getBrainDefaultValue: function () {
      return this.$store.state.brainMapViewer.brainDefault
    },
    getColorOverlayValue: function () {
      return this.$store.state.brainMapViewer.colorOverlay
    },
    getBrainDefaultToggleValue: function () {
      return this.$store.state.brainMapViewer.brainDefaultToggle
    },
    getResolutionValue: function () {
      return this.$store.state.brainMapViewer.resolution
    },
    getProbabilityValue: function () {
      return this.$store.state.brainMapViewer.probability
    },
    getPatientAmountValue: function () {
      return this.$store.state.brainMapViewer.patientAmount
    },
    getMainViewValue: function () {
      return this.$store.state.brainMapViewer.mainView
    }
  },
  methods: {
    setCoordinates: function (payload) {
      const newPayload = { }
      newPayload.isEventFromBrainBrowser = false
      newPayload.coordinates = { ...this.$store.state.brainMapViewer.coordinates }
      newPayload.coordinates[payload.name] = payload.value
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COORDINATES, newPayload)
    },
    setProbabilityFromBrainBrowser: function (payload) {
      // The BrainBrowser Library fires 1 event per canvas, so 3 total on each change. To minimize load on the application
      // we don't dispatch if there are no changes
      if (Number(payload.detail.probability) === Number(this.$store.state.brainMapViewer.probability)) return
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_PROBABILITY, Number(payload.detail.probability))
    },
    setPatientAmountFromBrainBrowser: function (payload) {
      // The BrainBrowser Library fires 1 event per canvas, so 3 total on each change. To minimize load on the application
      // we don't dispatch if there are no changes
      if (Number(payload.detail.patientAmount) === Number(this.$store.state.brainMapViewer.patientAmount)) return
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_PATIENT_AMOUNT, Number(payload.detail.patientAmount))
    },
    resetCoordinates: function () {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_ALL_COORDINATES)
    },
    setThreshold: function (payload) {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_THRESHOLD, payload)
    },
    resetFilters: function () {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_ALL_FILTERS)
    },
    setMasking: function (payload) {
     this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_MASKING, payload)
    },
    resetMasking: function () {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_MASKING)
    },
    setBrainDefault: function (payload) {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_BRAIN_DEFAULT, payload)
    },
    setColorOverlay: function (payload) {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COLOR_OVERLAY, payload)
    },
    setBrainDefaultToggle: function (payload) {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_BRAIN_DEFAULT_TOGGLE, payload)
    },
    resetLayers: function () {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_LAYERS)
    },
    setResolutionValue: function (payload) {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_RESOLUTION, payload)
    },
    setMainViewValue: function (payload) {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_MAIN_VIEW, payload)
    }
  }
}

export { brainMapsViewerMixins }
