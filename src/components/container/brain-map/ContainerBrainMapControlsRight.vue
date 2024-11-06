<template>
 <div v-if="isStateReady">
    <OrganismBrainMapControlsRight
    :gsiRadsData = "getGsiRadsData"
    />
  </div>
</template>

<script>
  import { OrganismBrainMapControlsRight } from '@/components/presentational/organisms'
  export default {
    name: 'ContainerBrainMapControlsRight',
    components: {
      OrganismBrainMapControlsRight
    },
    data:function(){
      return{
        mygsiRadsData:[]
      }
    },
    computed:{
      getGsiRadsData :function(){
        return this.mygsiRadsData;
      },
     isStateReady:function()
     {
        let brainId = this.$route.params.id ? this.$route.params.id: this.$route.params.slug;
        const brainMaps =  this.$store.state.brainMaps.list;
        if (brainMaps.length > 0)
        {
              let brainMapList = JSON.parse(JSON.stringify(this.$store.state.brainMaps));

              let myArr = brainMapList.list;
              for (const list of myArr) {
                if (list.id == brainId) {
                  this.mygsiRadsData = list.gsiRads;
                break;
                }
              }
          return true;
        }else{
          return false;
        }
     }
    }
  }

</script>
