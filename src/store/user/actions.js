
import { staticContent } from '@/data/static-content'
import { apiUser } from '@/api/user'
import { USER_ACTION_TYPES } from './action-types'
import { USER_MUTATION_TYPES } from './mutation-types'
import { formHandlers } from '@/store/forms/handlers'

import {
  hasAuthenticationCookie,
  setAuthenticationCookie,
  removeAuthenticationCookie, getAuthenticationCookie
} from '@/assets/scripts/utils/authentication'

export const actions = {
  [USER_ACTION_TYPES.REGISTER]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiUser.register(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      () => {
        formHandlers.successHandler({ context, payload })
      }
    )
  },

  [USER_ACTION_TYPES.LOGIN]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiUser.login(
      payload.data,
      (response) => {
        if (response.status === 401) {
          payload.message = staticContent.formErrors.login
        }
        formHandlers.errorHandler({ response, context, payload })
      },
      (data) => {
        formHandlers.successHandler({ context, payload })
        setAuthenticationCookie(data.apiKey)
        context.commit(USER_MUTATION_TYPES.SET, data)
      }
    )
  },

  [USER_ACTION_TYPES.GET]: function (context) {
    if (!hasAuthenticationCookie()) return

    apiUser.get(
      (response) => {
        formHandlers.errorHandler({ response, context })
      },
      (data) => {
        formHandlers.successHandler({ context })
        context.commit(USER_MUTATION_TYPES.SET, data)
      }
    )
  },

  [USER_ACTION_TYPES.UPDATE]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiUser.update(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      (data) => {
        formHandlers.successHandler({ context, payload })
        context.commit(USER_MUTATION_TYPES.SET, data)
      }
    )
  },

  [USER_ACTION_TYPES.CHANGE_PASSWORD]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiUser.changePassword(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      (data) => {
        formHandlers.successHandler({ context, payload })
        setAuthenticationCookie(data.apiKey)
      }
    )
  },

  [USER_ACTION_TYPES.FORGOT_PASSWORD]: function (context, payload) {
    formHandlers.startHandler({ context, payload })

    apiUser.forgotPassword(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      (data) => {
        formHandlers.successHandler({ context, payload })
      }
    )
  },

  [USER_ACTION_TYPES.DELETE]: function (context, payload) {
    apiUser.delete(
      payload.data,
      (response) => {
        formHandlers.errorHandler({ response, context, payload })
      },
      () => {
        formHandlers.successHandler({ context, payload })
        context.dispatch(USER_ACTION_TYPES.LOGOUT)
      }
    )
  },

  [USER_ACTION_TYPES.LOGOUT]: function (context, payload) {
    apiUser.logout(
      (response) => {
        console.error('Logout went wrong', response)
        if (getAuthenticationCookie()) {
          removeAuthenticationCookie()
          context.commit(USER_MUTATION_TYPES.LOGOUT)
        }
      },
      () => {
        payload.onSuccess()
        removeAuthenticationCookie()
        context.commit(USER_MUTATION_TYPES.LOGOUT)
      }
    )
  }
}
