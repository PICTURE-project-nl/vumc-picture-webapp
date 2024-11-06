<template>
  <div>
    <OrganismFolderColumn
      :isAuthenticated="userIsAuthenticated"
      :userBrainMapsFolders="getUserBrainMapsFolders"
      :researchBrainMapsFolders="getResearchBrainMapsFolders"
      @setSelectedFolderId="setSelectedFolderId"
    />
  </div>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { brainMapsMixins } from '@/store/brain-maps/mixins'
  import { userMixins } from '@/store/user'

  import { OrganismFolderColumn } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerBrainMapFolders',
    components: {
      OrganismFolderColumn
    },
    mixins: [
      brainMapsMixins.folders,
      userMixins.authenticatedData
    ],
    data: function () {
      return {
        ROUTES
      }
    }
  }
</script>
