<template>
  <AtomBox isLong>

    <div class="o-wrapper o-wrapper--small u-padding-top-large">
      <AtomTextHeading :level="2" isSmall>
        {{ content.title }}
      </AtomTextHeading>
      <div class="u-margin-top">
        <AtomTextBody color="ghost">
          {{ content.info }}
        </AtomTextBody>
      </div>
    </div>

  </AtomBox>
</template>

<script>
  import { AtomTextHeading, AtomTextBody, AtomBox } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'OrganismUploadAnonymize',
    components: {
      AtomTextHeading,
      AtomTextBody,
      AtomBox
    },
    data: function () {
      return {
        content: {
          ...staticContent.uploadAnonymize
        }
      }
    }
  }
</script>
