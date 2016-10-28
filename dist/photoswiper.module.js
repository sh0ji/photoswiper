'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Photoswiper (v1.1.0): photoswiper.js
 * by Evan Yamanishi
 * Licensed under GPL-3.0
 * --------------------------------------------------------------------------
 */

/* CONSTANTS */

var NAME = 'photoswiper';
var VERSION = '1.1.0';
var DATA_KEY = 'photoswiper';

var Default = {
    useBem: true
};

var Structure = {
    PSWP: '.pswp',
    GALLERY: 'figure',
    TITLE: 'figcaption',
    FIGURE: 'figure',
    LINK: 'a',
    THUMB: 'img',
    CAPTION: 'figcaption'
};

var Deps = {
    jQuery: window.jQuery !== undefined,
    PhotoSwipe: PhotoSwipe !== undefined,
    PhotoSwipeUIDefault: PhotoSwipeUI_Default !== undefined,
    tabtrap: window.tabtrap !== undefined
};

/* CLASS DEFINITION */

var Photoswiper = function () {
    function Photoswiper(selector, config) {
        _classCallCheck(this, Photoswiper);

        this.config = this._getConfig(selector, config);
        this.galleries = this._initGalleryObject(this.config.selector);
        this.structure = this._getStructure();
        this.hashData = this._parseHash();

        // find PhotoSwipe and the PhotoSwipe UI
        this.PhotoSwipe = Deps.PhotoSwipe ? PhotoSwipe : this.config.photoswipe ? this.config.photoswipe : require('PhotoSwipe');
        this.PhotoSwipeUI = Deps.PhotoSwipeUIDefault ? PhotoSwipeUI_Default : this.config.photoswipeUI ? this.config.photoswipeUI : require('PhotoSwipeUIDefault');

        if (this.hashData.pid && this.hashData.gid) {
            this.openPhotoSwipe(this.hashData.pid, this.galleries, true);
        }

        for (var i = 0; i < this.galleries.length; i++) {
            this._setupGallery(i);
        }
    }

    // getters

    _createClass(Photoswiper, [{
        key: 'enable',


        // public

        value: function enable() {
            this.enabled = true;
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.enabled = false;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.enabled = !this.enabled;
        }
    }, {
        key: 'openPhotoSwipe',
        value: function openPhotoSwipe(index, galleryEl, fromURL, triggerEl) {
            var pswpEl = document.querySelector(this.structure.PSWP);
            var i = this._getGalleryIndex(galleryEl);

            var items = this._getItems(galleryEl);
            this.galleries[i].items = items;

            var options = this._getOptions(galleryEl, items);
            this.galleries[i].options = options;

            options.index = parseInt(index, 10);

            if (fromURL) {
                options.showAnimationDuration = 0;
                options.index = this._urlIndex(index, items, options.galleryPIDs);
            }

            if (isNaN(options.index)) return;

            var pswp = new this.PhotoSwipe(pswpEl, this.PhotoSwipeUI, items, options);
            pswp.init();
            this._manageFocus(galleryEl, pswp, triggerEl);

            if (typeof this.config.onInit === 'function') {
                this.config.onInit.call(pswp);
            }
        }

        // private

    }, {
        key: '_getConfig',
        value: function _getConfig(selector, config) {
            var _config = {};
            if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
                _config = config;
            } else if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' && selector.nodeType === undefined) {
                _config = selector;
            } else if (typeof selector === 'string') {
                _config.selector = selector;
            }
            return Object.assign({}, this.constructor.Default, _config);
        }
    }, {
        key: '_initGalleryObject',
        value: function _initGalleryObject(selector) {
            return Array.from(this._getNodeList(this.config.selector)).map(function (gallery) {
                return {
                    element: gallery
                };
            });
        }
    }, {
        key: '_getNodeList',
        value: function _getNodeList(selector) {
            switch (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) {
                case 'string':
                    return document.querySelectorAll(selector);
                    break;
                case 'object':
                    return selector.nodeType === 1 ? selector : this._getNodeList(selector.selector);
                    break;
                default:
                    throw new Error('Must provide a selector or element');
            }
        }
    }, {
        key: '_getGalleryIndex',
        value: function _getGalleryIndex(galleryEl) {
            var i = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.galleries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var gallery = _step.value;

                    if (gallery.element === galleryEl) break;
                    i++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return i;
        }
    }, {
        key: '_getStructure',
        value: function _getStructure() {
            var bemSelectors = this.config.useBem ? this._bemSelectors(this.config.selector) : {};
            return Object.assign({}, Structure, bemSelectors, this.config.selectors);
        }
    }, {
        key: '_bemSelectors',
        value: function _bemSelectors(root) {
            return {
                GALLERY: '' + root,
                TITLE: root + '__title',
                FIGURE: root + '__figure',
                LINK: root + '__link',
                THUMB: root + '__thumbnail',
                CAPTION: root + '__caption'
            };
        }
    }, {
        key: '_parseHash',
        value: function _parseHash() {
            var hash = window.location.hash.substring(1);
            var params = {};

            if (hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        }
    }, {
        key: '_setupGallery',
        value: function _setupGallery(i) {
            var _this = this;

            this.galleries[i].element.setAttribute('data-pswp-uid', i + 1);
            this.galleries[i].element.addEventListener('click', function (e) {
                return _this._clickEvent(e);
            });
        }
    }, {
        key: '_clickEvent',
        value: function _clickEvent(e) {
            e = e || window.event;
            var clickTarget = e.target || e.srcElement;

            // only handle clicks on a>img pairs
            if (!this._validClick(clickTarget)) return;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var figure = clickTarget.closest(this.structure.FIGURE);
            var gallery = clickTarget.closest(this.structure.GALLERY);
            var figures = gallery.querySelectorAll(this.structure.FIGURE);
            var index = Array.from(figures).indexOf(figure);

            if (index >= 0) {
                this.openPhotoSwipe(index, gallery, false, clickTarget);
            }
        }

        // ensure that the click event happened on either of the two elements in a>img

    }, {
        key: '_validClick',
        value: function _validClick(targetEl) {
            return targetEl.nodeName === 'IMG' && targetEl.parentElement.nodeName === 'A' || targetEl.nodeName === 'A' && targetEl.querySelectorAll('img').length === 1;
        }
    }, {
        key: '_getItems',
        value: function _getItems(galleryEl) {
            var _this2 = this;

            var figures = galleryEl.querySelectorAll(this.structure.FIGURE);
            return Array.from(figures).map(function (figure) {
                var link = figure.querySelector(_this2.structure.LINK);
                var thumb = figure.querySelector(_this2.structure.THUMB);
                var cap = figure.querySelector(_this2.structure.CAPTION);
                var size = link.getAttribute('data-size').split('x');

                var item = {
                    el: figure,
                    h: parseInt(size[1], 10),
                    w: parseInt(size[0], 10),
                    src: link.getAttribute('href')
                };

                if (thumb) {
                    item.alt = thumb.getAttribute('alt'), item.msrc = thumb.getAttribute('src');
                }

                if (cap && cap.innerHTML.length > 0) {
                    item.title = cap.innerHTML;
                }
                return item;
            });
        }
    }, {
        key: '_getOptions',
        value: function _getOptions(galleryEl, items) {
            var thumbSelector = this.structure.THUMB;
            return Object.assign({}, this.config.pswpOptions, {
                galleryUID: galleryEl.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function getThumbBoundsFn(index) {
                    var thumb = items[index].el.querySelector(thumbSelector);
                    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                    var rect = thumb.getBoundingClientRect();

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                }
            });
        }
    }, {
        key: '_urlIndex',
        value: function _urlIndex(index, items, galleryPIDs) {
            if (galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var i = 0; i < items.length; i++) {
                    if (items[i].pid == index) {
                        return i;
                    }
                }
            } else {
                // in URL indexes start from 1
                return parseInt(index, 10) - 1;
            }
        }
    }, {
        key: '_manageFocus',
        value: function _manageFocus(galleryEl, pswp, triggerEl) {
            var _this3 = this;

            // trap focus in the pswp element (only happens when it's active)
            var tabtrap = Deps.tabtrap ? window.tabtrap : require('tabtrap');
            new tabtrap(this.structure.PSWP);

            // return focus to the correct element on close
            pswp.listen('close', function () {
                var current = pswp.getCurrentIndex();
                var currentFigure = galleryEl.querySelectorAll(_this3.structure.FIGURE)[current];

                if (galleryEl.contains(triggerEl) || !triggerEl) {
                    currentFigure.querySelector(_this3.structure.LINK).focus();
                } else {
                    triggerEl.focus();
                }
            });
        }

        // static

    }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
            var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : {};
            _config.selector = this.selector;

            var pswpr = new Photoswiper(_config);

            if (typeof config === 'string') {
                if (pswper[config] === undefined) {
                    throw new Error('No method named "' + config + '"');
                }
                pswper[config]();
            }
            return pswpr;
        }
    }, {
        key: 'NAME',
        get: function get() {
            return NAME;
        }
    }, {
        key: 'VERSION',
        get: function get() {
            return VERSION;
        }
    }, {
        key: 'DATA_KEY',
        get: function get() {
            return DATA_KEY;
        }
    }, {
        key: 'KEYCODE',
        get: function get() {
            return KEYCODE;
        }
    }, {
        key: 'Default',
        get: function get() {
            return Default;
        }
    }, {
        key: 'DefaultType',
        get: function get() {
            return DefaultType;
        }
    }, {
        key: 'Event',
        get: function get() {
            return Event;
        }
    }, {
        key: 'jQueryAvailable',
        get: function get() {
            return jQueryAvailable;
        }
    }]);

    return Photoswiper;
}();

/* JQUERY INTERFACE INITIALIZATION */

if (Deps.jQuery) {
    (function () {
        var JQUERY_NO_CONFLICT = jQuery.fn[NAME];
        jQuery.fn[NAME] = Photoswiper._jQueryInterface;
        jQuery.fn[NAME].Constructor = Photoswiper;
        jQuery.fn[NAME].noConflict = function () {
            jQuery.fn[NAME] = JQUERY_NO_CONFLICT;
            return Photoswiper._jQueryInterface;
        };
    })();
}

exports.default = Photoswiper;
