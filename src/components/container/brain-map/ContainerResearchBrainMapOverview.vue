<template>
  <div>
    <OrganismBrainMapOverviewBlock
      :brainMaps="getResearchBrainMaps()"
      :title="'Research Brain Maps'"
      @setPopupFileId="setPopupFileId"
      :isResearch="true"
    />
    <WrapperPopup
      v-if="selectedBrainMapId"
      :isHidden="popupIsHidden"
      :title="formData.name"
      @close="popupIsHidden = true"
    >
      <OrganismBrainMapMRIInfo
        :formData="formData"
        :formName="formName"
        @closePopup="unsetPopupFileId"
      />
    </WrapperPopup>
  </div>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { brainMapsMixins } from '@/store/brain-maps/mixins'

  import { OrganismBrainMapOverviewBlock, OrganismBrainMapMRIInfo } from '@/components/presentational/organisms'
  import WrapperPopup from '@/components/presentational/wrappers/WrapperPopup'

  export default {
    name: 'ContainerResearchBrainMapOverview',
    components: {
      WrapperPopup,
      OrganismBrainMapOverviewBlock,
      OrganismBrainMapMRIInfo
    },
    mixins: [
      brainMapsMixins.fileForm
    ],
    data: function () {
      return {
        ROUTES,
        selectedBrainMapId: null,
        formName: 'brainMapInfoForm',
        popupIsHidden: false
      }
    },
    computed: {
      // formData: function () {
      //   return {
      //     brainMapName: this.getSelectedBrainMap.brainMapName,
      //     brainMapNotes: this.getSelectedBrainMap.brainMapNotes,
      //     sharedBrainMap: this.getSelectedBrainMap.sharedBrainMap
      //   }
      // }
    },
    methods: {
      getResearchBrainMaps: function () {
        return this.$store.state.researchBrainMaps.brainMaps
      },
      setPopupFileId: function (fileId) {
        this.selectedBrainMapId = fileId
        this.popupIsHidden = false
      },
      unsetPopupFileId: function () {
        this.selectedBrainMapId = null
      }
    }
  }
</script>
