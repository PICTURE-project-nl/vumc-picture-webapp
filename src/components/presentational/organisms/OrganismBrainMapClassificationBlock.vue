<template>
  <MoleculeFormState v-bind="formState">
    <AtomBox isLong>
      <div class="o-wrapper o-wrapper--small u-padding-top-large">
        <MoleculeRichTextCard
          :intro="content.title"
        >
          <template slot="body">
            <AtomTextHeading color="white" isSmall>
              {{ content.body }}
            </AtomTextHeading>
          </template>
        </MoleculeRichTextCard>
        <div class="classification-block-container u-margin-top">
          <div
            v-for="file in files"
            :key="file.fileId"
            class="classification-block-container__item"
          >
            <MoleculeClassificationCard
              :id="file.fileId"
              :selectedFiles="getInputValue('selectedFiles')"
              :fileName="file.fileName"
              :fileSize="file.fileSize"
              :imageUrl="file.sliceFileURL"
              :imageAltText="file.fileName"
              @updateSelectedFiles="updateSelectedFiles"
            />
          </div>
        </div>

      </div>
    </AtomBox>
  </MoleculeFormState>
</template>

<script>
  import { AtomBox, AtomTextHeading } from '@/components/presentational/atoms'
  import {
    MoleculeRichTextCard,
    MoleculeClassificationCard,
    MoleculeFormState
  } from '@/components/presentational/molecules'
  import { staticContent } from '@/data/static-content'
  import { formsMixins } from '@/store/forms'
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { uploadBrainMapValidations } from '@/store/brain-map-upload'

  export default {
    name: 'OrganismBrainMapClassificationBlock',
    components: {
      AtomTextHeading,
      AtomBox,
      MoleculeRichTextCard,
      MoleculeClassificationCard,
      MoleculeFormState
    },
    mixins: [
      formsMixins.all
    ],
    props: {
      files: {
        type: Array
      },
      nextStepCallback: {
        type: Function
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapClassificationBlock
        }
      }
    },
    watch: {
      nextStepCallback: function () {
        this.submitForm()
      },
      formData: {
        handler: function (value) {
          this.setInputValue({name: 'selectedFiles', value: value.selectedFiles})
        },
        deep: true
      }
    },
    methods: {
      updateSelectedFiles: function (payload) {
        this.$emit('updateSelectedFiles', payload)
      }
    },
    validations: function () {
      return {
        localFormData: getValidationProperties({
          formData: this.formData,
          validations: uploadBrainMapValidations.classification
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .classification-block-container__item {
    max-width: 320px;
    padding-bottom: $global-spacing-unit;
  }

  .classification-block-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
