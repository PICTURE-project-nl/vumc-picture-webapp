<template>
  <TemplateNavbarExplorer>
    <template :slot="TemplateNavbarExplorer.slotConfig.columnSidebar.name">
      <ContainerBrainMapFolders />
    </template>
    <template :slot="TemplateNavbarExplorer.slotConfig.columnMain.name">

      <div>
        <ContainerBrainMapOverview />
      </div>

    </template>
  </TemplateNavbarExplorer>
</template>

<script>
  import { TemplateNavbarExplorer } from '@/components/presentational/templates'
  import { ContainerBrainMapOverview, ContainerBrainMapFolders } from '@/components/container/brain-map'

  export default {
    name: 'PageBrainMapManager',
    components: {
      ContainerBrainMapOverview,
      ContainerBrainMapFolders,
      TemplateNavbarExplorer
    },
    data: function () {
      return {
        TemplateNavbarExplorer
      }
    }
  }
</script>
