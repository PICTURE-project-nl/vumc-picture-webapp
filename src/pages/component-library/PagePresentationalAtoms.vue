<template>
  <LibraryPageWrapper
    :pageTitle="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ATOMS.title"
    :navigationTitle="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ATOMS.shortTitle"
    :pageNavigationItems="pageNavigationItems"
  >
    <template slot-scope="{ scopedData }">

      <!-- Colors -->
      <div class="u-margin-top-huge">
        <LibraryComponent name="Colors">
          <div class="o-grid">
            <div
              class="o-grid__cell u-1/4"
              v-for="(color, key) in colors"
              :key="key"
            >
              <LibraryColor :name="key" :color="color" />
            </div>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomTextHeading -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomTextHeading">
          <Component :is="Atoms.AtomTextHeading">
            {{ Atoms.AtomTextHeading.name }}
          </Component>
          <LibraryDescription>
            Source Sans Pro Bold 24px
          </LibraryDescription>
          <Component :is="Atoms.AtomTextHeading" isSmall>
            {{ Atoms.AtomTextHeading.name }} (isSmall)
          </Component>
          <LibraryDescription>
            Source Sans Pro SemiBold 18px
          </LibraryDescription>
          <Component :is="Atoms.AtomTextHeading" isLarge>
            {{ Atoms.AtomTextHeading.name }} (isLarge)
          </Component>
          <LibraryDescription>
            Source Sans Pro Semibold 32px
          </LibraryDescription>
        </LibraryComponent>
      </div>

      <!-- AtomTextBody -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomTextBody">
          <Component :is="Atoms.AtomTextBody">
            {{ Atoms.AtomTextBody.name }}<br />
            <span v-html="scopedData.exampleText"></span>
          </Component>
          <LibraryDescription>
            Source Sans Pro Regular 16px
          </LibraryDescription>
          <Component :is="Atoms.AtomTextBody" isSmall>
            {{ Atoms.AtomTextBody.name }} (isSmall)<br />
            <span v-html="scopedData.exampleText"></span>
          </Component>
          <LibraryDescription>
            Source Sans Pro Regular 14px
          </LibraryDescription>
          <Component :is="Atoms.AtomTextBody" color="red-alert">
            {{ Atoms.AtomTextBody.name }} (color="red-alert")<br />
            <span v-html="scopedData.exampleText"></span>
          </Component>
          <Component :is="Atoms.AtomTextBody" color="lima">
            {{ Atoms.AtomTextBody.name }} (color="lima")<br />
            <span v-html="scopedData.exampleText"></span>
          </Component>
        </LibraryComponent>
      </div>

      <!-- AtomIcon -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomIcon">
          <ul class="o-grid">
            <li
              class="o-grid__cell o-layout-flex u-1/3 u-padding-bottom-tiny"
              v-for="iconType in ICON_TYPES"
              :key="iconType"
            >
              <div class="u-padding-right-tiny">
                <Component :is="Atoms.AtomIcon" :type="iconType"></Component>
              </div>
              <LibraryDescription>
                type="{{ iconType }}"
              </LibraryDescription>
            </li>
          </ul>
          <div class="u-margin-top-small">
            <Component
              :is="Atoms.AtomIcon"
              type="important-round"
              isExact
            ></Component>
            <LibraryDescription>
              type="important-round" && isExact
            </LibraryDescription>
            <Component
              :is="Atoms.AtomIcon"
              type="important-round"
              isExact
              color="red-alert"
            ></Component>
            <LibraryDescription>
              type="important-round" && isExact && color="red-alert"
            </LibraryDescription>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomLoadingSpinner -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomLoadingSpinner">
          <Component
            :is="Atoms.AtomLoadingSpinner"
          ></Component>
        </LibraryComponent>
      </div>

      <!-- AtomBadge -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomBadge">
          <Component :is="Atoms.AtomBadge">
            {{ Atoms.AtomBadge.name }}
          </Component>
        </LibraryComponent>
      </div>

      <!-- AtomButton -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomButton">
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton">
              {{ Atoms.AtomButton.name }}
            </Component>
            <span class="u-margin-left-small">
              <Component :is="Atoms.AtomButton" isSmall>
                {{ Atoms.AtomButton.name }} (isSmall)
              </Component>
            </span>
          </div>
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton" isFullWidth>
              {{ Atoms.AtomButton.name }} (isFullWidth)
            </Component>
          </div>
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton" isSecondary>
              {{ Atoms.AtomButton.name }} (isSecondary)
            </Component>
            <span class="u-margin-left-small">
              <Component
                :is="Atoms.AtomButton"
                isSecondary
                isSmall
              >
                {{ Atoms.AtomButton.name }} (isSecondary & isSmall)
              </Component>
            </span>
          </div>
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton" isGhost>
              {{ Atoms.AtomButton.name }} (isGhost)
            </Component>
            <span class="u-margin-left-small">
              <Component
                :is="Atoms.AtomButton"
                isGhost
                isSmall
              >
                {{ Atoms.AtomButton.name }} (isGhost & isSmall)
              </Component>
            </span>
          </div>
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton" isDisabled>
              {{ Atoms.AtomButton.name }} (isDisabled)
            </Component>
          </div>
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton" href="#Colors">
              As link (href="#Colors")
            </Component>
          </div>
          <div class="u-margin-bottom-small">
            <Component
              :is="Atoms.AtomButton"
              :toName="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.name"
            >
              As router-link (:toName="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.name")
            </Component>
          </div>

          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton">
              With {{ Atoms.AtomButton.slotConfig.iconLeft.name }} slot
              <template :slot="Atoms.AtomButton.slotConfig.iconLeft.name">
                <Component :is="Atoms.AtomIcon" type="arrow-left"></Component>
              </template>
            </Component>
            <span class="u-margin-left-small">
              <Component :is="Atoms.AtomButton" isSmall>
                With {{ Atoms.AtomButton.slotConfig.iconLeft.name }} slot (isSmall)
                <template :slot="Atoms.AtomButton.slotConfig.iconLeft.name">
                  <Component :is="Atoms.AtomIcon" type="arrow-left"></Component>
                </template>
              </Component>
            </span>
          </div>
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomButton">
              With {{ Atoms.AtomButton.slotConfig.iconRight.name }} slot
              <template :slot="Atoms.AtomButton.slotConfig.iconRight.name">
                <Component :is="Atoms.AtomIcon" type="close"></Component>
              </template>
            </Component>
          </div>
          <div>
            <Component :is="Atoms.AtomButton" isFullWidth>
              With {{ Atoms.AtomButton.slotConfig.iconRight.name }} slot (isFullWidth)
              <template :slot="Atoms.AtomButton.slotConfig.iconRight.name">
                <Component :is="Atoms.AtomIcon" type="arrow-right"></Component>
              </template>
            </Component>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomFormInputText -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomFormInputText">
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :is="Atoms.AtomFormInputText"
                :label="Atoms.AtomFormInputText.name"
                name="input-1"
                placeholder="placeholder"
              ></Component>
              <div class="u-margin-top-small">
                <Component
                  :is="Atoms.AtomFormInputText"
                  :label="`${Atoms.AtomFormInputText.name} (isTextarea && hasError && message='Message')`"
                  name="input-2"
                  placeholder="placeholder"
                  isTextarea
                  hasError
                  message="Message"
                ></Component>
              </div>
              <div class="u-margin-top-small">
                <Component
                  :is="Atoms.AtomFormInputText"
                  :label="`${Atoms.AtomFormInputText.name} (isPassword && hasSuccess && message='Message')`"
                  name="input-3"
                  placeholder="placeholder"
                  isPassword
                  hasSuccess
                  message="Message"
                ></Component>
              </div>
            </form>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomFormInputFile -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomFormInputFile">
          <div class="o-grid">
            <form class="o-grid__cell u-1/2">
              <Component
                :is="Atoms.AtomFormInputFile"
                @change="changeFile"
                name="testFile"
              />
            </form>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomFormInputCheckbox -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomFormInputCheckbox">
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :is="Atoms.AtomFormInputCheckbox"
                :label="`${Atoms.AtomFormInputCheckbox.name} (label='${Atoms.AtomFormInputCheckbox.name}' && isChecked)`"
                name="checkbox-default"
                isChecked
              ></Component>
              <div class="u-margin-top-small">
                <Component
                  :is="Atoms.AtomFormInputCheckbox"
                  :label="`${Atoms.AtomFormInputCheckbox.name} (label='${Atoms.AtomFormInputCheckbox.name}' && hasError)`"
                  name="checkbox-error"
                  hasError
                ></Component>
              </div>
              <div class="u-margin-top-small">
                <Component
                  :is="Atoms.AtomFormInputCheckbox"
                  :label="`${Atoms.AtomFormInputCheckbox.name} (label='${Atoms.AtomFormInputCheckbox.name}' && hasSuccess)`"
                  name="checkbox-success"
                  hasSuccess
                ></Component>
              </div>
            </form>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomFormInputRadioButton -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomFormInputRadioButton">
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :is="Atoms.AtomFormInputRadioButton"
                :label="`${Atoms.AtomFormInputRadioButton.name} (label='${Atoms.AtomFormInputRadioButton.name}' && isChecked)`"
                :groupModel="radioButtonModel"
                @change="changeRadioButtonModel"
                value="default"
              ></Component>
              <div class="u-margin-top-small">
                <Component
                  :is="Atoms.AtomFormInputRadioButton"
                  :label="`${Atoms.AtomFormInputRadioButton.name} (label='${Atoms.AtomFormInputRadioButton.name}' && hasError)`"
                  :groupModel="radioButtonModel"
                  @change="changeRadioButtonModel"
                  value="error"
                  hasError
                ></Component>
              </div>
              <div class="u-margin-top-small">
                <Component
                  :is="Atoms.AtomFormInputRadioButton"
                  :label="`${Atoms.AtomFormInputRadioButton.name} (label='${Atoms.AtomFormInputRadioButton.name}' && hasSuccess)`"
                  :groupModel="radioButtonModel"
                  @change="changeRadioButtonModel"
                  value="success"
                  hasSuccess
                ></Component>
              </div>
            </form>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomFormInputToggle -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomFormInputToggle" className="u-margin-top-huge">
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :groupModel="toggleModel"
                :is="Atoms.AtomFormInputToggle"
                :labels="['Flair', 'T1+', 'T1-', 'T2']"
                :values="['flair', 'default1', 't1-', 't2']"
                isHighlight
                @change="changeToggleModel"
              ></Component>
            </form>
          </div>
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :groupModel="toggleModelDisabled"
                :is="Atoms.AtomFormInputToggle"
                :labels="['Flair', 'T1+', 'T1-', 'T2']"
                :values="['1', '2', 'default2', '3']"
                isDisabled
                @change="changeToggleModelDisabled"
              ></Component>
            </form>
          </div>
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :groupModel="toggleModelIcons"
                :is="Atoms.AtomFormInputToggle"
                :icons="['important-round', 'important-round', 'important-round', 'important-round']"
                :values="['default3', '6', '7', '8']"
                hasIconLabels
                @change="changeToggleModelIcons"
              ></Component>
            </form>
          </div>
          <div class="o-grid u-margin-bottom-small">
            <form class="o-grid__cell u-1/2">
              <Component
                :groupModel="toggleModelResolution"
                :is="Atoms.AtomFormInputToggle"
                :labels="['Low Res', 'High res']"
                :values="['low', 'default4']"
                @change="changeToggleModelResolution"
              ></Component>
            </form>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomFormInputSlider -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomFormInputSlider">
          <div class="o-grid u-margin-bottom-small">
            <div class="o-grid__cell u-2/4">
              <Component
                :is="Atoms.AtomFormInputSlider"
                label="SliderName"
                name="sliderName"
                :singleValue="sliderValue"
                :minValue="0"
                :maxValue="100"
                @change="changeSliderValue"
              >
              </Component>
            </div>
            <div class="o-grid__cell u-2/4">
              <Component
                :is="Atoms.AtomFormInputSlider"
                label="RangeSliderName"
                name="sliderName"
                :rangeValue="rangeSliderValue"
                :minValue="0"
                :maxValue="100"
                hasGradient
                @change="changeRangeSliderValue"
              >
              </Component>
            </div>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomMedia -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomMedia">
          <div class="o-grid">
            <div class="o-grid__cell u-2/4 u-margin-bottom">
              <Component
                :is="Atoms.AtomMedia"
                src="https://picsum.photos/600/400"
                alt="test alt text"
              />
              <LibraryDescription>
                Image
              </LibraryDescription>
            </div>
            <div class="o-grid__cell u-2/4 u-margin-bottom">
              <Component
                :is="Atoms.AtomMedia"
                src="https://picsum.photos/600/400"
                alt="test alt text"
                isRounded
              />
              <LibraryDescription>
                Image (isRounded)
              </LibraryDescription>
            </div>
            <div class="o-grid__cell u-2/4 u-margin-bottom">
              <Component
                :is="Atoms.AtomMedia"
                src="https://picsum.photos/600/400"
                alt="test alt text"
                hasShadow
              />
              <LibraryDescription>
                Image (hasShadow)
              </LibraryDescription>
            </div>
          </div>
        </LibraryComponent>
      </div>

      <!-- AtomBox -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomBox">
          <div class="u-margin-bottom-small">
            <Component :is="Atoms.AtomBox">
              {{ Atoms.AtomBox.name }}
            </Component>
          </div>
          <Component :is="Atoms.AtomBox" isDark>
            {{ Atoms.AtomBox.name }} (isDark)
          </Component>
        </LibraryComponent>
      </div>

      <!-- AtomDivider -->
      <div class="u-margin-top-huge">
        <LibraryComponent :component="Atoms.AtomDivider">
          <Component :is="Atoms.AtomDivider" />
        </LibraryComponent>
      </div>

    </template>
  </LibraryPageWrapper>
</template>

<script>
  import { ICON_TYPES } from '@/config/icons'
  import { ROUTES } from '@/config/routes'
  import { colorUi } from '@/config/scss-config'
  import * as Atoms from '@/components/presentational/atoms'

  import {
    LibraryColor,
    LibraryComponent,
    LibraryDescription,
    LibraryPageWrapper
  } from '@/components/library'

  export default {
    name: 'PagePresentationalAtoms',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      LibraryColor,
      LibraryComponent,
      LibraryDescription,
      LibraryPageWrapper
    },
    data: function () {
      return {
        Atoms,
        colors: colorUi,
        ICON_TYPES,
        pageNavigationItems: {
          Colors: {
            name: 'Colors'
          },
          ...Atoms
        },
        radioButtonModel: 'default',
        toggleModel: 'default1',
        toggleModelDisabled: 'default2',
        toggleModelIcons: 'default3',
        toggleModelResolution: 'default4',
        sliderValue: 50,
        rangeSliderValue: [40, 70],
        ROUTES
      }
    },
    methods: {
      changeRadioButtonModel: function (value) {
        this.radioButtonModel = value
      },
      changeToggleModel: function (value) {
        this.toggleModel = value
      },
      changeFile: function (value) {
        console.info('File input upload field name: ', value.name, 'File input upload file: ', value.file)
      },
      changeToggleModelDisabled: function (value) {
        this.toggleModelDisabled = value
      },
      changeToggleModelIcons: function (value) {
        this.toggleModelIcons = value
      },
      changeToggleModelResolution: function (value) {
        this.toggleModelResolution = value
      },
      changeSliderValue: function (payload) {
        this.sliderValue = payload.value
      },
      changeRangeSliderValue: function (payload) {
        this.rangeSliderValue = payload.value
      }
    }
  }
</script>
