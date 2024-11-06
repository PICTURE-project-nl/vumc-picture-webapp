<template>
  <LibraryPageWrapper
    :pageTitle="ROUTES.COMPONENT_LIBRARY_CONTAINER_GENERAL.title"
    :navigationTitle="ROUTES.COMPONENT_LIBRARY_CONTAINER_GENERAL.shortTitle"
    :pageNavigationItems="pageNavigationItems"
  >

    <!-- ContainerIntroBlock -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="General.ContainerIntroBlock">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component :is="General.ContainerIntroBlock" />
          </div>
        </div>
      </LibraryComponent>
    </div>

  </LibraryPageWrapper>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import * as General from '@/components/container/general'

  import {
    LibraryComponent,
    LibraryPageWrapper
  } from '@/components/library'

  export default {
    name: 'PageContainerGeneral',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      LibraryComponent,
      LibraryPageWrapper
    },
    data: function () {
      return {
        General,
        pageNavigationItems: {
          ...General
        },
        ROUTES
      }
    }
  }
</script>
