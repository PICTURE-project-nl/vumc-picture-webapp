<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div @click="closeModal">
          <div style="float: right">X</div>
        </div>
        <slot></slot>
        <AtomDivider></AtomDivider>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import AtomDivider from './AtomDivider.vue';
export default {
  components: { AtomDivider },
  name: "AtomModal",
  methods: {
    show() {
      //this.$m
    },
  },
};
</script>
