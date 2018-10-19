/* --------------------------------------------------------------------------
 * Photoswiper (v2.0.7): photoswiper.js
 * by Evan Yamanishi
 * Licensed under GPL-3.0
 * -------------------------------------------------------------------------- */

import PhotoSwipe from 'photoswipe';
import tabtrap from 'tabtrap';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import merge from 'lodash.merge';
import * as util from './util';

/* CONSTANTS */

const NAME = 'photoswiper';
const VERSION = '2.0.7';
const DATA_KEY = 'photoswiper';

const Default = {
	onInit: () => {},
	onOpen: () => {},
	photoswipeUI: PhotoSwipeUIDefault,
	selectors: {
		PSWP: '.pswp',
		GALLERY: 'figure',
		TITLE: 'figcaption',
		FIGURE: 'figure',
		LINK: 'a',
		THUMB: 'img',
		CAPTION: 'figcaption',
	},
};

/* CLASS DEFINITION */
export default class Photoswiper {
	constructor(galleryElement, config) {
		this.galleryElement = galleryElement;
		if (config.structure && !config.selectors) {
			process.emitWarning(
				'The "structure" option has been renamed "selectors".\n'
				+ '"structure" will be removed in a future update.',
				'DeprecationWarning',
			);
			config.selectors = config.structure;	// eslint-disable-line
		}
		this.config = merge({}, Photoswiper.Default, config);

		if (util.isValidPswp(this.galleryElement)) {
			// bind handlers
			this.onClick = this.clickHandler.bind(this);

			// create the selectors
			const bemSelectors = (this.config.bemRoot) ? util.bemSelectors(this.config.bemRoot) : {};
			this.selectors = merge({}, this.config.selectors, bemSelectors);

			// collect figures and items
			const figures = this.galleryElement.querySelectorAll(this.selectors.FIGURE);
			this.figures = (figures.length) ? figures : [this.galleryElement];
			this.items = Array.from(this.figures).map(fig => this.parseFigure(fig));

			// add listeners to open on click
			this.figures.forEach((figure) => {
				figure.querySelector(this.selectors.LINK)
					.addEventListener('click', this.onClick);
			});

			this.enabled = true;

			if (typeof this.config.onInit === 'function') {
				this.config.onInit.call(this, this.figures);
			}
		} else {
			throw new Error('Gallery elements must contain a linked image (a[href]>img[src]).\n', this.galleryElement);
		}
	}


	// getters

	static get NAME() {
		return NAME;
	}

	static get VERSION() {
		return VERSION;
	}

	static get DATA_KEY() {
		return DATA_KEY;
	}

	static get Default() {
		return Default;
	}

	static get pid() {
		const pid = util.getUrlParam('pid');
		return (pid) ? parseInt(pid, 10) : undefined;
	}

	static get gid() {
		const gid = util.getUrlParam('gid');
		return (gid) ? parseInt(gid, 10) : undefined;
	}

	get pswpEl() {
		return document.querySelector(this.selectors.PSWP)
			|| new Error('Make sure to include the .pswp galleryElement on your page');
	}

	get pswpOptions() {
		const {
			bemRoot,
			onInit,
			onOpen,
			photoswipeUI,
			selectors,
			structure,
			...pswpOptions
		} = this.config;
		return merge({}, pswpOptions, {
			galleryUID: this.config.galleryUID || this.galleryElement.getAttribute('data-pswp-uid'),
			getThumbBoundsFn: (index) => {
				const thumb = this.items[index].el.querySelector(this.selectors.THUMB);
				const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				const rect = thumb.getBoundingClientRect();

				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width,
				};
			},
		});
	}


	// public

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	toggle() {
		this.enabled = !this.enabled;
	}

	open(index, triggerEl, fromUrl = false) {
		const opts = { index, ...this.pswpOptions };
		if (fromUrl) this.opts.showAnimationDuration = 0;

		this.pswp = new PhotoSwipe(
			this.pswpEl,
			this.config.photoswipeUI,
			this.items,
			opts,
		);

		if (this.enabled) {
			this.pswp.init();
			this.isOpen = true;

			if (typeof this.config.onOpen === 'function') {
				this.config.onOpen.call(this, this.pswp);
			}

			// trap focus in the pswp galleryElement when it's active
			new tabtrap(this.pswpEl);	// eslint-disable-line

			// manage the idle state on tab press
			let idleTimer = 0;
			this.pswpEl.addEventListener('keydown', (e) => {
				if (e.key === 'Tab') {
					this.pswp.ui.setIdle(false);
					clearTimeout(idleTimer);

					idleTimer = setTimeout(() => {
						this.pswp.ui.setIdle(true);
					}, this.pswp.options.timeToIdle);
				}
			});

			// return focus to the correct galleryElement on close
			this.pswp.listen('close', () => {
				const current = this.pswp.getCurrentIndex();

				if (this.galleryElement.contains(triggerEl) || !triggerEl) {
					this.figures[current].querySelector(this.selectors.LINK).focus();
				} else {
					triggerEl.focus();
				}
				this.isOpen = false;
			});
		}
		return this.pswp;
	}

	initListeners() {
		this.figures.forEach((figure) => {
			figure.querySelector(this.selectors.LINK)
				.addEventListener('click', this.onClick);
		});
	}

	clickHandler(e = window.event) {
		e.preventDefault();
		const clickTarget = e.target || e.srcElement;
		const clickFigure = clickTarget.closest(this.selectors.FIGURE)
			|| this.galleryElement;
		const index = Array.from(this.figures).indexOf(clickFigure);
		this.open(index, clickTarget);
	}

	parseFigure(figure) {
		const link = figure.querySelector(this.selectors.LINK);		// required
		const thumb = figure.querySelector(this.selectors.THUMB);	// required
		const cap = figure.querySelector(this.selectors.CAPTION);	// optional

		const size = link.getAttribute('data-size').split('x');

		const item = {
			el: figure,
			h: parseInt(size[1], 10),
			w: parseInt(size[0], 10),
			src: link.getAttribute('href') || link.getAttribute('data-href'),
		};

		if (thumb) {
			item.alt = thumb.getAttribute('alt');
			item.msrc = thumb.getAttribute('src');
		}

		if (cap && cap.innerHTML.length > 0) {
			item.title = cap.innerHTML;
		}
		return item;
	}
}
