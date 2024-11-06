<template>
  <!-- <div class="o-layout-flex o-layout-flex--between-row">
    <AtomTextHeading isSmall>
      {{ headingText }}
    </AtomTextHeading>
     <span
      class="action-button"
      @click="action"
    >
      {{ actionText }}
    </span>
  </div> -->



    <AtomTextHeading isVerySmall>
      {{ headingText }}
    </AtomTextHeading>


</template>

<script>
  import { AtomTextHeading } from '@/components/presentational/atoms'
  export default {
    name: 'MoleculeBrainViewerSectionHeading',
    components: {
      AtomTextHeading
    },
    props: {
      headingText: String,
      actionText: String
    },
    methods: {
      action: function () {
        this.$emit('action')
      }
    }
  }

</script>

<style lang="scss" scoped>
  .action-button {
    color: $color-ghost;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
