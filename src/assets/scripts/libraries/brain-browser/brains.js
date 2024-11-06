/* eslint-disable */

// import Router from '../../router/index' // Edit Greg

import { BRAIN_MAPS } from '@/config/brain-maps'

class Brains {
  static brain_settings = BRAIN_MAPS;

  getBrain = (slug) => Brains.brain_settings.find(brain_object => brain_object.slug === slug);
  getBrainSlug = (brain_object) => brain_object.name.toLowerCase().replace(new RegExp(' ', 'g'), '-');
  getBrains = () => Brains.brain_settings;

  getCurrentBrain = () => {
    return Brains.brain_settings[0] // Edit Greg

    /* // Edit Greg
    let params = Router.currentRoute.params
    return this.getBrain(params.brain_name)
    */
  }

  getBrainDownloadUrl = (brain_object) => {
    return `/brain-volumes/${brain_object.id}/${brain_object.zip}`
  }

  loseReference = (property) => JSON.parse(JSON.stringify(property));
}

export { Brains }

/* eslint-enable */
