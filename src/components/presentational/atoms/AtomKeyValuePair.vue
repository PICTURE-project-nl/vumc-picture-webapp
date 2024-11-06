<template >
<div class="keyValue">
    <!-- <AtomTextBody isTiny class="key"> {{key1}} &nbsp; :&nbsp; </AtomTextBody> 
    <AtomTextBody isTiny class="value">&nbsp; {{value}}</AtomTextBody>  -->
<div class="key">  {{key1}}&nbsp;:  </div>
<div class="left"> &nbsp; {{value}} </div>
</div>
    <!-- <span> {{key1}} : {{value}} </span> -->
</template>

<script>
export default {
    name:"AtomKeyValuePair",
     
     props:{
        key1:{type:String},
        value:{type:String}
     }
    
}
</script>

<style scoped>
.key {
    text-align:right; width: 80%;font-size: 13px;
}
.value{
    text-align: left;  
    width: 20%;
    font-size: 15px;
}
.keyValue {
display: flex;
}
</style>

