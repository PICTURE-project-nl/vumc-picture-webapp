<template>
  <nav>
    <ul class="o-list-inline">

      <!-- General -->
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.GENERAL_APP_DIRECTORY.name"
          isSmall
        >
          {{ ROUTES.GENERAL_APP_DIRECTORY.title }}
        </AtomButton>
      </li>
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.COMPONENT_LIBRARY_HOME.name"
          isSmall
        >
          {{ ROUTES.COMPONENT_LIBRARY_HOME.title }}
        </AtomButton>
      </li>
    </ul>

    <!-- Presentational -->
    <ul class="o-list-inline u-margin-top-small">
      <li class="o-list-inline__item u-padding-right-small">
        <AtomTextHeading isSmall>Presentational</AtomTextHeading>
      </li>
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ATOMS.name"
          isSmall
          isGhost
        >
          {{ ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ATOMS.shortTitle }}
        </AtomButton>
      </li>
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.name"
          isSmall
          isGhost
        >
          {{ ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.shortTitle }}
        </AtomButton>
      </li>
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ORGANISMS.name"
          isSmall
          isGhost
        >
          {{ ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ORGANISMS.shortTitle }}
        </AtomButton>
      </li>
    </ul>

    <!-- Containers -->
    <ul class="o-list-inline u-margin-top-small">
      <li class="o-list-inline__item u-padding-right-small">
        <AtomTextHeading isSmall>Containers</AtomTextHeading>
      </li>
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.COMPONENT_LIBRARY_CONTAINER_GENERAL.name"
          isSmall
          isGhost
        >
          {{ ROUTES.COMPONENT_LIBRARY_CONTAINER_GENERAL.shortTitle }}
        </AtomButton>
      </li>
      <li class="o-list-inline__item u-padding-right-small">
        <AtomButton
          :toName="ROUTES.COMPONENT_LIBRARY_CONTAINER_USER.name"
          isSmall
          isGhost
        >
          {{ ROUTES.COMPONENT_LIBRARY_CONTAINER_USER.shortTitle }}
        </AtomButton>
      </li>
    </ul>

  </nav>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { AtomButton, AtomTextHeading } from '@/components/presentational/atoms'

  export default {
    name: 'LibraryTopNavigation',
    components: {
      AtomButton,
      AtomTextHeading
    },
    data: function () {
      return {
        ROUTES
      }
    }
  }
</script>
