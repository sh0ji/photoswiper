'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * --------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Photoswiper (v1.0.0): photoswiper.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A jQuery plugin for easy and accessible PhotoSwipe initialization
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * by Evan Yamanishi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under GPL-3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * --------------------------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _PhotoSwipe = require('PhotoSwipe');

var _PhotoSwipe2 = _interopRequireDefault(_PhotoSwipe);

var _PhotoSwipeUIDefault = require('PhotoSwipeUIDefault');

var _PhotoSwipeUIDefault2 = _interopRequireDefault(_PhotoSwipeUIDefault);

require('tabtrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Photoswiper = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    var NAME = 'photoswipe';
    var VERSION = '1.0.0';
    var DATA_KEY = 'pswp.gallery';
    var EVENT_KEY = '.' + DATA_KEY; // .pswp.gallery
    var CLASS_KEY = '.' + ('' + DATA_KEY).replace('.', '-'); // .pswp-gallery
    var JQUERY_NO_CONFLICT = $.fn[NAME];

    var Default = {
        // use tabtrap.js dependency to handle focus accessibility
        tabtrap: true
    };

    var Selector = {
        PSWP: '.pswp' // root of photoswipe ui element
    };

    var Event = {
        CLICK_THUMBNAIL: 'click.thumbnail' + EVENT_KEY
    };

    var Ignore = ['class', 'data-size', 'href', 'src'];

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Photoswiper = function () {
        function Photoswiper(element, config) {
            _classCallCheck(this, Photoswiper);

            this._isEnabled = true;
            this._element = element;
            this._galleryIndex = parseInt($(this._element).attr('data-pswp-uid'), 10);
            this._globalConfig = this._getConfig(config);
            this._pswpEl = $(this._globalConfig.PSWP)[0];

            if (Photoswiper.URL_HASH.pid && Photoswiper.URL_HASH.gid === this._galleryIndex) {
                this._openFromURL();
            }

            this._setClickEvent();
        }

        // getters

        _createClass(Photoswiper, [{
            key: 'enable',


            // public

            value: function enable() {
                this._isEnabled = true;
            }
        }, {
            key: 'disable',
            value: function disable() {
                this._isEnabled = false;
            }
        }, {
            key: 'toggle',
            value: function toggle() {
                this._isEnabled = !this._isEnabled;
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                $.removeData(this._element, DATA_KEY);

                $(document).off(EVENT_KEY);

                this._isEnabled = null;
                this._element = null;
                this._galleryIndex = null;
                this._globalConfig = null;
                this._pswpEl = null;
                this._items = null;
                this._pswp = null;
            }

            // private

        }, {
            key: '_getConfig',
            value: function _getConfig(config) {
                return $.extend({}, this.constructor.Default, this._getSelectors(config), $(this._element).data(), config);
            }
        }, {
            key: '_getSelectors',
            value: function _getSelectors(config) {
                var NAMESPACE = config === null || typeof config.namespace === 'undefined' ? CLASS_KEY : config.namespace;
                NAMESPACE = NAMESPACE.charAt(0) !== '.' ? '.' + NAMESPACE : NAMESPACE;
                return $.extend({}, Selector, {
                    GALLERY: '' + NAMESPACE, // <figure>
                    FIGURE: NAMESPACE + '__figure', // <figure>
                    LINK: NAMESPACE + '__link', // <a>
                    THUMB: NAMESPACE + '__thumbnail', // <img>
                    CAPTION: NAMESPACE + '__caption' // <figcaption>
                });
            }
        }, {
            key: '_openFromURL',
            value: function _openFromURL() {
                var index = Photoswiper.URL_HASH.pid - 1;
                this._openPhotoswipe(index, true);
            }
        }, {
            key: '_setClickEvent',
            value: function _setClickEvent() {
                var _this = this;

                $(this._element).on(Event.CLICK_THUMBNAIL, 'a', function (event) {
                    var link = event.currentTarget;

                    if ($(link).children('img').length !== 1) return false;

                    var figure = $(link).closest(_this._globalConfig.FIGURE)[0];
                    var index = $(_this._element).children().index(figure) - 1;

                    if (index >= 0 && _this._isEnabled) {
                        event.preventDefault();
                        _this._openPhotoswipe(index, false);
                    }
                });
            }
        }, {
            key: '_openPhotoswipe',
            value: function _openPhotoswipe(index, fromURL) {
                this._items = this._buildItems();
                var options = this._getOptions(index);

                if (fromURL) options.showAnimationDuration = 0;

                if (options.galleryPIDs) {
                    for (var i = 0; i < this._items.length; i++) {
                        if (this._items[i].pid === index) {
                            options.index = i;
                        }
                    }
                }

                this._pswp = new _PhotoSwipe2.default(this._pswpEl, _PhotoSwipeUIDefault2.default, this._items, options);
                this._pswp.init();
                // this._setAlt()
                this._manageFocus();
            }
        }, {
            key: '_buildItems',
            value: function _buildItems() {
                var items = [];
                var $figure = $(this._element).find(this._globalConfig.FIGURE);

                for (var i = 0; i < $figure.length; i++) {
                    var item = this._getItem($figure[i]);
                    items.push(item);
                }

                return items;
            }
        }, {
            key: '_getItem',
            value: function _getItem(figure) {
                var link = $(figure).find(this._globalConfig.LINK)[0];
                var thumb = $(figure).find(this._globalConfig.THUMB)[0];
                var cap = $(figure).find(this._globalConfig.CAPTION)[0];

                var size = $(link).attr('data-size').split('x');
                var item = {
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10),
                    src: $(link).attr('href')
                };

                var linkAts = $(link.attributes);
                for (var i = 0; i < linkAts.length; i++) {
                    if ($.inArray(linkAts[i].name, Ignore) === -1) {
                        item[linkAts[i].name] = linkAts[i].value;
                    }
                }

                var thumbAts = $(thumb.attributes);
                for (var _i = 0; _i < thumbAts.length; _i++) {
                    if ($.inArray(thumbAts[_i].name, Ignore) === -1) {
                        item[thumbAts[_i].name] = thumbAts[_i].value;
                    }
                }

                if ($(cap).html().length > 0) {
                    item.title = $(cap).html();
                }

                item.fig = figure;

                return item;
            }
        }, {
            key: '_getOptions',
            value: function _getOptions(index) {
                var _this2 = this;

                return $.extend({}, this._globalConfig, {
                    index: index,
                    galleryUID: this._galleryIndex,
                    getThumbBoundsFn: function getThumbBoundsFn(i) {
                        var thumbnail = $(_this2._items[i].fig).find('img')[0];
                        return {
                            x: $(thumbnail).offset().left,
                            y: $(thumbnail).offset().top,
                            w: $(thumbnail).width()
                        };
                    }
                });
            }
        }, {
            key: '_manageFocus',
            value: function _manageFocus() {
                var _this3 = this;

                if (this._globalConfig.tabtrap) {
                    $(this._pswpEl).tabtrap({
                        disableOnEscape: false
                    });
                    $(document).on('tab.a11y.tabtrap', $(this._pswpEl), function () {
                        $(_this3._pswpEl).find('.pswp__ui').removeClass('pswp__ui--idle');
                    });
                }

                this._pswp.listen('close', function () {
                    var current = _this3._pswp.getCurrentIndex();
                    var activeFigure = $(_this3._element).children().eq(current + 1);
                    $(activeFigure).find(_this3._globalConfig.LINK).focus();
                });
            }

            // disabled for now
            /* _setAlt() {
                this._pswp.listen('beforeChange', () => {
                    let current = this._pswp.getCurrentIndex()
                    let altText = (this._items[current].alt) ? this._items[current].alt : ''
                    let longDesc = (this._items[current]['data-desc']) ? this._items[current]['data-desc'] : ''
                    let $alt = $(document.createElement('div'))
                        .append($(document.createElement('div'))
                            .text(altText)
                        )
                        .append($(document.createElement('div'))
                            .html(longDesc)
                        )
                    $(this._globalConfig.DESCRIPTION).html($alt.html())
                })
            } */

            // static

        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                return this.each(function (i) {
                    var data = $(this).data(DATA_KEY);
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

                    if (!data && /destroy|hide/.test(config)) {
                        return;
                    }

                    if (!data) {
                        $(this).attr('data-pswp-uid', i + 1);
                        data = new Photoswiper(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        data[config]();
                    }
                });
            }
        }, {
            key: 'VERSION',
            get: function get() {
                return VERSION;
            }
        }, {
            key: 'Default',
            get: function get() {
                return Default;
            }
        }, {
            key: 'NAME',
            get: function get() {
                return NAME;
            }
        }, {
            key: 'DATA_KEY',
            get: function get() {
                return DATA_KEY;
            }
        }, {
            key: 'Event',
            get: function get() {
                return Event;
            }
        }, {
            key: 'EVENT_KEY',
            get: function get() {
                return EVENT_KEY;
            }
        }, {
            key: 'URL_HASH',
            get: function get() {
                var hash = window.location.hash.substring(1),
                    params = {};

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
                    params[pair[0]] = parseInt(pair[1], 10);
                }

                return params;
            }
        }]);

        return Photoswiper;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Photoswiper._jQueryInterface;
    $.fn[NAME].Constructor = Photoswiper;
    $.fn[NAME].PhotoSwipe = _PhotoSwipe2.default;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Photoswiper._jQueryInterface;
    };

    return Photoswiper;
}(jQuery);

exports.default = Photoswiper;