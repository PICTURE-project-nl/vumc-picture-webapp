import { brainMapModel } from '@/store/brain-maps/model'

export const brainMapViewerModel = {
  currentBrainMap: {
    ...brainMapModel
  },
  resolution: 'lowRes',
  mainView: 'axi',
  probability: 0,
  patientAmount: 0,
  isEventFromBrainBrowser: null,
  threshold: [0, 1],
  masking: 'probabilityMap',
  loading: true,
  coordinates: {
    sag: 0,
    cor: 0,
    axi: 0
  },
  brainDefault: 50,
  colorOverlay: 50,
  brainDefaultToggle: true
}
