/* eslint-disable */

// Load the BrainBrowser
import './browser-loader'
import { Volumes } from './config'
import { Colors } from './colors'
import { Sizes } from './sizes'
import { CleanBrainBrowser } from './cleaner'

class BrainBrowserLoader {
  static current_brain = undefined;
  static pt_brain = undefined;

  constructor () {
    // Load the Color maps
    BrainBrowser.config.set('color_maps', Colors.color_settings)

    // Cleans the brainbrowser if needed
    new CleanBrainBrowser()
  }

  init (url, url2="/brain-volumes/1/standard.nii") {
    window.viewer = BrainBrowser.VolumeViewer.start('volume-viewer-displays', (viewer) => {
      this.current_brain = url
      this.pt_brain = url2
      this.loadVolumes(viewer)
      this.loadCanvas(viewer)
    })
  }

  loadCanvas = (viewer) => {
    // Trigger a custom event when the volumes are loaded, so Vue knows when it can start loading components
    viewer.addEventListener('volumesloaded', () => {
      // wrap panel canvas elements in div's
      const display = BrainBrowser.VolumeViewer.getOverlayVolume().display
      const activeAxis = display.getActivePanel().axis
      const axisOrder = display.getPanelOrder()[activeAxis]
      const container = document.querySelector('.overlay-viewer-display')
      const children = container.children

      // Loop through the panels for the overlay
      display.forEach(function (panel) {
        if (panel.axis === activeAxis) {
          // Make the active panel bigger
          panel.setSize(Sizes.large, Sizes.large, {scale_image: true})
        } else {
          // Force rerender on the other panels, so all the values get properly set
          panel.updateSlice()
        }
      })

      // loop trough panels/canvases and wrap them in new div and add description
      for (let i = 0; i < axisOrder.length; i++) {
        for (let j = 0; j < children.length; j++) {
          if (children[j].dataset.axis === axisOrder[i]) {
            // create new HTML elements
            let wrapperDiv = document.createElement('div')
            let description = document.createElement('p')
            let axisName = children[j].dataset.axis.slice(0, 1).toUpperCase()
            if (axisName === 'X') {
              description.innerHTML = 'Sagittal'
            } else if (axisName === 'Y') {
              description.innerHTML = 'Coronal'
            } else if (axisName === 'Z') {
              description.innerHTML = 'Axial'
            }
            // Make sure the axis match the elements
            if (children[j].dataset.axis === activeAxis) {
              wrapperDiv.setAttribute('class', 'panel panel-active ' + children[j].dataset.axis)
            } else {
              wrapperDiv.setAttribute('class', 'panel ' + children[j].dataset.axis)
            }

            // append canvas and description to wrapper and DOM
            wrapperDiv.appendChild(children[j])
            wrapperDiv.appendChild(description)
            container.appendChild(wrapperDiv)
          }
        }
      }

      var event = new CustomEvent('volume-viewer-displays-loaded', {detail: viewer})
      document.dispatchEvent(event)
    })
  }

  loadVolumes (viewer) {
    var colors = new Colors()
    var default_color = colors.getDefaultColor()
    var colorObj = default_color

    if (this.current_brain.includes('binary')) {
      colorObj = colors.getColor('gray')
    } else if (this.current_brain.includes('probability_map')) {
      colorObj = colors.getColor('spectral')
    } else if (this.current_brain.includes('patients') || this.current_brain.includes('sum_tumors')) {
      colorObj = colors.getColor('blue')
    }

    viewer.loadDefaultColorMapFromURL(colorObj.url, colorObj.cursor_color)

    viewer.setDefaultPanelSize(Sizes.small, Sizes.small)
    viewer.render()

    var volumes = new Volumes()
    viewer.loadVolumes(volumes.getVolumes(this.current_brain, this.pt_brain))
  }
}

export { BrainBrowserLoader }

/* eslint-enable */
