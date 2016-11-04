# Photoswiper
An plugin for easy and accessible [PhotoSwipe](http://photoswipe.com/) initialization. Works with or without jQuery.

## Usage
Photoswiper comes with two versions: a module version that can be required and a standalone version that can be used in the browser. The easiest way to initialize Photoswiper is with jQuery or the `.initAll()` method.

With jQuery `$(selector).photoswiper([options])`
```javascript
$('.pswp-gallery').photoswipe()
```

Without jQuery `photoswiper.initAll(selector[, options])`
```javascript
photoswiper.initAll('.pswp-gallery')
```
It can also be initialized without jQuery or `.initAll()`, but with one significant difference: the supplied element must be an actual element (`nodeType === 1`).

`photoswiper(element[, options])`
```javascript
// initialize one gallery
let myGallery = document.querySelector('.pswp-gallery')
photoswiper(myGallery)

// initialize all the galleries
let myGalleries = document.querySelectorAll('.pswp-gallery')
for (let gallery of myGalleries) {
    photoswiper(gallery)
}
```

## Options
Photoswiper provides a few extra options in addition to [all the PhotoSwipe options](http://photoswipe.com/documentation/options.html).

| Option | Type | Default |
| ---- | ---- | ---- |
| `bemRoot` | `string` | `null` |
| `el` | `string` or `object` | `null` |
| `onInit` | `function` | `null` |
| `PhotoSwipeUI` | `object` | The [default PhotoSwipe UI](https://github.com/dimsemenov/PhotoSwipe/blob/master/src/js/ui/photoswipe-ui-default.js). |
| `structure` | `object` | See the [Structure](#structure) documentation. |

* `bemRoot`
Use this to customize your selectors according to BEM [BEM](https://css-tricks.com/bem-101/). For instance, passing `myImages` would cause the figure element selector to become `.myImages__figure` instead of `.pswp-gallery__figure`.

* `el`
Use this if you'd rather supply the element inside the config. It can be a valid CSS selector string, a direct reference to an element (e.g. `document.getElementById('myGallery')`), or a node list that you already created (e.g. `document.querySelectorAll('.pswp-gallery')`).
```javascript
photoswiper.initAll({ el: '.pswp-gallery' })
```
* `onInit`
This will be called with the PhotoSwipe instance context when the gallery is initialized. Use it to bind additional [PhotoSwipe API functions](http://photoswipe.com/documentation/api.html). Access the PhotoSwipe instance with either `this` or the first argument `(arg) => {}`.
```javascript
{
    onInit: function(pswp) {
        // (this === pswp == PhotoSwipe instance)
        this.listen('afterChange', () => {
            alert('The image changed! But you probably knew that already...')
        })
    }
}
```
* `photoswipeUI`
Specify your PhotoSwipe ui object here. Defaults to the [default PhotoSwipe UI](https://github.com/dimsemenov/PhotoSwipe/blob/master/src/js/ui/photoswipe-ui-default.js), so you don't need to supply that.

* `structure`
Specify selectors for the structure of your gallery.

## Structure
Photoswiper defaults to semantic element selectors, but all selectors can be explicitly overriden. Optionally use [BEM](https://css-tricks.com/bem-101/) by supplying a `bemRoot` class name in the options (e.g. `{ bemRoot: 'pswp-gallery'}`).
Elements include:

| Option Name | Default | BEM Output | Description |
| ---- | ---- | ---- | ---- |
| **GALLERY** | `figure` | `.${bemRoot}` | The root gallery element. |
| **TITLE** | `figcaption` | `.${bemRoot}__title` | The title of the whole gallery. There can only be one of these per gallery, and it must be a direct child of the **GALLERY**. |
| **FIGURE** | `figure` | `.${bemRoot}__figure` | The figure container |
| **LINK** | `a` | `.${bemRoot}__link` | The anchor element that contains the full resolution image. |
| **THUMB** | `img` | `.${bemRoot}__thumbnail` | The img thumbnail. |
| **CAPTION** | `figcaption` | `.${bemRoot}__caption` | Captions for each image. |
| **PSWP** | `.pswp` | N/A | The [PhotoSwipe element](http://photoswipe.com/documentation/getting-started.html). |

### Example
`{ bemRoot: 'pswp-gallery' }`
```html
<figure class="pswp-gallery">
  <figcaption class="pswp-gallery__title">Kittens</figcaption>
  <figure class="pswp-gallery__figure">
    <a class="pswp-gallery__link" href="http://placekitten.com/2000/1500">
      <img class="pswp-gallery__thumbnail" src="http://placekitten.com/200/150" alt="An orange and white kitten looks on from behind a doorframe." />
    </a>
    <figcaption class="pswp-gallery__caption">Kittens are tiny cats.</figcaption>
  </figure>
</figure>
```


## Methods

`$.photoswiper(options)` or
```javascript
// jQuery
$('.pswp-gallery').photoswiper({
    history: 'false',       // PhotoSwipe option
    bgOpacity: .7,          // PhotoSwipe option
    structure: {
        FIGURE: '.myFigure' // Override default
    }
})

// Create a new class without jQuery
let myGallery = document.getElementById('myGallery')
let pswpr = new photoswiper({
    el: myGallery,          // Must be a single element
    bemRoot: 'pswp-gallery'
})
```

`enable()`
```javascript
// jQuery
$('.pswp-gallery').photoswiper('enable')

// no jQuery (the class has already been initialized)
pswpr.enable()
```

`disable()`
```javascript
// jQuery
$('.pswp-gallery').photoswiper('disable')

// no jQuery (the class has already been initialized)
pswpr.disable()
```

`toggle()`
```javascript
// jQuery
$('.pswp-gallery').photoswiper('toggle')

// no jQuery (the class has already been initialized)
pswpr.toggle()
```
