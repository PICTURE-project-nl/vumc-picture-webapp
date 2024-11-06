
export const USER_ROUTES = {
  USER_SIGN_UP: {
    name: 'USER_SIGN_UP',
    path: '/sign-up/'
  },
  USER_LOG_IN: {
    name: 'USER_LOG_IN',
    path: '/log-in/',
    title: 'Log In'
  },
  USER_FORGOT_PASSWORD: {
    name: 'USER_FORGOT_PASSWORD',
    path: '/forgot-password/',
    title: 'Forgot password'
  },
  USER_RESET_PASSWORD: {
    name: 'USER_RESET_PASSWORD',
    path: '/reset-password/:token',
    title: 'Reset password'
  },
  USER_EDIT_ACCOUNT: {
    name: 'USER_EDIT_ACCOUNT',
    path: '/edit-account/',
    title: 'Edit Account'
  },
  ACTIVATE_ACCOUNT: {
    name: 'ACTIVATE_ACCOUNT',
    path: '/activate-account/:token',
    title: 'Activate account'
  }
}
