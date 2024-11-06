<template>
  <OrganismIntroBlock v-bind="content" />
</template>

<script>
  import { URLS } from '@/assets/scripts/constants/urls'
  import { staticContent } from '@/data/static-content'
  import { OrganismIntroBlock } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerIntroBlock',
    components: {
      OrganismIntroBlock
    },
    data: function () {
      return {
        content: {
          ...staticContent.introBlock,
          buttonCtaHref: URLS.PICTURE_PROJECT_WEBSITE
        }
      }
    }
  }
</script>
