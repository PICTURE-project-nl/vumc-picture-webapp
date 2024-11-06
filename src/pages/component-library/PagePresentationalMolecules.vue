<template>
  <LibraryPageWrapper
    :pageTitle="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.title"
    :navigationTitle="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.shortTitle"
    :pageNavigationItems="pageNavigationItems"
  >

    <!-- MoleculeAlert -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeAlert">
        <div>
          <Component :is="Molecules.MoleculeAlert" :status="STATUSES.SUCCESS">
            {{ Molecules.MoleculeAlert.name }} (:status="STATUSES.SUCCESS")
          </Component>
        </div>
        <div class="u-margin-top-small">
          <Component :is="Molecules.MoleculeAlert" :status="STATUSES.LOADING">
            {{ Molecules.MoleculeAlert.name }} (:status="STATUSES.LOADING")
          </Component>
        </div>
        <div class="u-margin-top-small">
          <Component :is="Molecules.MoleculeAlert" :status="STATUSES.ERROR">
            {{ Molecules.MoleculeAlert.name }} (:status="STATUSES.ERROR")
          </Component>
        </div>
        <div class="u-margin-top-small">
          <Component
            :is="Molecules.MoleculeAlert"
            :status="STATUSES.SUCCESS"
            isSmall
          >
            {{ Molecules.MoleculeAlert.name }} (:status="STATUSES.ERROR" && isSmall)
          </Component>
        </div>

      </LibraryComponent>
    </div>

    <!-- MoleculeRichTextCard -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeRichTextCard">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component :is="Molecules.MoleculeRichTextCard" intro="Intro">
              <template :slot="Molecules.MoleculeRichTextCard.slotConfig.body.name">
                <p v-dummy="50"></p>
              </template>
              <template :slot="Molecules.MoleculeRichTextCard.slotConfig.cta.name">
                <AtomButton isFullWidth>
                  CTA
                </AtomButton>
              </template>
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeClassificationCard -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeClassificationCard">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeClassificationCard"
              imageUrl="https://picsum.photos/500/200"
              imageAltText="Image alt text"
              :selectedFiles="[]"
              :selectedClassification="classificationModel"
              @update="setClassificationModel"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeLinkCopy -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeLinkCopy">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component :is="Molecules.MoleculeLinkCopy" text="https://tool.pictureproject.nl/#/d/comparing-quality-gbm-l">
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeMediaGrid -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeMediaGrid">
        <div class="o-grid">
          <div class="o-grid__cell u-1/1 u-1/2@tablet">
            <Component :is="Molecules.MoleculeMediaGrid">
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeFileTile -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeFileTile">
        <div class="o-grid">
          <div class="o-grid__cell u-1/5@laptop u-1/4@tablet u-1/2@mobile">
            <Component
              :is="Molecules.MoleculeFileTile"
              fileId="testfileid"
              name="file tile"
              subText="sub text"
              @fileEdit="openPopupExample"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeNavigationRow -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeNavigationRow">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeNavigationRow"
              :items="navigationRowData"
            >
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeProgressItem -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeProgressItem">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeProgressItem"
              status="completed"
            >
              completed
            </Component>
            <Component
              :is="Molecules.MoleculeProgressItem"
              status="inProgress"
              isActive
            >
              inProgress
            </Component>
            <Component
              :is="Molecules.MoleculeProgressItem"
              status="unset"
            >
              unset
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeFileStateBlock -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeFileStateBlock">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2 u-margin-bottom">
            <Component
              :is="Molecules.MoleculeFileStateBlock"
              :fileState="1"
            >
            </Component>
          </div>
          <div class="o-grid__cell u-1/2 u-margin-bottom">
            <Component
              :is="Molecules.MoleculeFileStateBlock"
              :fileState="2"
              @setApproveBrainMap="setApproveBrainMap"
            >
            </Component>
          </div>
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeFileStateBlock"
              :fileState="3"
              :selectedBrainMapResolution="selectedBrainMapResolution"
              @setBrainMapResolution="setBrainMapResolution"
            >
            </Component>
          </div>
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeFileStateBlock"
              :fileState="4"
            >
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeBrainMapControlsCoordinates -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeBrainMapControlsCoordinates">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeBrainMapControlsCoordinates"
              :axiValue="axi"
              :corValue="cor"
              :sagValue="sag"
              @setCoordinates="setCoordinates"
            >
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeBrainMapControlsFilters -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeBrainMapControlsFilters">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeBrainMapControlsFilters"
              :thresholdValue="thresholdValue"
              @setFilters="setFilters"
            >
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeBrainMapControlsMasking -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeBrainMapControlsMasking">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeBrainMapControlsMasking"
              :maskingValue="maskingValue"
              @setMasking="setMasking"
            >
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- MoleculeBrainMapControlsLayers -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Molecules.MoleculeBrainMapControlsLayers">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Molecules.MoleculeBrainMapControlsLayers"
              :brainDefaultValue="brainDefaultValue"
              @setWindow="setWindow"
              :colorOverlayValue="colorOverlayValue"
              @setColorOverlay="setColorOverlay"
            >
            </Component>
          </div>
        </div>
      </LibraryComponent>
    </div>

  </LibraryPageWrapper>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { STATUSES } from '@/assets/scripts/constants/statuses'
  import { URLS } from '@/assets/scripts/constants/urls'
  import { staticContent } from '@/data/static-content'
  import { AtomButton } from '@/components/presentational/atoms'
  import * as Molecules from '@/components/presentational/molecules'

  import {
    LibraryComponent,
    LibraryPageWrapper
  } from '@/components/library'

  export default {
    name: 'PagePresentationalMolecules',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      AtomButton,
      LibraryComponent,
      LibraryPageWrapper
    },
    data: function () {
      return {
        Molecules,
        pageNavigationItems: {
          ...Molecules
        },
        content: {
          ...staticContent.topNavigation
        },
        ROUTES,
        STATUSES,
        URLS,
        classificationModel: 't1+',
        selectedBrainMapResolution: 'lowRes',
        axi: 0,
        cor: 0,
        sag: 0,
        thresholdValue: [0, 1],
        maskingValue: 'line',
        brainDefaultValue: 80,
        colorOverlayValue: 100
      }
    },
    computed: {
      navigationRowData: function () {
        return [
          {
            title: this.ROUTES.USER_LOG_IN.title,
            to: this.ROUTES.USER_LOG_IN.path
          }, {
            title: this.content.aboutPicture,
            href: this.URLS.PICTURE_PROJECT_WEBSITE,
            isExternalLink: true
          }, {
            title: this.ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.shortTitle,
            to: this.ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES.path
          }, {
            title: `${this.content.welcomeMessage} Account name`,
            to: this.ROUTES.USER_EDIT_ACCOUNT.path
          }
        ]
      }
    },
    methods: {
      setClassificationModel: function (value) {
        this.classificationModel = value
      },
      openPopupExample: function (fileId) {
        console.info('Clicked on the edit button for file with id:', fileId)
      },
      setBrainMapResolution: function (value) {
        this.selectedBrainMapResolution = value
      },
      setApproveBrainMap: function () {
        console.info('Brain map approved')
      },
      setCoordinates: function (payload) {
        this[payload.name] = payload.value
      },
      setFilters: function (payload) {
        this[payload.name] = payload.value
      },
      setMasking: function (payload) {
        this.maskingValue = payload
      },
      setWindow: function (payload) {
        this.windowValue = payload.value
      },
      setColorOverlay: function (payload) {
        this.colorOverlayValue = payload.value
      }
    }
  }
</script>
