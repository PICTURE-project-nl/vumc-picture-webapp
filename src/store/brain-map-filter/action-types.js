 
import { deepFreeze } from '@/assets/scripts/utils/deep-freeze'
export const BRAIN_MAP_FILTER_ACTION_TYPES=deepFreeze(
    {
        GET_BRAIN_MAP_FILTER_DATA:'brainMapFilter/action/get-brain-map-filter-data',
        GET_BRAIN_MAP_FILTER_STATUS:'brainMapFilter/action/get-brain-map-filter-status',
        GET_BRAIN_MAP_FILTERABLE_OPTIONS:'brainMapFilter/action/get-brain-map-filtererable-options'
    }
)