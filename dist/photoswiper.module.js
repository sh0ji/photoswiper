'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * --------------------------------------------------------------------------
                                                                                                                                                                                                                                                                               * Photoswiper (v2.0.1): photoswiper.js
                                                                                                                                                                                                                                                                               * by Evan Yamanishi
                                                                                                                                                                                                                                                                               * Licensed under GPL-3.0
                                                                                                                                                                                                                                                                               * --------------------------------------------------------------------------
                                                                                                                                                                                                                                                                               */

var _photoswipe = require('photoswipe');

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _PhotoSwipeUIDefault = require('PhotoSwipeUIDefault');

var _PhotoSwipeUIDefault2 = _interopRequireDefault(_PhotoSwipeUIDefault);

var _tabtrap = require('tabtrap');

var _tabtrap2 = _interopRequireDefault(_tabtrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* CONSTANTS */

var NAME = 'photoswiper';
var VERSION = '2.0.1';
var DATA_KEY = 'photoswiper';

var Default = {
    bemRoot: null,
    el: null,
    onInit: null,
    photoswipeUI: _PhotoSwipeUIDefault2.default,
    structure: {
        PSWP: '.pswp',
        GALLERY: 'figure',
        TITLE: 'figcaption',
        FIGURE: 'figure',
        LINK: 'a',
        THUMB: 'img',
        CAPTION: 'figcaption'
    }
};

var parseArgs = function parseArgs(el, config) {
    var args = {};
    switch (typeof el === 'undefined' ? 'undefined' : _typeof(el)) {
        case 'string':
            // el was just a selector
            args.elements = document.querySelectorAll(el);
            break;
        case 'object':
            // already a NodeList
            if (NodeList.prototype.isPrototypeOf(el)) {
                args.elements = el;
                // already an element
            } else if (el.nodeType === 1) {
                // gently coerce into a NodeList
                el.setAttribute('nodeListCoercion');
                var newEls = document.querySelectorAll('[nodeListCoercion]');
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
    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && args.config === undefined) {
        args.config = config;
    }
    return args;
};

var _isValidPswp = function _isValidPswp(element) {
    var links = element.querySelectorAll('a');
    // links exists
    if (links.length > 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var link = _step.value;

                // and one of them has exactly one image inside it
                if (link.querySelectorAll('img').length === 1) return true;
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
    }
    return false;
};

/* CLASS DEFINITION */

var Photoswiper = function () {
    function Photoswiper(element, config) {
        _classCallCheck(this, Photoswiper);

        this.element = element;
        this.config = this._getConfig(config);
        this.structure = this._getStructure();
        this.pswpOptions = this._getPswpOptions();

        if (element && _isValidPswp(element)) {
            this.enabled = true;

            // handle history parameters (#&gid=1&pid=1)
            var windowHash = window.location.hash.substring(1);
            var hashData = this._parseHash(windowHash);
            if (hashData.pid && hashData.gid) {
                this._openPhotoSwipe(hashData.pid, this.element, true);
            }

            this._initListeners();
        } else {
            console.warn('Gallery figures must contain an anchor > image pair (a[href]>img[src]).\n', element);
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

        // private

    }, {
        key: '_getConfig',
        value: function _getConfig(config) {
            return Object.assign({}, Default, config);
        }
    }, {
        key: '_getStructure',
        value: function _getStructure() {
            var bemSelectors = this.config.bemRoot ? this._bemSelectors(this.config.bemRoot) : {};
            return Object.assign({}, this.config.structure, bemSelectors);
        }
    }, {
        key: '_bemSelectors',
        value: function _bemSelectors(block) {
            return {
                GALLERY: '.' + block,
                TITLE: '.' + block + '__title',
                FIGURE: '.' + block + '__figure',
                LINK: '.' + block + '__link',
                THUMB: '.' + block + '__thumbnail',
                CAPTION: '.' + block + '__caption'
            };
        }
    }, {
        key: '_parseHash',
        value: function _parseHash(hash) {
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
        key: '_getPswpOptions',
        value: function _getPswpOptions() {
            var opts = {};
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(this.config)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var opt = _step2.value;

                    if (Default[opt] === undefined) {
                        opts[opt] = this.config[opt];
                        delete this.config[opt];
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return opts;
        }
    }, {
        key: '_initListeners',
        value: function _initListeners() {
            var _this = this;

            this.element.addEventListener('click', function (e) {
                return _this._clickEvent(e);
            });
            var pageAnchors = document.querySelectorAll('a[href^="#"]');
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = pageAnchors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var anchor = _step3.value;

                    anchor.addEventListener('click', function (e) {
                        return _this._clickEvent(e);
                    });
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: '_clickEvent',
        value: function _clickEvent(e) {
            e = e || window.event;
            var clickTarget = e.target || e.srcElement;

            var ref = clickTarget.getAttribute('href');
            if (ref) {
                var hashData = this._parseHash(ref.split('#')[1]);
                if (hashData.pid && hashData.gid) {
                    this._openPhotoSwipe(hashData.pid, this.element, false, clickTarget);
                    return;
                }
            }

            if (!this._validClick(clickTarget) || !this.enabled) return;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var figure = clickTarget.closest(this.structure.FIGURE) || this.element;
            var index = null;

            if (figure === this.element) {
                index = 0;
            } else {
                var figures = this.element.querySelectorAll(this.structure.FIGURE);
                index = Array.from(figures).indexOf(figure);
            }

            if (index >= 0) {
                this._openPhotoSwipe(index, this.element, false, clickTarget);
            }
        }

        // ensure that the click event happened on either of the two elements in a[href]>img[src] relationship

    }, {
        key: '_validClick',
        value: function _validClick(targetEl) {
            return targetEl.nodeName == 'img' && targetEl.parentElement.nodeName == 'a' || targetEl.nodeName == 'a' && targetEl.querySelectorAll('img').length === 1;
        }
    }, {
        key: '_openPhotoSwipe',
        value: function _openPhotoSwipe(index, galleryEl, fromURL, triggerEl) {
            if (!_isValidPswp(galleryEl)) return;
            var pswpEl = document.querySelector(this.structure.PSWP);
            if (!pswpEl) {
                throw new Error('Make sure to include the .pswp element on your page');
            }

            this.items = this._getItems(galleryEl);
            this.options = this._getOptions(galleryEl);

            this.options.index = parseInt(index, 10);

            if (fromURL) {
                this.options.showAnimationDuration = 0;
                this.options.index = this._urlIndex(index);
            }

            if (isNaN(this.options.index)) return;

            var pswp = new _photoswipe2.default(pswpEl, this.config.photoswipeUI, this.items, this.options);
            if (this.enabled) pswp.init();

            this._manageFocus(pswp, triggerEl, pswpEl);

            if (typeof this.config.onInit === 'function') {
                this.config.onInit.call(pswp, pswp);
            }
        }
    }, {
        key: '_getItems',
        value: function _getItems(galleryEl) {
            var _this2 = this;

            var figures = galleryEl.querySelectorAll(this.structure.FIGURE);
            if (figures.length > 0) {
                return Array.from(figures).map(function (figure) {
                    return _this2._getItem(figure);
                });
            } else {
                return [this._getItem(galleryEl)];
            }
        }
    }, {
        key: '_getItem',
        value: function _getItem(figure) {
            // required elements
            var link = figure.querySelector(this.structure.LINK);
            var thumb = figure.querySelector(this.structure.THUMB);

            // optional caption
            var cap = figure.querySelector(this.structure.CAPTION);
            var size = link.getAttribute('data-size').split('x');

            var item = {
                el: figure,
                h: parseInt(size[1], 10),
                w: parseInt(size[0], 10),
                src: link.getAttribute('href')
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
    }, {
        key: '_getOptions',
        value: function _getOptions(galleryEl) {
            var _this3 = this;

            var thumbSelector = this.structure.THUMB;
            return Object.assign({}, this.pswpOptions, {
                galleryUID: galleryEl.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function getThumbBoundsFn(index) {
                    var thumb = _this3.items[index].el.querySelector(thumbSelector);
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

        // a few helpers for keyboard accessibility

    }, {
        key: '_manageFocus',
        value: function _manageFocus(pswp, triggerEl, pswpEl) {
            var _this4 = this;

            // trap focus in the pswp element when it's active
            new _tabtrap2.default(pswpEl);

            // manage the idle state on tab press
            var _idleTimer = 0;
            pswpEl.addEventListener('keydown', function (e) {
                var keyCode = e.which || e.keyCode || 0;
                if (keyCode === 9) {
                    pswp.ui.setIdle(false);
                    clearTimeout(_idleTimer);

                    _idleTimer = setTimeout(function () {
                        pswp.ui.setIdle(true);
                    }, pswp.options.timeToIdle);
                }
            });

            // return focus to the correct element on close
            pswp.listen('close', function () {
                var current = pswp.getCurrentIndex();
                var currentFigure = _this4.element.querySelectorAll(_this4.structure.FIGURE)[current] || _this4.element;

                if (_this4.element.contains(triggerEl) || !triggerEl) {
                    currentFigure.querySelector(_this4.structure.LINK).focus();
                } else {
                    triggerEl.focus();
                }
            });
        }

        // static

    }], [{
        key: 'initAll',
        value: function initAll(selector, config) {
            var args = parseArgs(selector, config);
            return Array.from(args.elements)
            // filter out invalid elements
            .filter(function (el) {
                return _isValidPswp(el);
                // initialize the remaining
            }).map(function (el, i) {
                el.setAttribute('data-pswp-uid', i + 1);
                return new Photoswiper(el, args.config);
            });
        }

        // borrowed from Bootstrap 4 pattern

    }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
            var index = 0;
            return this.each(function () {
                if (_isValidPswp(this)) {
                    index++;
                    var data = jQuery(this).data(DATA_KEY);
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : {};
                    _config.el = this;

                    if (!data && /dispose|hide/.test(config)) {
                        return;
                    }

                    if (!data) {
                        this.setAttribute('data-pswp-uid', index);
                        data = new Photoswiper(this, _config);
                        jQuery(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "jQuery{config}"');
                        }
                        data[config]();
                    }
                }
            });
        }
    }, {
        key: 'isValidPswp',
        value: function isValidPswp(element) {
            return _isValidPswp(element);
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
        key: 'Default',
        get: function get() {
            return Default;
        }
    }]);

    return Photoswiper;
}();

/* JQUERY INTERFACE INITIALIZATION */

if (window.jQuery !== undefined) {
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
