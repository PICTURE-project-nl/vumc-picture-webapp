<template>
  <div class="fixedHeight">
    <div>
      <div><ContainerNavigationBar/></div>
      <div style="margin-top:2px"><ContainerNavigationBarHorizontal /></div>
    </div>

    <div class="o-page-container o-page-container--no-top">
    <div class="o-simple-grid" id="research_map" :style="(this.routerId).startsWith('research') ? { 'justify-content': 'center'} : 'none' " >
   
    <div v-if="!(this.routerId).startsWith('research')"   >
      <div  style=" border-right: #292930 1px solid; width:100%">
        <div  v-show="!isTabletOrBelow" id="block1" class="o-simple-grid__column o-simple-grid__column--editor-sidebar">
          <div id="btn" class="collapseLeft">
            <div  style="margin-left: auto;" >
              <button @click="toggleCollapse" class="collapse_btn" >
                <AtomIcon type="collapse1" class="icon--no-fill" viewBox="-11 -5 22 22"></AtomIcon>
                <AtomIcon type="collapse2" class="icon--no-fill" viewBox="6 -5 22 22"></AtomIcon>
              </button>
            </div>
          </div>
          <div id="random"></div> <!-- Keep this div important  -->
            <div id="block11"><slot :name="slotConfig.columnSidebarLeft.name"></slot></div>
          </div>
          </div>
    </div>
          <div id="block2" class="o-simple-grid__column o-simple-grid__column--editor-main relative">
            <slot :name="slotConfig.columnMain.name"></slot>
          </div>
          <div v-if="!(this.routerId).startsWith('research')">
          <div v-show="!isTabletOrBelow" class="o-simple-grid__column o-simple-grid__column--editor-sidebar" id="r_map">
            <div id="btnRight" class="collapseRight" @click="toggleCollapseRight">
               <div  style="margin-right: auto;" >
                  <button  class="collapse_btn" >
                    <AtomIcon type="collapse1" class="icon--no-fill" viewBox="-11 -5 22 22"></AtomIcon>
                    <AtomIcon type="collapse2" class="icon--no-fill" viewBox="6 -5 22 22"></AtomIcon>
                  </button>
              </div>
            </div>
            <div id="randomRight"></div> <!-- Kepp this div important  -->
            <div id="block3"><slot :name="slotConfig.columnSidebarRight.name"></slot></div>
          </div>
          <div v-show="isTabletOrBelow"  id="block4"    class="o-simple-grid__column o-simple-grid__column--editor-mobile">
            <slot :name="slotConfig.columnMobile.name"></slot>
          </div>
        </div>
   </div>
    </div>
  </div>
</template>

<script>
import { isTabletOrSmaller } from "@/assets/scripts/utils/media-queries";
import { SLOT_EXPECTS } from "@/assets/scripts/constants/slots";
import { ContainerNavigationBar } from "@/components/container/general";
//import { ContainerNavigationBarSecondLevel } from "@/components/container/general";
import { ContainerNavigationBarHorizontal } from "@/components/container/general";
import AtomIcon from "../atoms/AtomIcon.vue";
const slotConfig = {
  columnSidebarLeft: {
    name: "column-sidebar-left",
    expects: SLOT_EXPECTS.COMPONENTS,
  },
  columnMain: {
    name: "column-main",
    expects: SLOT_EXPECTS.COMPONENTS,
  },
  columnSidebarRight: {
    name: "column-sidebar-right",
    expects: SLOT_EXPECTS.COMPONENTS,
  },
  columnMobile: {
    name: "column-mobile",
    expects: SLOT_EXPECTS.COMPONENTS,
  },
};

export default {
  name: "TemplateNavbarEditor",
  components: {
    ContainerNavigationBar,
    //ContainerNavigationBarSecondLevel,
    ContainerNavigationBarHorizontal,
    AtomIcon
  },
  slotConfig,
  data: function () {
    return {
      routerId: this.$route.params.id || this.$route.params.slug,
      slotConfig,

      collapse: false,
      collapseRight: false,
    };
  },

  computed: {
    isTabletOrBelow: function () {
      return isTabletOrSmaller(this.$mq);
    },
  },

  methods: {
    toggleCollapse: function () {
      this.collapse = !this.collapse;
      if (this.collapse) {
        document.getElementById("block11").style.display = "none";
        document.getElementById("btn").style.width = "10%";
        document.getElementById("random").style.width = "10%";
        document.getElementById("random").style.height = "100%";
        document.getElementById("random").style.background = "#1C1B21";
      } else {
        document.getElementById("block11").style.display = "block";
        document.getElementById("btn").style.width = "100%";
        document.getElementById("random").style.width = "0";
        document.getElementById("random").style.height = "0";
      }
    },

    toggleCollapseRight: function () {
      this.collapseRight = !this.collapseRight;
      if (this.collapseRight) {
        document.getElementById("block3").style.display = "none";
        document.getElementById("btnRight").style.width = "3%";
        document.getElementById("randomRight").style.width = "3%";
        document.getElementById("randomRight").style.height = "100%";
        document.getElementById("randomRight").style.background = "#1C1B21";


        document.getElementById("randomRight").style.position = "absolute";
        document.getElementById("randomRight").style.right = "0";
        document.getElementById("btnRight").style.right = "0";
        document.getElementById("btnRight").style.position = "absolute";
        document.getElementById("btnRight").style.zIndex ="1";
      } else {
        document.getElementById("block3").style.display = "block";
        document.getElementById("btnRight").style.width = "355px";

        document.getElementById("randomRight").style.width = "0";
        document.getElementById("randomRight").style.height = "0";
         document.getElementById("randomRight").style.float = "right";
        document.getElementById("btnRight").style.width= "100%";

        document.getElementById("btnRight").style.display = "flex";

        document.getElementById("btnRight").style.position= "relative";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.fixedHeight{
  max-height:100vh ;
   overflow-y: hidden;
}
.relative {
  position: relative;
}
.collapseLeft {
  background: #1c1b21;
  border-bottom: 1px solid $color-jaguar;
  border-right: 1px solid $color-jaguar;
  display: flex;
  flex-direction: row;
}
.collapse_btn{
  display:flex;
  flex-direction: row;
  background: transparent;
  border: none;
  }
.collapseRight {
  background: #1c1b21;
  border-bottom: 1px solid $color-jaguar;
  border-left: 1px solid $color-jaguar;
  display: flex;
  flex-direction: row;
}
</style>
