
import { COOKIE_KEYS } from '@/assets/scripts/constants/cookie-keys'
import { DEFAULT_LANDING_PAGE } from '@/config/routing'

/*
This enables access to the library pages via the query parameter 'showComponentLibraryPages'. If present, we set a
session cookie so the user can continue accessing the library pages during this session.
 */

const KEY = COOKIE_KEYS.COMPONENT_LIBRARY_PAGES

export default function ({ app, query, route, redirect }) {
  const hasComponentLibraryPagesCookie = Boolean(app.$cookies.get(KEY))
  const hasComponentLibraryPagesQueryParameter = typeof query[KEY] !== 'undefined'
  const isAllowedToViewComponentLibraryPages = hasComponentLibraryPagesCookie || hasComponentLibraryPagesQueryParameter

  if (hasComponentLibraryPagesQueryParameter && !hasComponentLibraryPagesCookie) {
    app.$cookies.set(KEY, true)
  }

  if (!isAllowedToViewComponentLibraryPages) {
    redirect(DEFAULT_LANDING_PAGE.path)
  }
}
