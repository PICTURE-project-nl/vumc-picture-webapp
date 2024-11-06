<template>
  <WrapperPopup
    :isHidden="isHidden"
    title="Brain map information"
    @close="closeInfo"
  >
    <OrganismBrainMapInfoBlock 
    :brainMapInfo="getSelectedBrainMap"/>
  </WrapperPopup>
</template>

<script>
import { formsMixins } from '@/store/forms'
import { Download } from '@/assets/scripts/libraries/brain-browser/download'
import { WrapperPopup } from '@/components/presentational/wrappers'
import  OrganismBrainMapInfoBlock  from './../../presentational/organisms/OrganismBrainMapInfoBlock.vue'
  import { OrganismDownloadBlock } from '@/components/presentational/organisms'
import { brainMapsMixins } from '@/store/brain-maps/mixins'

  
  export default {
    name: 'ContainerBrainMapInfo',
    components: {
      WrapperPopup,
      OrganismBrainMapInfoBlock,OrganismDownloadBlock
    },
    mixins: [
      brainMapsMixins.folders,
      brainMapsMixins.fileForm,
      formsMixins
    ],
    props: {
      isHidden: Boolean
    },
    data: function () {
      return {
        download: new Download()
      }
    },
    created(){
      //console.log(" Test Organism info block ",this.getSelectedBrainMap);
    },
    computed: {
      currentModel: function () {
        return this.$store.state.brainMapViewer.currentBrainMap
      }
    },
    methods: {
      closeInfo: function () {
        this.$emit('closeInfo')
      },
      downloadZIP: function () {
        // TODO: apply the zip property when jorrit finishes the api
        window.open(this.currentModel.highResBrainMapFileURL)
      },
      downloadPDF: function () {
        // TODO: Fix the issue with loading the library over NUXT
        this.download.downloadPdf()
      }
    }
  }
</script>
