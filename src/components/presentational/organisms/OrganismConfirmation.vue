<template>
  <WrapperPopup
    isThin
    :title="titleHeading"
    @close="close"
  >
    <AtomTextHeading isSmall>{{ title }}</AtomTextHeading>
    <div class="u-margin-top">
      <AtomTextBody>{{ body }}</AtomTextBody>
    </div>
    <div class="o-layout-flex o-layout-flex--vertical-center-row o-layout-flex--between-row u-margin-top">
      <AtomButton
        @click.native="accept"
      >
        {{ acceptText }}
      </AtomButton>
      <AtomButton
        isGhost
        @click.native="close"
      >
        {{ cancelText }}
      </AtomButton>
    </div>
  </WrapperPopup>
</template>

<script>
  import { WrapperPopup } from '@/components/presentational/wrappers'
  import AtomTextHeading from '@/components/presentational/atoms/AtomTextHeading'
  import AtomTextBody from '@/components/presentational/atoms/AtomTextBody'
  import AtomButton from '@/components/presentational/atoms/AtomButton'
  export default {
    name: 'OrganismConfirmation',
    components: {
      AtomButton,
      AtomTextBody,
      AtomTextHeading,
      WrapperPopup
    },
    props: {
      titleHeading: {
        type: String,
        default: 'titleHeading'
      },
      title: String,
      body: String,
      acceptText: {
        type: String,
        default: 'Accept'
      },
      cancelText: {
        type: String,
        default: 'Cancel'
      }
    },
    methods: {
      cancel: function () {
        this.$emit('cancel')
      },
      accept: function () {
        this.$emit('accept')
      },
      close: function () {
        this.$emit('close')
      }
    }
  }
</script>
