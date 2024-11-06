/* eslint-disable */

class CleanBrainBrowser {
	constructor() {
		const container = document.querySelector('#volume-viewer-displays')
		this.destroy(container)
	}
	destroy(container) {
	  if (!container) return

		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}
}
export { CleanBrainBrowser }

/* eslint-enable */
