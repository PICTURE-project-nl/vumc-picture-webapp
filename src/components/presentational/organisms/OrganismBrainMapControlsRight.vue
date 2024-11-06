<template>
  <div
    class="controls-container"
    :class="{
      'while-brains-loading': isLoading,
      'brains-loaded': !isLoading,
    }"
  >
    <div class="container_controles_heading">
      <AtomTextHeading isMedium> {{ contentGsi.title }}</AtomTextHeading>
    </div>
    <div v-if="hasData">
        <div v-if="isTumorFound">
          <MoleculeReportData :accordionData="gsiReadsArrange" />
          <div class="excess">
            <AtomButton
              isSmall
              class="download"
              :is-external-link="true"
              :href="downloadGsiRads"
            >
              Download
            </AtomButton>
          </div>
        </div>
        <div v-else>
          <div class="no_data_msg">
          <AtomTextBody isSmall> {{ content.tumorNotFound }}</AtomTextBody>
          </div>
        </div>
    </div>
    <div v-else class="upload_mri">
        <div class="alert-icon">
          <AtomIcon
            viewBox="0 0 30 30"
            class="icon--no-fill"
            type="alert-circle"
          ></AtomIcon>
        </div>
        <div class="no_data_msg">
          <AtomTextBody isSmall> {{ contentGsi.noData }}</AtomTextBody>
        </div>
        <div class="file_upload">
          <AtomButton
          isSmall
          :toName="buttonUrl"
          :toParams="{stepSlug: 'upload'}"
        >

          {{ content.upload }}
        </AtomButton>

        </div>
        <!-- <div class="file_upload">
          <AtomFormInputFile name="userInputFile">
            {{ "upload file" }}
          </AtomFormInputFile>
        </div> -->
    </div>
  </div>
</template>

<script>
 import { ROUTES } from '@/config/routes'
import AtomKeyValuePair from "../../presentational/atoms/AtomKeyValuePair.vue";
import AtomTextHeading from "../../presentational/atoms/AtomTextHeading.vue";
import MoleculeReportData from "../molecules/MoleculeReportData.vue";
import AtomIcon from "@/components/presentational/atoms/AtomIcon";
import {
  AtomButton,
  AtomTextBody,
  AtomFormInputFile,
} from "@/components/presentational/atoms";
import { brainMapsMixins } from '@/store/brain-maps/mixins'
import { staticContent } from "@/data/static-content";
export default {
  name: "OrganismBrainMapControlsRight",
  components: {
    AtomKeyValuePair,
    AtomTextHeading,
    MoleculeReportData,
    AtomIcon,
    AtomButton,
    AtomTextBody,
    AtomFormInputFile,
  },
  data() {
    return {
         ROUTES,
      gsiData: "",
      contentGsi:{...staticContent.gsiRads,},
      content: {

          ...staticContent.brainMapManager
      },
    };
  },
  mixins: [brainMapsMixins,
  brainMapsMixins.folders,
  ],
  props: {
    gsiRadsData:{
      require:true,
      type:[Array,Object]
    },
    isLoading: {
      type: Boolean,
    },
  },
  methods: {

    isTumorFound() {
      var p = this.gsiRadsData;
      let tumorFound;
      var count = Object.keys(p).length;
      if (count > 1) {
        // if there is a data in gsi-rads object then it is assumed that there is a tumor.
        tumorFound = "True";
        return tumorFound;
      } else {
        if (p.hasOwnProperty("Tumor found")) {
          tumorFound = p["Tumor found"];
          return tumorFound;
        }
      }
    },

    decimalTrim(number) {
      let trimmedNumber;
      if (number < 0) {
        trimmedNumber = 0;
      } else if (number >= 1 && number < 10) {

        trimmedNumber = number.toFixed(2) ;
        trimmedNumber= trimmedNumber *1;
      } else if (number >= 10) {
        trimmedNumber = ~~number;
      } else if (number > 0 && number < 1) {
        let stringNum = number.toString();
        let result = "";
        let afterDot = false;
        let stop = false;
        for (let i = 0; i < stringNum.length; i++) {
          if (!stop) {
            if (stringNum[i] == 0) {
              result = result + stringNum[i];
            } else if (stringNum[i] == ".") {
              result = result + stringNum[i];
              afterDot = true;
            } else if (Number(stringNum[i]) > 0) {
              if (afterDot == true) {
                result = result + stringNum[i];
                trimmedNumber = result;
                stop = true;
              }
            }
          }
        }
      }
      if (trimmedNumber) {
        return trimmedNumber.toString();
      } else {
        return trimmedNumber;
      }
    },
    expandAll() {
      this.$emit("closeAll");
    },
  },
  computed: {
    downloadGsiRads(){
      let gsiRadsUrl = '';

      gsiRadsUrl= this.$store.state.brainMapViewer?.currentBrainMap?.gsiRadsXLSXURL
      if(gsiRadsUrl){

        return gsiRadsUrl
      } else {
        return ''
      }

    },
     buttonUrl: function () {
        if (this.userIsAuthenticated) {
          return ROUTES.BRAIN_MAP_UPLOAD.name
        } else {
          return ROUTES.USER_SIGN_UP.name
        }
      },
    hasData: function () {
      return this.gsiRadsData;
    },

    gsiReadsArrange: function () {
      var GsiReads = {};
      var p = this.gsiRadsData;

      let tumorFound = this.isTumorFound();
      if (tumorFound) {
        let MNI_atlas = {};
        let Harvard_Oxford_atlas = {};
        let Schaefer7_atlas = {};
        let Schaefer17_atlas = {};
        let BCB_atlas = {};
        let distance_between_tumors;
        let multifocality;
        if (!p["Multifocality"]) {
          // if multifocality value is false then there is no multiple tumors present and hence the distance between tumors are “-1 mm ”.
          multifocality = false;
          distance_between_tumors = -1;
        } else {
          multifocality = this.decimalTrim(p["Multifocality"]);
          distance_between_tumors = this.decimalTrim(p["Multifocal distance (mm)"]) + " mm";
        }
        let GSI_RADS_report_data = {
          "Tumor found": tumorFound,
          "Number tumor parts": this.decimalTrim(p["Tumor parts nb"]) + " ml",
          "Largest distance between components": distance_between_tumors,
          "Tumor multifocality": multifocality,
        };
        let Volumes = {
          "Original space": this.decimalTrim(p["Volume original (ml)"]) + " ml",
          "MNI space": this.decimalTrim(p["Volume in MNI (ml)"]),
        };
        let Laterality = {
          "Left hemisphere": this.decimalTrim(p["Left laterality (%)"]) + " %",
          "Right hemisphere":  this.decimalTrim(p["Right laterality (%)"]) + " %",
          "Midline crossing": this.decimalTrim(p["Midline crossing"]) + " %",
        };
        let Resectability = {
          "Expected resectable volume":  p["ExpectedResidualVolume (ml)"] + " ml",
          "Resection index": p["ResectionIndex"]+" ",
        };
        for (var key in p) {
          if ({}.propertyIsEnumerable.call(p, key)) {
            let myKeyArray = key.split("_");
            if (myKeyArray[0] == "MNI") {
              let str = myKeyArray[1] + myKeyArray[2];
              str = str[0].toUpperCase() + str.slice(1);
              if (p[key] != 0) {
                MNI_atlas[str] = this.decimalTrim(p[key]) + " %";
              }
            } else if (myKeyArray[0] == "Harvard-Oxford") {
              let str = myKeyArray[2].trim();
              str = str[0].toUpperCase() + str.slice(1);
              if (p[key] != 0) {
                Harvard_Oxford_atlas[str] = this.decimalTrim(p[key]) + " %";
              }
            } else if (myKeyArray[0] == "Schaefer7") {
              let str = myKeyArray[2].trim();
              str = str[0].toUpperCase() + str.slice(1);
              if (p[key] != 0) {
                Schaefer7_atlas[str] = this.decimalTrim(p[key]) + " %";
              }
            } else if (myKeyArray[0] == "Schaefer17") {
              let str = myKeyArray[2].trim();
              str = str[0].toUpperCase() + str.slice(1);
              if (p[key] != 0) {
                Schaefer17_atlas[str] = this.decimalTrim(p[key]) + " %";
              }
            } else if (myKeyArray[0].startsWith("BCB")) {
              let arrSize = myKeyArray.length;
              let unit = "";
              let str = "";
              for (let x = 0; x < myKeyArray.length; x++) {
                let strC = myKeyArray[x];
                if (x == 0) {
                  strC = strC.substring(3, strC.length);
                }
                str = str + " " + strC;
              }
              if (p[key] != 0) {
                if (myKeyArray[arrSize - 1] == "distance") {
                  unit = " mm";
                } else if (myKeyArray[arrSize - 1] == "overlap") {
                  unit = "  %";
                }
                BCB_atlas[str] = this.decimalTrim(p[key]) + unit;
              }
            }
          }
        }

        let myData = {
          "GSI-RADS Report data": GSI_RADS_report_data,
          Volumes,
          Laterality,
          Resectability,
          "Subcortical structures overlap or distance": {
            "BCB Atlas": BCB_atlas,
          },
          "Cortical structures overlap": {
            "MNI atlas": MNI_atlas,
            "Harvard Oxford atlas": Harvard_Oxford_atlas,
            "Schaefer7 atlas": Schaefer7_atlas,
            "Schaefer17 atlas": Schaefer17_atlas,
          },
        };
        this.gsiData = myData;
        return myData;
      }
    },
  },

};
</script>

<style lang="scss" scoped>
.controls-container {
  background-color: $color-input;
  min-height: calc(100vh - 1px);
  border-color: rgb(41, 41, 48);
  border-left: $color-jaguar 1px solid;
  border-right: $color-jaguar 1px solid;
}

.while-brains-loading * {
  opacity: 0.1;
  pointer-events: none;
}

.brains-loaded * {
  opacity: 1;
  transition: opacity 1s;
}

.container_controles_heading {
  padding-top: 3%;
  padding-bottom: 3%;
  align-items: center;
  display: flex;
  padding-left: 10%;
}

.collapse {
  margin-bottom: 1px;
  background-color: #1c1b21;
  margin-top: 3px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid;
  border-bottom-color: $color-jaguar; //#292930;
}

.collapse_btn {
  display: flex;
  flex-direction: row;
}

.download {
  background: #22292f;
  border: 1px solid #77acff;
  color: #77acff;
  padding: 5px;
  margin-top: 10%;
  margin-left: 31%;
}

.excess {
  height: calc(100vh - (5px));
  background-color: rgba(41, 41, 48, 0.5);
}

.upload_mri {
  border-top: 1px solid $color-jaguar;
  padding-top: 50%;
}
.no_data_msg {
  padding-left: 13%;
  padding-right: 18%;
  text-align: center;
}
.alert-icon {
  padding-left: 50%;
  padding-right: 50%;
  padding-bottom: 5%;
}

.file_upload {
  padding-top: 10%;
  padding-left: 31%;
}
</style>
