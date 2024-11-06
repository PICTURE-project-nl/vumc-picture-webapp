<template>
  <div style="">
    <AtomTextHeading v-if="intro" isSmall>
      <strong>{{ intro }}</strong>
    </AtomTextHeading>
    <AtomTextBody
      v-if="$slots.body"
      color="ghost"
      :class="{ 'u-margin-top-small': Boolean(intro) }"
      isDiv
    >
      <slot :name="slotConfig.body.name"></slot>
    </AtomTextBody>
    <div v-if="$slots.cta" class="u-margin-top-small">
      <slot :name="slotConfig.cta.name"></slot>
    </div>
  </div>
</template>

<script>
  import { SLOT_EXPECTS } from '@/assets/scripts/constants/slots'
  import { AtomTextBody, AtomTextHeading } from '@/components/presentational/atoms'

  const slotConfig = {
    body: {
      name: 'body',
      expects: SLOT_EXPECTS.ANYTHING,
      description: 'Body text'
    },
    cta: {
      name: 'cta',
      expects: SLOT_EXPECTS.ANYTHING,
      description: 'Room for CTA buttons'
    }
  }

  export default {
    name: 'MoleculeRichTextCard',
    components: {
      AtomTextBody,
      AtomTextHeading
    },
    props: {
      intro: {
        type: String,
        description: 'Bold intro text'
      }
    },
    slotConfig,
    data: function () {
      return {
        slotConfig
      }
    }
  }
</script>
