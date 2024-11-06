<template>
  <nav class="navigation-bar">
    <div class="o-wrapper o-wrapper--extended o-wrapper--flush">
      <OrganismNavBar
        :items="navigationRowData"
      ></OrganismNavBar>
    </div>
  </nav>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { URLS } from '@/assets/scripts/constants/urls'
  import { staticContent } from '@/data/static-content'
  import { userMixins } from '@/store/user'
  import { OrganismNavBar } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerNavigationBar',
    components: {
      OrganismNavBar
    },
    mixins: [
      userMixins.authenticatedData,
      userMixins.authenticatedUpdate
    ],
    data: function () {
      return {
        ROUTES,
        URLS,
        content: {
          ...staticContent.topNavigation
        }
      }
    },
    computed: {
      navigationRowData: function () {
        const research_brain_map_data = {
          title: this.ROUTES.RESEARCH_BRAIN_MAP_MANAGER.title,
           to: this.ROUTES.RESEARCH_BRAIN_MAP_MANAGER.path
        }
        const loginItem = {
          title: this.ROUTES.USER_LOG_IN.title,
          to: this.ROUTES.USER_LOG_IN.path
        }

        const editAccountItem = {
          title: `${this.content.welcomeMessage} ${this.user.name}`,
          to: this.ROUTES.USER_EDIT_ACCOUNT.path
        }

        const items = [
          {
            title: this.content.aboutPicture,
            href: this.URLS.PICTURE_PROJECT_WEBSITE,
            isExternalLink: true
          }
        ]

        if (this.userIsAuthenticated) {
          items.push(editAccountItem)
        } else {
          items.unshift(loginItem)
        }
        items.push(research_brain_map_data);
        return items
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation-bar {
    background-color: $color-jaguar;
    height: 48px;
    left: 0;
    //width:100vw;
    margin-top: 0px;
    padding-top: $global-spacing-unit-small;

    //position:absolute; right:0;
    //position: absolute;
    //z-index:1; 
    
    //z-index: map-get($stack-index, navigation);
  }
</style>
