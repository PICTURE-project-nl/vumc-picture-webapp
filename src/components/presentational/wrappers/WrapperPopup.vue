<template>
  <Transition name="popup">

    <div v-show="!isHidden" class="blackOutContainerContainer">
      <div class="blackOutContainer" @click="emitClose"> </div>
      <div class="popup" :class="{'popup--is-thin': isThin}">
        <div class="o-layout-flex o-layout-flex--between-row">
          <AtomTextHeading isSmall>
            {{ title }}
          </AtomTextHeading>
          <div class="popup__close">
            <AtomIcon type="close" @click.native="emitClose" />
          </div>
        </div>

        <div>
          <slot></slot>
        </div>
      </div>
    </div>

  </Transition>
</template>

<script>

  import { AtomTextHeading, AtomIcon } from '@/components/presentational/atoms'
  export default {
    name: 'WrapperPopup',
    components: {
      AtomTextHeading,
      AtomIcon
    },
    props: {
      title: String,
      isThin: Boolean,
      isHidden: Boolean
    },
    
    methods: {
      emitClose: function () {
        this.$emit('close')
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .blackOutContainerContainer {
    position: fixed;
    z-index: map-get($stack-index, popup);
  }

  .blackOutContainer {
    background: rgba($color-mirage, 0.8);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
  }

  .popup {
    background: $color-jaguar;//color-very-dark-blue-black;//$color-ebony-clay;
    height: 100vh;
    left: 0;
    overflow-y: scroll;
    padding: $global-spacing-unit;
    position: fixed;
    top: 0;

    @include mq($from: tablet) {
      height: auto;
      left: 50%;
      min-width: 550px;
      
      overflow: auto;
      top: 50%;
      transform: translateY(-50%) translateX(-50%);
    }
  }

  .popup--is-thin {
    max-width: $global-spacing-unit-huge * 2;
    min-width: $global-spacing-unit-huge * 2;
  }

  .popup__close {
    cursor: pointer;
  }

  .popup-enter-to {
    opacity: 1;
    transition: all 0.2s;
  }

  .popup-enter {
    opacity: 0;
  }

  .popup-leave-to {
    opacity: 0;
    transition: all 0.2s;
  }

  .popup-leave {
    opacity: 1;
  }

</style>
