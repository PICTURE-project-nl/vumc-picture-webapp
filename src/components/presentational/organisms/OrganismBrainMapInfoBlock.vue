<template>
<div>
<div class="u-margin-top">
    <div class="o-grid__cell u-1/2 brain-info-container__item">
            <AtomTextBody>
              <strong>{{  "Name :" }}</strong>
            </AtomTextBody>
            <AtomTextBody color="ghost" class="u-margin-top-tiny">
              {{ getName }}
            </AtomTextBody>
          </div></div>
<div class="u-margin-top">
          <div class="o-grid__cell u-1/2 brain-info-container__item">
            <AtomTextBody>
              <strong>{{ content.upload }}</strong>
            </AtomTextBody>
            <AtomTextBody color="ghost" class="u-margin-top-tiny">
              {{ getDate }}
            </AtomTextBody>
          </div>
</div>
<div class="u-margin-top">
          <div class="o-grid__cell u-1/2 brain-info-container__item">
            <AtomTextBody>
              <strong>{{  "Notes : " }}</strong>
            </AtomTextBody>
            <AtomTextBody color="ghost" class="u-margin-top-tiny">
              {{ getNotes }}
            </AtomTextBody>
          </div>

</div>
          <div class="u-margin-top"><div class="o-grid__cell u-1/2 brain-info-container__item">
            <AtomTextBody>
              <strong>{{  "MRI Date : " }}</strong>
            </AtomTextBody>
            <AtomTextBody color="ghost" class="u-margin-top-tiny">
              {{ getMriDate }}
            </AtomTextBody>
          </div></div>
  </div>
</template>

<script>
 import moment from 'moment'
  import { AtomButton, AtomIcon , AtomTextBody, AtomMedia } from '@/components/presentational/atoms'
  import OrganismDividedBox from '@/components/presentational/organisms/OrganismDividedBox'
  import { MoleculeRichTextCard } from '@/components/presentational/molecules'
  import { staticContent } from '@/data/static-content'
  import { brainMapsMixins } from '@/store/brain-maps/mixins'
  export default {
    name: 'OrganismBrainMapInfoBlock',
    components: {
      OrganismDividedBox,
      MoleculeRichTextCard,
      AtomButton,
      AtomTextBody,
      AtomIcon,
      AtomMedia
    },
     mixins: [
      brainMapsMixins
    ],
    props: {
      brainMapInfo: {
        type: Object
      }
    },
    data: function () {
      return {
        content: {
          ...staticContent.brainMapMRIInfo
        }
      }
    },
   
    computed:{
      getNotes:function(){
       if(!this.brainMapInfo)
        return ""
       else return this.brainMapInfo.brainMapNotes;
      },
      getName:function(){
       if(!this.brainMapInfo)
        return ""
       else return  this.brainMapInfo.brainMapName;
      },
      getDate: function(){
         if(!this.brainMapInfo)
        return ""
       else return moment(this.brainMapInfo.uploadDate.date).format('YYYY-MM-DD HH:mm:ss')
      },
      getMriDate:function(){
        if(!this.brainMapInfo)
        return ""
       else return this.brainMapInfo.mriDate;
      }
    },
    methods: {
      downloadPDF: function () {
        this.$emit('downloadPDF')
      },
      downloadZIP: function () {
        this.$emit('downloadZIP')
      }
    }
  }
</script>

<style lang="scss" scoped>
.popup_download{
  height:50%
}
</style>
