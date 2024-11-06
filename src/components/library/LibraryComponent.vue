<template>
  <div :id="name || component.name">
    <LibraryTitle>
      <template v-if="name">{{ name }}</template>
      <template v-else>
        &lt;{{ component.name }}&gt;
      </template>
    </LibraryTitle>
    <div v-if="Boolean(component) && Boolean(component.props)" class="u-margin-top-small">
      <LibraryComponentProps :component="component" />
    </div>
    <div v-if="Boolean(component) && Boolean(component.slotConfig)" class="u-margin-top-small">
      <LibraryComponentSlots :component="component" />
    </div>
    <div class="u-margin-top-small">
      <div class="u-margin-bottom-tiny">
        <LibrarySubTitle>
          <span v-if="Boolean(component) && Boolean(component.props)">Variants</span>
          <span v-else>Example</span>
        </LibrarySubTitle>
      </div>
      <LibraryBox>
        <slot></slot>
      </LibraryBox>
    </div>
  </div>
</template>

<script>
  import LibraryBox from './LibraryBox.vue'
  import LibraryComponentProps from './LibraryComponentProps.vue'
  import LibraryComponentSlots from './LibraryComponentSlots.vue'
  import LibrarySubTitle from './LibrarySubTitle.vue'
  import LibraryTitle from './LibraryTitle.vue'

  export default {
    name: 'LibraryComponent',
    components: {
      LibraryBox,
      LibraryComponentProps,
      LibraryComponentSlots,
      LibrarySubTitle,
      LibraryTitle
    },
    props: {
      className: {
        type: String
      },
      component: {
        type: Object
      },
      name: {
        type: String
      }
    }
  }
</script>
