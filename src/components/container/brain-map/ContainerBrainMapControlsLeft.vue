<template>
  <div>
    <div id="testme">
      <OrganismBrainMapControlsLeft
        :isLoading="isLoading"
         @changeProcessingStatus="changeProcessingStatus"
         />
    </div>
  </div>
</template>

<script>
import {
  OrganismBrainMapControlsLeft,
  OrganismBrainMapShareBlock,
} from "@/components/presentational/organisms";
import { brainMapsViewerMixins } from "@/store/brain-map-viewer/mixins";
import WrapperPopup from "@/components/presentational/wrappers/WrapperPopup";
import { staticContent } from "@/data/static-content";
import { shareBrainMapUrl } from "@/mixins/shareBrainMapUrl";

import AtomButton from "../../presentational/atoms/AtomButton.vue";
export default {
  name: "ContainerBrainMapControlsLeft",
  components: {
    WrapperPopup,
    OrganismBrainMapShareBlock,
    OrganismBrainMapControlsLeft,
    AtomButton,
  },
  mixins: [brainMapsViewerMixins.controls, shareBrainMapUrl.get],
  data: function () {
    return {
      popUpIsHidden: true,
      downloadIsHidden: true,
      update:"",
      content: {
        ...staticContent.brainMapShare,
      },
      shareUrl: window.location.href,
    };
  },
 props: {
      brainMapId: {
        type: String,
        required: false
      }
    },
  methods:{
      changeProcessingStatus(status){
        this.$emit('changeProcessingStatus', status);
      }
  },
  computed: {
    isLoading: function () {
      return this.$store.state.brainMapViewer.loading;
    },
  },

};
</script>
