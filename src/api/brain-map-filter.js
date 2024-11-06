import {api} from '@/config/api'
import { apiGetAuthorizationHeader, transformRequest} from '@/api/utils'

 const apiBrainMapFilterStatus = {}
 const apiBrainMapFilterableOptions = {}

 const customHeaders = {
   'Content-Type': 'multipart/form-data',
   ...apiGetAuthorizationHeader()
 }
//const filterParams ='';//`{"modality": "t1w", "filter_criteria": {"Age": [20, 60]}}`;
 //const tempPayload = '918aa2ff-50aa-47a6-aac2-5e233a5e6fb7';
 let formData = new FormData()
 formData.append("modality","t1w");
 let temp = new FormData()
 temp.append("Age",[20, 60]);
 formData.append("filter_criteria",temp);

 apiBrainMapFilterStatus.get = (payload, errorCallback, successCallback, formData, commit) => {
      api.get(`brain-maps/filter/${payload}`,transformRequest(customHeaders))
       .then((response)=> {
                if(response.data.status == 'OK'){
                     console.log(' success status message received ')
                     successCallback(response.data)
                     // commit(SET_BRAIN_MAPS_FILTER_STATUS.SET_BRAIN_MAP_FILTER_STATUS, payload)
                  }
                  //successCallback(response.data)
               }
        )
       .catch((response)=>errorCallback(response))
 } 


 
export { apiBrainMapFilterStatus};