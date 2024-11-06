<template>
  <OrganismDividedBox class="o-wrapper o-wrapper--small u-padding-bottom-small">
    <template slot="top" class=" u-padding-bottom-small">
    <AtomTextHeading isSmall>
      {{ content.title }}
    </AtomTextHeading>
      <div class="u-margin-top-small">
        <AtomTextHeading isSmall>{{ content.copyTitle }}</AtomTextHeading></div>

      <div class="u-margin-top-small">
        <AtomTextBody > {{ content.copyBody }}</AtomTextBody>
      </div>
       <AtomTextHeading isMedium class=" u-padding-top-small">
      {{ "FILE LINK" }}
    </AtomTextHeading>
      <div class="u-margin-top-small">
        <MoleculeLinkCopy label="File link" :text="link"> </MoleculeLinkCopy>
      </div>
    </template>

    <template slot="bottom">
      <div class="u-margin-top-large">
          <AtomTextHeading isSmall>  {{ content.emailTitle }}  </AtomTextHeading>
      </div>
      <div class="u-margin-top-small">
        <AtomTextBody >  {{ content.emailBody }}</AtomTextBody>
      </div>
      <div class="u-margin-top-small">
        <AtomFormInputText name="email" label="Email" :value="shareEmail" @change="updateEmail"> </AtomFormInputText>
      </div>

      <div class="o-layout-flex o-layout-flex--horizontal-end-row u-margin-top">
        <AtomButton
          :href="`mailto:${shareEmail}`"
        >
          <template slot="iconLeft">
            <AtomIcon type="mail" />
          </template>
          {{ content.sendButton }}
        </AtomButton>
      </div>
    </template>

  </OrganismDividedBox>
</template>

<script>
  import {
    AtomTextHeading,
    AtomTextBody,
    AtomFormInputText,
    AtomButton,
    AtomIcon } from '@/components/presentational/atoms'
  import { staticContent } from '@/data/static-content'
  import { MoleculeLinkCopy } from '@/components/presentational/molecules'
  import OrganismDividedBox from '@/components/presentational/organisms/OrganismDividedBox'

  export default {
    name: 'OrganismBrainMapShareBlock',
    components: {
      OrganismDividedBox,
      AtomIcon,
      AtomButton,
      AtomFormInputText,
      MoleculeLinkCopy,
      AtomTextBody,
      AtomTextHeading
    },
    props: {
      link: {
        type: String,
        default: 'https://tool.pictureproject.nl/#/d/comparing-quality-gbm-l'
      }
    },
    data: function () {
      return {
        shareEmail: '',
        content: {
          ...staticContent.brainMapShare
        }
      }
    },
    methods: {
      updateEmail: function (payload) {
        this.shareEmail = payload.value
      }
    }
  }
</script>
