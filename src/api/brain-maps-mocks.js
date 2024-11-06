
import { brainMapModelMock } from '@/store/brain-maps/model'
import { mockApi, useMockApi } from '@/config/api'

if (useMockApi) {
  mockApi.onGet('brain-maps').reply(200, { data: brainMapModelMock })
  mockApi.onGet('brain-maps/transforms-probability-map').reply(200, { data: brainMapModelMock['brain-maps'][5] })
  mockApi.onGet('brain-map/comparing-quality-gbm-l').reply(200, { data: brainMapModelMock['brain-maps'][0] })
}
