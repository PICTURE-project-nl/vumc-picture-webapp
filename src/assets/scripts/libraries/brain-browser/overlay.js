/* eslint-disable */

class OverlayLoader{

  static SIZE = 256;
  static IMAGE_CONTEXT = false;

  constructor(){
    OverlayLoader.IMAGE_CONTEXT = document.createElement("canvas").getContext("2d");
  }

  getSliceImage(overlay_volume, slice, zoom, contrast, brightness) {
    zoom = zoom || 1;
    var slicey = slice;
    var slices = slice.slices;
    var images = [];
    var max_width = Math.round(OverlayLoader.SIZE * zoom);
    var max_height = max_width;

    // Stepping through the dimensions efficiently means we need
    // to keep stepping our voxel coordinates by the appropriate
    // amount relative to the world coordinate frame. We do this
    // by grabbing the appropriate column from the world-to-voxel
    // transform and scaling those values by the zoom factor.
    //
    function voxelStepForSpace(header, name, zoom) {
      var index = name.charCodeAt(0) - "x".charCodeAt(0);
      var temp = {
        xspace: header.w2v[0][index],
        yspace: header.w2v[1][index],
        zspace: header.w2v[2][index]
      };
      return {
        di: temp[header.order[0]] / zoom,
        dj: temp[header.order[1]] / zoom,
        dk: temp[header.order[2]] / zoom
      };
    }

    slices.forEach(function(slice, i) {
      var volume = overlay_volume.volumes[i];
      var color_map = volume.color_map;
      var intensity_min = volume.intensity_min;
      var intensity_max = volume.intensity_max;
      var error_message;

      if (!color_map) {
        error_message = "No color map set for this volume. Cannot render slice.";
        this.triggerEvent("error", { message: error_message });
        throw new Error(error_message);
      }

      var target_image = OverlayLoader.IMAGE_CONTEXT.createImageData(max_width, max_height);

      var min_col = -max_width / 2;
      var max_col = max_width / 2;
      var min_row = -max_height / 2;
      var max_row = max_height / 2;

      var header = volume.header;

      var time_offset = header.time ? volume.current_time * header.time.offset : 0;

      var axis_space = header[slice.axis];
      var width_space = axis_space.width_space;
      var height_space = axis_space.height_space;

      var i_offset = header[header.order[0]].offset;
      var j_offset = header[header.order[1]].offset;
      var k_offset = header[header.order[2]].offset;

      var i_size = header[header.order[0]].space_length;
      var j_size = header[header.order[1]].space_length;
      var k_size = header[header.order[2]].space_length;
      var data_length = max_width * max_height;

      // Calling the volume data's constructor guarantees that the
      // slice data buffer has the same type as the volume.
      //
      var slice_data = new volume.data.constructor(data_length);
      var data_index = 0;

      // We need to calculate the slice coordinate in world
      // space in order to properly align the volumes.
      //
      var w_origin = overlay_volume.getWorldCoords();
      w_origin[width_space.name[0]] = min_col / zoom;
      w_origin[height_space.name[0]] = max_row / zoom;

      var v_origin = volume.worldToVoxel(w_origin.x, w_origin.y, w_origin.z);

      // Get the appropriate values for stepping through
      // the width and height dimensions.
      //
      var col_step = voxelStepForSpace(header, width_space.name, zoom);
      var row_step = voxelStepForSpace(header, height_space.name, zoom);

      // Set the initial coordinate used in the loop.
      var row_coord = {
        i: v_origin.i,
        j: v_origin.j,
        k: v_origin.k
      };

      for (var c_row = max_row-1; c_row >= min_row; c_row--) {
        var coord = {
          i: row_coord.i,
          j: row_coord.j,
          k: row_coord.k
        };
        for (var c_col = min_col; c_col < max_col; c_col++) {
          if (coord.i < 0 || coord.i >= i_size ||
              coord.j < 0 || coord.j >= j_size ||
              coord.k < 0 || coord.k >= k_size) {
            slice_data[data_index] = NaN;
          }
          else {
            var volume_index = (time_offset +
                                Math.round(coord.i) * i_offset +
                                Math.round(coord.j) * j_offset +
                                Math.round(coord.k) * k_offset);
            if (data_index < data_length){}
              slice_data[data_index] = volume.data[volume_index];
          }
          data_index++;
          coord.i += col_step.di;
          coord.j += col_step.dj;
          coord.k += col_step.dk;
        }
        row_coord.i -= row_step.di;
        row_coord.j -= row_step.dj;
        row_coord.k -= row_step.dk;
      }

      if( typeof volume.volume_type !== 'undefined' && volume.volume_type === 'volume_standard' ){
        var slice_brightness = 0;
        var slice_contrast = 1;
      } else {
        var slice_brightness = brightness;
        var slice_contrast = contrast;
      }

    //   let fomatted_intensity_min = (volume.volume_type === 'volume_scan' ? intensity_min : intensity_min);
    //   let fomatted_intensity_max = (volume.volume_type === 'volume_scan' ? intensity_max : intensity_max);
    //   console.log(fomatted_intensity_min, fomatted_intensity_max, volume.volu);
      color_map.mapColors(slice_data, {
        min: intensity_min,
        max: intensity_max,
        contrast: slice_contrast,
        brightness: slice_brightness,
        destination: target_image.data,
        clamp: false,
        volume_type: volume.volume_type
      });

      images.push(target_image);
    });

    return this.blendImages(
      images,
      overlay_volume.blend_ratios,
      OverlayLoader.IMAGE_CONTEXT.createImageData(max_width, max_height)
    );
  }

  blendImages(images, blend_ratios, target) {
    var num_images = images.length;

    if (num_images === 1) {
      return images[0];
    }

    var target_data = target.data;
    var width = target.width;
    var height = target.height;
    var y, x;
    var i;
    var image, image_data, pixel, alpha, current;
    var row_offset;

    //This will be used to keep the position in each image of its next pixel
    var image_iter = new Uint32Array(images.length);
    var alphas = new Float32Array(blend_ratios);

    for (y = 0; y < height; y += 1) {
      row_offset = y * width;

      for (x = 0; x < width; x += 1) {
        pixel = (row_offset + x) * 4;
        alpha = 0;

        for (i = 0; i < num_images; i += 1) {
          image = images[i];

          if(y < image.height &&  x < image.width) {

            image_data = image.data;

            current = image_iter[i];
            if ((image_data[current]+image_data[current+1]+image_data[current+2])>0){

            
              //Red
              target_data[pixel] = image_data[current] * alphas[i];

              //Green
              target_data[pixel + 1] = image_data[current + 1] * alphas[i];

              //Blue
              target_data[pixel + 2] = image_data[current + 2] * alphas[i];

              target_data[pixel + 3] = 255;
              alpha += alphas[i];
            }
            image_iter[i] += 4;
          }

        }

      }
    }

    return target;

  }
}

export { OverlayLoader }

/* eslint-enable */
