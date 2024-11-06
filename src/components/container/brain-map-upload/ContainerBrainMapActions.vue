<template>
  <div v-if="hasNextStep()">

    <OrganismUploadActions
      @abortProcess="abortProcessConfirmation"
      @nextStep="nextStep"
    />

    <OrganismConfirmation
      :hidden="confirmationIsHidden"
      :titleHeading="content.titleHeading"
      :title="content.title"
      :body="content.body"
      @accept="abortAndDestroy"
      @cancel="confirmationIsHidden = true"
      @close="confirmationIsHidden = true"
    />

  </div>
</template>

<script>
  import OrganismUploadActions from '@/components/presentational/organisms/OrganismUploadActions'
  import { uploadMixins } from '@/store/brain-map-upload/mixins'
  import OrganismConfirmation from '@/components/presentational/organisms/OrganismConfirmation'
  import { BRAIN_MAP_MANAGER_ROUTES } from '@/pages/brain-map-manager/routes'
  import { staticContent } from '@/data/static-content'
  import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from '@/store/brain-map-upload/action-types'

  export default {
    name: 'ContainerBrainMapActions',
    components: {
      OrganismConfirmation,
      OrganismUploadActions
    },
    mixins: [
      uploadMixins.stepRouting
    ],
    data: function () {
      return {
        confirmationIsHidden: true,
        content: {
          ...staticContent.uploadConfirmation
        }
      }
    },
    methods: {
      abortProcessConfirmation: function () {
        this.confirmationIsHidden = false
      },
      nextStep: function () {
        this.$emit('nextStep', this.routeToNextUploadStep.bind(this.$route.params.stepSlug))
      },
      abortAndDestroy: function () {
        // TODO: Write a handler that destroys the session and data on the server side.
        this.$router.push({ name: BRAIN_MAP_MANAGER_ROUTES.BRAIN_MAP_MANAGER.name })
        this.$store.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.DELETE_UPLOAD)
      }
    }
  }
</script>
