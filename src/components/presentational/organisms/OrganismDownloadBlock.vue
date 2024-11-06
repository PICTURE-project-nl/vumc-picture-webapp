<template>

  <OrganismDividedBox style="">
    <template slot="top">
      <div class="" style="">
        <MoleculeRichTextCard :intro="content.downloadDocTitle">
          <template slot="body">
            {{ content.downloadDocBody }}
          </template>
          <template slot="cta">
            <AtomButton
              isFullWidth
              @click.native="downloadZIP"
            >
              {{ content.downloadZipButtonText }}
              <template slot="iconLeft">
                <AtomIcon type="download"></AtomIcon>
              </template>
            </AtomButton>
          </template>
        </MoleculeRichTextCard>
      </div>
    </template>
    <template slot="bottom">
      <div >
        <MoleculeRichTextCard :intro="content.downloadNiftiTitle">
          <template slot="body">
            {{ content.downloadNiftiBody }}
          </template>
          <template slot="cta">
            <AtomButton
              isFullWidth
              @click.native="downloadPDF"
            >
              {{ content.downloadPdfButtonText }}
              <template slot="iconLeft">
                <AtomIcon type="download"></AtomIcon>
              </template>
            </AtomButton>
          </template>

        </MoleculeRichTextCard>
      </div>
    </template>

  </OrganismDividedBox>
</template>

<script>
  import { AtomButton, AtomIcon } from '@/components/presentational/atoms'
  import OrganismDividedBox from '@/components/presentational/organisms/OrganismDividedBox'
  import { MoleculeRichTextCard } from '@/components/presentational/molecules'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'OrganismDownloadBlock',
    components: {
      OrganismDividedBox,
      MoleculeRichTextCard,
      AtomButton,
      AtomIcon
    },
    data: function () {
      return {
        content: {
          ...staticContent.downloadBlock
        }
      }
    },
    methods: {
      downloadPDF: function () {
        this.$emit('downloadPDF')
      },
      downloadZIP: function () {
        this.$emit('downloadZIP')
      }
    }
  }
</script>

<style lang="scss" scoped>
.popup_download{

  height:50%

}
</style>
