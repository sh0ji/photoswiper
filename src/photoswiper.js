/* --------------------------------------------------------------------------
 * Photoswiper (v2.0.7): photoswiper.js
 * by Evan Yamanishi
 * Licensed under GPL-3.0
 * -------------------------------------------------------------------------- */

import PhotoSwipe from 'photoswipe'
import PhotoSwipeUIDefault from '../default-ui/photoswipe-ui-default.js'
import tabtrap from 'tabtrap'

/* CONSTANTS */

const NAME = 'photoswiper'
const VERSION = '2.0.7'
const DATA_KEY = 'photoswiper'

const Default = {
    bemRoot: null,
    el: null,
    onInit: null,
    photoswipeUI: PhotoSwipeUIDefault,
    structure: {
        PSWP: '.pswp',
        GALLERY: 'figure',
        TITLE: 'figcaption',
        FIGURE: 'figure',
        LINK: 'a',
        THUMB: 'img',
        CAPTION: 'figcaption'
    }
}

const parseArgs = (el, config) => {
    let args = {}
    switch (typeof el) {
        case 'string':
            // el was just a selector
            args.elements = document.querySelectorAll(el)
            break;
        case 'object':
            // already a NodeList
            if (NodeList.prototype.isPrototypeOf(el)) {
                args.elements = el
            // already an element
            } else if (el.nodeType === 1) {
                // gently coerce into a NodeList
                el.setAttribute('nodeListCoercion')
                let newEls = document.querySelectorAll('[nodeListCoercion]')
                el.removeAttribute('nodeListCoercion')
                args.elements = newEls
            // el is probably the config
            } else if (config === undefined) {
                args.elements = parseArgs(el.el).elements
                args.config = el
            }
            break;
        default:
            throw new Error('Initialize with .init(selector, config)')
    }
    if (typeof config === 'object' && args.config === undefined) {
        args.config = config
    }
    return args
}

const isValidPswp = (element) => {
    let links = element.querySelectorAll('a')
    // links exists
    if (links.length > 0) {
        for (let link of links) {
            // and one of them has exactly one image inside it
            if (link.querySelectorAll('img').length === 1) return true
        }
    }
    return false
}


/* CLASS DEFINITION */

class Photoswiper {

    constructor(element, config) {
        this.element = element
        this.config = this._getConfig(config)
        this.structure = this._getStructure()
        this.pswpOptions = this._getPswpOptions()

        if (element && isValidPswp(element)) {
            this.enabled = true

            // handle history parameters (#&gid=1&pid=1)
            let windowHash = window.location.hash.substring(1)
            let hashData = this._parseHash(windowHash)
            if (hashData.pid && hashData.gid) {
                this._openPhotoSwipe(hashData.pid, this.element, true)
            }

            this._initListeners()
        } else {
            console.warn('Gallery figures must contain an anchor > image pair (a[href|data-href]>img[src]).\n', element)
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

    static get Default() {
        return Default
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


    // private

    _getConfig(config) {
        return Object.assign({},
            Default,
            config
        )
    }

    _getStructure() {
        let bemSelectors = (this.config.bemRoot) ? this._bemSelectors(this.config.bemRoot) : {}
        return Object.assign({},
            this.config.structure,
            bemSelectors
        )
    }

    _bemSelectors(block) {
        return {
            GALLERY: `.${block}`,
            TITLE: `.${block}__title`,
            FIGURE: `.${block}__figure`,
            LINK: `.${block}__link`,
            THUMB: `.${block}__thumbnail`,
            CAPTION: `.${block}__caption`
        }
    }

    _parseHash(hash) {
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

    _getPswpOptions() {
        let opts = {}
        for (let opt of Object.keys(this.config)) {
            if (Default[opt] === undefined) {
                opts[opt] = this.config[opt]
                delete this.config[opt]
            }
        }
        return opts
    }

    _initListeners() {
        this.element.addEventListener('click', (e) => this._clickEvent(e))
        let pageAnchors = document.querySelectorAll('a[href^="#"],a[data-href^="#"]')
        for (let anchor of pageAnchors) {
            anchor.addEventListener('click', (e) => this._clickEvent(e))
        }
    }

    _clickEvent(e) {
        e = e || window.event
        let clickTarget = e.target || e.srcElement

        // handle clicks referencing a photoswipe-able image
        let ref = clickTarget.getAttribute('href') || clickTarget.getAttribute('data-href')
        if (ref) {
            let hashData = this._parseHash(ref.split('#')[1])
            if (hashData.pid && hashData.gid) {
                this._openPhotoSwipe(hashData.pid, this.element, false, clickTarget)
                e.preventDefault ? e.preventDefault() : e.returnValue = false
                return
            }
        }

        // handle clicks on either the anchor or img
        if (!this._validClick(clickTarget) || !this.enabled) return
        e.preventDefault ? e.preventDefault() : e.returnValue = false

        let figure = clickTarget.closest(this.structure.FIGURE) || this.element
        let index = null

        if (figure === this.element) {
            index = 0
        } else {
            let figures = this.element.querySelectorAll(this.structure.FIGURE)
            index = Array.from(figures).indexOf(figure)
        }

        if (index >= 0) {
            this._openPhotoSwipe(index, this.element, false, clickTarget)
        }
    }

    // ensure that the click event happened on either of the two elements in a[href|data-href]>img[src] relationship
    _validClick(targetEl) {
        const nodeName = targetEl.nodeName.toUpperCase()
        const parentName = targetEl.parentElement.nodeName.toUpperCase()
        const hasImg = targetEl.querySelectorAll('img').length === 1
        return (nodeName === 'IMG' && parentName === 'A') || (nodeName === 'A' && hasImg)
    }

    _openPhotoSwipe(index, galleryEl, fromURL, triggerEl) {
        if (!isValidPswp(galleryEl)) return
        let pswpEl = document.querySelector(this.structure.PSWP)
        if (!pswpEl) {
            throw new Error('Make sure to include the .pswp element on your page')
        }

        this.items = this._getItems(galleryEl)
        this.options = this._getOptions(galleryEl)

        this.options.index = parseInt(index, 10)

        if (fromURL) {
            this.options.showAnimationDuration = 0
            this.options.index = this._urlIndex(index)
        }

        if (isNaN(this.options.index)) return

        let pswp = new PhotoSwipe(pswpEl, this.config.photoswipeUI, this.items, this.options)
        if (this.enabled) pswp.init()

        this._manageFocus(pswp, triggerEl, pswpEl)

        if (typeof this.config.onInit === 'function') {
            this.config.onInit.call(pswp, pswp)
        }
    }

    _getItems(galleryEl) {
        let figures = galleryEl.querySelectorAll(this.structure.FIGURE)
        if (figures.length > 0) {
            return Array.from(figures).map((figure) => {
                return this._getItem(figure)
            })
        } else {
            return [this._getItem(galleryEl)]
        }
    }

    _getItem(figure) {
        // required elements
        let link = figure.querySelector(this.structure.LINK)
        let thumb = figure.querySelector(this.structure.THUMB)

        // optional caption
        let cap = figure.querySelector(this.structure.CAPTION)
        let size = link.getAttribute('data-size').split('x')

        let item = {
            el: figure,
            h: parseInt(size[1], 10),
            w: parseInt(size[0], 10),
            src: link.getAttribute('href') || link.getAttribute('data-href')
        }

        if (thumb) {
            item.alt = thumb.getAttribute('alt')
            item.msrc = thumb.getAttribute('src')
        }

        if (cap && cap.innerHTML.length > 0) {
            item.title = cap.innerHTML
        }
        return item
    }

    _getOptions(galleryEl) {
        let thumbSelector = this.structure.THUMB
        return Object.assign({},
            this.pswpOptions, {
                galleryUID: galleryEl.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: (index) => {
                    let thumb = this.items[index].el.querySelector(thumbSelector)
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

    // a few helpers for keyboard accessibility
    _manageFocus(pswp, triggerEl, pswpEl) {
        // trap focus in the pswp element when it's active
        new tabtrap(pswpEl)

        // manage the idle state on tab press
        let _idleTimer = 0
        pswpEl.addEventListener('keydown', (e) => {
            let keyCode = e.which || e.keyCode || 0
            if (keyCode === 9) {
                pswp.ui.setIdle(false)
                clearTimeout(_idleTimer)

                _idleTimer = setTimeout(function() {
                    pswp.ui.setIdle(true)
                }, pswp.options.timeToIdle)
            }
        })

        // return focus to the correct element on close
        pswp.listen('close', () => {
            let current = pswp.getCurrentIndex()
            let currentFigure = this.element.querySelectorAll(this.structure.FIGURE)[current] || this.element

            if (this.element.contains(triggerEl) || !triggerEl) {
                currentFigure.querySelector(this.structure.LINK).focus()
            } else {
                triggerEl.focus()
            }
        })
    }


    // static

    static initAll(selector, config) {
        let args = parseArgs(selector, config)
        return Array.from(args.elements)
            // filter out invalid elements
            .filter((el) => {
                return isValidPswp(el)
            // initialize the remaining
            }).map((el, i) => {
                el.setAttribute('data-pswp-uid', i + 1)
                return new Photoswiper(el, args.config)
            })
    }

    // borrowed from Bootstrap 4 pattern
    static _jQueryInterface(config) {
        let index = 0
        return this.each(function() {
            if (isValidPswp(this)) {
                index++
                let data = jQuery(this).data(DATA_KEY)
                let _config = typeof config === 'object' ?
                    config : {}
                _config.el = this

                if (!data && /dispose|hide/.test(config)) {
                    return
                }

                if (!data) {
                    this.setAttribute('data-pswp-uid', index)
                    data = new Photoswiper(this, _config)
                    jQuery(this).data(DATA_KEY, data)
                }

                if (typeof config === 'string') {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "jQuery{config}"`)
                    }
                    data[config]()
                }
            }
        })
    }

    static isValidPswp(element) {
        return isValidPswp(element)
    }
}


/* JQUERY INTERFACE INITIALIZATION */

if (window.jQuery !== undefined) {
    const JQUERY_NO_CONFLICT = jQuery.fn[NAME]
    jQuery.fn[NAME] = Photoswiper._jQueryInterface
    jQuery.fn[NAME].Constructor = Photoswiper
    jQuery.fn[NAME].noConflict = function() {
        jQuery.fn[NAME] = JQUERY_NO_CONFLICT
        return Photoswiper._jQueryInterface
    }
}

export default Photoswiper
