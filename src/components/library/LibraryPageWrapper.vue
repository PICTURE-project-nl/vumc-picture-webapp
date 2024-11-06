<template>
  <div class="o-wrapper">
    <div class="u-padding-vertical-large">

      <LibraryPageTitle>{{ pageTitle }}</LibraryPageTitle>

      <!-- Navigation -->
      <div class="u-margin-top-small">
        <LibraryTopNavigation />
        <LibraryDivider />
      </div>

      <div
        v-if="Boolean(pageNavigationItems)"
        class="u-margin-top-large"
      >
        <LibraryPageNavigation
          :title="navigationTitle"
          :items="pageNavigationItems"
        />
        <LibraryDivider />
      </div>

      <!-- Content -->
      <slot :scopedData="{ exampleText }"></slot>

    </div>
  </div>
</template>

<script>
  import LibraryDivider from './LibraryDivider.vue'
  import LibraryPageNavigation from './LibraryPageNavigation.vue'
  import LibraryPageTitle from './LibraryPageTitle.vue'
  import LibraryTopNavigation from './LibraryTopNavigation.vue'

  export default {
    name: 'LibraryPageWrapper',
    components: {
      LibraryDivider,
      LibraryPageNavigation,
      LibraryPageTitle,
      LibraryTopNavigation
    },
    props: {
      pageTitle: {
        type: String,
        required: true
      },
      navigationTitle: {
        type: String
      },
      pageNavigationItems: {
        type: Object
      }
    },
    data: function () {
      return {
        exampleText: 'Example of <strong>bold</strong> text, <em>italic text</em> and a <a href="#example">link</a> within the text.'
      }
    }
  }
</script>
