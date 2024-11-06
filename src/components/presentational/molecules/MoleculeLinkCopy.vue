<template>

  <div class="link-copy">
    <div class="link-copy__icon" @click="setClipboard">
      <div class="symbol"><AtomIcon
        type="file-link"
        :boxSize="14"
        viewBox="0 0 14 14"
        class="icon--no-fill"
      /></div> 
       <!-- <AtomDivider isVertical></AtomDivider> -->
      <!-- <div class="o-simple-grid__divider"> <AtomDivider isVertical /></div> -->
    </div>
    <div  class="input-box">
    <AtomFormInputText
      name="copyTextField"
      label=""
      :value="text"
      ref="inputField"
    /></div>

    
  </div>
  
</template>

<script>
  import { AtomIcon, AtomFormInputText } from '@/components/presentational/atoms'

  export default {
    name: 'MoleculeLinkCopy',
    components: {
      AtomFormInputText,
      AtomIcon
    },
    props: {
      text: {
        type: String,
        description: 'text you want to be copied'
      }
    },
    methods: {
      setClipboard: function () {
        document.getElementById(this.$refs.inputField.id).select()
        document.execCommand('copy')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link-copy {
    
    align-items: flex-end;
    display: flex;
    flex-direction: row;
   
  }

  .link-copy__icon {
    background-color: $color-input;// $color-ghost-transparent;
    cursor: pointer;
     padding: 18px 6px 18px 5px;
     margin-right:1px;
     width:45px;
  }

  .symbol{
    margin-left:30%
  }

  .input-box{width:90%}

</style>
