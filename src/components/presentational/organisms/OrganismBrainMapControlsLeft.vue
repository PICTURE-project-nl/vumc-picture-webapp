<template>
  <!-- <div class="controls -container" :class="{ 'while-brains-loading': isLoading, 'brains-loaded': !isLoading }"> -->
     <div v-if="!isLoading || this.update != ''" class="controls-container">
    <div class="container_controles_heading">
      <AtomTextHeading isMedium>
        Filter Patient charecteristics
      </AtomTextHeading>
    </div>

    <div v-if="hasData">
      <MoleculePatientData
        :brainMapId="brainMapId"
        :update="updating"
        :filterableOutput="filterableOutput"
        @getDataFromServer="getNewFilteredBrainMap"
        @changeProcessingStatus="changeProcessingStatus"/>
    </div>
    <div v-else style="padding-top: 70%; padding-right: 35%; padding-left: 35%">
      <AtomLoadingSpinner :size="80"></AtomLoadingSpinner>
    </div>
  </div>

</template>

<script>
import {
  MoleculeBrainMapControlsCoordinates,
  MoleculeBrainMapControlsFilters,
  MoleculeBrainMapControlsMasking,
} from "@/components/presentational/molecules";
import {
  AtomDivider,
  AtomTextHeading,
} from "@/components/presentational/atoms";
import AtomButton from "@/components/presentational/atoms/AtomButton";
import { brainMapsViewerMixins } from "@/store/brain-map-viewer/mixins";
import MoleculePatientData from "../molecules/MoleculePatientData.vue";
import AtomTextBody from "@/components/presentational/atoms/AtomTextBody";
import AtomIcon from "@/components/presentational/atoms/AtomIcon.vue";
import { api } from "@/config/api";
import { BRAIN_MAP_FILTER_ACTION_TYPES } from "@/store/brain-map-filter/action-types.js";
import { BRAIN_MAP_VIEWER_ACTION_TYPES } from '@/store/brain-map-viewer/action-types';
import { brainMapFilterMixins } from "@/store/brain-map-filter/mixins.js";
import { apiGetAuthorizationHeader, transformRequest } from "@/api/utils";
import AtomLoadingSpinner from "@/components/presentational/atoms/AtomLoadingSpinner";
//import { BRAIN_MAP_FILTER_MUTATION_TYPES } from "@/store/brain-map-filter/mutation-types";

export default {
  name: "OrganismBrainMapControlsLeft",
  components: {
    AtomButton,
    AtomIcon,
    MoleculeBrainMapControlsCoordinates,
    MoleculeBrainMapControlsFilters,
    MoleculeBrainMapControlsMasking,
    AtomDivider,
    MoleculePatientData,
    AtomLoadingSpinner,
    AtomTextBody,
    AtomTextHeading,
  },
  mixins: [
    brainMapsViewerMixins.info,
    brainMapsViewerMixins.emitters,
    brainMapFilterMixins,
    brainMapsViewerMixins.controls,
  ],

  data: function () {
    return {
      filterableOutput:{},
      update: "",
      showModal: false,
    };
  },
  computed: {
    isViewerLoading(){

      return  this.$store.state.brainMapViewer.loading;
    },
    updating: function () {
      return this.update;
    },

    hasPreliminaryDataReady() {

      return this.$store.state.brainMapViewer.loading;
    },
      hasData: function () {
       if(this.update==""){

          let state = {};
          Object.assign(state,this.$store.state.brainMapFilter.filterData);

          let dumm = JSON.parse(JSON.stringify(this.$store.state.brainMapFilter));

            let clone = Object.assign({}, this.$store.state.brainMapFilter.filterData);


          let filterableOptions =  JSON.parse(JSON.stringify(this.$store.state.brainMapFilter.filterableOptions));

          if(this.$store.state.brainMapFilter.filterableOptions.hasOwnProperty("image_data")){
              let filterable_output = filterableOptions.image_data.clinical_variables.filterable_output;

              if (Object.keys(filterable_output).length) {

                this.filterableOutput =filterable_output;
                    return true;
              } else {
                  return false;
              }
          }
      }else{
        return true;
      }
    },
  },
  created() {

    if (this.hasPreliminaryDataReady) {

      let authHeader = apiGetAuthorizationHeader()

       this.getFiltarableOptions();
    }
  },
  methods: {
    changeProcessingStatus(status){

      this.$emit('changeProcessingStatus', status);
    },
     getFiltarableOptions() {
          // this will get initial filterble options from the server

      const customHeaders = {
        "Content-Type": "multipart/form-data",
        ...apiGetAuthorizationHeader(),
      };
      api.get(`brain-maps/dataset`, transformRequest(customHeaders))
        .then((response) => {
          if (response.statusText == "OK") {
            //console.log(" response.data  ",response.data.image_data.clinical_variables.filterable_output.Age.values);
            let resData = response.data;
            let prob_map_gz =  resData.image_data.probability_map;
            let sum_tumors_map =resData.image_data.sum_tumors_map
            let new_current_obj = this.getCurrentBrainMap;

            const updated_current_map = {...new_current_obj,
                                          lowResBrainMap:{...new_current_obj.lowResBrainMap,
                                          probabilityMapFileURL:prob_map_gz,nrOfPatientsFileURL:sum_tumors_map } }

            this.$store.dispatch(  BRAIN_MAP_FILTER_ACTION_TYPES.GET_BRAIN_MAP_FILTERABLE_OPTIONS, resData);

          }
        })
        .catch((e) => {
          console.log(" Error from Filter data set ", e);
        });
    },

    getNewFilteredBrainMap(filterParams) {

      const customHeaders = {
        "Content-Type": "multipart/form-data",
        ...apiGetAuthorizationHeader(),
      };

      const tempPayload = this.$route.params.id ? this.$route.params.id: this.$route.params.slug;

       api.post(`brain-maps/filter/${tempPayload}`,filterParams,transformRequest(customHeaders))
        .then((response) => {

          if (response.data.status == "OK") {

            this.update = "Processing...";
            var timer = setInterval(() => {
              api.get( `brain-maps/filter/${tempPayload}`,  transformRequest(customHeaders)  )
                .then((response2) => {
                  if (response2.data.status == "OK") {

                    this.update = "";
                    let brainMapList = JSON.parse(  JSON.stringify(this.$store.state.brainMaps.list)   );
                    let i = 0;
                    let index = 0;
                    let upd_obj = {};
                    let length = brainMapList.length;

                    for (i; i < length; i++) {
                      if (brainMapList[i].id == tempPayload) {

                        let result = JSON.parse(JSON.stringify(response2.data.result.probability_map) );

                        brainMapList[i].lowResBrainMap[
                          "probabilityMapFileURL"
                        ] = result;
                        upd_obj = brainMapList[i];
                        index = i;
                        upd_obj.lowResBrainMap["probabilityMapFileURL"] =
                          result;
                        this.update = " ";
                        clearInterval(timer);
                        break;
                      }

                    }

    //update current brain map start
                      let resultData = JSON.parse(JSON.stringify(response2.data.result) );
                      let prob_map_gz =  resultData.probability_map + '?'+Math.floor(Math.random() * 10000000);
                      let sum_tumors_map =resultData.sum_tumors_map + '?'+Math.floor(Math.random() * 10000000);
                      let new_current_obj = this.getCurrentBrainMap;
                      const updated_current_map = {...new_current_obj,
                        lowResBrainMap:{...new_current_obj.lowResBrainMap,
                        probabilityMapFileURL:prob_map_gz,nrOfPatientsFileURL:sum_tumors_map } }
                      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.CHANGE_BRAIN_MAP_DATA, updated_current_map)
                  }
                })
                .catch((response2) => {
                  console.log(" Failure Response from get ", response2);
                });
            }, 20000);
          }
        })
        .catch((response) => console.log(" Error getting filter data",response));
    },

    fetchFilterData() {
      this.$store.dispatch(
        BRAIN_MAP_FILTER_ACTION_TYPES.GET_BRAIN_MAP_FILTER_DATA,
        this.$route.params.slug
      );
    },
  },
  props: {
    coordinates: {
      type: Object,
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
    isLoading: {
      type: Boolean,
    },
    brainMapId: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-block {
  align-items: center;
  background: $color-mirage;
  display: flex;
  height: 60%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: map-get($stack-index, popup);
}

.controls-container {

  min-height: calc(100vh - 1px);
  opacity: 1;

  background-color: $color-input;


  border-color: rgb(41, 41, 48);

}

.while-brains-loading * {
  opacity: 0.1;
  pointer-events: none;
  //transition: opacity 0.3s;
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

.excess {
  height: calc(100vh - (5px));
  margin-top: 1px;
}

.buttons {
  display: flex;
  flex-direction: column;
  margin-left: 16%;
  margin-right: 16%;
  padding-top: 5%;
  margin-bottom: 5%;
}

.download {
  margin-bottom: 5%;
  background: #22292f;
  border: 1px solid #77acff;
  color: #77acff;
  padding: 5px;

  margin-right: 25%;
}

.share {
  margin-bottom: 5%;
  // background: #22292f;
  border: 1px solid #77acff;
  background: #77acff;
  padding: 5px;
  color: #fff;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #292930;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #fff;
}

.modal-body {
  margin-top: 10px;
  margin: 30px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.sideButton {
  margin-left: 24%;
  margin-right: 24%;
  margin-top: 10%;
  background: rgba(41, 41, 48, 0.5);
  border: 1px solid #77acff;
  color: #77acff;
}
</style>
