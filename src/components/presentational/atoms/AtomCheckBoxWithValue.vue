<template>
<div class="parent_div">

<div class="checkbox">
  <input type="checkbox" value="propChecked"   v-model="propCheckedLocal" @click.stop  >
    <!-- <input type="checkbox" value="test"   v-model="isItChecked"  @change="check($event)" >  -->
</div>
<div class="second" @click.stop> {{key1}} </div>
<div
     v-bind:style = " this.propCheckedLocal ? 'color: #FFFFFF': 'color: #51525C' "
       class="third"
       >{{value}}</div>
      <!-- <div v-if="propCheckedLocal" class="third" style="color:#FFFFFF"> {{value}} </div>
      <div v-else  class="third"  style="color:#51525C" >{{value}} </div> -->
</div>
</template>

<script>
export default {
    name  : "AtomCheckBoxWithValue",
    data:function(){
      return{
        checkedInternal: this.propChecked
        }
    },
    props:{
        refParentKey:{type:String},
        key1:{type:String},
        value:{type:Number},
        arrIndex:{type:String},
        propChecked:{type:Boolean},
        // checked:{type:Boolean, default:true}
    },
    methods: {
      resetInternalState(){
        this.checkedInternal = true;
      },
       changePropcheck(){
          this.checkedInternal = !this.checkedInternal;
          this.$emit('onClickChild',this.checkedInternal, this.key1, this.value, this.refParentKey,this.arrIndex);
        },
    },
    created:function(){
   },
    computed:{
        propCheckedLocal:{
          get:function(){ return this.propChecked},
          set:function(){
             this.changePropcheck();
          }
        },
    }
}
</script>
<style scoped>
.parent_div{
    display: flex;
    width: 100%;
    flex-direction: row;
}
.checkbox{
padding-top:1%;
 width: 10%;
}

.second{
 width: 40%;
 font-family: 'Poppins', sans-serif;
 font-size: 14px;
}

.third {
    width: 40%;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    text-align: right;
    margin-right:10px;
}

input[type=checkbox] {
  position: absolute;
  cursor: pointer;
}
input[type=checkbox]:before {
  content: "";
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;

  border:  1px solid    #51525C;
  border-radius: 2px;
  background-color: #1C1B21;
  padding: 1px;
}
input[type=checkbox]:checked::before {
  /* background-color: #ff7795; */
  background-color: #77ACFF;
}

input[type=checkbox]:checked::after {
  content: "";
  display: block;
  width: 5px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}

</style>
