import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'

export const useMockApi = false
export const api = axios.create({
  baseURL: process.env.BASE_API_URL,
})

export let mockApi
if (useMockApi) {
  mockApi = new AxiosMockAdapter(api, {
    delayResponse: Math.round(200 * Math.random()) + 200,
  })
} else {
  mockApi = {}
}
