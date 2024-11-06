
import { api } from '@/config/api'
import {
  apiGetAuthorizationHeader, apiGetPutHeaders,
  transformRequest
} from './utils'
import './brain-maps-upload-mocks'

const apiBrainMapsUpload = {}
const activeRequests = {}

apiBrainMapsUpload.uploadFile = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    'Content-Type': 'multipart/form-data',
    ...apiGetAuthorizationHeader()
  }

  let formData = new FormData()
  formData.append('file', payload.userInputFile);

  api.post('brain-maps/upload', formData, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiBrainMapsUpload.get = (errorCallback, successCallback) => {
  if (!activeRequests.get) {
    const customHeaders = {
      ...apiGetAuthorizationHeader()
    }

    activeRequests.get = api.get('brain-maps/upload', transformRequest(customHeaders))
  }

  activeRequests.get
    .then((response) => successCallback(response.data.data))
    .catch((error) => errorCallback(error.response))
    .then(() => { activeRequests.get = null })
}

apiBrainMapsUpload.delete = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetAuthorizationHeader()
  }

  api.delete(`brain-maps/upload/${payload.uploadId}`, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
    .then(() => { activeRequests.get = null })
}

apiBrainMapsUpload.sendClassifications = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetPutHeaders(),
    ...apiGetAuthorizationHeader()
  }

  let newPayload = {
    applyAutoSegmentation: true,
    uploadId: payload.uploadId,
    selectedT1cFileId: payload.selectedFiles.filter(file => file.value === 't1c')[0].id,
    selectedT1wFileId: payload.selectedFiles.filter(file => file.value === 't1w')[0].id,
    selectedT2wFileId: payload.selectedFiles.filter(file => file.value === 't2w')[0].id,
    selectedFLAIRFileId: payload.selectedFiles.filter(file => file.value === 'flair')[0].id
  }

  api.put(`brain-maps/upload/${payload.uploadId}`, newPayload, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiBrainMapsUpload.sendMetaData = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetPutHeaders(),
    ...apiGetAuthorizationHeader()
  }

  api.put(`brain-maps/upload-segmented/${payload.uploadId}`, payload.data, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

export { apiBrainMapsUpload }
