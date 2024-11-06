<template>
  <OrganismProgress :items="uploadState">
    {{ uploadState }}
  </OrganismProgress>
</template>

<script>
  import { OrganismProgress } from '@/components/presentational/organisms'
  import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from '@/store/brain-map-upload/action-types'
  // import { ROUTES } from '@/config/routes'

  export default {
    name: 'ContainerBrainMapUpload',
    components: {
      OrganismProgress
    },
    props: {

    },
    computed: {
      uploadState: function () {
        return this.$store.state.uploadBrainMap.uploadStatus
      }
    },
    // TODO: rewire and test this functions
    // watch: {
    //   uploadState: function (uploadStatus) {
    //     // If by excedent the user navigates the wrong upload process step this function will route the user back
    //     uploadStatus.map((step) => {
    //       if (step.isInProgress === true && step.slug !== this.$route.params.stepSlug) {
    //         this.$router.push({name: ROUTES.BRAIN_MAP_UPLOAD.name, slug: {stepSlug: step.slug}})
    //       }
    //     })
    //   }
    // },
    created: function () {
      // TODO: rewire and test this functions
      // this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.GET_UPLOAD).then(() => {
      //   if (this.$store.state.uploadBrainMap.uploadId) {
      //     this.$router.push({name: ROUTES.BRAIN_MAP_UPLOAD.name, slug: {stepSlug: this.$store.state.uploadBrainMap.uploadStatus[1].slug}})
      //   }
      // });

      if (this.$route.params.stepSlug) {
        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, this.$route.params.stepSlug)
      } else {
        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, 'upload')
      }
    }
  }
</script>
