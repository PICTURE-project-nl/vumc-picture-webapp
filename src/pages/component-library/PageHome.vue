<template>
  <LibraryPageWrapper :pageTitle="ROUTES.COMPONENT_LIBRARY_HOME.title">

    <div class="u-margin-top">
      <p>
        This project uses a methodology for creating a design system called "Atomic Design". Not sure what that means?
        You can <a href="http://bradfrost.com/blog/post/atomic-web-design/" target="_blank">read the article</a> about
        this methodology or <a href="http://atomicdesign.bradfrost.com/table-of-contents/" target="_blank">read the
        whole book</a>. Up to you. 😉
      </p>
      <p class="u-margin-top-small">
        All available reusable components for this project have been divided per level of the atomic design system and
        can be found on these pages. The design files can be found on
        <a href="https://app.zeplin.io/project/5ba26aafabd22908b904d26c">Zeplin</a>.
      </p>
      <p class="u-margin-top-small">
        These component library pages are protected and can only be accessed by adding a '?showComponentLibraryPages'
        parameter to the URL. This will set a session cookie which will enable access for the duration of the
        session without having to add the parameter again.
      </p>
    </div>

  </LibraryPageWrapper>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import { LibraryPageWrapper } from '@/components/library'

  export default {
    name: 'PageHome',
    middleware: [
      'only-component-library-pages'
    ],
    components: {
      LibraryPageWrapper
    },
    data: function () {
      return {
        ROUTES
      }
    }
  }
</script>
