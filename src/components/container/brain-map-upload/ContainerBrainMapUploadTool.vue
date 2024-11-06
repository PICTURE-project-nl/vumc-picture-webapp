<template>
  <AtomBox isLong>
    <MoleculeRichTextCard :intro="content.title">
      <template slot="body">
        {{ content.content }}
      </template>
      <template slot="cta">
        <AtomButton
          :toName="ROUTES.BRAIN_MAP_MANAGER.name"
        >
          {{ content.cta }}
          <template slot="iconRight">
            <AtomIcon type="arrow-right"></AtomIcon>
          </template>
        </AtomButton>
      </template>
    </MoleculeRichTextCard>
    <div>

    </div>
  </AtomBox>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { staticContent } from '@/data/static-content'
  import AtomButton from '@/components/presentational/atoms/AtomButton'
  import AtomBox from '@/components/presentational/atoms/AtomBox'
  import MoleculeRichTextCard from '@/components/presentational/molecules/MoleculeRichTextCard'
  import AtomIcon from '@/components/presentational/atoms/AtomIcon'

  export default {
    name: 'ContainerBrainMapUploadTool',
    components: {AtomIcon, AtomButton, MoleculeRichTextCard, AtomBox},
    data: function () {
      return {
        ROUTES,
        content: staticContent.uploadTool
      }
    }
  }
</script>
