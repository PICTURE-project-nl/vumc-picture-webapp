<template>
  <div>
    <AtomTextHeading :level="1" isLarge>
      {{ title }}
    </AtomTextHeading>
    <div class="u-margin-top">
      <MoleculeRichTextCard :intro="intro">
        <template :slot="MoleculeRichTextCard.slotConfig.body.name">
          <div v-html="body"></div>
        </template>
        <template :slot="MoleculeRichTextCard.slotConfig.cta.name">
          <AtomButton
            :href="buttonCtaHref"
            isExternalLink
            isFullWidth
            isGhost
          >
            {{ buttonCtaText }}
          </AtomButton>
          <AtomButton
            class="u-margin-top-small"
            isFullWidth
            isGhost
            :toName="ROUTES.RESEARCH_BRAIN_MAP_MANAGER.name"
          >
            Go to research brain maps
          </AtomButton>
        </template>
      </MoleculeRichTextCard>
    </div>
  </div>
</template>

<script>
  import { AtomButton, AtomTextHeading } from '@/components/presentational/atoms'
  import { MoleculeRichTextCard } from '@/components/presentational/molecules'
  import {ROUTES} from "@/config/routes";

  export default {
    name: 'OrganismIntroBlock',
    computed: {
      ROUTES() {
        return ROUTES
      }
    },
    components: {
      AtomButton,
      AtomTextHeading,
      MoleculeRichTextCard
    },
    props: {
      title: {
        type: String,
        required: true
      },
      intro: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true,
        description: 'Can receive HTML'
      },
      buttonCtaHref: {
        type: String,
        required: true,
        description: 'The link for the CTA button'
      },
      buttonCtaText: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        MoleculeRichTextCard
      }
    }
  }
</script>
