
import { DEFAULT_UNAUTHENTICATED_PAGE } from '@/config/routing'
import { hasAuthenticationCookie } from '@/assets/scripts/utils/authentication'

export default function ({ app, query, route, redirect }) {
  if (!hasAuthenticationCookie(app)) redirect({ name: DEFAULT_UNAUTHENTICATED_PAGE.name, params: { lang: route.params.lang } })
}
