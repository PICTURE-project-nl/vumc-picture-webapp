<template>
  <WrapperPopup
    :isHidden="isHidden"
    title=""
    @close="closeDownload"
  >
    <OrganismDownloadBlock
      @downloadPDF="downloadPDF"
      @downloadZIP="downloadZIP"
    />
  </WrapperPopup>
</template>

<script>
  import { Download } from '@/assets/scripts/libraries/brain-browser/download'
  import { WrapperPopup } from '@/components/presentational/wrappers'
  import { OrganismDownloadBlock } from '@/components/presentational/organisms'

  export default {
    name: 'ContainerBrainMapDownload',
    components: {
      WrapperPopup,
      OrganismDownloadBlock
    },
    props: {
      isHidden: Boolean
    },
    data: function () {
      return {
        download: new Download()
      }
    },
    computed: {
      currentModel: function () {
        return this.$store.state.brainMapViewer.currentBrainMap
      }
    },
    methods: {
      closeDownload: function () {
        this.$emit('closeDownload')
      },
      downloadZIP: function () {
        try{
        let baseUrl = `${process.env.baseUrl}`;
        let brainId =this.$route.params.id ? this.$route.params.id: this.$route.params.slug;
        let downloadZipUrl = `${baseUrl}/storage/l/${brainId}.zip`
        window.open(downloadZipUrl);

        }catch(error){
          console.log(" Error downloading zip file");
        }

      },
      downloadPDF: function () {
        this.download.downloadPdf()
      }
    }
  }
</script>
