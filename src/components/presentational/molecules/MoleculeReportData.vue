<template>

<div>
  <div>
    <AtomScrollBlock>
    <div>
    <Accordion>
       <div v-for="(level1, level1Index , index1) in  accordionData" :key="level1Index">
         <Accordion-item :cssClass="cssClass" :id="index1">
          <template slot="accordion-trigger" >
            <h4 class="myfont">{{ level1Index }}</h4>
          </template>
          <template slot="accordion-content">
          <div  style="margin:-8px">&nbsp</div>
            <div v-for="(level2, level2Index, index2) in level1" :key="level2Index" style="">
                   <div v-if="typeof level2 === 'object'" style="width:100%" >
                    <div v-if="index2 === 0"  style="margin:-21px">&nbsp</div>
                      <Accordion>
                        <Accordion-item :cssClass="cssClass_inner" :id="conCat(index1,index2)" >
                          <template slot="accordion-trigger" >
                             {{ level2.length}}
                              <h4 class="myfont_inner">{{ level2Index }}</h4>
                          </template>  
                          <template slot="accordion-content">
                             <table style="width:95%; margin-top:-1px; width:100%">
                                <div  style="margin:-10px">&nbsp</div>
                              <div v-for="(level3, level3Index,index3) in level2" :key="level3Index" class="myfont" 
                              :style="(index3 == 0)? 
                                      'border-top:1px solid gray;border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray; ;display:flex;flex-direction:row; margin-left:10px;margin-right:2px;':  
                                      'border-top:0px solid gray;border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;;display:flex;flex-direction:row; margin-left:10px;margin-right:2px;'"
                              >
                                  <div  style=" padding:5px;width: 75%; border-right:1px solid gray">{{level3Index}}</div>
                                  <div  style=" width: 25%; padding:5px;">{{level3}}</div>
                                </div>
                              <div  style="margin:-8px">&nbsp</div>
                            </table>
                          </template> 
                        </Accordion-item>
                      </Accordion>
                    </div>
                     <div v-else class="myfont" 
                     :style="(index2 == 0)? 
                      'border-top:1px solid gray;border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray; ;display:flex;flex-direction:row; margin-left:10px;margin-right:2px':  
                      'border-top:0px solid gray;border-bottom:1px solid gray;border-left:1px solid gray;border-right:1px solid gray;;display:flex;flex-direction:row; margin-left:10px;margin-right:2px'"
                     >
                        <div  style=" padding:5px;width: 75%; border-right:1px solid gray">{{level2Index}}</div>
                        <div  style=" width: 25%; padding:5px;">{{level2}}</div>
                    </div>
                   <div  v-if="(typeof level2 == 'string' )"> 
                    <div v-if="Object.keys(level1).length-1 == index2" style="margin:-8px"> &nbsp
                          </div>
                    </div>
            </div>
          </template>
         </Accordion-item>
        </div>
    </Accordion>
    </div>
    </AtomScrollBlock>
  </div>


  <!-- <div>
    <AtomScrollBlock>
    <div>
    <Accordion>
       <div v-for="(level1, level1Index , index1) in  accordionData" :key="level1Index">
         <Accordion-item :cssClass="cssClass" :id="index1">
          <template slot="accordion-trigger" class="header_style">
            <h4 class="myfont">{{ level1Index }}</h4>
          </template>
          <template slot="accordion-content">
            <div v-for="(level2, level2Index, index2) in level1" :key="level2Index" style="">
                   <div v-if="typeof level2 === 'object'" >
                      <Accordion>
                        <div>
                        <Accordion-item :cssClass="cssClass_inner" :id="conCat(index1,index2)">
                          <template slot="accordion-trigger" class="header_style_inner">
                              <h4 class="myfont_inner">{{ level2Index }}</h4>
                          </template>  
                          <template slot="accordion-content">
                            <table style="width:100%">
                             <div v-for="(level3, level3Index) in level2" :key="level3Index" class="myfont" style="padding-left:20px; padding-top:2px; padding-bottom:2px;">
                              <tr style=" display:flex; width:100%">
                                <td  style=" width: 80%;border: 1px solid gray;  border-collapse: collapse ;padding:3px">  {{ level3Index }} </td>
                                <td style="padding: 2px; width:20% ;border: 1px solid gray;  border-collapse: collapse ;padding:3px"> {{ level3 }} </td>
                              </tr> 
                              
                            </div> 
                            </table>
                          </template> 
                        </Accordion-item>
                        </div>
                      </Accordion>
                    </div>
                  
                    <div v-else class="myfont" style="margin-top:2px; margin-bottom:2px">
                       <tr style=" display:flex; width:100%; padding-left:10px;">
                                <td  style=" width: 80%;border: 1px solid gray;  border-collapse: collapse ;padding:3px">  {{ level2Index }} </td>
                                <td style="padding: 2px; width:20% ;border: 1px solid gray;  border-collapse: collapse ;padding:3px"> {{ level2 }} </td>
                      </tr>
                    
                    </div>
                  
              </div>
          </template>
         </Accordion-item>
        </div>
    </Accordion>
    </div>
    </AtomScrollBlock>
  </div> -->
  </div>
</template>
<script>
import AtomKeyValuePair from "./../atoms/AtomKeyValuePair.vue";
import Accordion from "../atoms/Accordion.vue";
import AccordionItem from "../atoms/AccordionItem.vue";
 
import AtomSlot from "../atoms/AtomSlot.vue";
import AtomScrollBlock from "../atoms/AtomScrollBlock.vue";
//import AtomCheckBoxWithValue from "../atoms/AtomCheckBoxWithValue.vue";
export default {
  name: "MoleculeReportData",
  components: {
    AtomKeyValuePair,
    AccordionItem,
    Accordion,
    AtomSlot,AtomScrollBlock
  },
  props:{
    accordionData :{
      type:Object,
      default:[]
    }
  },
  data: function () {
    return {
      uniqueId :0,
      cssClass:"display: flex; width: 100%;  padding-left:0px; background-color:#292930; margin-top:1px; margin-bottom: 2px",
      cssClass_inner:"display: flex;width: 100%; padding-left:10px; background-color:#292930 ;margin-top:1px; margin-bottom: 2px"
    };
  },
  computed:{
   
  },
  methods: {
     conCat(index1, index2){
      return parseInt((index1.toString() + index2.toString()), 10)
      
     
    },
    chooseElement(value) {},
    
  },
 
};
</script>

<style>
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
  overflow: scroll;
  
}
.header_style {
  border-block: solid;
  background-color: rgba(41, 41, 48, 0.5);
}

.header_style_inner {
  border-block: solid;
  margin-top: 1px;
 
}
.myfont {
  font-size: 12px;
  font-family: "Poppins";
  line-height: 18px;
  padding-top: 2px;
}

.accordion__content {
  /* background-color: rgb(71, 71, 71); */
}

.temp{
  background:rgb(172, 159, 159);
}

.myfont_inner{
  font-size: 12px;
  font-family: "Poppins";
  line-height: 18px; 
  padding-top: 2px;
  
}
</style>
