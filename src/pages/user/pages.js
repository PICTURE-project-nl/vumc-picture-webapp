
import PageEditAccount from './PageEditAccount.vue'
import PageActivateAccount from './PageActivateAccount.vue'
import PageForgotPassword from './PageForgotPassword.vue'
import PageResetPassword from './PageResetPassword.vue'
import PageLogIn from './PageLogIn.vue'
import PageSignUp from './PageSignUp.vue'

export const USER_PAGES = {
  USER_SIGN_UP: {
    component: PageSignUp
  },
  USER_LOG_IN: {
    component: PageLogIn
  },
  USER_FORGOT_PASSWORD: {
    component: PageForgotPassword
  },
  USER_RESET_PASSWORD: {
    component: PageResetPassword
  },
  USER_EDIT_ACCOUNT: {
    component: PageEditAccount
  },
  ACTIVATE_ACCOUNT: {
    component: PageActivateAccount
  }
}
