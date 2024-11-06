



<template>
<select v-model="model" class="masking">
    <AtomIcon class="icon--no-fill" type="arrow-down"></AtomIcon>
    <option class="options"
        v-for="(value, index) in values" 
        :key="`input-${index}`"
        :id="`${value}_${id}`"
        :value="values[index]"
        >
        {{ labels[index] }}
    </option>
</select>
</template> 
<!--
<template>
  <div>
    <v-select id="mySelect"  
      :loading="values.length <= 0"
      v-model="selected" 
      :options="values" 
      :clearable="false" 
      :reduce="options => options.id"  
       key="id" 
      label="name" 
      @input="onInput" 
    />
  </div>
</template>
-->

<script>
 import { getRandomId } from '@/assets/scripts/utils/random-id'// is it neccessary here? 
 //import { AtomIcon } from "@/components/presentational/atoms";

import vSelect from 'vue-select';
 import 'vue-select/dist/vue-select.css'
export default {
name: 'AtomFormInputDropdownlist',
components:{
      //AtomIcon 
    vSelect
},
methods: {

  },
  props: {
      groupModel: {
        type: String,
        required: true
      },
      values: {
        type: Array,
        required: true
      },
      labels: {
        type: Array,
        description: 'Text displayed in toggle button. Text and icons can not be combined right now!'
      },
    },
data :function(){
        return{

          selected:1,
          id: getRandomId()
      }
},computed: {
      model: {
        get: function () {
          return this.groupModel
        },
        set: function (value) {
          this.$emit('change', value)
        }
      }
    }
}
</script>
<style lang="scss" scoped>
 .masking {
    background-color: #1b202b;
     
 }
 .options {
  // @include font-size(16px); 
  //background-color: #1b202b;
  background-color: aqua;
  margin-top: 100px;
  color:#FFFFFF;
  border:dotted 3px ;

 }

 .dropdown_content{
    background-color: aqua;
    margin-top: 80px;
    width: 250px;
    height: 90px;
    
    
 }
</style>
