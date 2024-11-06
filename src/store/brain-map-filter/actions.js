import {apiBrainMapFilterStatus} from '@/api/brain-map-filter'
import {BRAIN_MAP_FILTER_ACTION_TYPES}  from './action-types'
import { BRAIN_MAP_FILTER_MUTATION_TYPES } from './mutation-types'
import {BRAIN_MAPS_MUTATION_TYPES} from './../brain-maps/mutation-types'

const errorHandler = ({error,payload})=>
{
    console.error(error, payload || 'no playload')
}

const successHandler = ({action, payload}) => {
    console.log(`SUCCESS: ${action}`, payload)
}
//const tempPayload = '918aa2ff-50aa-47a6-aac2-5e233a5e6fb7';

export const actions = {
    [BRAIN_MAP_FILTER_ACTION_TYPES.GET_BRAIN_MAP_FILTERABLE_OPTIONS]:function(context,payload){
        context.commit(BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTERABLE_OPTIONS, payload)
    },

    [BRAIN_MAP_FILTER_ACTION_TYPES.GET_BRAIN_MAP_FILTER_DATA]: function(context, payload) {
        apiBrainMapFilterStatus.get(
            payload,
            (res)=>{
                //failure
                //Where is error callback
                context.commit(BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTER_STATUS, res)

            },
            (res)=>{
                let newMap = res.result.probability_map;
                let payloadId =payload
                let cumulativePayload = {res, payloadId}
                context.commit(BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTER_STATUS, res)
                context.commit(BRAIN_MAP_FILTER_MUTATION_TYPES.SET_BRAIN_MAP_FILTER_DATA ,res);
                context.commit(BRAIN_MAPS_MUTATION_TYPES.SET_FILTERED_BRAIN_MAPS, cumulativePayload );
            },
        )
    }
}
