<template>
  <div>
    <nav class="o-wrapper u-padding-bottom">
      <ul class="o-layout-flex o-list-bare o-layout-flex--between-row">
        <li class="mobile-control-item" @click="openMobileMenu('coordinates')">
          {{ content.coordinates }}
        </li>
        <li class="mobile-control-item" @click="openMobileMenu('layers')">
          {{ content.layers }}
        </li>
        <li class="mobile-control-item" @click="openMobileMenu('filters')">
          {{ content.filter }}
        </li>
        <li class="mobile-control-item" @click="openMobileMenu('info')">
          {{ content.info }}
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'OrganismMobileControlsMenu',
    data: function () {
      return {
        content: {
          ...staticContent.mobileNavigation
        }
      }
    },
    methods: {
      openMobileMenu: function (type) {
        this.$emit('openMenu', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mobile-control-item {
    cursor: pointer;
    display: block;
    padding-bottom: $global-spacing-unit-small;
    text-align: center;
    text-decoration: underline;
    width: 50%;
  }
</style>
