<template>
  <div>
    <div id="colorBarDiv"></div>
    <OrganismBrainLoader />
    <script id="volume-ui-template" type="x-volume-ui-template">
      <div class="volume-viewer-display"></div>
    </script>
    <script id="overlay-ui-template" type="x-volume-ui-template">
      <div class="overlay-viewer-display"></div>
    </script>
    <MoleculeMediaGrid>
      <section id="volume-viewer-displays"></section>
    </MoleculeMediaGrid>
  </div>
</template>

<script>
import { BrainBrowserLoader } from '@/assets/scripts/libraries/brain-browser/loader'
import { BRAIN_MAP_VIEWER_ACTION_TYPES } from '@/store/brain-map-viewer/action-types'
import { MoleculeMediaGrid } from '@/components/presentational/molecules'
import { OrganismBrainLoader } from '@/components/presentational/organisms'
import { pleaseDontGoMixins } from '@/mixins/pleaseDontGo'
import { brainMapsViewerMixins } from '@/store/brain-map-viewer/mixins'
import { shareBrainMapUrl } from '@/mixins/shareBrainMapUrl'
import { Sizes } from '@/assets/scripts/libraries/brain-browser/sizes'
import { browserResizeEvent } from '@/assets/scripts/utils/browser-resize-event'
import pako from 'pako'
import {AtomProgressBar} from '@/components/presentational/atoms'
import axios from "axios";
import {BRAIN_MAP_MANAGER_ROUTES} from "@/pages/brain-map-manager/routes";




export default {
  name: 'ContainerBrainMapPanels',
  components: {
    MoleculeMediaGrid,
    OrganismBrainLoader,
    AtomProgressBar
  },
  mixins: [
    brainMapsViewerMixins.info,
    brainMapsViewerMixins.controls,
    pleaseDontGoMixins,
    shareBrainMapUrl.set
  ],
  data:function(){
    return{
      isItResearchData : false,
      canvas: null
    }
  },
  props: {
    slug: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    processing:{
      type:Boolean,
      required:false
    }
  },
  computed: {
    coordinates: function () {
      return this.$store.state.brainMapViewer.coordinates
    },
    threshold: function () {
      return this.$store.state.brainMapViewer.threshold
    },
    brainDefaultToggle: function () {
      return this.$store.state.brainMapViewer.brainDefaultToggle
    },
    brainDefault: function () {
      return this.$store.state.brainMapViewer.brainDefault
    },
    colorOverlay: function () {
      return this.$store.state.brainMapViewer.colorOverlay
    },
    mainView: function () {
      return this.$store.state.brainMapViewer.mainView
    }
  },
  watch: {
    coordinates: {
      handler: function (value) {
        this.updateCoordinatesBrainBrowser(value)
      },
      deep: true
    },
    threshold: function (value) {
      try{
        if (!window.BrainBrowser.VolumeViewer.getScanVolume || !window.BrainBrowser.VolumeViewer.getScanVolume().setVolumeThreshold) return
        window.BrainBrowser.VolumeViewer.getScanVolume().setVolumeThreshold(value[0], value[1])
        this.updateColorBar(value[0], value[1])
      }catch(error){console.log(" Error from brain browser volume viewer");}
    },
    brainDefaultToggle: function () {
      // this.updateOpacityBrainBrowser()
      this.loadBrainBrowser()
    },
    brainDefault: function () {
      this.updateOpacityBrainBrowser()
    },
    colorOverlay: function () {
      this.updateOpacityBrainBrowser()
    },
    resolution: function () {
      this.loadBrainBrowser()
    },
    getCurrentBrainMapUrl: function () {
      if (this.getCurrentBrainMapUrl) {
        // this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_ALL_COORDINATES)
        // this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_ALL_FILTERS)
        // this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_MASKING)
        // this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_LAYERS)
        this.loadBrainBrowser()
      }
    },
    mainView: function (value) {
      this.switchMainView(value)
    }
  },
  created: function () {

    document.addEventListener('volume-viewer-coordinates-updated', this.setCoordinatesFromBrainBrowser)
    let myId= this.slug || this.id;
    if(myId.startsWith('research')){
      this.isItResearchData = true;
      //set current brain map data to research brain map data

      let currentMap = this.$store.state.researchBrainMaps.brainMaps.find((map) => {
        return map.id === myId;
      });

      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_RESEARCH_BRAIN_MAP,currentMap);

    }else{
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.GET_BRAIN_MAP_DATA, this.slug || this.id);
    }
  },



  mounted: function () {
    Sizes.calculateSizes()

    browserResizeEvent.init(function () {
      try{
        Sizes.calculateSizes()

        window.BrainBrowser.VolumeViewer.getOverlayVolume().display.resizePanels()
      }catch(error){
        console.log(" Error in brain browser Sizes() refresh page may solve this issue");

      }
    })

  },
  beforeDestroy: function () {
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.RESET_BRAIN_MAP_DATA)
      document.removeEventListener('volume-viewer-coordinates-updated', this.setCoordinatesFromBrainBrowser)
      browserResizeEvent.remove()
      /*
        This function seems to have an issue with clearing the memory:
        https://github.com/aces/brainbrowser/issues/338
        When the function is called the old unused memory does't get deleted
        so when a new viewer is loaded the memory usages keeps growing.
      */
      if (window.viewer) window.viewer.clearVolumes()

  },
  methods: {
    loadBrainBrowser: function () {
      if (window.viewer) {
        window.viewer.clearVolumes()
      }

      document.addEventListener('volume-viewer-displays-loaded', () => {
        this.flashUpdateCoordinates()
        // Get the div element
        let div = document.getElementById('colorBarDiv');
        while (div.hasChildNodes()) {
          div.removeChild(div.lastChild);
          }
        if (this.checkIfBrainBrowserIsLoaded()){
          let min_value = Math.max(window.BrainBrowser.VolumeViewer.getScanVolume().getVoxelMin(), 0)
          let max_value = Math.max(window.BrainBrowser.VolumeViewer.getScanVolume().getVoxelMax(), 1)
          this.canvas = window.BrainBrowser.VolumeViewer.getOverlayVolume().color_map.createElement(min_value,max_value)



          // Append the canvas to the div
          div.appendChild(this.canvas);
          window.BrainBrowser.VolumeViewer.getOverlayVolume().setVolumeOpacity(0.8,1)
        }
      })

      const brainBrowserLoader = new BrainBrowserLoader()
      try{
        let objectURL;
        let objectURL2;

        if (this.getCurrentBrainMapUrl.includes('.gz')) {
          axios.get(this.getCurrentBrainMapUrl, { responseType: 'arraybuffer', 'decompress': true }).then((response) => {

            var unzipData = pako.ungzip(response.data)
            objectURL = URL.createObjectURL(new Blob([unzipData]));

          }).catch((error) => {
            console.log(" error ",error);
          });
        } else {
          objectURL = this.getCurrentBrainMapUrl;
        }
        if (!this.brainDefaultToggle) {
          if (this.getCurrentBrainMap.lowResBrainMap.registeredAtlasT1cFileURL.includes('.gz')) {
            axios.get(this.getCurrentBrainMap.lowResBrainMap.registeredAtlasT1cFileURL, { responseType: 'arraybuffer', 'decompress': true }).then((response) => {
              //console.log(" response ",response);
              var test2 = pako.ungzip(response.data)
              objectURL2 = URL.createObjectURL(new Blob([test2]));
              console.log(" objectURL2 unzipped", objectURL2);


            }).catch((error) => {
              console.log(" error ", error);
            });
          } else {
            console.log(" objectURL2 url ", this.getCurrentBrainMap.lowResBrainMap.registeredAtlasT1cFileURL);
            objectURL2 = this.getCurrentBrainMap.lowResBrainMap.registeredAtlasT1cFileURL
          }
        }



        if (this.brainDefaultToggle) {
          console.log("brainBrowserLoader.init(objectURL) v2", objectURL)


          // Check if the url starts with localhost, if so add http:// to the url
          // TODO: fix path in API endpoint

          if (objectURL.includes('localhost')) {
            objectURL = 'http://' + objectURL
          }
          brainBrowserLoader.init(objectURL)
        }
        else {
          console.log("brainBrowserLoader.init(objectURL, objectURL2)", objectURL2)
          brainBrowserLoader.init(objectURL, objectURL2)
        }


        // Wait till all web assets are loaded in de DOM, then check if the brain browser (window.viewer.containers) is loaded correctly, if not it will refresh the page.
        // let checkIfBrainBrowserIsLoaded = setInterval(() => {
        //
        //   // Check if the browser is loaded
        //   if (document.readyState === 'complete') {
        //     if (window.viewer.containers.length < 2) {
        //       clearInterval(checkIfBrainBrowserIsLoaded)
        //     } else {
        //       window.location.reload()
        //     }
        //   }
        // }, 1000)



      } catch(e) {
        console.log(" Error from brainBrowserLoader.init ",e)
      }
    },
    updateColorBar: function (min_value,max_value) {
      // Check if the canvas exists
      if (this.canvas) {
        // Remove the old canvas from the div
        this.canvas.parentNode.removeChild(this.canvas);
        if (this.checkIfBrainBrowserIsLoaded()){
          // Create a new canvas element
          this.canvas = window.BrainBrowser.VolumeViewer.getOverlayVolume().color_map.createElement(min_value,max_value)

          // Get the div element
          let div = document.getElementById('colorBarDiv');

          // Append the canvas to the div
          div.appendChild(this.canvas);
        }
      }
    },

    flashUpdateCoordinates: function () {
      // To remove the extra box around the images we need to update the canvases at the start of a session
      this.setCoordinates({ name: 'sag', value: this.$store.state.brainMapViewer.coordinates.sag +1 })
      this.setCoordinates({ name: 'cor', value: this.$store.state.brainMapViewer.coordinates.cor +1 })
      this.setCoordinates({ name: 'axi', value: this.$store.state.brainMapViewer.coordinates.axi +1 })
      setTimeout(() => {
        this.setCoordinates({ name: 'sag', value: this.$store.state.brainMapViewer.coordinates.sag -1 })
        this.setCoordinates({ name: 'cor', value: this.$store.state.brainMapViewer.coordinates.cor -1 })
        this.setCoordinates({ name: 'axi', value: this.$store.state.brainMapViewer.coordinates.axi -1 })
      }, 500);
    },
    checkIfBrainBrowserIsLoaded: function () {
      return window.BrainBrowser.VolumeViewer.getOverlayVolume ? window.BrainBrowser.VolumeViewer.getOverlayVolume() : false
    },
    updateCoordinatesBrainBrowser: function (value) {
      if (!this.checkIfBrainBrowserIsLoaded() || this.$store.state.brainMapViewer.isEventFromBrainBrowser) return
      window.BrainBrowser.VolumeViewer.getOverlayVolume().setVolumeWorldCoords(value.sag, value.cor, value.axi)
    },
    updateOpacityBrainBrowser: function () {
      if (!this.checkIfBrainBrowserIsLoaded()) return
      if (!this.brainDefaultToggle) {
        window.BrainBrowser.VolumeViewer.getOverlayVolume().setVolumeOpacity(0.8,1) // manual override (0, this.colorOverlay / 100)
        return
      }
      window.BrainBrowser.VolumeViewer.getOverlayVolume().setVolumeOpacity(0.8,1) // manual override (this.brainDefault / 100, this.colorOverlay / 100)
    },
    setCoordinatesFromBrainBrowser: function (payload) {
      // It seems like the coordinates get returned with the wrong names from the BrainBrowser
      // TODO: This needs to be checked by the VU team if they are working correctly right now
      const brainBrowserCoordinates = {
        sag: payload.detail.coordinates.axi,
        cor: payload.detail.coordinates.cor,
        axi: payload.detail.coordinates.sag
      }
      // The BrainBrowser Library fires 1 event per canvas, so 3 total on each change. To minimize load on the application
      // we don't dispatch if there are no changes
      if (
        brainBrowserCoordinates.axi === this.$store.state.brainMapViewer.coordinates.axi &&
        brainBrowserCoordinates.cor === this.$store.state.brainMapViewer.coordinates.cor &&
        brainBrowserCoordinates.sag === this.$store.state.brainMapViewer.coordinates.sag
      ) return
      this.$store.dispatch(BRAIN_MAP_VIEWER_ACTION_TYPES.SET_COORDINATES, { coordinates: brainBrowserCoordinates, isEventFromBrainBrowser: true })
    },
    switchMainView: function (value) {
      let space = ''
      if (value === 'axi') { space = 'zspace' }
      if (value === 'cor') { space = 'yspace' }
      if (value === 'sag') { space = 'xspace' }
      window.BrainBrowser.VolumeViewer.getOverlayVolume().display.setActivePanel(space, true)
    }
  }
}
</script>
<style lang="scss" scoped>



</style>
