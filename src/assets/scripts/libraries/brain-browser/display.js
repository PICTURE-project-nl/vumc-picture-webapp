/* global BrainBrowser */
/* eslint-disable */

/**
 * @doc object
 * @name display
 * @description
 * Object representing the set of display panels.
 */

import { Sizes } from './sizes';
import { DetectionLoader } from './detection'; // Edit Greg

(function() {
  "use strict";

  BrainBrowser.VolumeViewer.createDisplay = function() {
    var panels = {};

    var original_panel_order = ['zspace', 'yspace', 'xspace'];
    var updated_panel_orders = {};

    // Circulate through the original panel order, to generate the panel orders for the individual panels.
    // Ensure that the panel order for an individual panel always sets itself as last
    for (var i = 0; i < original_panel_order.length; i++) {
      var subarr = [];
      for (var j = 0; j < 3; j++) {
        subarr.push(original_panel_order[(i+j) % original_panel_order.length]);
      }

      updated_panel_orders[ subarr[2] ] = subarr;
    }

    var display = {
      setActivePanel: function(active_axis, order_panels = false){
        if(order_panels === true){
          // Make new active slider bigger, and the old one smaller
          this.getActivePanel().setSize( Sizes.small, Sizes.small, {scale_image: true} );

          panels[ 'xspace' ].setSize( Sizes.small, Sizes.small, {scale_image: true} );
          panels[ 'yspace' ].setSize( Sizes.small, Sizes.small, {scale_image: true} );
          panels[ 'zspace' ].setSize( Sizes.small, Sizes.small, {scale_image: true} );

          panels[ active_axis ].setSize( Sizes.large, Sizes.large, {scale_image: true} );

          // Update active on panel container for apropiate styling
          try {
            let panel_order = this.getPanelOrder();

            if( panel_order.hasOwnProperty(active_axis) ){
              document.querySelectorAll('.overlay-viewer-display .panel').forEach((elem) => {
                elem.classList.remove('panel-active', 'panel-left', 'panel-right');
              });

              document.querySelector('.overlay-viewer-display .' + panel_order[active_axis][0]).classList.add('panel-left');
              document.querySelector('.overlay-viewer-display .' + panel_order[active_axis][1]).classList.add('panel-right');
              document.querySelector('.overlay-viewer-display .' + panel_order[active_axis][2]).classList.add('panel-active');
            }

          } catch (err){ }
        }

        if( original_panel_order.indexOf(active_axis) > -1 ) this.orderPanels(active_axis);
        return active_axis;
      },

      resizePanels: function() {
        panels['xspace'].setSize( Sizes.small, Sizes.small, {scale_image: true} )
        panels['yspace'].setSize( Sizes.small, Sizes.small, {scale_image: true} )
        panels['zspace'].setSize( Sizes.small, Sizes.small, {scale_image: true} )
        panels[ this.getActivePanel().axis ].setSize( Sizes.large, Sizes.large, {scale_image: true} );
      },

      resizePanelsSmall: function() {
        panels['xspace'].setSize( Sizes.small, Sizes.small, {scale_image: true} )
        panels['yspace'].setSize( Sizes.small, Sizes.small, {scale_image: true} )
        panels['zspace'].setSize( Sizes.small, Sizes.small, {scale_image: true} )
      },

      resizePanelsMedium: function () {
        panels['xspace'].setSize( Sizes.medium, Sizes.medium, {scale_image: true} )
        panels['yspace'].setSize( Sizes.medium, Sizes.medium, {scale_image: true} )
        panels['zspace'].setSize( Sizes.medium, Sizes.medium, {scale_image: true} )
      },

      // Return the active panel (last panel being rendered)
      getActivePanel: function(){
        var panel_keys = Object.keys(panels);
        return panels[ panel_keys[ panel_keys.length -1 ] ];
      },

      // Re order the panels, so the active panel is rendered last.
      orderPanels: function(active_axis){
        var panel_order = updated_panel_orders[ active_axis ];
        var updated_panels = {};

        // Select the panel order used for the active panel
        for(var i = 0; i < panel_order.length; i++){
          updated_panels[ panel_order[i] ] = panels[ panel_order[i] ];
        }

        // Override the panels object
        panels = updated_panels;
      },

      // Return the panel render order for all the panels
      getPanelOrder: function(){
        return updated_panel_orders;
      },

      /**
       * @doc function
       * @name display.display:setPanel
       * @param {string} axis_name The axis the panel is to be used for.
       * @param {object} panel The panel used to display the given axis.
       * @description
       * Set the panel for a given axis.
       * ```js
       * display.setPanel("xspace", panel);
       * ```
       */
      setPanel: function(axis_name, panel) {
        // Set the axis name as data attribute for reference
        panel.canvas.setAttribute('data-axis', axis_name);
        if (panels[axis_name]) {
          panels[axis_name].triggerEvent("eventmodelcleanup");
        }

        let detector = new DetectionLoader();

        // Limit the zoom on desktop, disable it on mobile
        if( !detector.is_mobile ){
          panel.canvas.addEventListener("mousewheel", (event) => this.limitZoom(panel, event), true);
          panel.canvas.addEventListener("DOMMouseScroll", (event) => this.limitZoom(panel, event), true);
        } else {
          panel.canvas.addEventListener("mousewheel", this.disableScroll, true);
          panel.canvas.addEventListener("DOMMouseScroll", this.disableScroll, true);
        }

        // Override the original draw function so it never sets an active panel
        // This ensures the red line around the panel never gets drawn
        // Also override the anchor in the panel when the draw function is being called on mobile, so the line doesn't get drawn
        let original_function = panel.draw;

        panel.old_cursor_position = { x: 0, y: 0 };
        panel.old_pointer_position = { x: 0, y: 0 };
        panel.old_zoom_level = 0;

        panel.draw = (cursor_color) => {
          if( detector.is_mobile ) panel.anchor = null;
          this.draw(panel, cursor_color, this);
        }

        // Override the function that let's users change the position of the volume
        panel.followPointer = (pointer) => this.followPointer(pointer, panel);

        panel.propagateEventTo("*", display);
        panels[axis_name] = panel;
      },

      draw: (panel, cursor_color, display_object) => {
        var cursor = panel.getCursorPosition();

        if (panel.old_cursor_position.x !== cursor.x || panel.old_cursor_position.y !== cursor.y) {
          panel.old_cursor_position.x = cursor.x;
          panel.old_cursor_position.y = cursor.y;

          panel.updated = true;
          panel.triggerEvent("cursorupdate", {
            volume: panel.volume,
            cursor: cursor
          });
        }

        if (panel.old_zoom_level !== panel.zoom) {
          panel.old_zoom_level = panel.zoom;

          panel.updated = true;
          panel.triggerEvent("zoom", {
            volume: panel.volume,
            zoom: panel.zoom
          });
        }

        if (panel.touches[0]) {
          panel.old_pointer_position.x = panel.touches[0].x;
          panel.old_pointer_position.y = panel.touches[0].y;
        } else {
          panel.old_pointer_position.x = panel.mouse.x;
          panel.old_pointer_position.y = panel.mouse.y;
        }

        if (!panel.updated) {
          return;
        }

        var canvas = panel.canvas;
        var context = panel.context;
        var frame_width = 4;
        var half_frame_width = frame_width / 2;

        context.globalAlpha = 255;
        context.clearRect(0, 0, canvas.width, canvas.height);

        display_object.drawSlice(panel);

        panel.triggerEvent("draw", {
          volume: panel.volume,
          cursor: cursor,
          canvas: canvas,
          context: context
        });

        display_object.drawCursor(panel, cursor_color);

        panel.updated = false;
      },

      followPointer: function(pointer, panel) {
        var dx = (pointer.x - panel.old_pointer_position.x);
        var dy = (pointer.y - panel.old_pointer_position.y);

        panel.translateImage(dx, dy);

        panel.old_pointer_position.x = pointer.x;
        panel.old_pointer_position.y = pointer.y;

        return {
          dx: dx,
          dy: dy
        };
      },

      drawSlice: (panel) => {
        var image = panel.slice_image;
        var origin;

        if (image) {
          origin = {
            x: panel.image_center.x - panel.slice_image.width / 2,
            y: panel.image_center.y - panel.slice_image.height / 2,
          };

          //   if(panel.axis === 'xspace'){
          //       origin.x = panel.canvas.width - origin.x;
          //   }
          // console.log(origin.x);
          //   console.log( BrainBrowser.VolumeViewer.utils, panel.canvas.width, panel.canvas.height);
          // //

          //   let image_data = BrainBrowser.VolumeViewer.utils.flipArray(image.data, image.width, image.height, { flipy: true });
          //   for(var i = 0; i < image_data.length; i++){
          //     image.data[i] = image_data[i];
          //   }
          // //   var imageData = canvas.getContext('2d').createImageData(width, height);
          //   console.log(image, image_data);
          //   image.data = image_data;
          // console.log(panel.slice, panel.slice_image, panel.volume.getSliceImage(
          //     BrainBrowser.VolumeViewer.utils.flipArray(image.data, panel.canvas.width, panel.canvas.height, { flipx: true, flipy: true }),
          //     panel.zoom, panel.contrast, panel.brightness
          // ));

          panel.context.putImageData(
            image,
            origin.x,
            origin.y
          );
        }
      },

      drawCursor: (panel, color) => {
        var context = panel.context;
        var cursor = panel.getCursorPosition();
        var zoom = panel.zoom;
        var length = 10 * (zoom / panel.default_zoom);
        var x, y, space, gapDistance;
        var distance;
        var dx, dy;
        color = color || "#FF0000";

        context.save();

        context.strokeStyle = color;
        context.fillStyle = color;

        space = 1;
        gapDistance = 4;
        x = panel.canvas.width - cursor.x;
        y = cursor.y;

        context.lineWidth = space * 2;
        context.beginPath();
        context.moveTo(x, y - length);
        context.lineTo(x, y - gapDistance);
        context.moveTo(x, y + gapDistance);
        context.lineTo(x, y + length);
        context.moveTo(x - length, y);
        context.lineTo(x - gapDistance, y);
        context.moveTo(x + gapDistance, y);
        context.lineTo(x + length, y);
        context.stroke();

        if (panel.anchor) {
          dx = (panel.anchor.x - cursor.x) / panel.zoom;
          dy = (panel.anchor.y - cursor.y) / panel.zoom;
          distance = Math.sqrt(dx * dx + dy * dy);

          context.font = "bold 12px arial";

          if (panel.canvas.width - cursor.x < 50) {
            context.textAlign = "right";
            x = cursor.x - length;
          } else {
            context.textAlign = "left";
            x = cursor.x + length;
          }

          if (cursor.y < 30) {
            context.textBaseline = "top";
            y = cursor.y + length;
          } else {
            context.textBaseline = "bottom";
            y = cursor.y - length;
          }

          context.fillText(distance.toFixed(2), x, y);

          context.lineWidth = 1;
          context.beginPath();
          context.arc(panel.anchor.x, panel.anchor.y, 2 * space, 0, 2 * Math.PI);
          context.fill();
          context.moveTo(panel.anchor.x, panel.anchor.y);
          context.lineTo(cursor.x, cursor.y);
          context.stroke();
        }

        context.restore();
      },

      // Call stopImmediatePropagation if the zoom goes outside the rage
      limitZoom: (panel, event) => {
        if( panel.zoom < 0.7 ){
          panel.zoom = 0.7;
          event.stopImmediatePropagation();
        }

        if( panel.zoom > 2.8 ){
          panel.zoom = 2.8;
          event.stopImmediatePropagation();
        }

        return false;
      },

      // Call stopImmediatePropagation to stop the following events, and thus disabling the scroll
      disableScroll: (event) => {
        event.stopImmediatePropagation();
        return false;
      },

      /**
       * @doc function
       * @name display.display:getPanel
       * @param {string} axis_name The axis for which to retrieve the panel.
       * @description
       * Retrieve the panel for the given axis.
       * ```js
       * display.getPanel("xspace");
       * ```
       */
      getPanel: function(axis_name) {
        return panels[axis_name];
      },

      /**
       * @doc function
       * @name display.display:refreshPanels
       * @description
       * Refresh slices on all panels.
       * ```js
       * display.refreshPanels();
       * ```
       */
      refreshPanels: function() {
        display.forEach(function(panel) {
          panel.updateSlice();
        });
      },

      /**
       * @doc function
       * @name display.display:setContrast
       * @param {number} contrast The contrast value.
       * @description
       * Set contrast for all panels in the display.
       * ```js
       * display.setContrast(1.5);
       * ```
       */
      setContrast: function(contrast) {
        display.forEach(function(panel) {
          panel.contrast = contrast;
        });
      },

      /**
       * @doc function
       * @name display.display:setBrightness
       * @param {number} brightness The brightness value.
       * @description
       * Set brightness for all panels in the display.
       * ```js
       * display.setBrightness(0.5);
       * ```
       */
      setBrightness: function(brightness) {
        display.forEach(function(panel) {
          panel.brightness = brightness;
        });
      },

      /**
       * @doc function
       * @name display.display:forEach
       * @param {function} callback Function called for each panel.
       * The panel itself, the axis name and index are passed as
       * arguments.
       * @description
       * Iterate over the current panels.
       * ```js
       * display.forEach(function(panel, axis_name) {
      *   // Do something...
      * });
       * ```
       */
      forEach: function(callback) {
        Object.keys(panels).forEach(function(axis_name, i) {
          callback(panels[axis_name], axis_name, i);
        });
      }
    };

    BrainBrowser.events.addEventModel(display);

    display.addEventListener("eventmodelcleanup", function() {
      display.forEach(function(panel) {
        panel.triggerEvent("eventmodelcleanup");
      });
    });

    return display;
  };

})();

/* eslint-enable */
