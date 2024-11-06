<template>
  <div class="graph">

    <div class="parent">

      <VueApexCharts
        ref="chartRef"
        class="graphStyle"
        type="histogram"
        :options="chartOptions"
        :height="height"
        :series="[seriesData]">
      </VueApexCharts>
       <AtomFormInputSlider
          ref="mySliderRef"
          class="slider"
          name="threshold"
          :minValue="sliderRange[0]"
          :maxValue="sliderRange[1]"
          :rangeValue="sliderRange"
          :interval="1"
          :tooltip="'active'"
          :tooltip-placement="['top', 'top']"
          @change="myRange"

       />

    </div>
  </div>
</template>
<script>
import { AtomFormInputSlider ,AtomButton,AtomRangeSlider} from "@/components/presentational/atoms";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "MoleculeHistogramSlider",
  components: { AtomFormInputSlider,VueApexCharts, AtomButton,AtomRangeSlider },
  props: {
    binSize:{type:Number,default:0},
    sliderRange:{
      type:[Array],required:true
    },
    sliderData:{type:[ Array, Object],required:false},
    seriesData:{type:[ Array,Object], required: true },
    categories:{type:[ Array,Object], required: true},
    min: {type: Number, default: 0 },
    max: { type: Number, default: 100,  },
    refParentKey:{type:String, default:''},

  },

  created:function(){

  },

  methods: {

    resetAllCalledFrom(){

      this.$refs.mySliderRef.resetSliderValue();
    },
    resetRange:function(){

        this.$refs.mySliderRef.resetSliderValue();
    },
    myRange: function (val) {
      this.m1 = this.findRangeInerval(val.value[0]);
      this.m2 = this.findRangeInerval(val.value[1]);
      this.$emit('histoChange',this.refParentKey,val.value[0],val.value[1]);

      this.rerenderChart(this.m1, this.m2);
    },
    findRangeInerval(num) {
      let binValue = this.binSize;
      // this will find nearest bin value
      var q = Math.floor(num / binValue);
      var r = num % binValue;
      if (r == 0) {
        q = q-1;
      }
      if(q < binValue){
        q = q-1;
      }
      return q;
    },

    rerenderChart: function (minDpi, maxDpi){
      try{
         var newOptions =  {colors: [
            function ({ dataPointIndex }) {
              if ((dataPointIndex <= maxDpi) & (dataPointIndex > minDpi)) {
                return "#77ACFF";
              } else {
                return "rgba(119, 172, 255, 0.15)";
              }
            },
          ]}

          if(this.$refs){
                this.$refs.chartRef.updateOptions(newOptions);
          }

       }catch(e){ console.log("error in rendering apex chart ",e);}
      },
  },
  data:function(){
    try{

    return{
      height:'70%',
      series: [
        {
          name: "series",
        },
      ],
      chartOptions: {
        chart: {id: "vuechart-example", toolbar: {show: false}},
        colors:"#77ACFF",
        dataLabels: {enabled: false},
        tooltip:{
            enabled:true,
            theme:'dark',
            style: {
                  fontSize: '7px',
                  background:'#000',
                  fontFamily: undefined
                },
            x:{
               formatter: undefined,
              title: {formatter: () => "age"}
              },
            y:{
              formatter: undefined,
              title: {formatter: () => "total"}
              },
              fillSeriesColor: false,
        },
        grid:{
          borderColor:'#51525C',
          show:true,
          yaxis: {
            lines:
             {
              show: true,
              colors:['#F44336', '#E91E63', '#9C27B0']
              }
            }
          },
        xaxis:{
          labels:{show:false},
          categories: this.categories,

          },
        states: {
          active: { filter:{type:'none'}} }
      },
    }
    }catch(e){console.log(" Error getting data for apex chart ",e);}
  },

};
</script>
<style lang="scss" scoped>
.reset{
     background-color:$color-input;
     background: none!important;
    color: #77ACFF;
    padding-top: 0px;
    cursor:pointer;
    font-size:12px;

}
.graphStyle {
  width: 100%;
}

.rangeStyle {
  width: 90% !important;
  padding-left: 5% !important;
  padding-right: 5% !important;
}

.parent {
  display: flex;
  flex-direction: column;
}

.apexcharts-tooltip {
    background: #f3f3f3;
    color: orange;
  }

 .slider{
    position: relative;
    width: 86%;
    left: 12%;
    padding:0 3px !important;
    // bottom: 25px;
  }

.graph{
  width:100%; padding-right:2%; font-family: "Poppins";
}
.patientAmt{
  font-size: 12px;
display: flex;
flex-direction: row;
margin: 2%
}
</style>
