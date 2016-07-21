/**
 * --------------------------------------------------------------------------
 * Photoswiper (v1.0.2): photoswiper.js
 * A jQuery plugin for easy and accessible PhotoSwipe initialization
 * by Evan Yamanishi
 * Licensed under GPL-3.0
 * --------------------------------------------------------------------------
 */
import PhotoSwipe from 'PhotoSwipe'
import PhotoSwipeUI_Default from 'PhotoSwipeUI_Default'
import 'tabtrap'

const Photoswiper = (($) => {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME               = 'photoswipe'
    const VERSION            = '1.0.2'
    const DATA_KEY           = 'pswp.gallery'
    const EVENT_KEY          = `.${DATA_KEY}` // .pswp.gallery
    const CLASS_KEY          = '.' + `${DATA_KEY}`.replace('.', '-') // .pswp-gallery
    const JQUERY_NO_CONFLICT = $.fn[NAME]

    const Default = {
        // use tabtrap.js dependency to handle focus accessibility
        tabtrap : true
    }

    const Selector = {
        PSWP : '.pswp'   // root of photoswipe ui element
    }

    const Event = {
        CLICK_THUMBNAIL : `click.thumbnail${EVENT_KEY}`
    }

    const Ignore = [
        'class',
        'data-size',
        'href',
        'src'
    ]


    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    class Photoswiper {

        constructor(element, config) {
            this._isEnabled    = true
            this._element      = element
            this._galleryIndex = parseInt($(this._element).attr('data-pswp-uid'), 10)
            this._globalConfig = this._getConfig(config)
            this._pswpEl       = $(this._globalConfig.PSWP)[0]

            if (Photoswiper.URL_HASH.pid && Photoswiper.URL_HASH.gid === this._galleryIndex) {
                this._openFromURL()
            }

            this._setClickEvent()
        }


        // getters

        static get VERSION() {
            return VERSION
        }

        static get Default() {
            return Default
        }

        static get NAME() {
            return NAME
        }

        static get DATA_KEY() {
            return DATA_KEY
        }

        static get Event() {
            return Event
        }

        static get EVENT_KEY() {
            return EVENT_KEY
        }

        static get URL_HASH() {
            var hash = window.location.hash.substring(1),
                params = {}

            if (hash.length < 5) {
                return params
            }

            var vars = hash.split('&')
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue
                }
                var pair = vars[i].split('=')
                if (pair.length < 2) {
                    continue
                }
                params[pair[0]] = parseInt(pair[1], 10)
            }

            return params
        }


        // public

        enable() {
            this._isEnabled = true
        }

        disable() {
            this._isEnabled = false
        }

        toggle() {
            this._isEnabled = !this._isEnabled
        }

        dispose() {
            $.removeData(this._element, DATA_KEY)

            $(document).off(EVENT_KEY)

            this._isEnabled    = null
            this._element      = null
            this._galleryIndex = null
            this._globalConfig = null
            this._pswpEl       = null
            this._items        = null
            this._pswp         = null
        }


        // private

        _getConfig(config) {
            return $.extend({},
                this.constructor.Default,
                this._getSelectors(config),
                $(this._element).data(),
                config
            )
        }

        _getSelectors(config) {
            let NAMESPACE = (config === null || typeof config.namespace === 'undefined') ?
                CLASS_KEY : config.namespace
            NAMESPACE = (NAMESPACE.charAt(0) !== '.') ? `.${NAMESPACE}` : NAMESPACE
            return $.extend({},
                Selector, {
                    GALLERY : `${NAMESPACE}`,               // <figure>
                    FIGURE  : `${NAMESPACE}__figure`,       // <figure>
                    LINK    : `${NAMESPACE}__link`,         // <a>
                    THUMB   : `${NAMESPACE}__thumbnail`,    // <img>
                    CAPTION : `${NAMESPACE}__caption`       // <figcaption>
                }
            )
        }

        _openFromURL() {
            let index = Photoswiper.URL_HASH.pid - 1
            this._openPhotoswipe(index, true)
        }

        _setClickEvent() {
            $(this._element).on(Event.CLICK_THUMBNAIL, 'a', (event) => {
                let link = event.currentTarget

                if ($(link).children('img').length !== 1) return false

                let figure = $(link).closest(this._globalConfig.FIGURE)[0]
                let index  = $(this._element).children().index(figure) - 1

                if (index >= 0 && this._isEnabled) {
                    event.preventDefault()
                    this._openPhotoswipe(index, false)
                }
            })
        }

        _openPhotoswipe(index, fromURL) {
            this._items = this._buildItems()
            let options = this._getOptions(index)

            if (fromURL) options.showAnimationDuration = 0

            if (options.galleryPIDs) {
                for (let i = 0; i < this._items.length; i++) {
                    if (this._items[i].pid === index) {
                        options.index = i
                    }
                }
            }

            this._pswp = new PhotoSwipe(this._pswpEl, PhotoSwipeUI_Default, this._items, options)
            this._pswp.init()
            // this._setAlt()
            this._manageFocus()
        }

        _buildItems() {
            let items   = []
            let $figure = $(this._element).find(this._globalConfig.FIGURE)

            for (let i = 0; i < $figure.length; i++) {
                let item = this._getItem($figure[i])
                items.push(item)
            }

            return items
        }

        _getItem(figure) {
            let link  = $(figure).find(this._globalConfig.LINK)[0]
            let thumb = $(figure).find(this._globalConfig.THUMB)[0]
            let cap   = $(figure).find(this._globalConfig.CAPTION)[0]

            let size = $(link).attr('data-size').split('x')
            let item = {
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10),
                src: $(link).attr('href')
            }

            let linkAts  = $(link.attributes)
            for (let i = 0; i < linkAts.length; i++) {
                if ($.inArray(linkAts[i].name, Ignore) === -1) {
                    item[linkAts[i].name] = linkAts[i].value
                }
            }

            let thumbAts = $(thumb.attributes)
            for (let i = 0; i < thumbAts.length; i++) {
                if ($.inArray(thumbAts[i].name, Ignore) === -1) {
                    item[thumbAts[i].name] = thumbAts[i].value
                }
            }

            if ($(cap).html().length > 0) {
                item.title = $(cap).html()
            }

            item.fig = figure

            return item
        }

        _getOptions(index) {
            return $.extend({},
                this._globalConfig, {
                    index: index,
                    galleryUID: this._galleryIndex,
                    getThumbBoundsFn: (i) => {
                        let thumbnail = $(this._items[i].fig).find('img')[0]
                        return {
                            x: $(thumbnail).offset().left,
                            y: $(thumbnail).offset().top,
                            w: $(thumbnail).width()
                        }
                    }
                }
            )
        }

        _manageFocus() {
            if (this._globalConfig.tabtrap) {
                $(this._pswpEl).tabtrap({
                    disableOnEscape: false
                })
                $(document).on('tab.a11y.tabtrap', $(this._pswpEl), () => {
                    $(this._pswpEl).find('.pswp__ui').removeClass('pswp__ui--idle')
                })
            }

            this._pswp.listen('close', () => {
                let current = this._pswp.getCurrentIndex()
                let activeFigure = $(this._element).children().eq(current + 1)
                $(activeFigure).find(this._globalConfig.LINK).focus()
            })
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

        static _jQueryInterface(config) {
            return this.each(function(i) {
                let data = $(this).data(DATA_KEY)
                let _config = typeof config === 'object' ?
                    config : null

                if (!data && /destroy|hide/.test(config)) {
                    return
                }

                if (!data) {
                    $(this).attr('data-pswp-uid', i + 1)
                    data = new Photoswiper(this, _config)
                    $(this).data(DATA_KEY, data)
                }

                if (typeof config === 'string') {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "${config}"`)
                    }
                    data[config]()
                }
            })
        }

    }


    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME]             = Photoswiper._jQueryInterface
    $.fn[NAME].Constructor = Photoswiper
    $.fn[NAME].PhotoSwipe  = PhotoSwipe
    $.fn[NAME].noConflict  = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return Photoswiper._jQueryInterface
    }

    return Photoswiper

})(jQuery)

export default Photoswiper
