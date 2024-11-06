<template>
 <div id="myProgress">
  <div id="myBar"></div>
</div>
  <!-- <vue-ellipse-progress :progress="50" /> -->
</template>
<script>
// import { VueEllipseProgress } from "vue-ellipse-progress";

export default {
  name: "AtomProgressBar",
  mounted: function(){
     let i= 0;
    if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }

   }
   }
  // components: { VueEllipseProgress },
};
</script>
<style scoped>


#myProgress {
  width: 100%;
  background-color: grey;
}

#myBar {
  width: 1%;
  height: 30px;
  background-color: green;
}
</style>

