<template>
<div   class="controls-container"
    :class="{
      'while-brains-loading': isLoading,
      'brains-loaded': !isLoading
    }">
  <nav class="navigation-bar">
    <div class="o-wrapper o-wrapper--extended o-wrapper--flush">
      <OrganismNavBarSecond
        :coordinates="getCoordinates"
        @setCoordinates="setCoordinates"
        @resetCoordinates="resetCoordinates"
        @setBrainDefaultToggle="setBrainDefaultToggle"
        :brainDefaultToggleValue="getBrainDefaultToggleValue"
        :thresholdValue="getThresholdValue"
        @setThreshold="setThreshold"
        @resetFilters="resetFilters"
        :maskingValue="getMaskingValue"
        @setMasking="setMasking"
        @resetMasking="resetMasking"
        :probabilityValue="getProbabilityValue"
        :patientAmountValue="getPatientAmountValue"
        :link="link"
        @openInfo ="openInfo"
        @openDownload="openDownload"
         @openShare="openShare"
      />
      <ContainerBrainMapDownload
        :isHidden="downloadIsHidden"
        @closeDownload="closeDownload"
      />

      <WrapperPopup
      :isHidden="popUpIsHidden"
      :title="content.title"
      @close="closeShare"
    >

      <OrganismBrainMapShareBlock
        :link="link"
      ></OrganismBrainMapShareBlock>

    </WrapperPopup>
       <ContainerBrainMapInfo
        v-if="!isLoading"
        :isHidden="infoIsHidden"
        @closeInfo="closeInfo"
        :brainMapInfo="getSelectedBrainMap"
      />

       <!-- <WrapperPopup
        :isHidden=false
        @close="closeInfo"
      > -->
        <!-- <OrganismBrainMapInfoBlock :brainMapInfo="getSelectedBrainMap"> </OrganismBrainMapInfoBlock> -->
      <!-- </WrapperPopup>  -->
    </div>
  </nav>
  </div>
</template>

<script>
import { ROUTES } from "@/config/routes";
import { URLS } from "@/assets/scripts/constants/urls";
import { staticContent } from "@/data/static-content";
import { userMixins } from "@/store/user";
import { OrganismNavBarSecond,OrganismBrainMapInfoBlock,OrganismBrainMapShareBlock } from "@/components/presentational/organisms";
import { brainMapsViewerMixins } from "@/store/brain-map-viewer/mixins";
import WrapperPopup from '@/components/presentational/wrappers/WrapperPopup'
import ContainerBrainMapInfo from "@/components/container/brain-map/ContainerBrainMapInfo";
import ContainerBrainMapDownload from "@/components/container/brain-map/ContainerBrainMapDownload";
 import { shareBrainMapUrl } from '@/mixins/shareBrainMapUrl'
import { brainMapsMixins } from '@/store/brain-maps/mixins'
export default {
  name: "ContainerNavigationBarHorizontal",
  components: {
    OrganismBrainMapShareBlock,WrapperPopup,
    OrganismNavBarSecond,OrganismBrainMapInfoBlock,
    ContainerBrainMapInfo,ContainerBrainMapDownload
  },
  mixins: [
    userMixins.authenticatedData,
    userMixins.authenticatedUpdate,
    brainMapsViewerMixins.controls,
    brainMapsMixins.folders,
    brainMapsMixins.fileForm,
    shareBrainMapUrl.get
  ],
  data: function () {
    return {
      popUpIsHidden: true,
      downloadIsHidden: true,
      ROUTES,
      URLS,WrapperPopup,
      infoIsHidden:true,
     
      link: window.location.href,//'https://tool.pictureproject.nl/#/d/comparing-quality-gbm-l'
      content: {
        // ...staticContent.topNavigation
        ...staticContent.brainMapShare,
      },
    };
  },

  methods:{
  closeDownload: function () {
      this.downloadIsHidden = true;
    },
    openDownload: function () {
      this.downloadIsHidden = false;
    },
    closeInfo:function(){
      this.infoIsHidden = true;
    },
    openInfo:function(){
      this.infoIsHidden = false;
    },

    openShare: function () {
        this.popUpIsHidden = false
        this.shareUrl = this.getShareUrl()
      },
      closeShare: function () {
        this.popUpIsHidden = true
      },
  },

  computed: {
    isLoading: function () {
      return this.$store.state.brainMapViewer.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  background-color: $color-jaguar;
  height: 48px;
  left: 0;
  width: 100%;
  margin-top: 0px;
  padding-top: $global-spacing-unit-small;
  position: relative;
  //opacity: 1;
 // z-index:1;
   //z-index: map-get($stack-index, navigation);
}

 .while-brains-loading * {
    opacity: 0.8;
    pointer-events: none;

  }

  .brains-loaded * {
    opacity: 1;
    transition: opacity 1s;
  }
</style>
