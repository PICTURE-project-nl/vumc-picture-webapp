
import { api } from '@/config/api'
import './user-mocks'

import {
  apiGetAuthorizationHeader,
  apiGetPasswordHeaders,
  apiGetPutHeaders,
  transformRequest
} from './utils'

const apiUser = {}
const activeRequests = {}

apiUser.register = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetPasswordHeaders()
  }

  api.post('user', payload, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.resetPassword = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetPasswordHeaders()
  }
  api.post('user/reset-password', payload, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.forgotPassword = (payload, errorCallback, successCallback) => {
  api.post('user/request-password-reset', payload)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.userCheckResetPassword = (payload, errorCallback, successCallback) => {
  api.get(`user/find-password-reset/${payload}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.login = (payload, errorCallback, successCallback) => {
  api.post('user/login', payload)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.get = (errorCallback, successCallback) => {
  if (!activeRequests.get) {
    const customHeaders = {
      ...apiGetAuthorizationHeader()
    }

    activeRequests.get = api.get('user', transformRequest(customHeaders))
  }

  activeRequests.get
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
    .then(() => { activeRequests.get = null })
}

apiUser.update = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetPutHeaders(),
    ...apiGetAuthorizationHeader()
  }

  api.put('user', payload, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.changePassword = (payload, errorCallback, successCallback) => {
  const customHeaders = {
    ...apiGetPasswordHeaders(),
    ...apiGetAuthorizationHeader()
  }

  api.post('user/change-password', payload, transformRequest(customHeaders))
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

apiUser.delete = (payload, errorCallback, successCallback) => {
  // Do api call POST with payload on /user/delete
  // On error > errorCallback

  successCallback()
}

apiUser.logout = (errorCallback, successCallback) => {
  if (!activeRequests.logout) {
    const customHeaders = {
      ...apiGetAuthorizationHeader()
    }
    activeRequests.logout = api.get('user/logout', transformRequest(customHeaders))
  }

  activeRequests.logout
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
    .then(() => { activeRequests.logout = null })
}

apiUser.userActivateAccount = (token, errorCallback, successCallback) => {
  api.get(`user/activate/${token}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error.response))
}

export { apiUser }
