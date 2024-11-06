import { findObjectsInArrayWithKeyValue } from '@/assets/scripts/utils/find-objects-in-array-with-key-value'
import { ROUTES } from '@/config/routes'

const uploadMixins = {}

// TODO: add a validator that validates all steps with server before route

uploadMixins.stepRouting = {
  methods: {
    getCurrentStepFromSlug: function () {
      let slug = this.$route.params.stepSlug
      return findObjectsInArrayWithKeyValue(slug, 'slug', this.$store.state.uploadBrainMap.uploadStatus)[0]
    },
    getCurrentStepFromStore: function () {
      let inProgress = this.$store.state.uploadBrainMap.uploadStatus.filter(status => status.isInProgress === true)
      return inProgress[0]
    },
    gotoCurrentUploadStep: function () {
      const storeStep = this.getCurrentStepFromStore()
      const slugStep = this.getCurrentStepFromSlug()

      if (storeStep.slug !== slugStep.slug) {
        this.$router.push({name: ROUTES.BRAIN_MAP_UPLOAD.name, params: {stepSlug: storeStep.slug}})
      }
    },
    hasNextStep: function () {
      let currentStep = this.getCurrentStepFromSlug()

      if (currentStep && currentStep.id + 1 < this.$store.state.uploadBrainMap.uploadStatus.length) {
        return true
      }
    },
    routeToNextUploadStep: function (slug) {
      if (!slug) {
        slug = this.$route.params.stepSlug
      }

      if (slug) {
        let currentStep = findObjectsInArrayWithKeyValue(slug, 'slug', this.$store.state.uploadBrainMap.uploadStatus)[0]

        if (currentStep.id + 1 === this.$store.state.uploadBrainMap.uploadStatus.length) {

        } else {
          let nextStep = findObjectsInArrayWithKeyValue(currentStep.id + 1, 'id', this.$store.state.uploadBrainMap.uploadStatus)[0]
          this.$router.push({name: ROUTES.BRAIN_MAP_UPLOAD.name, params: {stepSlug: nextStep.slug}})
        }

      } else {
        this.$router.push({name: ROUTES.BRAIN_MAP_UPLOAD.name, params: {stepSlug: this.$store.state.uploadBrainMap.uploadStatus[1].slug}})
      }
    }
  }
}

export { uploadMixins }
