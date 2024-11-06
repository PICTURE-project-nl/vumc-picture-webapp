<template>
  <OrganismUploadMetaData
    :formName="formName"
    :formData="formData"
    :nextStepCallback="nextStepCallback"
    @submit="handleSubmit"
  >
  </OrganismUploadMetaData>
</template>

<script>
  import moment from 'moment'
  import { OrganismUploadMetaData } from '@/components/presentational/organisms'
  import { FORMS_ACTION_TYPES } from '@/store/forms'
  import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from '@/store/brain-map-upload/action-types'

  export default {
    name: 'ContainerBrainMapMetaData',
    components: {
      OrganismUploadMetaData
    },
    props: {
      nextStepCallback: {
        type: Function
      }
    },
    data: function () {
      return {
        formName: 'metaData',
        formData: {
          brainMapName: null,
          age: '',
          gbm: '',
          brainMapNotes: null,
          brainMapClassification: null,
          sharedBrainMap: false,
          isResearch: false,
          folderName: '',
          mriDate: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    methods: {
      handleSubmit: function (payload) {
        payload.onSuccess = () => {
          this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
            formName: this.formName
            // message: staticContent.upload.successMessageClassify
          })
          window.setTimeout(this.nextStepCallback, 2000)
        }
        this.sendMetaData(payload)
      },
      sendMetaData: function (payload) {
        Object.keys(payload.data).forEach((key) => (payload.data[key] == null || payload.data[key] === '') && delete payload.data[key])

        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SEND_META_DATA, payload)
      }
    }
  }
</script>
