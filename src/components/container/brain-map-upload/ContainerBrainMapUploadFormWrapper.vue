<template>
  <div>
    <BrainMapUploadRenderChildOnParam
      :nextStepCallback="nextStepCallback"
    />
    <ContainerBrainMapActions
      @nextStep="nextStep"
    />
  </div>
</template>
<script>
  import { BrainMapUploadRenderChildOnParam } from '@/components/functional'
  import ContainerBrainMapActions from './ContainerBrainMapActions'
  import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from '@/store/brain-map-upload/action-types'
  import { uploadMixins } from '@/store/brain-map-upload/mixins'

  export default {
    name: 'ContainerBrainMapUploadFormWrapper',
    components: {
      BrainMapUploadRenderChildOnParam,
      ContainerBrainMapActions
    },
    mixins: [
      uploadMixins.stepRouting
    ],
    data: function () {
      return {
        nextStepCallback: null
      }
    },
    computed: {
      uploadStatus: function () {
        return this.$store.state.uploadBrainMap.uploadStatus
      }
    },
    watch: {
      uploadStatus: {
        handler: function () {
          this.gotoCurrentUploadStep()
        },
        deep: true
      }
    },
    mounted: function () {
      if (!this.$store.state.uploadBrainMap.uploadId) {
        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.GET_UPLOAD)
      }
    },
    methods: {
      nextStep: function (callback) {
        this.nextStepCallback = callback
      }
    }
  }
</script>
