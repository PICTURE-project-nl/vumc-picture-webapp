<template>
  <div class="brain-container">
    <div data-id="brain-panel-width" class="o-layout-flex o-layout-flex--horizontal-center-row">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MoleculeMediaGrid'
  }
</script>

<style lang="scss" scoped>
  .media-grid-panel {
    @include mq($until: tablet) {
      &:not(:first-of-type) {
        display: none;
      }
    }
  }

  .media-grid-panel__inner-container {
    border-radius: $global-radius;
    overflow: hidden;
  }

  /* Brainbrowser specific styling */

  ::v-deep#volume-viewer-displays {
    max-width: 500px;

    .volume-viewer-display {
      display: none;
    }

    .overlay-viewer-display {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      list-style: none;
      padding: 0;

      .panel {
        flex: 0 1 auto;
        position: relative;

        p {
          right: 36px;
          margin: 0;
          position: absolute;
          top: 10px;
          transform: scaleX(-1);
        }

        &::after {
          bottom: 10px;
          content: 'L';
          font-size: 0.8rem;
          position: absolute;
          left: 36px;
          z-index: 0;
          transform: scaleX(-1);
        }

        &::before {
          bottom: 10px;
          content: 'R';
          font-size: 0.8rem;
          right: 36px;
          position: absolute;
          z-index: 0;
          transform: scaleX(-1);
        }

        &:nth-child(1) {
          display: none;
          order: 2;
          transform: scaleX(-1);

          @include mq($from: tablet) {
            display: block !important;
          }
        }

        &:nth-child(2) {
          display: none;
          order: 3;
          transform: scaleX(-1);

          @include mq($from: tablet) {
            display: block !important;
          }
        }

        &:nth-child(3) {
          display: none;
          order: 3;
          transform: scaleX(-1);

          @include mq($from: tablet) {
            display: block !important;
          }
        }

        &.panel-right {
          order: 3;
          transform: scaleX(-1);
        }

        &.panel-left {
          order: 2;
          transform: scaleX(-1);
        }

        &.panel-active {
          order: 1;
          transform: scaleX(-1);
        }
      }

      .panel-active {
        display: block !important;
        flex: 0 1 auto;
        margin-bottom: 24px !important;
        width: 100% !important;
      }
    }
  }

  .brain-container {
    @include mq($until: 1080px) {
      margin-left: $global-spacing-unit;
      margin-right: $global-spacing-unit;
    }
  }

</style>
