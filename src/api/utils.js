import { hasAuthenticationCookie, getAuthenticationCookie } from '@/assets/scripts/utils/authentication'
import { objectToQueryString } from '@/assets/scripts/utils/object-to-query-string'

export const apiGetPasswordHeaders = () => {
  const headers = {}
  headers['Content-Type'] = 'application/json; charset=utf-8'
  headers['Accept'] = 'application/json'

  return headers
}

export const apiGetPutHeaders = () => {
  const headers = {}
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  headers['Accept'] = 'application/json'

  return headers
}

export const apiGetAuthorizationHeader = () => {
  const headers = {}
  if (hasAuthenticationCookie()) headers['Authorization'] = `Bearer ${getAuthenticationCookie()}`
  return headers
}

export const transformRequest = (customHeaders) => {
  return {
    transformRequest: [
      (data, headers) => {
        Object.keys(customHeaders).map((key) => {
          headers[key] = customHeaders[key]
        })

        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          return objectToQueryString(data)
        } else if (headers['Content-Type'] === 'multipart/form-data') {
          return data
        } else if (data) {
          return JSON.stringify(data).replace(new RegExp('passwordRepeat|newPasswordRepeat', 'g'), 'vPassword')
        } else {
          return ''
        }
      }
    ]
  }
}
