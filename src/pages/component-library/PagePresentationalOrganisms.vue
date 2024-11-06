<template>
  <LibraryPageWrapper
    :pageTitle="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ORGANISMS.title"
    :navigationTitle="ROUTES.COMPONENT_LIBRARY_PRESENTATIONAL_ORGANISMS.shortTitle"
    :pageNavigationItems="pageNavigationItems"
  >

    <!-- OrganismIntroBlock -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismIntroBlock">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Organisms.OrganismIntroBlock"
              title="Example Title"
              intro="Example Intro"
              body="Example body text."
              buttonCtaHref="#example"
              buttonCtaText="Example CTA text"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- OrganismSignUpForm -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismSignUpForm">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <ContainerSignUpForm />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- OrganismEditUserForm -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismEditUserForm">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <ContainerEditUserForm />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <!-- OrganismBrainMapMRIInfo -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismBrainMapMRIInfo">
        <WrapperPopup
          title="brainMapMRIInfo"
          :isHidden="popIsHidden"
          @close="popIsHidden = true"
        >
          <Component
            :is="Organisms.OrganismBrainMapMRIInfo"
            :formData="brainMap"
            :brainMapInfo="brainMap"
            formName="test"
          />
        </WrapperPopup>
      </LibraryComponent>
    </div>

    <!-- OrganismNavBar -->
    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismNavBar">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <ContainerNavigationBar />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismProgress">
        <div class="o-grid">
          <div class="o-grid__cell u-1/2">
            <Component
              :is="Organisms.OrganismProgress"
              :items="items"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <div class="u-margin-top-huge">
      <div>
        <WrapperPopup
          title="WrapperPopup"
          :isHidden="true"
          @close="popIsHidden = true"
        >
          <div class="o-wrapper o-wrapper--small">
            <Component
              :is="Organisms.OrganismIntroBlock"
              title="Test"
              intro="This is a popup"
              body="Look how great it looks"
              buttonCtaHref="#0"
              buttonCtaText="It can even render all components inside using the unnamed Slot!"
            />
          </div>
        </WrapperPopup>
      </div>
    </div>

    <div class="u-margin-top-huge">

      <LibraryComponent :component="Organisms.OrganismBrainMapShareBlock">
        <div>
          <div>
            <Component
              :is="Organisms.OrganismBrainMapShareBlock"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismDividedBox">
        <div>
          <div>
            <Component
              :is="Organisms.OrganismDividedBox"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismDownloadBlock">
        <div>
          <div>
            <Component
              :is="Organisms.OrganismDownloadBlock"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismConfirmation">
        <div>
          <div>
            <Component
              :hidden="popIsHidden2"
              title="If you left the process, all the data will be lost and have you to start all over again."
              body="Do you still wanna leave?"
              :is="Organisms.OrganismConfirmation"
              @close="popIsHidden2 = true"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

    <div class="u-margin-top-huge">
      <LibraryComponent :component="Organisms.OrganismBrainMapClassificationBlock">
        <div>
          <div>
            <Component
              :is="Organisms.OrganismBrainMapClassificationBlock"
            />
          </div>
        </div>
      </LibraryComponent>
    </div>

  </LibraryPageWrapper>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import * as Organisms from '@/components/presentational/organisms'
  import { ContainerSignUpForm, ContainerEditUserForm } from '@/components/container/user'
  import { ContainerNavigationBar } from '@/components/container/general'
  import { WrapperPopup } from '@/components/presentational/wrappers'

  import {
    LibraryComponent,
    LibraryPageWrapper
  } from '@/components/library'

  export default {
    name: 'PagePresentationalOrganisms',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      LibraryComponent,
      LibraryPageWrapper,
      ContainerEditUserForm,
      ContainerSignUpForm,
      ContainerNavigationBar,
      WrapperPopup
    },
    data: function () {
      return {
        Organisms,
        pageNavigationItems: {
          ...Organisms
        },
        ROUTES,
        brainMap: {
          id: 'h93JdepU3djfekI',
          age: 51,
          GBM: 'GBM preop',
          name: 'Comparing quality GBM L',
          slug: 'comparing-quality-gbm-l',
          brainMapNotes: 'lorem ipsum',
          brainMapClassification: 'T1-weighted imaging',
          glioma: '0.45 x 1.34 x 3.01',
          patientAmount: 2,
          sharedBrainMap: true,
          isResearch: true,
          folderId: 1,
          surgicalComplexity: 0.67,
          uploadDate: '2018-10-02',
          mriDate: '2018-09-21',
          highResBrainMapFileURL: 'https://tool.pictureproject.nl/storage/h/h38vjwd7db9y02',
          sliceFileUrl: 'https://tool.pictureproject.nl/storage/images/h38vjwd7db9y02',
          thumbNailSliceFileURL: '/brain-volumes/2/brain-thumbnail.png'
        },
        items: [
          {
            title: 'Mri upload',
            isCompleted: true
          },
          {
            title: 'Anonymize',
            isCompleted: true
          },
          {
            title: 'Classify',
            isCompleted: true
          },
          {
            title: 'Meta data',
            isInProgress: true
          },
          {
            title: 'Registrate'
          },
          {
            title: 'Segmentize'
          },
          {
            title: 'Tool'
          }
        ],
        popIsHidden: true,
        popIsHidden2: true
      }
    }
  }
</script>
