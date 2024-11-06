<template>
  <div>
    <template v-if="fileState === 1">
      <p>{{ content.processing }}</p>
    </template>
    <template v-if="fileState === 2">
      <div class="o-layout-flex o-layout-flex--horizontal-bottom-row">
        <p class="u-margin-right">{{ content.isReady }}</p>
        <AtomButton
          @click.native="setApproveBrainMap"
        >
          {{ content.approve }}
          <template :slot="AtomButton.slotConfig.iconLeft.name">
            <AtomIcon
              type="check"
            />
          </template>
        </AtomButton>
      </div>
    </template>
    <template v-if="fileState === 3">
      <AtomFormInputToggle
        :groupModel="selectedBrainMapResolution"
        :labels="['low res', 'high res']"
        :values="['lowRes', 'highRes']"
        @change="setBrainMapResolution"
      ></AtomFormInputToggle>
    </template>
    <template v-if="fileState === 4">
      <p>{{ content.notAvailable }}</p>
    </template>
  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'
  import { AtomIcon, AtomButton, AtomFormInputToggle } from '@/components/presentational/atoms'

  export default {
    name: 'MoleculeFileStateBlock',
    components: {
      AtomIcon,
      AtomButton,
      AtomFormInputToggle
    },
    props: {
      fileState: {
        type: Number,
        required: true,
        validator: function (value) {
          return value >= 1 && value <= 4
        }
      },
      selectedBrainMapResolution: {
        type: String
      }
    },
    data: function () {
      return {
        AtomButton,
        content: {
          ...staticContent.fileStates
        }
      }
    },
    methods: {
      setBrainMapResolution: function (value) {
        this.$emit('setBrainMapResolution', value)
      },
      setApproveBrainMap: function () {
        this.$emit('setApproveBrainMap')
      }
    }
  }
</script>
