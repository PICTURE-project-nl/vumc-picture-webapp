import { BRAIN_MAPS_ACTION_TYPES } from '@/store/brain-maps/action-types'
import { BRAIN_MAPS_GETTER_TYPES } from '@/store/brain-maps/getter-types'
import { userMixins } from '@/store/user/mixins'
import { FORMS_ACTION_TYPES } from '@/store/forms'
import { staticContent } from '@/data/static-content'

const brainMapsMixins = {}

brainMapsMixins.folders = {
  mixins: [
    userMixins.authenticatedData
  ],
  computed: {
    getUserBrainMapsFolders: function () {
      if (this.userIsAuthenticated) {
        return this.$store.getters[BRAIN_MAPS_GETTER_TYPES.GET_USER_FOLDERS]
      } else {
        return []
      }
    },
    getResearchBrainMapsFolders: function () {
      return this.$store.getters[BRAIN_MAPS_GETTER_TYPES.GET_RESEARCH_FOLDERS]
    },
    getBrainMapsFromFolderId: function () {
      return this.$store.getters[BRAIN_MAPS_GETTER_TYPES.GET_FOLDER_BRAIN_MAPS](this.$store.state.brainMaps.selectedFolderId)
    },
    getSelectedFolderName: function () {
      return this.$store.getters[BRAIN_MAPS_GETTER_TYPES.GET_FOLDER_NAME](this.$store.state.brainMaps.selectedFolderId)
    },
    getSelectedBrainMap: function () {
      if (!this.selectedBrainMapId) {
        this.selectedBrainMapId = this.$route.params.slug;
      }
      return this.$store.getters[BRAIN_MAPS_GETTER_TYPES.GET_BRAIN_MAP_BY_ID](this.selectedBrainMapId)
    }
  },
  created: function () {
    this.$store.dispatch(BRAIN_MAPS_ACTION_TYPES.GET_BRAIN_MAPS_DATA)
    // this.$store.dispatch(BRAIN_MAPS_ACTION_TYPES.GET_RESEARCH_BRAIN_MAPS_DATA)
  },
  methods: {
    setSelectedFolderId: function (folderId) {
      this.$store.dispatch(BRAIN_MAPS_ACTION_TYPES.UPDATE_SELECTED_FOLDER, folderId)
    }
  }
}

brainMapsMixins.fileForm = {
  methods: {
    brainMapDelete: function (payload) {
      this.selectedBrainMapId = null
      this.$store.dispatch(BRAIN_MAPS_ACTION_TYPES.DELETE, payload)
    },
    handleSubmit: function (payload) {
      payload.onSuccess = () => {
        this.$store.dispatch(FORMS_ACTION_TYPES.SET_SUCCESS, {
          formName: this.formName,
          message: staticContent.brainMapInfo.successMessage
        })
        window.setTimeout(FORMS_ACTION_TYPES.CLEAR(payload), 2000)
      }
      this.sendMetaData(payload)
    },
    sendMetaData: function (payload) {
      payload['id'] = this.selectedBrainMapId
      this.$store.dispatch(BRAIN_MAPS_ACTION_TYPES.UPDATE_INFO, payload)
    }
  }
}

export { brainMapsMixins }
