<template>
<div>
  <!-- <OrganismBrainMapPanelHeader
    :title="getCurrentBrainMapName"
    :resolutionValue="getResolutionValue"
    @setResolutionValue="setResolutionValue"
    :mainViewValue="getMainViewValue"
    @setMainViewValue="setMainViewValue"
  /> -->
    <div class="brain-container">
       <div class="o-layout-flex o-layout-flex--horizontal-center-row  u-margin-top">
         <div class="mri-image-header">  Pre_Surgical MRI  </div>
        </div>
      <div class="o-layout-flex o-layout-flex--horizontal-center-row">
       <div class="mri-image-header-content">
     <div v-if="getMaskingValue == 'probabilityMap'"> Probability : {{getProbability === -1 ? 'area outside of tumor' : getProbability}}  </div>
     <div v-else>   Patient Amount: {{getPatientAmount === -1 ? 'area outside of tumor' : getPatientAmount}}</div>
     <div id="colorBarDiv"></div>
   </div>

    </div>
  </div>
  </div>
</template>

<script>
  import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'
  import { OrganismBrainMapPanelHeader } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerBrainMapPanelsHeader',
    components: {
      OrganismBrainMapPanelHeader
    },
    mixins: [
      brainMapsViewerMixins.info,
      brainMapsViewerMixins.controls
    ],
    props: {
      slug: {
        type: String
      },
      id: {
        type: String
      }
    },
    computed:{
      getPatientAmount(){
        return this.getPatientAmountValue;
      },
      getProbability(){

        return this.getProbabilityValue;
      }
    },
    created: function () {

      document.addEventListener('volume-viewer-coordinates-updated', this.setProbabilityFromBrainBrowser)
      document.addEventListener('volume-viewer-coordinates-updated', this.setPatientAmountFromBrainBrowser)
    },
    beforeDestroy: function () {
      document.removeEventListener('volume-viewer-coordinates-updated', this.setProbabilityFromBrainBrowser)
      document.removeEventListener('volume-viewer-coordinates-updated', this.setPatientAmountFromBrainBrowser)
    }
  }
</script>

<style lang="scss" scoped>
    .mri-image-header{
     display: flex;
     justify-content: flex-start;
     max-width: 500px;
     margin-left:40%;
     width: 100%;
     margin-bottom:20px;
     font-size: 16px;
     font-weight: 600;
     font-family: "Poppins";
   }

   .mri-image-header-content{

    display: flex;
    justify-content: space-between;
    width: 100%;

     font-size: 14px;
     max-width: 500px;
     font-family: "Poppins";
   }

    .brain-container {
    @include mq($until: 1080px) {
      margin-left: $global-spacing-unit;
      margin-right: $global-spacing-unit;
    }
  }
</style>
