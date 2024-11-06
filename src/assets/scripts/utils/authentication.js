
import Cookies from 'js-cookie'

import { COOKIE_KEYS } from '@/assets/scripts/constants/cookie-keys'

let authenticationToken = null

export const setAuthenticationCookie = (token) => {
  authenticationToken = token
  Cookies.set(COOKIE_KEYS.AUTHENTICATION, token)
}

export const getAuthenticationCookie = (app) => {
  if (app && app.$cookies) {
    // if (app.$cookies)
    // Because we use server side rendering there are cases where the cookies
    // are requested in the server, there for we use this library: https://www.npmjs.com/package/cookie-universal-nuxt
    // To use this lib we need the Vue (app) instance that is not available everywhere.
    authenticationToken = app.$cookies.get(COOKIE_KEYS.AUTHENTICATION)
  } else {
    authenticationToken = Cookies.get(COOKIE_KEYS.AUTHENTICATION)
  }
  return authenticationToken
}

export const hasAuthenticationCookie = () => Boolean(getAuthenticationCookie())

export const removeAuthenticationCookie = () => {
  authenticationToken = null
  Cookies.remove(COOKIE_KEYS.AUTHENTICATION)
}
