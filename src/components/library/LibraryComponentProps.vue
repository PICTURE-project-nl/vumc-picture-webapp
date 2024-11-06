<template>
  <div>
    <LibrarySubTitle>
      Props
    </LibrarySubTitle>
    <ul class="o-grid">
      <li
        class="o-grid__cell u-1/3 u-padding-top-tiny"
        v-for="(prop, key) in component.props"
        :key="key"
      >
        <p>
          <em>{{ key }}</em>
        </p>
        <ul>
          <li
            v-for="value in getLibraryComponentPropAsArray(prop)"
            :key="value"
            v-html="value"
          ></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getLibraryComponentPropAsArray } from '@/assets/scripts/utils/component-library'

  import LibrarySubTitle from './LibrarySubTitle.vue'

  export default {
    name: 'LibraryComponentProps',
    components: {
      LibrarySubTitle
    },
    props: {
      component: {
        type: Object,
        required: true
      }
    },
    data: function () {
      return {
        getLibraryComponentPropAsArray
      }
    }
  }
</script>
