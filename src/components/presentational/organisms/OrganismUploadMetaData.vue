<template>
  <MoleculeFormState v-bind="formState">
    <AtomBox isLong>
      <div class="o-wrapper o-wrapper--small u-padding-top-large">

        <AtomTextHeading isSmall isShort>
          {{ content.title }}
        </AtomTextHeading>

        <div class="u-margin-top-large">
          <AtomFormInputText
            label="Name"
            name="brainMapName"
            placeholder="Name"
            :value="getInputValue('brainMapName')"
            :hasError="hasInputError('brainMapName')"
            :hasSuccess="isInputValid('brainMapName')"
            :message="getInputMessage('brainMapName')"
            @change="setInputValue"
            @blur="handleInputBlur"
          >
          </AtomFormInputText>
          <div class="o-grid u-margin-top">
            <div class="o-grid__cell u-1/4">
              <AtomFormInputText
                label="Age"
                name="age"
                placeholder="39"
                :value="getInputValue('age')"
                :hasError="hasInputError('age')"
                :hasSuccess="isInputValid('age')"
                :message="getInputMessage('age')"
                @change="setInputValue"
                @blur="handleInputBlur"
              >
              </AtomFormInputText>
            </div>
            <div class="o-grid__cell u-1/4">
              <label>Tumor grade</label>
              <select class="gbm-select" name="gbm">
                <option value="LGG">LGG</option>
                <option value="HGG">HGG</option>
                <option selected value="GBM">GBM</option>
              </select>
            </div>
          </div>
          <div class="u-margin-top">
            <AtomFormInputText
              label="Notes"
              name="brainMapNotes"
              isTextarea
              placeholder="Notes"
              :value="getInputValue('brainMapNotes')"
              :hasError="hasInputError('brainMapNotes')"
              :hasSuccess="isInputValid('brainMapNotes')"
              :message="getInputMessage('brainMapNotes')"
              @change="setInputValue"
              @blur="handleInputBlur"
            >
            </AtomFormInputText>
          </div>
        </div>

      </div>
    </AtomBox>
  </MoleculeFormState>
</template>

<script>
  import { AtomBox, AtomTextHeading, AtomFormInputText } from '@/components/presentational/atoms'
  import { MoleculeFormState } from '@/components/presentational/molecules'
  import { staticContent } from '@/data/static-content'
  import { formsMixins } from '@/store/forms'
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { uploadBrainMapValidations } from '@/store/brain-map-upload'
  import AtomFormInputDropdownlist from "@/components/presentational/atoms/AtomFormInputDropdownlist.vue";

  export default {
    name: 'OrganismUploadMetaData',
    components: {
      AtomFormInputDropdownlist,
      AtomBox,
      AtomTextHeading,
      AtomFormInputText,
      MoleculeFormState
    },
    mixins: [
      formsMixins.all
    ],
    props: {
      nextStepCallback: {
        type: Function
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.uploadMetaData
        }
      }
    },
    watch: {
      nextStepCallback: function () {
        this.submitForm()
      }
    },
    validations: function () {
      return {
        localFormData: getValidationProperties({
          formData: this.formData,
          validations: uploadBrainMapValidations.metaData
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gbm-select {
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border: 1px solid #1C1B21;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    background-color: #1C1B21;
    margin-top: 10px;
    display: block;
  }
</style>
