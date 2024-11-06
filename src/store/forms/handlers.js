import { FORMS_ACTION_TYPES } from '@/store/forms/action-types'
import { USER_ACTION_TYPES } from '@/store/user'

export const formHandlers = {}

formHandlers.startHandler = ({ context, payload }) => {
  if (!payload) return

  if (payload.formName) {
    context.dispatch(FORMS_ACTION_TYPES.SET_PENDING, {
      formName: payload.formName
    })
  }
}

formHandlers.errorHandler = ({ response, context, payload }) => {
  if (response && response.status === 401) {
    context.dispatch(USER_ACTION_TYPES.LOGOUT)
  }

  if (!payload) return

  const errorApiMessages = response ? response.data.error : null

  if (payload.formName) {
    context.dispatch(FORMS_ACTION_TYPES.SET_ERROR, {
      formName: payload.formName,
      message: payload.message,
      errorApiMessages: errorApiMessages
    })
  }
}

formHandlers.successHandler = ({ context, payload }) => {
  if (!payload) return

  if (payload.formName) {
    context.dispatch(FORMS_ACTION_TYPES.UNSET_PENDING, {
      formName: payload.formName
    })
  }

  if (payload.onSuccess) payload.onSuccess()
}
