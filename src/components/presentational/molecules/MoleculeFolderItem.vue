<template>
  <div
    class="folder-item"
    :class="{'folder-item--active': isActive}"
  >
    <div class="u-margin-right">
      <AtomIcon
        :boxSize="16"
        :type="iconType"
        isInline
      ></AtomIcon>
    </div>
    <AtomTextBody>
      <slot></slot>
    </AtomTextBody>
  </div>
</template>

<script>
  import { AtomIcon, AtomTextBody } from '@/components/presentational/atoms'

  export default {
    name: 'MoleculeFolderItem',
    components: {
      AtomIcon,
      AtomTextBody
    },
    props: {
      isActive: Boolean
    },
    computed: {
      iconType: function () {
        return (this.isActive) ? 'folder-active' : 'folder'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .folder-item {
    align-items: center;
    display: flex;
  }

  .folder-item--active {
    text-decoration: underline;
  }
</style>
