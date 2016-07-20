# Photoswiper
An ES6 jQuery plugin for easy and accessible [PhotoSwipe](http://photoswipe.com/) initialization.

## Usage
`.photoswipe()`
```javascript
import $ from 'jquery'
import 'photoswiper'

$(() => {
  $('.pswp-gallery').photoswipe()
})
```
PhotoSwipe and PhotoSwipeUI_Default are both included in the Photoswiper class, so you don't need to add them as a dependency to your project. The PhotoSwipe class is attached to Photoswiper, and can be referenced with `$.fn.photoswipe.PhotoSwipe`.

## Structure
Photoswiper uses [BEM](https://css-tricks.com/bem-101/) CSS selectors to target the different elements of the image gallery.
Elements include:
* `.pswp-gallery` The root gallery element. Change this by passing a `namespace` value on initialization, and all the following elements will change as well.
* `.pswp-gallery__title` The title of the whole gallery (this should be a direct child of `.pswp-gallery`.
* `.pswp-gallery__figure` The figure container
* `.pswp-gallery__link` The anchor element that contains the full resolution image
* `.pswp-gallery__thumbnail` The img thumbnail
* `.pswp-gallery__caption` Captions for each image
* `.pswp` The [PhotoSwipe element](http://photoswipe.com/documentation/getting-started.html).

### Example
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

## Options
Photoswiper provides a couple extra options in addition to [all the PhotoSwipe options](http://photoswipe.com/documentation/options.html).

| Option | Type | Default |
| ------ | ---- | ------- |
| `namespace` | `string` | `pswp-gallery` |
| `tabtrap` | `boolean` | `true` |

`namespace`
Use this to customize your selectors. For instance, passing `myImages` would cause the figure element selctor to become `.myImages__figure` instead of `.pswp-gallery__figure`.

`tabtrap` The [tabtrap](https://github.com/sh0ji/tabtrap) dependency improves accessibility by ensuring that keyboard users can't tab through tabbable elements outside of the PhotoSwipe modal. Set to `false` to disable it (not recommended).


## Methods

`.photoswipe(options)`
```javascript
$('.pswp-gallery').photoswipe({
  history: 'false',         // PhotoSwipe option
  namespace: 'my-gallery'   // Photoswiper option
})
```

`.photoswipe('enable')`
```javascript
$('#enable-pswp').on('click', (e) => {
  $('.pswp-gallery').photoswipe('enable')
})
```

`.photoswipe('disable')`
```javascript
$('#disable-pswp').on('click', (e) => {
  $('.pswp-gallery').photoswipe('disable')
})
```

`.photoswipe('toggle')`
```javascript
$(document).on('keydown', (e) => {
  if (e.which === 84) {     // 't'
    $('.pswp-gallery').photoswipe('toggle')
  }
})
```

## Credit
A great deal of the ES6 structure was borrowed from [Bootstrap 4's plugin patterns](https://github.com/twbs/bootstrap/tree/v4-dev/js/src).
