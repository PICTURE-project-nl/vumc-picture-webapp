<template>
  <AtomBox isLong>

    <div class="o-wrapper o-wrapper--small u-margin-top-large">
      <AtomTextHeading isSmall>
        {{ content.title }}
      </AtomTextHeading>

      <div class="u-margin-top">
        <AtomMedia
          src="http://www.picsum.photos/800/400"
        />
      </div>

      <div class="o-grid u-margin-top-large">

        <div class="o-grid__cell u-1/2@tablet">
          <AtomTextBody color="ghost">
            {{ content.decline }}
          </AtomTextBody>
        </div>

        <div class="o-grid__cell u-1/2@tablet">
          <AtomTextBody color="white">
            {{ content.accept }}
          </AtomTextBody>
        </div>

      </div>

    </div>

  </AtomBox>
</template>

<script>
  import { AtomBox, AtomTextHeading, AtomMedia, AtomTextBody } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'OrganismUploadRegistrate',
    components: {
      AtomTextBody,
      AtomMedia,
      AtomTextHeading,
      AtomBox
    },
    data: function () {
      return {
        content: {
          ...staticContent.uploadRegistrate
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
