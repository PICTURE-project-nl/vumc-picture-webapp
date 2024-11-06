
import Vue from 'vue'
import Router from 'vue-router'

import {
  mergePagesWithRoutes,
  getRoutesAsArray
} from '@/assets/scripts/utils/routing'

/*
Routes and pages are seperated because we would otherwise get a circular depency when adding a page as a route
component and trying to import the routes config into page components at the same time. We merge the pages with routes
based on their keys like 'USER_LOG_IN'. It's therefor important to use the same keys in the corresponding routes and
pages configurations.

To get a routes configuration we can use application wide, we manually build the **src/config/routes.js** file through
the **runscripts/extract-routes.js** script.
 */

import { GENERAL_ROUTES } from '@/pages/general/routes'
import { GENERAL_PAGES } from '@/pages/general/pages'
import { COMPONENT_LIBRARY_ROUTES } from '@/pages/component-library/routes'
import { COMPONENT_LIBRARY_PAGES } from '@/pages/component-library/pages'
import { USER_ROUTES } from '@/pages/user/routes'
import { USER_PAGES } from '@/pages/user/pages'
import { BRAIN_MAP_MANAGER_ROUTES } from '@/pages/brain-map-manager/routes'
import { BRAIN_MAP_MANAGER_PAGES } from '@/pages/brain-map-manager/pages'
import { BRAIN_MAP_UPLOAD_ROUTES } from '@/pages/brain-map-upload/routes'
import { BRAIN_MAP_UPLOAD_PAGES } from '@/pages/brain-map-upload/pages'
import { BRAIN_MAP_VIEWER_ROUTES } from '@/pages/brain-map-viewer/routes'
import { BRAIN_MAP_VIEWER_PAGES } from '@/pages/brain-map-viewer/pages'

import { RESEARCH_BRAIN_MAP_MANAGER_PAGES } from '@/pages/research-brain-map-manager/pages'
import { RESEARCH_BRAIN_MAP_MANAGER_ROUTES } from '@/pages/research-brain-map-manager/routes'
// /Users/uma/ActiveCollectiveDev/vumc-picture-webapp/vumc-picture-webapp-develop/src/pages/research-brain-map-manager

const routes = getRoutesAsArray({
  ...mergePagesWithRoutes({ routes: GENERAL_ROUTES, pages: GENERAL_PAGES }),
  ...mergePagesWithRoutes({ routes: COMPONENT_LIBRARY_ROUTES, pages: COMPONENT_LIBRARY_PAGES }),
  ...mergePagesWithRoutes({ routes: USER_ROUTES, pages: USER_PAGES }),
  ...mergePagesWithRoutes({ routes: BRAIN_MAP_MANAGER_ROUTES, pages: BRAIN_MAP_MANAGER_PAGES }),
  ...mergePagesWithRoutes({ routes: BRAIN_MAP_UPLOAD_ROUTES, pages: BRAIN_MAP_UPLOAD_PAGES }),
  ...mergePagesWithRoutes({ routes: BRAIN_MAP_VIEWER_ROUTES, pages: BRAIN_MAP_VIEWER_PAGES }),
  ...mergePagesWithRoutes({ routes: RESEARCH_BRAIN_MAP_MANAGER_ROUTES, pages: RESEARCH_BRAIN_MAP_MANAGER_PAGES }),

})

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes,

    // See: https://router.vuejs.org/guide/advanced/scroll-behavior.html
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      if (to.hash) {
        return {
          selector: to.hash
        }
      }

      return { x: 0, y: 0 }
    }
  })
}
