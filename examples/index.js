import Photoswiper from '../src/photoswiper';

const enableAll = (selector) => {
	const galleries = document.querySelectorAll(selector);
	const instances = Array.from(galleries).map((g, i) => new Photoswiper(g, {
		galleryUID: i + 1,
		onInit(figures) {
			figures.forEach((figure, j) => {
				figure.querySelector(this.selectors.LINK)
					.addEventListener('keydown', (e) => {
						if (e.key === 'o') {
							this.open(j);
						}
					});
			});
		},
		onOpen(pswp) {
			console.log(pswp);
		},
	}));
	return instances;
};

enableAll('.pswp-gallery');
