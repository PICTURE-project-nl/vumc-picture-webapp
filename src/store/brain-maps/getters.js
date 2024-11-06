import { BRAIN_MAPS_GETTER_TYPES } from '@/store/brain-maps/getter-types'

export const getters = {
  [BRAIN_MAPS_GETTER_TYPES.GET_FOLDER_BRAIN_MAPS]: (state) => (id) => {
    if (state.folders && state.list) {
      return state.list.filter(brainMap => brainMap.folderId === id)
    } else {
      return []
    }
  },
  [BRAIN_MAPS_GETTER_TYPES.GET_FOLDER_NAME]: (state) => (id) => {
    if (state.folders) {
      let folder = state.folders.find(folder => folder.id === id)
      return folder ? folder.name : null
    } else {
      return ''
    }
  },
  [BRAIN_MAPS_GETTER_TYPES.GET_RESEARCH_FOLDERS]:()=>()=>{
        let openBrainMaps = '';
        return [];
  },
  // [BRAIN_MAPS_GETTER_TYPES.GET_RESEARCH_FOLDERS]: state => {
  //   if (state.folders) {
  //     return state.folders.filter(folder => folder.name !== 'My brain maps')
  //   } else {
  //     return []
  //   }
  // },
  [BRAIN_MAPS_GETTER_TYPES.GET_USER_FOLDERS]: state => {
    if (state.folders) {
      return state.folders.filter(folder => folder.name === 'My brain maps')
    } else {
      return []
    }
  },
  [BRAIN_MAPS_GETTER_TYPES.GET_BRAIN_MAP_BY_ID]: (state) => (id) => {
    if (state.list) {
      if (!id) return state.list[0]
      return state.list.find(brainMap => brainMap.id === id)
    }
  }
}
