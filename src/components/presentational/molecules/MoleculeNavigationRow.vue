<template>
  <nav class="navigation-row">
    <template
      v-for="item in items"
    >
      <a
        v-if="item.href"
        :key="item.name"
        :href="item.href"
        :target="setLinkTarget(item)"
        class="navigation-row__item"
      >
        {{ item.title }}
      </a>
      <router-link
        v-else-if="item.to"
        :key="item.name"
        :to="item.to"
        class="navigation-row__item"
      >
        {{ item.title }}
      </router-link>
    </template>
    <template v-if="userIsAuthenticated">
      <a class="navigation-row__item" @click="userLogout">{{ content.logOut }}</a>
    </template>
  </nav>
</template>

<script>
  import every from 'lodash/every'
  import has from 'lodash/has'
  import { userMixins } from '@/store/user'
  import { staticContent } from '@/data/static-content'

  export default {
    name: 'MoleculeNavigationRow',
    mixins: [
      userMixins.authenticatedData,
      userMixins.authenticatedUpdate
    ],
    props: {
      items: {
        type: Array,
        required: true,
        description: 'Expects an array with objects that contains a "title" and a "to" or "href" key to create a router-link or a anchor. You can also add "isExternalLink" to add target="_blank".',
        validator: items =>
          every(items, (item) =>
            has(item, 'title') &&
            (has(item, 'to') || has(item, 'href'))
          )
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.topNavigation
        }
      }
    },
    methods: {
      setLinkTarget: function (item) {
        return (item.isExternalLink) ? '_blank' : null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation-row {
    background: $color-mirage;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: absolute;
    text-align: center;
    top: 48px; // height of navbar
    width: 100vw;
  }

  .navigation-row__item {
    @include font-size(18px);

      font-weight: $font-weight-semi-bold;

    cursor: pointer;
    padding-bottom: $global-spacing-unit;
    padding-top: $global-spacing-unit;
    text-decoration: none;
  }

  @include mq($from: tablet) {
    .navigation-row {
      background-color: transparent;
      display: block;
      height: auto;
      position: static;
      width: auto;
    }

    .navigation-row__item {
      @include font-size(14px);

        display: inline-block;

      font-weight: $font-weight-normal;
      padding: 0;

      &:not(:first-of-type) {
        margin-left: $global-spacing-unit;
      }

      &.router-link-active {
        font-weight: $font-weight-bold;
        text-decoration: none;
      }
    }
  }
</style>
