/* eslint-disable */

let Sizes = {
  'small': 220,
	'medium' : 300,
  'large': 470,

	resetSizes: () => {
		Sizes.small = 220
		Sizes.medium = 300
		Sizes.large = 470
	},
  calculateSizes: function () {
    // Calculate the canvas size for the BrainBrowser viewer panels based on width of its container
    let containerWidth = document.querySelector('[data-id="brain-panel-width"]').offsetWidth
    const gridMargin = 24
    const maxWidth = 500 // if the canvas gets to big the rendering gets very slow, that is why there is a max width for the big size

    if (containerWidth > maxWidth) {
      containerWidth = maxWidth
    }

    Sizes.large = containerWidth
    Sizes.small = containerWidth / 2 - gridMargin / 2
  }
}

export { Sizes };

/* eslint-enable */
