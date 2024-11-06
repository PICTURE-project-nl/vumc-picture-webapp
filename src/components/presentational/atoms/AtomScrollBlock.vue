<template>
  <div class="scroll-block" id="style-2">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AtomScrollBlock'
  }
</script>

<style lang="scss" scoped>
 
  .scroll-block{
	 max-height: calc( 100vh - 360px);
	background: transparent;
	overflow-y: auto;
  overflow-x:hidden;
	
   }

   #style-2::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px $scrollbar-track-shadow-color;
	border-radius: 10px;
	background-color: scrollbar-color;
}

#style-2::-webkit-scrollbar
{
	width: 10px;
	background-color: scrollbar-color;
}

#style-2::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset $scrollbar-shadow-color;
	background-color:$color-input;
}

</style>
