<template>
  <LibraryPageWrapper
    :pageTitle="ROUTES.COMPONENT_LIBRARY_CONTAINER_USER.title"
    :navigationTitle="ROUTES.COMPONENT_LIBRARY_CONTAINER_USER.shortTitle"
    :pageNavigationItems="pageNavigationItems"
  >

    <!-- ContainerEditUserForm -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="User.ContainerEditUserForm">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component :is="User.ContainerEditUserForm" />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- ContainerSignUpForm -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="User.ContainerSignUpForm">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component :is="User.ContainerSignUpForm" />
          </div>
        </div>
      </LibraryComponent>
    </div>

  </LibraryPageWrapper>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import * as User from '@/components/container/user'

  import {
    LibraryComponent,
    LibraryPageWrapper
  } from '@/components/library'

  export default {
    name: 'PageContainerUser',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      LibraryComponent,
      LibraryPageWrapper
    },
    data: function () {
      return {
        User,
        pageNavigationItems: {
          ...User
        },
        ROUTES
      }
    }
  }
</script>
