<template>

  <Transition name="fade">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else-if="brainsLoading" class="loading-block">
      <AtomLoadingSpinner :size="80"></AtomLoadingSpinner>
    </div>
  </Transition>

</template>

<script>
  import AtomLoadingSpinner from '@/components/presentational/atoms/AtomLoadingSpinner'
  import { BRAIN_MAP_VIEWER_ACTION_TYPES } from '@/store/brain-map-viewer/action-types'

  export default {
    name: 'OrganismBrainLoader',
    components: {
      AtomLoadingSpinner
    },
    computed: {
      brainsLoading: function () {
        return this.$store.state.brainMapViewer.loading
      },
      error: function () {
        return this.$store.state.brainMapViewer.currentBrainMap.error
      }
    },
    watch: {
      error: function (value) {
        if (value === 401) {
          this.$router.push('/404')
        }
      }
    },
    mounted: function () {
      document.addEventListener('volume-viewer-displays-loaded', () => {
        this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_LOADING, false)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .loading-block {
    align-items: center;
    background: $color-mirage;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: map-get($stack-index, popup);
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave-to {
    opacity: 0;
    transition: opacity 0.7s;
  }
</style>
