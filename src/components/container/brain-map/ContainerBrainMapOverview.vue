<template>
  <div>
    <OrganismBrainMapOverviewBlock
      :brainMaps="getBrainMapsFromFolderId"
      :title="getSelectedFolderName"
      @setPopupFileId="setPopupFileId"
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
        :brainMapInfo="getSelectedBrainMap"
        @closePopup="unsetPopupFileId"
        @submit="handleSubmit"
        @deleteFile="brainMapDelete"
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
    name: 'ContainerBrainMapOverview',
    components: {
      WrapperPopup,
      OrganismBrainMapOverviewBlock,
      OrganismBrainMapMRIInfo
    },
    mixins: [
      brainMapsMixins.folders,
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
      formData: function () {
        return {
          brainMapName: this.getSelectedBrainMap.brainMapName,
          brainMapNotes: this.getSelectedBrainMap.brainMapNotes,
          sharedBrainMap: this.getSelectedBrainMap.sharedBrainMap
        }
      }
    },
    methods: {
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
