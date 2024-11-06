
import { mockApi, useMockApi } from '@/config/api'
import { userModelMock } from '@/store/user'

if (useMockApi) {
  mockApi.onGet('user').reply(function () {
    return [200, userModelMock]
  })

  mockApi.onPost('user/login').reply(function () {
    return [200, userModelMock]
  })

  mockApi.onPost('user').reply(200)

  mockApi.onPut('user').reply((config) => [
    200,
    {
      ...userModelMock,
      ...JSON.parse(config.data)
    }
  ])

  mockApi.onPost('user/reset-password').reply(200)

  mockApi.onGet('user/check-reset-password').reply(200,
    {
      'id': 2,
      'email': 'someone@example.com',
      'token': '32fidmk111m0dwqkmdk1212',
      'created_at': '2018-10-27 12:05:21',
      'updated_at': '2018-10-27 12:05:21'
    }
  )

  mockApi.onPost('user/reset-password').reply(200,
    {
      'id': '623594',
      'name': 'John Doe',
      'institute': 'VUmc',
      'email': 'john.doe@example.com',
      'apiKey': 'gK2xh02ebzc03kafu8ajdpsTT2erdmlef'
    }
  )
}
