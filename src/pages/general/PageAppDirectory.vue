<template>
  <LibraryPageWrapper :pageTitle="appName">

    <div class="u-margin-top">
      <LibraryTitle>
        {{ ROUTES.GENERAL_APP_DIRECTORY.title }}
      </LibraryTitle>
      <ul class="u-margin-top">
        <li
          v-for="route in filteredRoutes"
          :key="route.path"
        >
          <LibraryRoute :route="route" />
        </li>
      </ul>
    </div>

  </LibraryPageWrapper>
</template>

<script>
  import _filter from 'lodash/filter'

  import packageJson from '@/../package'
  import { ROUTES } from '@/config/routes'
  import { LibraryPageWrapper, LibraryRoute, LibraryTitle } from '@/components/library'

  export default {
    name: 'PageAppDirectory',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      LibraryPageWrapper,
      LibraryRoute,
      LibraryTitle
    },
    data: function () {
      return {
        appName: packageJson.description,
        ROUTES
      }
    },
    computed: {
      filteredRoutes: function () {
        return _filter(ROUTES, (route) => {
          return route.path !== '/'
        })
      }
    }
  }
</script>
