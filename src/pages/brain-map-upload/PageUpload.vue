<template>
  <div id="pageupload" class="pageupload">
    <div>

      <TemplateNavbarExplorer>

        <template slot="column-sidebar">
          <ContainerBrainMapProgress />
        </template>

        <template slot="column-main">
          <ContainerBrainMapUploadFormWrapper />
        </template>

      </TemplateNavbarExplorer>

    </div>
  </div>
</template>

<script>

  import { TemplateNavbarExplorer } from '@/components/presentational/templates'
  import {
    ContainerBrainMapUploadFormWrapper,
    ContainerBrainMapProgress
  } from '@/components/container/brain-map-upload'

  export default {
    name: 'PageUpload',
    middleware: [
      'only-authenticated'
    ],
    components: {
      TemplateNavbarExplorer,
      ContainerBrainMapUploadFormWrapper,
      ContainerBrainMapProgress
    }
  }
</script>
<style>
.pageupload{
  max-width:100vw;
  max-height:100vh;
  overflow:auto;
}
</style>