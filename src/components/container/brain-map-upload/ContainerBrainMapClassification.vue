<template>
  <OrganismBrainMapClassificationBlock
    :formName="formName"
    :formData="formData"
    :files="files"
    :nextStepCallback="nextStepCallback"
    @submit="handleSubmit"
    @updateSelectedFiles="updateSelectedFiles"
  />
</template>

<script>
  import { OrganismBrainMapClassificationBlock } from '@/components/presentational/organisms'
  import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from '@/store/brain-map-upload/action-types'
  import { FORMS_ACTION_TYPES } from '@/store/forms'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'ContainerBrainMapClassification',
    components: {
      OrganismBrainMapClassificationBlock
    },
    props: {
      nextStepCallback: {
        type: Function
      }
    },
    data: function () {
      return {
        formData: {
          selectedFiles: []
        },
        formName: 'classificationForm'
      }
    },
    computed: {
      files: function () {
        return this.$store.state.uploadBrainMap.classifyFiles
      }
    },
    mounted: function () {
      this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.GET_UPLOAD, {formName: this.formName})
    },
    methods: {
      updateSelectedFiles: function (payload) {
        this.formData.selectedFiles = this.formData.selectedFiles.filter((file) => {
          if (file.id !== payload.id) return file
        })
        if (this.formData.selectedFiles.length === 4) return
        if (payload.value !== '') this.formData.selectedFiles.push(payload)
      },
      handleSubmit: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName,
            message: staticContent.upload.successMessageClassify
          })
          window.setTimeout(this.nextStepCallback, 2000)
        }
        this.sendClassifications(payload)
      },
      sendClassifications: function (payload) {
        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SEND_CLASSIFICATIONS, payload)
      }
    }
  }
</script>
