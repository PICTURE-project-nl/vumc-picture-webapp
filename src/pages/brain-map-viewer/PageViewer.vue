<template>
  <TemplateNavbarEditor>
     <template :slot="TemplateNavbarEditor.slotConfig.columnSidebarLeft.name" id="left-container">
      <ContainerBrainMapControlsLeft :brainMapId="id"/>
    </template>
    <template :slot="TemplateNavbarEditor.slotConfig.columnMain.name">

       <ContainerBrainMapPanelsHeader :slug="slug" :id="id" />

      <div class="u-margin-top-small">
        <ContainerBrainMapPanels :slug="slug" :id="id" />
      </div>

    </template>
    <template :slot="TemplateNavbarEditor.slotConfig.columnSidebarRight.name">
      <ContainerBrainMapControlsRight />
    </template>

    <template :slot="TemplateNavbarEditor.slotConfig.columnMobile.name">
      <ContainerBrainMapMobileControls />
    </template>
  </TemplateNavbarEditor>
</template>

<script>
  import { TemplateNavbarEditor } from '@/components/presentational/templates'
  import {
    ContainerBrainMapPanels, ContainerBrainMapControlsLeft,
    ContainerBrainMapControlsRight, ContainerBrainMapPanelsHeader,ContainerBrainMapMobileControls
  } from '@/components/container/brain-map'

  export default {
    name: 'PageViewer',
    // validate ({ params }) {
    //   return !!params.slug
    // },
    components: {
      ContainerBrainMapPanels, TemplateNavbarEditor,
      ContainerBrainMapControlsLeft,  ContainerBrainMapControlsRight,
      ContainerBrainMapPanelsHeader,  ContainerBrainMapMobileControls
    },
    data: function () {
      return {
        TemplateNavbarEditor,
        slug: this.$route.params.slug,
        id: this.$route.params.id
      }
    }
  }
</script>
