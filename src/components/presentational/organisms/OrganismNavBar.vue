<template>
  <div class="navbar">

    <div>
      <router-link :to="{ name: ROUTES.BRAIN_MAP_MANAGER.name }">
        <AtomLogo />
      </router-link>
    </div>
    <div
      :class="{'nav-hide': isTabletOrBelow}"
      class="nav-container"
      data-js="primary-navigation"
    >
      <MoleculeNavigationRow
        :items="items"
      ></MoleculeNavigationRow>
    </div>
    <div :class="{'nav-hide': !isTabletOrBelow}">
      <AtomIcon @click.native="toggleNav('primary-navigation')" :type="iconType"></AtomIcon>
    </div>
  </div>
</template>

<script>
  import { ROUTES } from '@/config/routes'
  import {
    MoleculeNavigationRow
  } from '@/components/presentational/molecules'
  import {
    AtomIcon,
    AtomLogo
  } from '@/components/presentational/atoms'
  import { isTabletOrSmaller } from '@/assets/scripts/utils/media-queries'

  export default {
    name: 'OrganismNavBar',
    components: {
      MoleculeNavigationRow,
      AtomIcon,
      AtomLogo
    },
    props: {
      items: {
        type: Array,
        description: 'Expects an array with objects that contains a "title" and a "to" or "href" key to create a router-link or a anchor. You can also add "isExternalLink" to add target="_blank"'
      }
    },
    data: function () {
      return {
        ROUTES,
        isToggled: false
      }
    },
    computed: {
      isTabletOrBelow: function () {
        return isTabletOrSmaller(this.$mq)
      },
      iconType: function () {
        return this.isToggled ? 'close' : 'menu'
      }
    },
    methods: {
      toggleNav: function (id) {
        this.isToggled = !this.isToggled
        document.querySelector(`[data-js="${id}"`).classList.toggle('nav-hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 $global-spacing-unit;

    @include mq($from: laptop) {
      padding: 0;
    }
  }

  .nav-container {
    opacity: 1;
    pointer-events: all;
    transition: all 0.3s;
  }

  .nav-hide {
    display: none;
    opacity: 0;
    pointer-events: none;

    @include mq($until: tablet) {
      display: block;
    }
  }

  .navbar__image {
    height: 15px;
  }
</style>
