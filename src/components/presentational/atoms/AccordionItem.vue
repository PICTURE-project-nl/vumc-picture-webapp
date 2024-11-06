<template>
  <li class="accordion__item">
    <div :style="cssClass"  :class="{ accordion__trigger_active: newVis }" @click="open(id)">
      &nbsp;

      <AtomIcon
        class="icon--no-fill"
        :type="this.opened[id] ? 'arrow-down' : 'arrow-right-new'"
      ></AtomIcon>

      <!-- This slot will handle the title/header of the accordion and is the part you click on -->

      <slot name="accordion-trigger"></slot>

    </div>

    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >


        <div class="accordion__content" v-show="this.opened[id]" >
        <ul>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <slot name="accordion-content"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
import AtomIcon from "./AtomIcon.vue";
export default {
  components: { AtomIcon },
  props: {
    cssClass:{type:String},
    id:{type:Number}
    },
  inject: ["Accordion"],
  data() {
    return {
      opened:[],
      newVis: false,
      index: null,
    };
  },
  computed: {
    visible() {
      return this.index == this.Accordion.active;
    },
  },
  methods: {
    open(id) {
      //if (this.visible) {
        if(this.opened[id] ){
        this.newVis = false;
        this.opened[id] = false;
        this.Accordion.active = null;
      } else {
        this.opened[id] = true;
        this.newVis = true;
        this.Accordion.active = this.index;
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    },
  },
  created() {
    this.opened[this.id]=false;
    this.index = this.Accordion.count++;
  },
};
</script>

<style lang="scss" scoped>
.accordion__item {

  cursor: pointer;
  width: 100%;

  border-bottom: 1px solid #ebebeb;
  position: relative;

}

.accordion__trigger {
  display: flex;
  width: 100%;
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

.accordion__content{

  // background-color: green;
}
</style>
