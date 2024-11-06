<template>
  <!--  Here include all the molecules related to second Nav bar
      which are molecules for  threshold, adjust coordinates ( there are needs to be designed with sliders
      and molecules with dropdow design for file and toggle masking, molucule for brain default.
 -->
<div class ="navroot">
  <div class="navbar">
    <div class="goBack">
      <router-link v-if="!(this.routerId).startsWith('research')" :to="{ name: ROUTES.BRAIN_MAP_MANAGER.name }">
        <AtomIcon type='arrow-left'  class="icon--no-fill" > </AtomIcon>
      </router-link>
      <router-link v-else :to="{ name: ROUTES.RESEARCH_BRAIN_MAP_MANAGER.name }">
        <AtomIcon type='arrow-left'  class="icon--no-fill" > </AtomIcon>
      </router-link>
    </div>
    <div  class="file" >
      <AtomTextBody  isSmall> File </AtomTextBody>
    <div class="dropdown-file">
      <span><AtomIcon class="icon--no-fill"  type='arrow-down'></AtomIcon></span>
    <div class="dropdown-content-file">
       <div class="container-box-file">
          <div>
             <ul>
              <li style="" class="uploadScan">
                <router-link :to="{ name: ROUTES.BRAIN_MAP_UPLOAD.name , params:{stepSlug: 'upload'} }"  class="underline"> <AtomTextBody isSmall> Upload scan </AtomTextBody> </router-link>
              </li>
              <li class="liPadding">
                <router-link :to="{ name: ROUTES.BRAIN_MAP_MANAGER.name }" class="underline"><AtomTextBody isTiny> Open scan  </AtomTextBody></router-link>
              </li>
              <li class="liPadding"  @click="openDownload"><AtomTextBody isSmall>
                Download</AtomTextBody>
              </li>


              <AtomDivider></AtomDivider>
               <li class="liPadding"  @click="openShare"><AtomTextBody isSmall>
                Share </AtomTextBody>
              </li>
              <!-- <li style="padding-left:8px;" class="listHover">
                <div style="display:flex; flex-direction:row;">
                  <AtomTextBody style="" class="share">Share </AtomTextBody>
                      <a href="#">
                        <div style="padding-top:2px">
                          <AtomIcon type="arrow-right-new" class="icon--no-fill" viewBox="-11 -5 22 22"></AtomIcon>
                        </div>
                      </a>
                </div>
                <ul class="shareBlock">
                  <li>
                    <div style="padding: 9px 10px 9px 7px; ">
                      <div class="link"> <MoleculeLinkCopy label="" :text="link"> </MoleculeLinkCopy></div>

                        <AtomTextBody color="border-abbey" isTiny class="u-margin-top-small">Anyone with this link can view the results from May 29, 2020 16:45:40</AtomTextBody>
                      </div>
                  </li>
                </ul>
              </li> -->
              <li class="liPadding" @click="openInfo">  Info </li>

              <!-- <li  class="liPadding">  <AtomButton isGhost isSmall  isFullWidth  @click.native="openInfo">  File Info </AtomButton></li> -->
            </ul>
          </div>

        </div>
      </div>
    </div>
    </div>
    <div class="coordinates">
      <span style="padding-left: 12px; padding-right:7px;"><AtomIcon type="arrow-down-v10" class="icon--no-fill"></AtomIcon></span>
    <div class="dropdown-coordinates"> <AtomIcon class="icon--no-fill"  type='arrow-down'></AtomIcon>
      <div class="dropdown-content-coordinates">
        <div class="container-box-coordinates">
          <div class="space-around">
            <MoleculeBrainMapControlsCoordinates
              :axiValue="coordinates.axi"
              :corValue="coordinates.cor"
              :sagValue="coordinates.sag"
              @setCoordinates="setCoordinates"
              @resetCoordinates="resetCoordinates"
            />
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="toggleboxtop" >
      <MoleculeBrainMapControlsToggleMasking
        :maskingValue="maskingValue"
        @setMasking="setMasking"
        @resetMasking="resetMasking"
        :probabilityValue="getProbabilityValue"
        :patientAmountValue="getPatientAmountValue"
      />
    </div>

    <div  v-if="$store.state.brainMapViewer.masking === 'probabilityMap'" class="threshold" >
        <AtomTextBody isSmall>
          {{ content.threshold  }}
        </AtomTextBody>
        <div style="min-width: 150px; padding-left:10px"><MoleculeBrainMapControlsFilters
            :thresholdValue="thresholdValue"
            @setThreshold="setThreshold"
            @resetFilters="resetFilters"/></div>
    </div>
    <div style="padding-left: 12px;">
      <AtomFormInputCheckbox
        :label="content.brainDefault"
        name="brainDefaultToggle"
        :isChecked="brainDefaultToggleValue"
        @change="changeBrainDefaultToggle"
      />
    </div>
  </div>
  </div>
</template>

<script>
import { ROUTES } from '@/config/routes';
import AtomTextHeading from '../atoms/AtomTextHeading';
import AtomTextBody from '../atoms/AtomTextBody';
import {
  AtomFormInputCheckbox,

  AtomButton
} from "@/components/presentational/atoms";
import {
  MoleculeBrainMapControlsCoordinates,
  MoleculeBrainMapControlsFilters,
  MoleculeBrainMapControlsToggleMasking,
} from "@/components/presentational/molecules";
import { staticContent } from "@/data/static-content";
import { brainMapsViewerMixins } from "@/store/brain-map-viewer/mixins";
import { AtomIcon } from "@/components/presentational/atoms";
import { isTabletOrSmaller } from "@/assets/scripts/utils/media-queries";
import AtomBox from "../atoms/AtomBox.vue";
import { AtomDivider } from "@/components/presentational/atoms";
import { AtomFormInputDropdownlist } from "@/components/presentational/atoms";
import { MoleculeLinkCopy } from '@/components/presentational/molecules'

export default {
  name: "OrganismNavBarSecond",
  components: {
    AtomTextHeading,
    AtomTextBody,AtomButton,
    AtomFormInputCheckbox,
    AtomIcon,
    MoleculeBrainMapControlsCoordinates,
    AtomBox,
    MoleculeBrainMapControlsFilters,
    AtomDivider,
    AtomFormInputDropdownlist,
    MoleculeBrainMapControlsToggleMasking,
    MoleculeLinkCopy
  },
  mixins: [brainMapsViewerMixins.emitters,brainMapsViewerMixins.controls
  ],
  props: {
    coordinates: {
      type: Object,
    },
    brainDefaultToggleValue: {
      type: Boolean,
    },
    brainDefaultValue: {
      type: Number,
    },
    thresholdValue: {
      type: Array,
    },
    maskingValue: {
      type: String,
    },
    probabilityValue: {
      type: Number,
    },
    patientAmountValue: {
      type: Number,
    },
    link:{
      type:String,
      default:'https://tool.pictureproject.nl/#/d/comparing-quality-gbm-l'
    }
    //   items: {
    //     type: Array,
    //     description: 'Expects an array with objects that contains a "title" and a "to" or "href" key to create a router-link or a anchor. You can also add "isExternalLink" to add target="_blank"'
    //   }
  },
  data: function () {
    return {
       popUpIsHidden: true,
      downloadIsHidden: true,
      routerId: this.$route.params.id || this.$route.params.slug,
    ROUTES,
      content: {
        ...staticContent.brainMapControls,
      },
    };
  },
  computed: {
    isTabletOrBelow: function () {
      return isTabletOrSmaller(this.$mq);
    },
    iconType: function () {
      return this.isToggled ? "close" : "menu";
    },
  },
  methods: {

    openInfo:function(){
      this.$emit('openInfo');
    },
    changeBrainDefaultValue: function (payload) {
      this.$emit("setBrainDefault", payload.value);
    },
    changeBrainDefaultToggle: function (payload) {
      this.$emit("setBrainDefaultToggle", payload.value);
    },
    toggleNav: function (id) {
      this.isToggled = !this.isToggled;
      document.querySelector(`[data-js="${id}"`).classList.toggle("nav-hide");
    },
  },
};
</script>

<style lang="scss" scoped>
.threshold{
  display: flex;
  flex-direction: row;
  width: fit-content;
  padding-left: 12px;
    padding-right: 12px;
    height: 100%;
    padding-top: 5px;
    border-right: 2px solid #1C1B21;
}

.underline{
  text-decoration: none;
}
.link{
  background:$color-border-Abbey;
}
.uploadScan{
padding-left:8px; padding-bottom:3px; padding-top: 3px;
}

.liPadding{
  padding-left:8px
}

.navroot {

position: absolute;
left: 0%;
right: 0%;
top: 0%;
bottom: 0%;
margin: 1px;
background-color: #292930;
}
.navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    padding: 5px;
    justify-content: flex-start;
}

.goBack{
  height: 100%; border-right: solid 2px #1C1B21; padding-left:30px; padding-top:4px; padding-right:15px
}

.file{
  display:flex ;padding-top: 4px;
    padding-left: 13px;
    padding-right: 13px;
    display: flex;
    border-right: solid 2px #1C1B21;
    height: 100%;
    top: 7px;
}
.router {

}
.coordinates{
  display:flex; flex-direction:row;  height: 100%; border-right: 2px solid #1C1B21; padding-top:4px;
}
.toggleboxtop{

  padding-left: 12px;
    padding-right: 12px;
    padding-top: 4px;
    height: 100%;
    border-right: 2px solid #1C1B21;
}
.nav-container {
  opacity: 1;
  pointer-events: all;
  transition: all 0.3s;
}

.nav-hide {
  display: none;
  opacity: 0;
  pointer-events: none;
  @include mq($until: tablet) {
    display: block;
  }
}

.navbar__image {
  height: 15px;
}
.dropdown {
  display: flex;
  padding-left: 12px;
    padding-right: 12px;
    height: 100%;
    padding-top: 5px;
    border-right: 2px solid #1C1B21;
}

.container-box {
  margin-top: 2px;
  width: 250px;
  height: 200px;
  border: solid 1px white;
  background: #1C1B21;
  border: 1px solid $color-border-Abbey;//#51525C;
  border-radius: 2px;

}
.space-around {
  padding: 25px;
}
.container-box-toggle {
  margin-left: 80px;
  width: 250px;
  height: 90px;
 background: #1C1B21;
  border: 1px solid $color-border-Abbey;//#51525C;
  border-radius: 2px;

}


.dropbtn {
  margin-left: 5px;
  box-sizing: border-box;
  margin-top:1px;
  margin-bottom: 1px;;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px;
  gap: 8px;
  border: 1px solid $color-border-Abbey;//#51525c;
  border-radius: 2px;
  background: #1c1b21;
}

.dropbtn-threshold{
  padding-left:2px;
}

.dropdown:hover .dropdown-content-threshold{
  display: block;
}

.dropdown-content-threshold{
  margin-top:30px;
  position: absolute;
  display: none;
  z-index:2;
}



.dropdown-coordinates {
  padding-right: 12px;
  display: flex;
}
.dropdown-content-coordinates {
  display: none;
  position: absolute;
  z-index:2;
}
.coordinates:hover .dropdown-content-coordinates  {
  display: block;
}

.container-box-coordinates {
  margin-top:30px;
  width: 250px;
  height: 200px;
  background: #1C1B21;
  border: 1px solid $color-border-Abbey;//#51525C;
  border-radius: 2px;
}
.dropdown-file {
  padding-left:5px;
  display: flex;

}
.dropdown-content-file {
  display: none;
  position: absolute;
  z-index:2;
  //margin-top:30px;
}
// .dropdown-file:hover .dropdown-content-file  {
//   //margin-top:30px;
//   display: block;
//   left:140px;
// }

.file:hover .dropdown-content-file  {
  //margin-top:30px;
  display: block;
  left:115px;
}

.container-box-file{
    margin-top: 30px;
    width: 150px;
    height: fit-content;
    background: #1C1B21;
    border: 1px solid $color-border-Abbey;//#51525C;
    border-radius: 2px;
    position:absolute;
}
.share{
padding-right:70px;padding-bottom:3px;
}
.listHover:hover{
  background: #77ACFF;

}
.listHover:hover   .shareBlock{
  display:block;
}
.listShareContent{
  display:block;
  }

  li {padding-left:8px;}

.shareBlock{
  display: none;
  position: absolute;
    top: 60px;
    left: 148px;
    border: solid 1px $color-border-Abbey;//#51525C;
    border-radius: 2px;
    width: 300px;
    background: black;

}

.shareLink{
 background: $color-border-Abbey;//#51525C;
 margin: 6px 14px 7px 10px;
 display: flex;
 flex-direction: row;
 height: 35px;
 width: 250px;
 border-radius:2px;
 background:#1C1B21
}
</style>
