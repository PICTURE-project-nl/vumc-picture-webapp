import { required, sameAs, minLength, numeric } from 'vuelidate/lib/validators'
import { hasAllClassifications } from '@/assets/scripts/custom-validations/has-all-classifications'
export const uploadBrainMapValidations = {}

uploadBrainMapValidations.upload = {
  policiesAreAccepted: {
    isChecked: sameAs(() => true)
  },
  userInputFile: {
    required
  }
}

uploadBrainMapValidations.classification = {
  selectedFiles: {
    required,
    minLength: minLength(4),
    hasAllClassifications
  }
}

uploadBrainMapValidations.metaData = {
  brainMapName: {
    required
  },
  age: {
    numeric
  },
  gbm: {},
  brainMapNotes: {},
  brainMapClassification: {},
  sharedBrainMap: {},
  isResearch: {},
  folderName: {},
  mriDate: {}
}
