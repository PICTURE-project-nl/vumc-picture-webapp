<template>
<div>
  <vue-slider v-model="localvalue" @change="callback"  :included="true" ref="slider"/>
  <div><button @click="resetRange"> Reset </button></div>
</div>
</template>
<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default {
  name:"AtomSlider",
  components: {
    VueSlider,
  },
 props:{
    value:{type: Array}
 },
  data() {
    return {
      //valueLocal:this.value,
      localvalue: [0,100],// this.value,//[0,100],
      options:{
        dotSize: 5,
        height: 4,
      }
    }
  },

  computed:{

  },
  methods:{
    resetRange:function(){
        this.$refs.slider.setValue([0,100]);
    },

    callback: function(val){
        this.$emit("collectRange",[val[0],val[1]]);

    }
  }
}
</script>
