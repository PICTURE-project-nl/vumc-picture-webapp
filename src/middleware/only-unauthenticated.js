
import { DEFAULT_AUTHENTICATED_PAGE } from '@/config/routing'
import { hasAuthenticationCookie } from '@/assets/scripts/utils/authentication'

export default function ({ app, query, route, redirect }) {
  if (hasAuthenticationCookie()) redirect(DEFAULT_AUTHENTICATED_PAGE.path)
}
