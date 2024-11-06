<template>
  <AtomBox isLong>
    <div class="o-wrapper o-wrapper--small u-padding-top-large">

      <div class="o-grid">

        <div class="o-grid__cell u-1/2@tablet">
          <AtomTextHeading isSmall>{{ content.stepOneTitle }}</AtomTextHeading>
          <div class="u-margin-top">
            <AtomTextBody color="ghost"> {{ content.stepOneBody }} </AtomTextBody>
          </div>
        </div>
        <div class="o-grid__cell u-1/2@tablet o-layout-flex o-layout-flex--center">
          <AtomButton>
            {{ content.download }}
            <template slot="iconLeft">
              <AtomIcon type="download"></AtomIcon>
            </template>
          </AtomButton>
        </div>

      </div>

      <div class="o-grid u-margin-top-huge">

        <div class="o-grid__cell u-1/2@tablet">
          <AtomTextHeading isSmall>{{ content.stepTwoTitle }}</AtomTextHeading>
          <div class="u-margin-top">
            <AtomTextBody color="ghost"> {{ content.stepTwoBody }} </AtomTextBody>
          </div>
        </div>

      </div>

      <div class="o-grid u-margin-top-huge">

        <div class="o-grid__cell u-1/2@tablet">
          <AtomTextHeading isSmall>{{ content.stepThreeTitle }}</AtomTextHeading>
          <div class="u-margin-top">
            <AtomTextBody color="ghost"> {{ content.stepThreeBody }} </AtomTextBody>
          </div>
        </div>
        <div class="o-grid__cell u-1/2@tablet o-layout-flex o-layout-flex--center">
          <AtomFormInputFile
            name="upload"
            :buttonText="content.upload"
          ></AtomFormInputFile>
        </div>

      </div>

    </div>
  </AtomBox>
</template>

<script>
  import { AtomBox, AtomTextHeading, AtomTextBody, AtomFormInputFile, AtomButton, AtomIcon } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'
  export default {
    name: 'OrganismUploadSegmentize',
    components: {
      AtomTextBody,
      AtomBox,
      AtomTextHeading,
      AtomFormInputFile,
      AtomButton,
      AtomIcon
    },
    data: function () {
      return {
        content: {
          ...staticContent.uploadSegmentize
        }
      }
    }
  }
</script>
