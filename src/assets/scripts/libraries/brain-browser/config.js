/* eslint-disable */

import { ViewerLoader } from './viewer';

class Volumes{
  static volume_settings = {
    volumes: [
      {
        type: "nifti1",
        nii_url: "/brain-volumes/1/standard.nii",
        template: {
          element_id: "volume-ui-template",
          viewer_insert_class: "volume-viewer-display"
        }
      },
      {
        type: 'nifti1',
        nii_url: "/brain-volumes/1/rpm.nii",
        template: {
          element_id: "volume-ui-template",
          viewer_insert_class: "volume-viewer-display"
        }
      }
    ],
    overlay: {
      template: {
        element_id: "overlay-ui-template",
        viewer_insert_class: "overlay-viewer-display"
      }
    }
  };

  getVolumes = (brainMapUrl, pt_brainUrl) => {
    let volumes = this.loseReference( Volumes.volume_settings );
    volumes.volumes[0].nii_url = pt_brainUrl
    volumes.volumes[1].nii_url = brainMapUrl
    volumes.complete = () => this.loadViewerLoader();

    return volumes;
  }

  loseReference = (reference) => JSON.parse(JSON.stringify(reference))
  loadViewerLoader = () => new ViewerLoader()
}

export { Volumes }

/* eslint-enable */
