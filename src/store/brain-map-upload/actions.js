import { UPLOAD_BRAIN_MAP_ACTION_TYPES } from './action-types'
import { UPLOAD_BRAIN_MAP_MUTATION_TYPES } from './mutation-types'
import { apiBrainMapsUpload } from '@/api/brain-maps-upload'
import { formHandlers } from '@/store/forms/handlers'

export const actions = {
  [UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS]: function (context, payload) {
    const newUploadStatus = []
    let isInProgress = null
    context.state.uploadStatus.map((step, index) => {
      newUploadStatus.push(
        {
          ...step
        }
      )
      newUploadStatus[index].isCompleted = false
      newUploadStatus[index].isInProgress = false
      if (step.slug === payload) {
        newUploadStatus[index].isInProgress = true
        isInProgress = true
      } else if (!isInProgress) {
        newUploadStatus[index].isCompleted = true
      }
    })
    context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_STATUS, newUploadStatus)
  },
  [UPLOAD_BRAIN_MAP_ACTION_TYPES.UPLOAD_FILE]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiBrainMapsUpload.uploadFile(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      () => {
        formHandlers.successHandler({ context, payload })
      }
    )
  },
  [UPLOAD_BRAIN_MAP_ACTION_TYPES.GET_UPLOAD]: function (context, payload) {
    formHandlers.startHandler({ context, payload })
    context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_CLASSIFY_DATA)
    apiBrainMapsUpload.get(
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      (data) => {
        console.info('get upload data', data)
        if (typeof data === 'undefined' || (data.processState === 'null' && data.uploadId === 'null')) {
          console.info('no upload', data)
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_DATA)
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_CLASSIFY_DATA)
          context.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, 'upload')
        } else if (!data.brainMapName) {
          console.info('upload and no name', data)
          context.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, 'meta-data')
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_ID, data.uploadId)
        } else if (data.autoSegmentation && data.autoSegmentation.status === 'failed') {
          console.info('process failed', data)
          window.alert('brain map auto segmentation failed please try again. If you have any questions please contact the picture team at: development@activecollective.nl')
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_ID, data.uploadId)
          context.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.DELETE_UPLOAD)
          context.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, 'upload')
        } else if (!data.niftiMetadata) {
          console.info('upload and meta data, no files jet', data)
          context.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, 'classify')
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_ID, data.uploadId)
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_CLASSIFY_DATA)
          window.setTimeout(context.dispatch, 15000, UPLOAD_BRAIN_MAP_ACTION_TYPES.GET_UPLOAD, payload)
        } else {
          console.info('ready for selecting classification files', data)
          formHandlers.successHandler({ context, payload })
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_CLASSIFY_FILES, data.niftiMetadata)
          context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.SET_UPLOAD_ID, data.uploadId)
          context.dispatch(UPLOAD_BRAIN_MAP_ACTION_TYPES.SET_UPLOAD_STATUS, 'classify')
        }
      }
    )
  },
  [UPLOAD_BRAIN_MAP_ACTION_TYPES.SEND_CLASSIFICATIONS]: function (context, payload) {
    formHandlers.startHandler({ context, payload })
    payload.data.uploadId = context.state.uploadId
    apiBrainMapsUpload.sendClassifications(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      () => {
        formHandlers.successHandler({ context, payload })
      }
    )
  },
  [UPLOAD_BRAIN_MAP_ACTION_TYPES.SEND_META_DATA]: function (context, payload) {
    formHandlers.startHandler({ context, payload })
    payload.uploadId = context.state.uploadId
    apiBrainMapsUpload.sendMetaData(
      payload,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      () => {
        formHandlers.successHandler({ context, payload })
      }
    )
  },
  [UPLOAD_BRAIN_MAP_ACTION_TYPES.DELETE_UPLOAD]: function (context) {
    apiBrainMapsUpload.delete(
      { uploadId: context.state.uploadId },
      (response) => {
        console.error('error on delete upload:', response)
      },
      () => {
        context.commit(UPLOAD_BRAIN_MAP_MUTATION_TYPES.RESET_UPLOAD_DATA)
      }
    )
  }
}
