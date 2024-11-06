
import { api, useMockApi } from '@/config/api'
import './brain-maps-mocks'
import { apiGetAuthorizationHeader, transformRequest } from '@/api/utils'

const apiBrainMaps = {}
const activeRequests = {}

apiBrainMaps.get = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetAuthorizationHeader()
  }

  if (!activeRequests.get) {
    activeRequests.get = api.get('brain-maps', transformRequest(customHeaders))
  }

  activeRequests.get
    .then((response) => {
      successCallback(response.data.data)
    })
    .catch((response) => errorCallback(response))
    .then(() => { activeRequests.get = null })
}

apiBrainMaps.getOne = (payload, errorCallback, successCallback) => {
  if (useMockApi) { payload = 'comparing-quality-gbm-l' }

  const customHeaders = {
    ...apiGetAuthorizationHeader()
  }

  api.get(`brain-map/${payload}`, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((response) => errorCallback(response))
}

apiBrainMaps.delete = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetAuthorizationHeader()
  }

  api.delete(`brain-map/${payload.brainMapId}`, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiBrainMaps.update = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetAuthorizationHeader(),
    'Content-Type': 'multipart/form-data'
  }
  let formData = new FormData()

  Object.entries(payload.data).forEach(
    ([key, value]) => formData.append(key, value)
  )

  api.post(`brain-map/${payload.id}`, formData, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((response) => errorCallback(response))
}

apiBrainMaps.getAll= async ()=>{
  const customHeaders = {
    ...apiGetAuthorizationHeader()
  }
  // try{
  //   let res = await api.get('http://test.pictureproject.nl:3000/src/static/research-brain-maps',transformRequest(customHeaders));
  //   console.log("research brain maps ",res);
  //   return res;
  // }catch(response)
  // {
  //    console.log(" error getting reseach  maps ",response);
  // }
}

export { apiBrainMaps }
