
import { mockApi, useMockApi } from '@/config/api'
import { uploadIdModel, classifyResponse, classifyWaiting, classifySend } from '@/store/brain-map-upload'

if (useMockApi) {
  mockApi.onPost('brain-maps/upload').reply(function () {
    return [201, uploadIdModel]
  })

  mockApi.onGet('brain-maps/upload').replyOnce(function () {
    return [200, classifyWaiting]
  })

  mockApi.onGet('brain-maps/upload').reply(function () {
    return [200, classifyResponse]
  })

  mockApi.onPut('brain-maps/upload/0538ab9e-7c75-4ffd-b1b2-10a6c5f82598').reply(function () {
    return [200, classifySend]
  })
}
