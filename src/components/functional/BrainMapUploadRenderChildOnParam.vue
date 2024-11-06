<script>
  import { ROUTES } from '@/config/routes'
  import ContainerBrainMapUpload from '../container/brain-map-upload/ContainerBrainMapUpload'
  import ContainerBrainMapClassification from '../container/brain-map-upload/ContainerBrainMapClassification'
  import ContainerBrainMapMetaData from '../container/brain-map-upload/ContainerBrainMapMetaData'
  import ContainerBrainMapRegistrate from '../container/brain-map-upload/ContainerBrainMapRegistrate'
  import ContainerBrainMapSegmentize from '../container/brain-map-upload/ContainerBrainMapSegmentize'
  import ContainerBrainMapUploadTool from '../container/brain-map-upload/ContainerBrainMapUploadTool'
  import { findObjectsInArrayWithKeyValue } from '@/assets/scripts/utils/find-objects-in-array-with-key-value'

  export default {
    name: 'BrainMapUploadRenderChildOnParam',
    components: {
      ContainerBrainMapUpload,
      ContainerBrainMapClassification,
      ContainerBrainMapMetaData,
      ContainerBrainMapRegistrate,
      ContainerBrainMapSegmentize,
      ContainerBrainMapUploadTool
    },
    props: {
      nextStepCallback: {
        type: Function
      }
    },
    methods: {
      componentBasedOnURLParam: function () {
        if (this.$route.params.stepSlug) {
          let result = findObjectsInArrayWithKeyValue(this.$route.params.stepSlug, 'slug', this.$store.state.uploadBrainMap.uploadStatus)
          if (result.length) {
            return result[0].component
          } else {
            this.$router.push({path: '/404'})
          }
        } else {
          // return this.$store.state.uploadBrainMap.uploadStatus[0].component
          this.$router.push({name: ROUTES.BRAIN_MAP_UPLOAD.name, params: {stepSlug: 'upload'}})
        }
      }
    },
    render (createElement) {
      return createElement(
        this.componentBasedOnURLParam(),
        {
          attrs: {
            nextStepCallback: this.nextStepCallback
          }
        }
      )
    }
  }
</script>
