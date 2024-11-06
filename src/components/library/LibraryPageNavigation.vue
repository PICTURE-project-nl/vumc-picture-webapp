<template>
  <nav>
    <AtomTextHeading color="dodger-blue" isLarge>
      {{ title }}
    </AtomTextHeading>
    <ul class="o-list-inline">
      <li
        class="o-list-inline__item u-padding-right-small u-padding-top-small"
        v-for="(item, index) in items"
        :key="item.name + index"
      >
        <AtomButton
          :href="`#${item.name}`"
          isSmall
          isGhost
        >
          {{ item.name.split(REGULAR_EXPRESSIONS.UPPERCASE_LETTERS).join(' ') }}
        </AtomButton>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { REGULAR_EXPRESSIONS } from '@/assets/scripts/constants/regular-expressions'
  import { AtomButton, AtomTextHeading } from '@/components/presentational/atoms'

  export default {
    name: 'LibraryPageNavigation',
    components: {
      AtomButton,
      AtomTextHeading
    },
    props: {
      title: String,
      items: Object
    },
    data: function () {
      return {
        REGULAR_EXPRESSIONS
      }
    }
  }
</script>
