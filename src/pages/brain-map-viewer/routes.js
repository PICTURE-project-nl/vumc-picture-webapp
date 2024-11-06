
// Relative path so it can be used outside the Nuxt.js build system.
import { BRAIN_MAPS } from '../../config/brain-maps'

export const BRAIN_MAP_VIEWER_ROUTES = {
  BRAIN_MAP_VIEWER: {
    name: 'BRAIN_MAP_VIEWER',
    path: '/brain-map-viewer/:slug/',
    title: 'Brain Map Viewer',
    exampleParam: {
      slug: BRAIN_MAPS[0].slug
    }
  },
  BRAIN_MAP_VIEWER_ID: {
    name: 'BRAIN_MAP_VIEWER_ID',
    path: '/brain-map-viewer/:id/',
    title: 'Brain Map Viewer'
  }
}
