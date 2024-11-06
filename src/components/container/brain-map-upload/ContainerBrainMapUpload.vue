<template>
  <div>
    <OrganismUpload
      :formData="formData"
      :formName="formName"
      @submit="handleSubmit"
      :nextStepCallback="nextStepCallback"
    />
  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { FORMS_ACTION_TYPES } from '@/store/forms'
  import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from '@/store/brain-map-upload/action-types'
  import { OrganismUpload } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerBrainMapUpload',
    components: {
      OrganismUpload
    },
    props: {
      nextStepCallback: {
        type: Function
      }
    },
    data: function () {
      return {
        formData: {
          policiesAreAccepted: false,
          userInputFile: null
        },
        formName: 'UploadFileForm'
      }
    },
    methods: {
      handleSubmit: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName,
            message: staticContent.upload.successMessage
          })
          window.setTimeout(this.nextStepCallback, 2000)
        }
        this.uploadFile(payload)
      },
      uploadFile: function (payload) {
        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.UPLOAD_FILE, payload)
      }
    }
  }
</script>
