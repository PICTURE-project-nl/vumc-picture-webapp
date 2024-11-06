<template>
<div>
  
  <div v-if="isMounted">
     <div :style= "[isDisable ? { 'pointer-events': 'none' , 'opacity':'0.5' } : {}]">
     
    <AtomScrollBlock>
   <div>
    <Accordion>
      <div v-for="(read, key1) in getActualBrainReads" :key="`read-${key1}`">
        <div v-if="read">
        <Accordion-item v-model="checked" :cssClass="cssClass">
          <template slot="accordion-trigger">
            <h4 class="myfont">{{ key1 }}</h4>
          </template>
          <template slot="accordion-content">
              <div v-if="key1 == 'Age'">
                  <div  class="histoSlider"> 
                    <MoleculeHistogramSlider :ref="key1" @histoChange="histoChange" :seriesData="read.series" :categories="Object.values(read.categories)"  :sliderRange="read.boundary" :refParentKey='key1'   :binSize="read.binSize"/> 
                  </div>
              </div>
              <div v-else-if="key1 == 'KPS'">
                
                  <div  class="histoSlider"> 
                      <MoleculeHistogramSlider :ref="key1" @histoChange="histoChange" :seriesData="read.series" :categories="Object.values(read.categories)"  :sliderRange="read.boundary" :refParentKey='key1' :binSize="read.binSize" /> 
                  </div>
                   <div  class="atomCheckbox">
                    <AtomCheckBoxWithValue :ref="`checkBoxRef`" :arrIndex="`0`" :key1="read.kpsOption[0].key" :value="read.kpsOption[0].value"   v-bind:propChecked.sync="read.kpsOption[0].checked"    @onClickChild="onClickChild" :refParentKey="key1" />
                  </div>
              </div>
              <div v-else class="accordion_content_key_value_pair ">
                 
                <div v-for="(data, key2) in read"  :key="`data-${key2}`"  class="atomCheckbox">
                    <AtomCheckBoxWithValue :ref="`checkBoxRef`" :arrIndex="key2" :key1="data.key" :value="data.value"   v-bind:propChecked.sync="data.checked"  @onClickChild="onClickChild" :refParentKey="key1"/>
                  </div>
              </div>
          </template>
        </Accordion-item>
        </div>
      </div>
    </Accordion>
  </div>
    </AtomScrollBlock>

   </div>
    <div style=" background: rgba(41, 41, 48, 0.5);
    height: 98vh;">
    <div class="processingStatus">{{update}}</div> 
     <div class="filterButton" >
        <AtomButton
         :isDisabled="isDisable"
          isSmall
          isFullWidth
          class="update"
          @click.native="updateResult"
        >
          Update
        </AtomButton>
        <div class="u-margin-top-small">
          <AtomButton
          :isDisabled="isDisable"
            isGhost
            isSmall
            isFullWidth
            @click.native="resetAll"
            class="reset"
          >
            Reset All
          </AtomButton>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
 
import AtomCheckBoxWithValue from "./../atoms/AtomCheckBoxWithValue.vue";
import AtomKeyValuePair from "./../atoms/AtomKeyValuePair.vue";
import Accordion from "../atoms/Accordion.vue";
import AccordionItem from "../atoms/AccordionItem.vue";
import MoleculeHistogramSlider from "../molecules/MoleculeHistogramSlider.vue";
import AtomScrollBlock from "../atoms/AtomScrollBlock.vue";
import _ from 'lodash';
import { brainMapsViewerMixins } from "@/store/brain-map-viewer/mixins";
//import  {apiBrainMapFilterStatus} from '@/api/brain-map-filter';
import { BRAIN_MAP_VIEWER_ACTION_TYPES } from '@/store/brain-map-viewer/action-types';
import AtomButton from '../atoms/AtomButton.vue';
export default {
  name: "MoleculePatientData",
  mixins:[    brainMapsViewerMixins.info,
    brainMapsViewerMixins.emitters,
    brainMapsViewerMixins.controls,],
  components: {
    AccordionItem,
    Accordion,
    AtomKeyValuePair,
    AtomCheckBoxWithValue,
    AtomTextHeading:()=>import("./../atoms/AtomTextHeading.vue"),
     MoleculeHistogramSlider,
     AtomScrollBlock,
    AtomButton
  },
  props: {
    filterableOutput:{type:Object},
    patientAmount: { type: Number },
    update:{type:String},
    brainMapId: {
        type: String,
        required: false
      },
  },
  data: function () {
    return {
      ageHistogramObj:{},
      kpsHistogramObj:{},
      actualBrainReads:{},
      filterableData:{},
      isHistogram: true,
      selectedFilters:[],
      componentKey: 0,
      amount: 0,
      test: [],
      mounted :false,
      patientAmountTotal: [],
      checked: true,
      cssClass:
        "display: flex;width: 100%; padding-left:0px; background-color:#292930; margin-top:1px",
    };
  },
  mounted:function(){
    this.mounted = true;
  },
  beforeMount: function() {
     
  },
  computed: {
    isDisable(){
      if(this.update.length>2){
        this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_LOADING, true)
        this.$emit('changeProcessingStatus',true)
        return true;
      }else{
        this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_LOADING, false)
        this.$emit('changeProcessingStatus',false)
        return false;
      }
    },
    getActualBrainReads(){
  
      return this.actualBrainReads;
    },
    isMounted(){
        return this.mounted;
    },
    getValues() {
      return (key1) => this.patientAmountTotal[key1];
    },
    
  },
  watch: {
    test: function (key1) {
      return test[key1];
    },
  },
  methods: {
   
    resetAll:function(){
 
      this.selectedFilters['KPS'][2]= "true"; // this needs to be string
        this.actualBrainReads.KPS.kpsOption[0].checked = true; // this needs to be boolean

      let temp_tumor =  this.actualBrainReads["TumorStage"];
      for(let item in temp_tumor){
            this.selectedFilters['TumorStage'][item] =temp_tumor[item].key;
          temp_tumor[item].checked = true;
      }
      
     let temp_surgery =  this.actualBrainReads["Surgery"];
      for(let item in temp_surgery){
         
          this.selectedFilters['Surgery'][item]=temp_surgery[item].key;
          temp_surgery[item].checked = true;
      }
        this.actualBrainReads["Surgery"] = temp_surgery;
        this.actualBrainReads["TumorStage"] = temp_tumor;
   
       
      this.$refs.checkBoxRef.forEach((item)=>{
       
        item.resetInternalState();
      });
   
      // updating current brainmap from existing static one (static image is  itself based on filter datasets )
      let brainMapList = JSON.parse(  JSON.stringify(this.$store.state.brainMaps.list)   );
       let i = 0;let length = brainMapList.length;
        const tempPayload = this.$route.params.id ? this.$route.params.id: this.$route.params.slug; 
        let prob_map='';
        let patient_amt_map='';
        for (i; i < length; i++) {
            if (brainMapList[i].id == tempPayload) {
               prob_map = brainMapList[i].lowResBrainMap["probabilityMapFileURL"]; 
               patient_amt_map =brainMapList[i].lowResBrainMap['nrOfPatientsFileURL'];
               break;
            }
        }
        let new_current_obj = this.getCurrentBrainMap;
        const updated_current_map = {...new_current_obj, 
                                          lowResBrainMap:{...new_current_obj.lowResBrainMap,
                                          probabilityMapFileURL:prob_map,
                                          nrOfPatientsFileURL:patient_amt_map } }


      this.$refs.Age[0].resetAllCalledFrom();
      this.$refs.KPS[0].resetAllCalledFrom();
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.CHANGE_BRAIN_MAP_DATA, updated_current_map);
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_RESEARCH_BRAIN_MAP,updated_current_map);
    },
    histoChange:function(refKey,m1,m2){
      if(refKey == "KPS"){ 
        this.selectedFilters[refKey][0] =  m1;
        this.selectedFilters[refKey][1] =  m2;
      }
      else{
          this.selectedFilters[refKey] = [m1,m2];
      }
         
    },

    updateResult:function(){
      let filterParams = `{"modality": "binary_tumor", "filter_criteria": ${JSON.stringify(this.selectedFilters)}}`
     this.$emit('getDataFromServer',filterParams )
    },

    formatData:function(){
      let  filterData = {}
      let myObj = JSON.parse(JSON.stringify(this.filterableOutput));
       
      let myAgeObj = myObj.Age.values;
      let myAgeSeries = {};
          myAgeSeries.data = Object.values(myAgeObj);
      let ageCategories = Object.keys(myAgeObj);
      let ageSliderBoundaries = [0, myObj.Age.upper_boundary];
      let ageFilter = {};
      

      let ageBinSize = myObj.Age.upper_boundary/ageCategories.length;
      ageFilter["series"]= myAgeSeries;
      ageFilter["categories"] = ageCategories;
      ageFilter["boundary"]=ageSliderBoundaries;
      ageFilter["binSize"] = ageBinSize;
      
      let myKpsObj =  myObj.KPS.values;
      let myKpsSeries = {};
      myKpsSeries.data = Object.values(myKpsObj);
 
      myKpsSeries.data.splice(myObj.KPS.upper_boundary, 1); 

      let kpsCategories =Object.keys(myKpsObj);
      kpsCategories.splice(myObj.KPS.upper_boundary, 1);

      let kpsFilter = {};
      let kpsSliderBoundaries = [0, myObj.KPS.upper_boundary];
      
      let kpsBinSize = myObj.KPS.upper_boundary/kpsCategories.length;
      kpsFilter["series"]= myKpsSeries;
      kpsFilter["categories"] = kpsCategories;
      kpsFilter["boundary"]=kpsSliderBoundaries;
      kpsFilter["binSize"] = kpsBinSize;
   
      const lastKey = Object.keys(myKpsObj).pop();
      const lastValue = Object.values(myKpsObj).pop()
      let kpsOptions = [{
                          "key":lastKey, 
                          "value":lastValue,
                          "checked":true
                        }]
      kpsFilter["kpsOption"] = kpsOptions;
      let kpsFilter_checkBox = [0, myObj.KPS.upper_boundary, "true"];
      let surgeryKeys =  myObj.Surgery.options;
      let surgeryValues = myObj.Surgery.values;
      let surgeryOptions={};
      let surgeryFilter = [];
      
      let checked ={};
      let count1= 0 ;
      for (const key in surgeryKeys) {
          surgeryFilter[count1] = key.charAt(0).toUpperCase() + key.slice(1);
          let tempKey = key.charAt(0).toUpperCase() + key.slice(1);
           surgeryOptions[count1] = {
                                        "key":tempKey, 
                                        "value":surgeryValues[key],
                                        "checked":true
                                    };
          count1++;
      }
      let tumorStageOptions={};
      let tumorStageKeys =  myObj.TumorStage.options;
      let tumorStageValues = myObj.TumorStage.values;
      let tumorStageFilter = [];
      let count2= 0 ;
      for (const key in tumorStageKeys) {
          tumorStageFilter[count2] = key.charAt(0).toUpperCase() + key.slice(1);
          let tempKey = key.charAt(0).toUpperCase() + key.slice(1);
          tumorStageOptions[count2] = {
                                        "key":tempKey, 
                                        "value":tumorStageValues[key],
                                        "checked":true
                                    };
          
          count2++;
      }
      filterData = {"Age":  ageFilter, "KPS":kpsFilter, "TumorStage":tumorStageOptions,"Surgery":surgeryOptions}
      let selectedFiltersObj = {"Age":ageSliderBoundaries,"KPS":kpsFilter_checkBox,"TumorStage":tumorStageFilter,"Surgery":surgeryFilter};
      this.selectedFilters = selectedFiltersObj;
      this.actualBrainReads = filterData;

      
       
    },
    getBrainData(){
      let brainReadsCurrent  = {};
       if(this.$store.state.brainMapFilter.filterData.hasOwnProperty("image_data")){
        brainReadsCurrent = JSON.parse(JSON.stringify(this.$store.state.brainMapFilter.filterableOptions.image_data.clinical_variables.filterable_output));
      }
    },
    onClickChild(Checked, Key, Value, refParentKeyReturned,arrIndex) {
     if(refParentKeyReturned == 'KPS'){
       this.selectedFilters[refParentKeyReturned][2]=Checked.toString();
       this.actualBrainReads.KPS.kpsOption[0].checked = Checked 
      } 
      
      if(refParentKeyReturned !== 'KPS'){
            this.actualBrainReads[refParentKeyReturned][arrIndex]['checked']=Checked;
      if(Checked){
          //add
          this.selectedFilters[refParentKeyReturned].push(Key); 

      }else{
      
          const index = this.selectedFilters[refParentKeyReturned].indexOf(Key);
          this.selectedFilters[refParentKeyReturned].splice(index, 1); 
           
      }
      }
    },
  
  },

  created(){
    this.formatData();
        
  }
};
</script>

<style>
.updateButtons{
  background: rgba(41, 41, 48, 0.5);
    height: 98vh;
}
 
.patientAmt{
display: flex; 
justify-content: end;
margin: 2%
}
.atomCheckbox{
  padding-left: 3%; padding-right: 3%
}
.histoSlider{
  display: flex; 
  flex-direction: row;
   /* margin: 2%;  */
   margin-left:5%;
   margin-right:5%;
   margin-bottom:2%;
   /* height:270px */
}

.collapsible {
  /* background-color: #777; */
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active,
.collapsible:hover {
  /* background-color: #555; */
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
.header_style {
  border-block: solid;
  background-color: rgba(41, 41, 48, 0.5);
}
.myfont {
  font-size: 12px;
  font-family: "Poppins";
  line-height: 18px;
  padding-top: 2px;
}

.accordion_content_key_value_pair {
 padding-top:5px;
 font-size: 14px;
  font-family: "Poppins";
  line-height: 25px;
  padding-bottom: 5px;
}

.updateFilter {
  margin-bottom: 5%;
  border: 1px solid #77acff;
  background: #77acff;
  padding: 5px;
  color:#fff;
}
.processingStatus{
  padding-top: 20px;
  margin-top: 1px; margin-left: 2%; color:red
}

.filterButton{
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 7%;
  background: rgba(41, 41, 48, 0.5);
}
.update {
  margin-bottom: 5%;
  background: #22292f;
  border: 1px solid #77acff;
  color: #77acff;
  padding: 5px;

  margin-right: 25%;
}

.reset{
  margin-bottom: 5%;
  background: #22292f;
  border: 1px solid #77acff;
  background: #77acff;
  padding: 5px;
  color: #fff;
}
</style>
