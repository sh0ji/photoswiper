/**
 * --------------------------------------------------------------------------
 * Photoswiper (v1.1.0): photoswiper.js
 * by Evan Yamanishi
 * Licensed under GPL-3.0
 * --------------------------------------------------------------------------
 */

/* CONSTANTS */

const NAME = 'photoswiper'
const VERSION = '1.1.0'
const DATA_KEY = 'photoswiper'

const Default = {
    useBem: true
}

const Structure = {
    PSWP: '.pswp',
    GALLERY: 'figure',
    TITLE: 'figcaption',
    FIGURE: 'figure',
    LINK: 'a',
    THUMB: 'img',
    CAPTION: 'figcaption'
}

const Deps = {
    jQuery: window.jQuery !== undefined,
    PhotoSwipe: PhotoSwipe !== undefined,
    PhotoSwipeUIDefault: PhotoSwipeUI_Default !== undefined,
    tabtrap: window.tabtrap !== undefined
}


/* CLASS DEFINITION */

class Photoswiper {

    constructor(selector, config) {
        this.config = this._getConfig(selector, config)
        this.galleries = this._initGalleryObject(this.config.selector)
        this.structure = this._getStructure()
        this.hashData = this._parseHash()

        // find PhotoSwipe and the PhotoSwipe UI
        this.PhotoSwipe = (Deps.PhotoSwipe) ? PhotoSwipe :
            (this.config.photoswipe) ? this.config.photoswipe : require('PhotoSwipe')
        this.PhotoSwipeUI = (Deps.PhotoSwipeUIDefault) ? PhotoSwipeUI_Default :
            (this.config.photoswipeUI) ? this.config.photoswipeUI : require('PhotoSwipeUIDefault')

        if (this.hashData.pid && this.hashData.gid) {
            this.openPhotoSwipe(this.hashData.pid, this.galleries, true)
        }

        for (let i = 0; i < this.galleries.length; i++) {
            this._setupGallery(i)
        }
    }


    // getters

    static get NAME() {
        return NAME
    }

    static get VERSION() {
        return VERSION
    }

    static get DATA_KEY() {
        return DATA_KEY
    }

    static get KEYCODE() {
        return KEYCODE
    }

    static get Default() {
        return Default
    }

    static get DefaultType() {
        return DefaultType
    }

    static get Event() {
        return Event
    }

    static get jQueryAvailable() {
        return jQueryAvailable
    }


    // public

    enable() {
        this.enabled = true
    }

    disable() {
        this.enabled = false
    }

    toggle() {
        this.enabled = !this.enabled
    }

    openPhotoSwipe(index, galleryEl, fromURL, triggerEl) {
        let pswpEl = document.querySelector(this.structure.PSWP)
        let i = this._getGalleryIndex(galleryEl)

        let items = this._getItems(galleryEl)
        this.galleries[i].items = items

        let options = this._getOptions(galleryEl, items)
        this.galleries[i].options = options

        options.index = parseInt(index, 10)

        if (fromURL) {
            options.showAnimationDuration = 0
            options.index = this._urlIndex(index, items, options.galleryPIDs)
        }

        if (isNaN(options.index)) return

        let pswp = new this.PhotoSwipe(pswpEl, this.PhotoSwipeUI, items, options)
        pswp.init()
        this._manageFocus(galleryEl, pswp, triggerEl)

        if (typeof this.config.onInit === 'function') {
            this.config.onInit.call(pswp)
        }
    }


    // private

    _getConfig(selector, config) {
        let _config = {}
        if (typeof config === 'object') {
            _config = config
        } else if (typeof selector === 'object' && selector.nodeType === undefined) {
            _config = selector
        } else if (typeof selector === 'string') {
            _config.selector = selector
        }
        return Object.assign({},
            this.constructor.Default,
            _config
        )
    }

    _initGalleryObject(selector) {
        return Array.from(this._getNodeList(this.config.selector)).map((gallery) => {
            return {
                element: gallery
            }
        })
    }

    _getNodeList(selector) {
        switch (typeof selector) {
            case 'string':
                return document.querySelectorAll(selector)
                break
            case 'object':
                return (selector.nodeType === 1) ? selector : this._getNodeList(selector.selector)
                break
            default:
                throw new Error('Must provide a selector or element')
        }
    }

    _getGalleryIndex(galleryEl) {
        let i = 0
        for (let gallery of this.galleries) {
            if (gallery.element === galleryEl) break
            i++
        }
        return i
    }

    _getStructure() {
        let bemSelectors = (this.config.useBem) ? this._bemSelectors(this.config.selector) : {}
        return Object.assign({},
            Structure,
            bemSelectors,
            this.config.selectors
        )
    }

    _bemSelectors(root) {
        return {
            GALLERY: `${root}`,
            TITLE: `${root}__title`,
            FIGURE: `${root}__figure`,
            LINK: `${root}__link`,
            THUMB: `${root}__thumbnail`,
            CAPTION: `${root}__caption`
        }
    }

    _parseHash() {
        let hash = window.location.hash.substring(1)
        let params = {}

        if (hash.length < 5) {
            return params
        }

        let vars = hash.split('&');
        for (let i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue
            }
            let pair = vars[i].split('=')
            if (pair.length < 2) {
                continue
            }
            params[pair[0]] = pair[1]
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10)
        }

        return params
    }

    _setupGallery(i) {
        this.galleries[i].element.setAttribute('data-pswp-uid', i + 1)
        this.galleries[i].element.addEventListener('click', (e) => this._clickEvent(e))
    }

    _clickEvent(e) {
        e = e || window.event
        let clickTarget = e.target || e.srcElement

        // only handle clicks on a>img pairs
        if (!this._validClick(clickTarget)) return
        e.preventDefault ? e.preventDefault() : e.returnValue = false

        let figure = clickTarget.closest(this.structure.FIGURE)
        let gallery = clickTarget.closest(this.structure.GALLERY)
        let figures = gallery.querySelectorAll(this.structure.FIGURE)
        let index = Array.from(figures).indexOf(figure)

        if (index >= 0) {
            this.openPhotoSwipe(index, gallery, false, clickTarget)
        }
    }

    // ensure that the click event happened on either of the two elements in a>img
    _validClick(targetEl) {
        return (targetEl.nodeName === 'IMG' && targetEl.parentElement.nodeName === 'A') || (targetEl.nodeName === 'A' && targetEl.querySelectorAll('img').length === 1)
    }

    _getItems(galleryEl) {
        let figures = galleryEl.querySelectorAll(this.structure.FIGURE)
        return Array.from(figures).map((figure) => {
            let link = figure.querySelector(this.structure.LINK)
            let thumb = figure.querySelector(this.structure.THUMB)
            let cap = figure.querySelector(this.structure.CAPTION)
            let size = link.getAttribute('data-size').split('x')

            let item = {
                el: figure,
                h: parseInt(size[1], 10),
                w: parseInt(size[0], 10),
                src: link.getAttribute('href')
            }

            if (thumb) {
                item.alt = thumb.getAttribute('alt'),
                    item.msrc = thumb.getAttribute('src')
            }

            if (cap && cap.innerHTML.length > 0) {
                item.title = cap.innerHTML
            }
            return item
        })
    }

    _getOptions(galleryEl, items) {
        let thumbSelector = this.structure.THUMB
        return Object.assign({},
            this.config.pswpOptions, {
                galleryUID: galleryEl.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    let thumb = items[index].el.querySelector(thumbSelector)
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumb.getBoundingClientRect()

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    }
                }
            }
        )
    }

    _urlIndex(index, items, galleryPIDs) {
        if (galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let i = 0; i < items.length; i++) {
                if (items[i].pid == index) {
                    return i
                }
            }
        } else {
            // in URL indexes start from 1
            return parseInt(index, 10) - 1;
        }
    }

    _manageFocus(galleryEl, pswp, triggerEl) {
        // trap focus in the pswp element (only happens when it's active)
        let tabtrap = (Deps.tabtrap) ? window.tabtrap : require('tabtrap')
        new tabtrap(this.structure.PSWP)

        // return focus to the correct element on close
        pswp.listen('close', () => {
            let current = pswp.getCurrentIndex()
            let currentFigure = galleryEl.querySelectorAll(this.structure.FIGURE)[current]

            if (galleryEl.contains(triggerEl) || !triggerEl) {
                currentFigure.querySelector(this.structure.LINK).focus()
            } else {
                triggerEl.focus()
            }
        })
    }


    // static

    static _jQueryInterface(config) {
        let _config = (typeof config === 'object') ? config : {}
        _config.selector = this.selector

        let pswpr = new Photoswiper(_config)

        if (typeof config === 'string') {
            if (pswper[config] === undefined) {
                throw new Error(`No method named "${config}"`)
            }
            pswper[config]()
        }
        return pswpr
    }
}


/* JQUERY INTERFACE INITIALIZATION */

if (Deps.jQuery) {
    const JQUERY_NO_CONFLICT = jQuery.fn[NAME]
    jQuery.fn[NAME] = Photoswiper._jQueryInterface
    jQuery.fn[NAME].Constructor = Photoswiper
    jQuery.fn[NAME].noConflict = function() {
        jQuery.fn[NAME] = JQUERY_NO_CONFLICT
        return Photoswiper._jQueryInterface
    }
}

export default Photoswiper
