/* eslint-disable */

class Colors{
  static default_color = 'spectral';
  static color_settings = [{
    name: "Spectral",
    url: "/color-maps/spectral-brainview-interpolated.txt",
    cursor_color: "#FFFFFF"
  },
  {
    name: "Thermal",
    url: "/color-maps/thermal.txt",
    cursor_color: "#FFFFFF"
  },
  {
    name: "Gray",
    url: "/color-maps/gray-scale.txt",
    cursor_color: "#FF0000"
  },
  {
    name: "Blue",
    url: "/color-maps/incidence-map-interpolated.txt",
    cursor_color: "#FFFFFF"
  },
  {
    name: "Green",
    url: "/color-maps/green.txt",
    cursor_color: "#FF0000"
  }];

  getColor(color){
    return Colors.color_settings.find(color_object => color_object.name.toLowerCase() === color.toLowerCase());
  }

  getDefaultColor(){
    return this.getColor(Colors.default_color);
  }

  mapColors(intensity_values, options, color_map){
    options = options || {};
    var min = options.min === undefined ? 0 : options.min;
    var max = options.max === undefined ? 255 : options.max;
    var default_colors = options.default_colors || [0, 0, 0, 1];
    var destination = options.destination || new Float32Array(intensity_values.length * 4);

    var color_map_colors = color_map.colors;
    var color_map_length = color_map.colors.length / 4;

    var scale = options.scale === undefined ? color_map.scale : options.scale;
    var clamp = options.clamp === undefined ? color_map.clamp : options.clamp;
    var flip = options.flip === undefined ? color_map.flip : options.flip;
    var brightness = options.brightness === undefined ? color_map.brightness : options.brightness;
    var contrast = options.contrast === undefined ? color_map.contrast : options.contrast;

    // This is used so that when the model color is used in a model
    // that was just given a single color to apply to the whole model,
    // the indexes will be set properly (i.e. from 0-4, not 0-no. of
    // vertices.)
    var default_color_offset = default_colors.length === 4 ? 0 : 1;
    var range = max - min;
    var increment = color_map_length / range;

    var value;
    var i, ic, idc, count;
    var color_map_index;

    brightness *= scale;
    contrast *= scale;

    //for each value, assign a color
    for (i = 0, count = intensity_values.length; i < count; i++) {
      value = intensity_values[i];
      ic = i * 4;

      color_map_index = this.getColorMapIndex(value, min, max, increment, clamp, flip, color_map_length);
      //This inserts the RGBA values (R,G,B,A) independently
      if(color_map_index < 0) {
        idc = ic * default_color_offset;

        // contrast includes scaling factor
        destination[ic]     = contrast * default_colors[idc]     + brightness;
        destination[ic + 1] = contrast * default_colors[idc + 1] + brightness;
        destination[ic + 2] = contrast * default_colors[idc + 2] + brightness;
        destination[ic + 3] = scale    * default_colors[idc + 3];
      } else {
        // contrast includes scaling factor
        destination[ic]     = contrast * color_map_colors[color_map_index]     + brightness;
        destination[ic + 1] = contrast * color_map_colors[color_map_index + 1] + brightness;
        destination[ic + 2] = contrast * color_map_colors[color_map_index + 2] + brightness;
        destination[ic + 3] = scale    * color_map_colors[color_map_index + 3];
      }
    }

    return destination;
  }

  getColorMapIndex(value, min, max, increment, clamp, flip, color_map_length) {
    var color_map_index;
    if ((value < min || value > max) && !clamp) {
      return -1;
    } else {
      if  (max - min === 0) {
        min = 0;
        max = 1;

        var range = max - min;
        increment = color_map_length / range;
      }

      color_map_index = Math.floor(Math.max(0, Math.min((value - min) * increment, color_map_length - 1)));
      if (flip) {
        color_map_index = color_map_length - 1 - color_map_index;
      }

      color_map_index *= 4;

      return color_map_index;
    }
  }
}

export { Colors };

/* eslint-enable */
