/* global BrainBrowser */
/* eslint-disable */

/**
* @doc object
* @name viewer
* @description
* Extend the current viewer object
*/

// Load the overlayloader that holds the updated getSliceImage function for the overlay volume
import { OverlayLoader } from './overlay';
import { Colors } from './colors';

class ViewerLoader{
  constructor(){
    this.colors = new Colors();

    this.setVolumeGetters();
    this.setVolumeColors();
  }

  setVolumeGetters(){
    this.setVolumeIds();

    BrainBrowser.VolumeViewer.getStandardVolume = () => this.getVolumeByType('volume_standard');
    BrainBrowser.VolumeViewer.getScanVolume = () => this.getVolumeByType('volume_scan');
    BrainBrowser.VolumeViewer.getOverlayVolume = () => this.getVolumeByType('volume_overlay');
  }

  getVolumeByType(volume_type){
    return viewer.hasOwnProperty(volume_type) && viewer.volumes[ viewer[ volume_type ] ] ? viewer.volumes[ viewer[ volume_type ] ] : false;
  }

  setVolumeIds(){
    // Make the different viewers accesible by adding a reference to them in the main viewer object
    viewer.volumes.forEach( (volume, volume_id) => {
      var volume_type = (volume.type === 'overlay' ? 'volume_overlay' : (volume_id === 0 ? 'volume_standard' : 'volume_scan'));
      viewer[ volume_type ] = volume_id;
      volume.volume_type = volume_type;
      volume.volume_id = volume_id;

      this.setVolumeDefaultValues( volume );
      this.setVolumeFunctions( volume );
      this.registerVolumeUpdateListeners( volume );
    });
  }

  // Set the gray color map for the standard volume
  setVolumeColors(){
    var standard_volume = this.getVolumeByType('volume_standard');
    var gray_color_map = this.colors.getColor('gray');

    viewer.loadVolumeColorMapFromURL(standard_volume.volume_id, gray_color_map.url, gray_color_map.cursor_color);
  }

  // Set the min and max values for
  setVolumeDefaultValues(volume){
    var header = volume.header;
    var voxel_range = { min: volume.getVoxelMin(), max: volume.getVoxelMax() + 1 };

    var voxel_coords = volume.getVoxelCoords();
    var world_coords = volume.getWorldCoords();

    volume.coords = {
      i: Object.assign(voxel_range, { start: voxel_coords.i }),
      j: Object.assign(voxel_range, { start: voxel_coords.j }),
      k: Object.assign(voxel_range, { start: voxel_coords.k }),
      x: { min: header.xspace.start, max: (header.xspace.start + header.xspace.space_length), start: world_coords.x },
      y: { min: header.yspace.start, max: (header.yspace.start + header.yspace.space_length), start: world_coords.y },
      z: { min: header.zspace.start, max: (header.zspace.start + header.zspace.space_length), start: world_coords.z },
    }

    volume.intensity = {
      min: volume.intensity_min,
      max: volume.intensity_max
    }
  }

  setVolumeFunctions(volume){
    if( volume.volume_type === 'volume_overlay' ){
      // Functions meant for overlay volumes
      volume.setVolumeOpacity = (standard_opacity, scan_opacity) => this.setVolumeOpacity(volume, standard_opacity, scan_opacity);
      volume.setVolumeBrightness = (brightness, min, max) => this.setVolumeBrightness(volume, brightness, min, max);
      volume.setVolumeContrast = (contrast, min, max) => this.setVolumeContrast(volume, contrast, min, max);

      volume.getVolumeProbability = () => this.getVolumeProbability(volume);
      volume.getVolumePatientAmount = () => this.getVolumePatientAmount(volume);

      // Reset the overlay volume opacities to their original values, which are 0.5
      volume.resetVolumeOpacity = () => this.setVolumeOpacity(volume, 0.8, 1);

      // Override the getSliceImage function to enable setting contrast and brightness for the top layer only
      var overlay_loader = new OverlayLoader();
      volume.getSliceImage = (slice, zoom, contrast, brightness) => overlay_loader.getSliceImage(volume, slice, zoom, contrast, brightness);

      // Make calculateNewPosition accesible for everyone
      volume.calculateNewPosition = (position, min, max, original_min, original_max) => this.calculateNewPosition(position, min, max, original_min, original_max);
    } else {
      // Functions meant for standard volumes
      volume.setVolumeThreshold = (min, max) => this.setVolumeThreshold(volume, min, max);
      volume.resetVolumeThreshold = () => this.setVolumeThreshold(volume, 0, 1);

      volume.color_map.mapColors = (intensity_values, options) => this.colors.mapColors(intensity_values, options, volume.color_map);
    }

    // Functions for all the volumes
    volume.resetVolumeCoords = () => { this.resetVolumeCoords(volume); }
    volume.setActivePanel = (active_axis) => volume.display.setActivePanel(active_axis);
    volume.getCurrentVolumeCoords = () => this.getCurrentVolumeCoords(volume);

    volume.setVolumeVoxelCoords = (i, j, k) => this.setVolumeVoxelCoords(volume, i, j, k);
    volume.setVolumeWorldCoords = (x, y, z) => this.setVolumeWorldCoords(volume, x, y, z);
  }

  // Reset the volume to it's original state, and redraw the panels within the volume
  resetVolumeCoords(volume){
    ["xspace", "yspace", "zspace"].forEach( (axis) => {
      volume.position[axis] = Math.floor(volume.header[axis].space_length / 2);
    });

    this.updateVolume(volume);
  }

  // Set the the threshold for the volume, and redraw all the volumes
  // Only works with standard volumes
  setVolumeThreshold(volume, min, max){
    volume.intensity_min = min;
    volume.intensity_max = max;

    viewer.redrawVolumes();
    var volume_overlay = this.getVolumeByType('volume_overlay');

    return {
      min: min,
      max: max,
      intensity: volume_overlay.getVolumeProbability()
    }
  }

  // Set the blend/opacity ratio's the volume
  // Only works with overlay volumes
  setVolumeOpacity(volume, standard_opacity = false, scan_opacity = false){
    if( standard_opacity !== false && ( !isNaN(parseFloat(standard_opacity)) && isFinite(standard_opacity) ) ){
      volume.blend_ratios[0] = standard_opacity;
    }

    if( scan_opacity !== false && ( !isNaN(parseFloat(scan_opacity)) && isFinite(scan_opacity) ) ){
      volume.blend_ratios[1] = scan_opacity;
    }

    this.updateVolume(volume);
  }

  // Set the brightness of the upper overlay layer
  // Only works with overlay volumes
  setVolumeBrightness(volume, brightness, min = 0, max = 200){
    volume.display.setBrightness( this.calculateNewPosition(brightness, min, max, -1, 1) );
    volume.display.refreshPanels();
  }

  // Set the brightness of the upper overlay layer
  // Only works with overlay volumes
  setVolumeContrast(volume, contrast, min = -100, max = 100){
    volume.display.setContrast( this.calculateNewPosition(contrast, min, max, 0, 5) );
    volume.display.refreshPanels();
  }

  // Calculate the new brightness and contrast based on the input values
  calculateNewPosition(position, min, max, original_min, original_max){
    var original_steps = Math.abs(original_min - original_max);
    var position = (position - min) / (max - min);

    return original_min + (original_steps * position);
  }

  // Sync the scan volume position with the overlay position, and return the intensity value
  // Only works with overlay volumes
  getVolumeProbability(volume){
    var overlay_coords = volume.getWorldCoords();
    var volume_scan = this.getVolumeByType('volume_scan');

    var mirrored_x = -overlay_coords.x

    // Sync the scan volume with the overlay volume, redraw the panels and get the intensity of the updated scan volume.
    volume_scan.setWorldCoords(mirrored_x, overlay_coords.y, overlay_coords.z);
    this.updateVolume(volume_scan);
    var volume_intensity = volume_scan.getIntensityValue();

    if (volume_intensity < 0 || isNaN(volume_intensity)) {
      return -1
    }

    // Check if the intensity is a number, otherwise return 0. Always round numbers up to 2 numbers after the comma
    var rounded_intensity = ( !isNaN(parseFloat(volume_intensity)) && isFinite(volume_intensity) ) ? (Number.isInteger(volume_intensity) ? volume_intensity : parseFloat(volume_intensity.toFixed(2)) ) : 0;

    // Set to percentage
    var percentage = Math.round( this.calculateNewPosition( rounded_intensity, volume_scan.intensity_min, volume_scan.intensity_max, 0, 1 ) * 100 ) / 100;

    // Ignore the new calulation if it is not below zero
    if(percentage >= 0) percentage = rounded_intensity;

    // Make sure the percentage never exceeds 1 and drop below 0, also force two decimals after the comma
    return this.forceTwoDecimals( percentage > 1 ? 1 : (percentage < 0 ? 0 : percentage) );
  }

  getVolumePatientAmount(volume){

    var volume_scan = this.getVolumeByType('volume_scan');

    var volume_intensity = volume_scan.getIntensityValue();

    if (volume_intensity < 0 || isNaN(volume_intensity)) {
      return -1
    }

    return volume_intensity
  }

  forceTwoDecimals(number){
    return parseFloat(number).toFixed(2);
  }

  setVolumeVoxelCoords(volume, i, j, k){
    // Set the voxel coordinates and update the volume
    volume.setVoxelCoords(i, j, k);
    this.updateVolume(volume);

    // Return the newly calculated voxel cooordinates, and add the new probability to the return object
    var voxel_coords = volume.getVoxelCoords();
    voxel_coords['probability'] = this.getVolumeProbability(volume);
    voxel_coords['patientAmount'] = this.getVolumePatientAmount(volume);

    return voxel_coords;
  }

  setVolumeWorldCoords(volume, x, y, z){
    // Set the world coordinates and update the volume
    volume.setWorldCoords(x, y, z);

    this.updateVolume(volume);

    // Return the newly calculated world cooordinates, and add the new probability to the return object
    var world_coords = volume.getWorldCoords();
    world_coords['probability'] = this.getVolumeProbability(volume);
    world_coords['patientAmount'] = this.getVolumePatientAmount(volume);

    return world_coords;
  }

  // Return a combined object of the current voxel coords and the current world coords
  getCurrentVolumeCoords(volume){
    return Object.assign(volume.getVoxelCoords(), volume.getWorldCoords());
  }

  // Shortcode to update a volume by redrawing all the panels in a volume
  updateVolume(volume){
    volume.display.forEach( (panel) => panel.updateSlice() );
  }

  // Register the event listener for when the overlay is rerendered, so the rest of the application can also rerender
  registerVolumeUpdateListeners(volume){
    if(volume.volume_type === 'volume_overlay'){
      volume.display.forEach( (panel) => {
        panel.addEventListener('sliceupdate', (event) => {
          var updated_coords = Object.assign({
            'coordinates': {
              axi: this.getCurrentVolumeCoords(volume).x,
              cor: this.getCurrentVolumeCoords(volume).y,
              sag: this.getCurrentVolumeCoords(volume).z
            }
          }, {
            'probability': this.getVolumeProbability(volume),
            'patientAmount': this.getVolumePatientAmount(volume)
          });
          var event = new CustomEvent('volume-viewer-coordinates-updated', { detail: updated_coords });

          document.dispatchEvent(event);
        });

      });
    }
  }

}

export { ViewerLoader }

/* eslint-enable */
