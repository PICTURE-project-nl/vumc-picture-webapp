/* global BrainBrowser */
/* eslint-disable */

import Vue from 'vue';

import { DetectionLoader } from './detection';

class ShareLoader{

  static SHARE_OBJECT = {
    x: 0, y: 0, z: 0, i: 0, j: 0, k: 0,
    threshold_min: 0,
    threshold_max: 100,
    brain_default: true,
    brain_default_opacity: 50,
    brain_overlay: true,
    brain_overlay_opacity: 50,
    brain_overlay_brightness: 100,
    brain_overlay_contrast: 0
  }

  getShareUrl(){
    let overlay_volume = BrainBrowser.VolumeViewer.getOverlayVolume();
    let overlay_panel = overlay_volume.display.getPanel('yspace');
    let store_state = VolumeViewer.$store.state;
    let volume_coords = overlay_volume.getCurrentVolumeCoords();

    let share_object = this.getShareObject();

    share_object.x = volume_coords.x;
    share_object.y = volume_coords.y;
    share_object.z = volume_coords.z;
    share_object.i = volume_coords.i;
    share_object.j = volume_coords.j;
    share_object.k = volume_coords.k;

    share_object.threshold_min = store_state.threshold.valueMin;
    share_object.threshold_max = store_state.threshold.valueMax;

    share_object.brain_default = VolumeViewer.$store.state.LayersDefaultToggle;
    share_object.brain_default_opacity = store_state.LayersDefaultSliders[0].value;

    share_object.brain_overlay = VolumeViewer.$store.state.LayersScanToggle;
    share_object.brain_overlay_opacity = store_state.LayersScanSliders[0].value;
    // share_object.brain_overlay_brightness = store_state.LayersScanSliders[1].value;
    // share_object.brain_overlay_contrast = store_state.LayerScanContrastSliders[0].value;

    let current_route = VolumeViewer.$router.currentRoute;
    let detector = new DetectionLoader();

    let share_route = VolumeViewer.$router.matcher.match({
      name: 'share',
      params: {
        prefix: detector.getPrefix(),
        brain_id: current_route.params.brain_id,
        brain_name: current_route.params.brain_name
      },
      query: share_object
    });

    return Object.assign({ url: location.origin + '/#' + share_route.fullPath }, share_route );
  }

  getUrlParams(params_object){
    return '?' + Object.keys(params_object).map(function(param) {
      return encodeURIComponent(param) + '=' + encodeURIComponent(params_object[param]);
    }).join('&');
  }

  loadShareUrl(share_query){
    var share_object = this.fillOutShareObject(share_query);

    var volume = BrainBrowser.VolumeViewer.getOverlayVolume();
    var scan_volume = BrainBrowser.VolumeViewer.getScanVolume();

    var store_state = VolumeViewer.$store.state;
    var standard_sliders = store_state.LayersDefaultSliders;
    var overlay_sliders = store_state.LayersScanSliders;

    volume.setVolumeVoxelCoords(share_object.i, share_object.j, share_object.k);
    volume.setVolumeWorldCoords(share_object.x, share_object.y, share_object.z);

    // UI SETS THRESHOLD AUTOMATICALLY

    // Calculate the opacity values
    var default_opacity = (share_object.brain_default ? share_object.brain_default_opacity : 0);
    var overlay_opacity = (share_object.brain_overlay ? share_object.brain_overlay_opacity : 0);

    // Set the opacity values in the stor
    VolumeViewer.$store.commit('updateLayersDefault', ['opacity', default_opacity]);
    VolumeViewer.$store.commit('updateLayersScan', ['opacity', overlay_opacity]);

    // Get the UI elements for the opacity sliders
    let default_opacity_elem = document.querySelector('.menu-layers-default input[type="range"][data-name="Window"]');
    let scan_opacity_elem = document.querySelector('.menu-layers-overlay input[type="range"][data-name="Window"]');

    // Update the UI for the opacity sliders
    // Helpers.showProgressSlider(default_opacity, standard_sliders[0].min, standard_sliders[0].max, default_opacity_elem.nextElementSibling);
    // Helpers.showProgressSlider(overlay_opacity, overlay_sliders[0].min, overlay_sliders[0].max, scan_opacity_elem.nextElementSibling);

    if(share_object.brain_overlay){
      // var brightness_slider = store_state.LayersScanSliders[1];
      // volume.setVolumeBrightness( share_object.brain_overlay_brightness, brightness_slider.min, brightness_slider.max );
      // VolumeViewer.$store.commit('updateLayersScan', ['brightness', share_object.brain_overlay_brightness]);
      //
      // // Update UI for brightness
      // let brightness_elem = document.querySelector('.menu-layers-overlay input[type="range"][data-name="Brightness"]');
      // Helpers.showProgressSlider(share_object.brain_overlay_brightness, brightness_slider.min, brightness_slider.max, brightness_elem.nextElementSibling);
      //
      // var contrast_slider = store_state.LayerScanContrastSliders[0];
      // volume.setVolumeContrast( share_object.brain_overlay_contrast, contrast_slider.min, contrast_slider.max );
      // VolumeViewer.$store.commit('updateLayersScan', ['contrast', share_object.brain_overlay_contrast]);
    } else {
      VolumeViewer.$store.commit('LayersScanToggle', false);
    }

    if(!share_object.brain_default){
      VolumeViewer.$store.commit('LayersDefaultToggle', false);
    }
  }

  // Function to fill out missing parameters in the url with the default share object
  fillOutShareObject(share_query){
    for ( let [param_type, param_value] of Object.entries(ShareLoader.SHARE_OBJECT) ){
      if( !share_query.hasOwnProperty(param_type) || !share_query[param_type] ){
        share_query[param_type] = param_value;
      } else {
        share_query[param_type] = this.convertStringByType( share_query[param_type] );
      }
    }

    return share_query;
  }

  // Determine wether the string is a boolean or a number, and return the converted string
  convertStringByType = (string) => this.stringIsBoolean( string ) ? ( string === 'true' ) : Number( string );

  // Check if the string is a Boolean and return the value
  stringIsBoolean = (string) => string === 'true' || string === 'false';

  // Function that returns the original share_object and loses it's reference;
  getShareObject = () => JSON.parse( JSON.stringify(ShareLoader.SHARE_OBJECT) );

}

export { ShareLoader };

/* eslint-disable */
