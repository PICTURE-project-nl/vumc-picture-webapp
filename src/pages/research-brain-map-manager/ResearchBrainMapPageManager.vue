<template>

  <TemplateNavbarExplorer>
    <template :slot="TemplateNavbarExplorer.slotConfig.columnSidebar.name">
      <ContainerBrainMapFolders />
    </template>
    <template :slot="TemplateNavbarExplorer.slotConfig.columnMain.name">

      <div>
        <ContainerResearchBrainMapOverview />
      </div>
    </template>
  </TemplateNavbarExplorer>
</template>

<script>
import { ROUTES } from '@/config/routes'
import { TemplateNavbarExplorer } from '@/components/presentational/templates'
import { ContainerResearchBrainMapOverview, ContainerBrainMapFolders } from '@/components/container/brain-map'
import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'
import { AtomDivider } from '@/components/presentational/atoms'
  export default {
    name: 'ResearchBrainMapPageManager',
    components: {
      ContainerResearchBrainMapOverview,
      ContainerBrainMapFolders,
      TemplateNavbarExplorer,AtomDivider
    },
      mixins: [
      brainMapsViewerMixins.info,
    ],
    data: function () {
      return {
          ROUTES,
        TemplateNavbarExplorer
      }
    }
  }
</script>
<style  lang="scss" scoped>
.li_researchBrainMap
{
  margin:20px;
};
</style>
