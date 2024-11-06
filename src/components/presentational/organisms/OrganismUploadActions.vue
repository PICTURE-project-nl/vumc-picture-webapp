<template>
  <div class="o-layout-flex o-layout-flex--horizontal-end-row o-layout-flex--vertical-center-row u-padding-vertical-large">

    <div>
      <AtomButton isGhost @click.native="abortProcess">
        <template slot="iconLeft">
          <AtomIcon type="trash" />
        </template>
        {{ content.abort }}
      </AtomButton>
    </div>

    <div class="u-margin-left">
      <AtomButton @click.native="nextStep">
        <template slot="iconLeft">
          <AtomIcon type="arrow-right" />
        </template>
        {{ content.next }}
      </AtomButton>
    </div>

  </div>
</template>

<script>
  import {
    AtomButton,
    AtomIcon } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'OrganismUploadActions',
    components: {
      AtomButton,
      AtomIcon
    },
    data: function () {
      return {
        content: {
          ...staticContent.uploadActions
        }
      }
    },
    methods: {
      abortProcess: function () {
        this.$emit('abortProcess')
      },
      nextStep: function () {
        this.$emit('nextStep')
      }
    }
  }
</script>
