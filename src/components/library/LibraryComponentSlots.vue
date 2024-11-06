<template>
  <div>
    <LibrarySubTitle>
      Slots
    </LibrarySubTitle>
    <ul class="o-grid">
      <li
        class="o-grid__cell u-1/3 u-padding-top-tiny"
        v-for="(slot, key) in component.slotConfig"
        :key="key"
      >
        <p>
          <em>{{ key }}</em>
        </p>
        <ul>
          <li
            v-for="value in getLibraryComponentSlotConfigAsArray(slot)"
            :key="value"
            v-html="value"
          ></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getLibraryComponentSlotConfigAsArray } from '@/assets/scripts/utils/component-library'

  import LibrarySubTitle from './LibrarySubTitle.vue'

  export default {
    name: 'LibraryComponentSlots',
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
        getLibraryComponentSlotConfigAsArray
      }
    }
  }
</script>
