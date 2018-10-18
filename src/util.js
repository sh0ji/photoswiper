export const parseArgs = (el, config) => {
	const args = {};
	switch (typeof el) {
	case 'string':
		// el was just a selector
		args.elements = document.querySelectorAll(el);
		break;
	case 'object':
		// already a NodeList
		if (el instanceof NodeList) {
			args.elements = el;
			// already an element
		} else if (el.nodeType === Node.ELEMENT_NODE) {
			// gently coerce into a NodeList
			el.setAttribute('nodeListCoercion');
			const newEls = document.querySelectorAll('[nodeListCoercion]');
			el.removeAttribute('nodeListCoercion');
			args.elements = newEls;
			// el is probably the config
		} else if (config === undefined) {
			args.elements = parseArgs(el.el).elements;
			args.config = el;
		}
		break;
	default:
		throw new Error('Initialize with .init(selector, config)');
	}
	if (typeof config === 'object' && args.config === undefined) {
		args.config = config;
	}
	return args;
};

/** a valid PhotoSwipe element contains at least one linked image (a>img) */
export const isValidPswp = element => Array.from(element.querySelectorAll('a'))
	.some(link => link.querySelectorAll('img').length === 1);

export const bemSelectors = block => ({
	GALLERY: `.${block}`,
	TITLE: `.${block}__title`,
	FIGURE: `.${block}__figure`,
	LINK: `.${block}__link`,
	THUMB: `.${block}__thumbnail`,
	CAPTION: `.${block}__caption`,
});

export const getUrlParam = (param) => {
	if (!window.location.hash) return undefined;
	const result = window.location.hash
		.substr(1)
		.split('&')
		.map(p => p.split('='))
		.find(p => p[0] === param);
	return (result) ? result[1] : result;
};
