<template>
  <!--<v-toolbar color="purple" dark>
  
 <v-toolbar-title>Title</v-toolbar-title>

  <v-divider
      class="mx-4"
      vertical
    ></v-divider>
   </v-toolbar> -->

  <nav class="navigation-bar">
    <div id="toggle" class="dropdown">
      Toggle Overlay:
      <select v-model="selected">
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.key"
        >
          {{ option.text }}
        </option>
      </select>
    </div>

    <label> click me </label>
    <div class="dropdown">
      <button class="dropbtn">Dropdown</button>
      <div class="dropdown-content">
        <div class="coordinate-box">
          <MoleculeBrainMapControlsCoordinates />
       
        </div>
      </div>
    </div>

    <label> Click me </label>
    <div class="dropdown">
      <button class="dropbtn">Dropdown</button>
      <div class="dropdown-content">
        <div class="container-box">
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
    </div>
  </nav>

  
</template>

<script>
import {
  MoleculeBrainMapControlsCoordinates,
  MoleculeBrainMapControlsFilters,
  MoleculeBrainMapControlsMasking,
} from "@/components/presentational/molecules";
import { brainMapsViewerMixins } from "@/store/brain-map-viewer/mixins";

import { AtomFormInputSlider } from "@/components/presentational/atoms";
import ContainerBrainMapDownload from "@/components/container/brain-map/ContainerBrainMapDownload";

import { ROUTES } from "@/config/routes";
import { URLS } from "@/assets/scripts/constants/urls";
import { staticContent } from "@/data/static-content";
import { userMixins } from "@/store/user";
import { OrganismNavBar } from "@/components/presentational/organisms";
import MoleculeBrainViewerSectionHeading from "@/components/presentational/molecules/MoleculeBrainViewerSectionHeading.vue";

export default {
  name: "ContainerNavigationBarSecondLevel",
  components: {
    AtomFormInputSlider,
    ContainerBrainMapDownload,
    MoleculeBrainMapControlsCoordinates,
    MoleculeBrainViewerSectionHeading,
    //OrganismNavBar // change to componnts of left nav bars
  },
  mixins: [
    userMixins.authenticatedData,
    userMixins.authenticatedUpdate,
    brainMapsViewerMixins.emitters,
  ],
  props: {
    coordinates: {
      type: Object,
    },
    axiValue: {
      type: Number,
    },
    corValue: {
      type: Number,
    },
    sagValue: {
      type: Number,
    },
  },
  data: function () {
    return {
      selected: "prob",
      options: [
        { text: "Probability", value: "prob" },
        { text: "Shape", value: "shape" },
        { text: "Patientamount", value: "patient" },
      ],

      ROUTES,
      URLS,
      content: {
        ...staticContent.topNavigation,
        ...staticContent.brainMapControls,
      },

      temp: this.$store.state.brainMapViewer.coordinates,
    };
  },
  methods: {
    resetCoordinates: function () {
      this.$emit("resetCoordinates");
    },
    changeCoordinates: function (payload) {
      this.$emit("setCoordinates", payload);
    },
  },
  computed: {
    navigationRowData: function () {
      const loginItem = {
        title: this.ROUTES.USER_LOG_IN.title,
        to: this.ROUTES.USER_LOG_IN.path,
      };

      const editAccountItem = {
        title: `${this.content.welcomeMessage} ${this.user.name}`,
        to: this.ROUTES.USER_EDIT_ACCOUNT.path,
      };

      const items = [
        {
          title: this.content.aboutPicture,
          href: this.URLS.PICTURE_PROJECT_WEBSITE,
          isExternalLink: true,
        },
      ];

      if (this.userIsAuthenticated) {
        items.push(editAccountItem);
      } else {
        items.unshift(loginItem);
      }

      return items;
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  background-color: #272d3d;
  height: 48px;
  left: 0;
  margin-top: 50px;
  padding-top: $global-spacing-unit-small;
  position: fixed;
  right: 0;
  //top: 100px;

  z-index: map-get($stack-index, navigation);
}
.hori-nav {
  background-color: #333;
}
.dropdown {
  position: relatvie;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropbtn {
  background-color: #04aa6d;
  color: white;
  padding: 6px;
}
.dropdown-content a {
  display: block;
}

.slider {
  width: 100px;
  overflow: hidden;
}

.container-box {
  width: 100px;
  border: 15px solid, green;
  padding: 50px;
  margin: 20px;
}

.coordinate-box {
  width: 9cm;
  height: 6cm;
  border-color: #ff0062;
  border-style: solid;
  border-width: 2px;
}
</style>
