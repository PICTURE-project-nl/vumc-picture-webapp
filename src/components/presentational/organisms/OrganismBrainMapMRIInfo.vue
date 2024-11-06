<template>
  <div class="o-grid o-grid--huge u-padding-horizontal-large">
    <div class="o-grid__cell u-1/2@tablet u-margin-top">
      <AtomMedia
        isRounded
        :src="brainMapInfo.T1cSliceFileURL"
      />
      <div class="brain-info-container">

        <div class="o-grid brain-info-container-top">
          <div class="o-grid__cell u-1/2 brain-info-container__item">
            <AtomTextBody>
              <strong>{{ content.upload }}</strong>
            </AtomTextBody>
            <AtomTextBody color="ghost" class="u-margin-top-tiny">
              {{ getDate }}
            </AtomTextBody>
          </div>

          <!--<div class="o-grid__cell u-1/2 brain-info-container__item">-->
          <!--<AtomTextBody>-->
          <!--<strong> {{ content.complexity }} </strong>-->
          <!--</AtomTextBody>-->
          <!--<AtomTextBody color="ghost" class="u-margin-top-tiny">-->
          <!--{{ brainMapInfo.surgicalComplexity }}-->
          <!--</AtomTextBody>-->
          <!--</div>-->
          <!--</div>-->

          <!--<div class="o-grid brain-info-container-top">-->
          <!--<div class="o-grid__cell u-1/2 brain-info-container__item">-->
          <!--<AtomTextBody>-->
          <!--<strong> {{ content.glioma }} </strong>-->
          <!--</AtomTextBody>-->
          <!--<AtomTextBody color="ghost" class="u-margin-top-tiny">-->
          <!--{{ brainMapInfo.glioma }}-->
          <!--</AtomTextBody>-->
          <!--</div>-->

          <!--<div class="o-grid__cell u-1/2 brain-info-container__item">-->
          <!--<AtomTextBody>-->
          <!--<strong> {{ content.classification }} </strong>-->
          <!--</AtomTextBody>-->
          <!--<AtomTextBody color="ghost" class="u-margin-top-tiny">-->
          <!--{{ brainMapInfo.brainMapClassification }}-->
          <!--</AtomTextBody>-->
          <!--</div>-->
        </div>

      </div>
    </div>

    <MoleculeFormState v-bind="formState" class="o-grid__cell u-1/2@tablet u-padding-top-small">
      <form @submit.prevent="submitForm">
        <div>
          <AtomFormInputText
            name="brainMapName"
            label="Name"
            placeholder="Name"
            :isDisabled="!!brainMapInfo.isResearch"
            :value="getInputValue('brainMapName')"
            :hasError="hasInputError('brainMapName')"
            :hasSuccess="isInputValid('brainMapName')"
            :message="getInputMessage('brainMapName')"
            @change="setInputValue"
            @blur="handleInputBlur"
          ></AtomFormInputText>
        </div>

        <div class="u-margin-top">
          <AtomFormInputText
            name="brainMapNotes"
            label="Notes"
            placeholder="Notes"
            :isDisabled="!!brainMapInfo.isResearch"
            :value="getInputValue('brainMapNotes')"
            isTextarea
            @change="setInputValue"
          ></AtomFormInputText>
        </div>

        <div class="u-margin-top">
          <AtomFormInputCheckbox
            label="Make file viewable via url"
            name="sharedBrainMap"
            :isDisabled="!!brainMapInfo.isResearch"
            :isChecked="!!getInputValue('sharedBrainMap')"
            :hasError="hasInputError('sharedBrainMap')"
            :hasSuccess="isInputValid('sharedBrainMap')"
            :message="getInputMessage('sharedBrainMap')"
            @change="setInputValue"
          ></AtomFormInputCheckbox>
        </div>

        <div
          v-if="!!getInputValue('sharedBrainMap')"
          class="u-margin-top"
        >
          <MoleculeLinkCopy
            :text="getShareUrl"
          ></MoleculeLinkCopy>
        </div>

        <div v-if="!brainMapInfo.isResearch" class="o-grid u-margin-top-huge">
          <div class="o-grid__cell u-1/1 u-1/2@desktop u-margin-top">
            <AtomButton
              isFullWidth
              :isDisabled="!!brainMapInfo.isResearch"
              @click.prevent.native="deleteFile"
              isGhost
            >
              {{ content.deleteFile }}
            </AtomButton>
          </div>
          <div class="o-grid__cell u-1/1 u-1/2@desktop u-margin-top">
            <AtomButton
              :isDisabled="!!brainMapInfo.isResearch"
              isFullWidth
            >
              <template slot="iconLeft">
                <AtomIcon type="file"></AtomIcon>
              </template>
              {{ content.saveChanges }}
            </AtomButton>
          </div>
        </div>
      </form>
    </MoleculeFormState>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getValidationProperties } from '@/assets/scripts/utils/form-validation'
  import { staticContent } from '@/data/static-content'
  import { formsMixins } from '@/store/forms'
  import { brainMapInfoValidations } from '@/store/brain-maps'
  import { ROUTES } from '@/config/routes'

  import {
    AtomTextBody,
    AtomMedia,
    AtomIcon,
    AtomButton,
    AtomFormInputText,
    AtomFormInputCheckbox
  } from '@/components/presentational/atoms'

  import {
    MoleculeLinkCopy,
    MoleculeFormState
  } from '@/components/presentational/molecules'

  export default {
    name: 'OrganismBrainMapMRIInfo',
    components: {
      AtomMedia,
      AtomTextBody,
      MoleculeLinkCopy,
      AtomButton,
      MoleculeFormState,
      AtomIcon,
      AtomFormInputText,
      AtomFormInputCheckbox
    },
    mixins: [
      formsMixins.all
    ],
    props: {
      brainMapInfo: {
        type: Object
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapMRIInfo
        }
      }
    },
    computed: {
      getDate: function () {
        return moment(this.brainMapInfo.uploadDate.date).format('YYYY-MM-DD HH:mm:ss')
      },
      getShareUrl: function () {
        return `${process.env.baseUrl}${ROUTES.BRAIN_MAP_VIEWER.path}`.replace(':slug', this.brainMapInfo.id)
      }
    },
    methods: {
      saveChange: function () {
        this.$emit('saveChange')
      },
      deleteFile: function () {
        this.$emit('deleteFile', this.brainMapInfo.id)
      },
      closePopup: function () {
        this.$emit('closePopup')
      }
    },
    validations: function () {
      return {
        localFormData: getValidationProperties({
          formData: this.formData,
          validations: brainMapInfoValidations
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .brain-info-container {
    display: flex;
    flex-wrap: wrap;
  }

  .brain-info-container__item {
    margin-top: $global-spacing-unit-small;
  }

  .brain-info-container-top {
    width: 100%;
  }

  .brain-info__close {
    cursor: pointer;
    position: absolute;
    right: $global-spacing-unit;
    top: $global-spacing-unit;
  }
</style>
