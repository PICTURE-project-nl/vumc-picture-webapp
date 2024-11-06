<template>
<div >
  <!-- <h1>{{this.Accordion.active == null}}</h1>   -->
  <ul class="accordion">
       <slot></slot> 
  </ul>
  </div>
</template>

<script>
export default {
  props: {
    id:{type:String}
  },
  data() {
    return {
      Accordion: {
        count: 0,
        active: null
      }
    };
  },
  provide() {
    return { Accordion: this.Accordion };
  }
};
</script>

<style lang="scss" scoped>
.accordion {
  border-radius:0px !important;
 
  list-style: none;
  margin: 0;
  padding: 0;
  &__item:last-child {
    border-bottom: none;
  }
}

.accordion_active {

  height:200px;

}


</style>
