import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'
 
export const BRAIN_MAP_FILTER_MUTATION_TYPES = deepFreeze({
    
  SET_BRAIN_MAP_FILTER_DATA: 'brain-map-filter/mutations/set-brain-map-filter-data',
  SET_BRAIN_MAP_FILTER_STATUS: 'brain-map-filter/mutations/set-brain-map-filter-status',
  SET_BRAIN_MAP_FILTERABLE_OPTIONS:'brain-map-filter/mutations/set-brain-map-filterable-options'
  
})
