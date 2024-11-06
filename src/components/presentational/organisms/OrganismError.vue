<template>
  <AtomBox
    isDark
    isLong
    hasBorders
    class="o-layout-flex o-layout-flex--center"
  >

    <div class="error-block-content">
      <MoleculeRichTextCard
        :intro="title"
      >
        <template slot="body">
          <slot name="body">
            {{ body }}
          </slot>
        </template>
        <template slot="cta">
          <AtomButton
            isFullWidth
            :toName="ROUTES.BRAIN_MAP_MANAGER.name"
          >
            {{ cta }}
            <template slot="iconLeft">
              <AtomIcon type="arrow-left"></AtomIcon>
            </template>
          </AtomButton>
        </template>
      </MoleculeRichTextCard>
    </div>

  </AtomBox>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { MoleculeRichTextCard } from '@/components/presentational/molecules'
  import { AtomButton, AtomIcon, AtomBox } from '@/components/presentational/atoms'

  export default {
    name: 'OrganismErrorVue',
    components: {
      MoleculeRichTextCard,
      AtomButton,
      AtomIcon,
      AtomBox
    },
    props: {
      title: String,
      body: String,
      cta: String
    },
    data: function () {
      return {
        ROUTES
      }
    }
  }
</script>
<style lang="scss" scoped>

  .error-block-content {
    max-width: 305px;
  }
</style>
