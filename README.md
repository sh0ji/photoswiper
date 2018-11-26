# Photoswiper

> An plugin for easy and accessible [PhotoSwipe](http://photoswipe.com/) initialization.

## Usage

Photoswiper comes with two versions: a [Node.js version](blob/master/dist/photoswiper.js) and a [standalone version that can be used in the browser](blob/master/dist/photoswiper.browser.js).
Both will automatically set up event listeners to open the PhotoSwipe instance on click.

### Node

1. Import Photoswiper
2. Instantiate Photoswiper with a [gallery element](http://photoswipe.com/documentation/getting-started.html#dom-to-slide-objects)

```javascript
const Photoswiper = require('photoswiper');

const myGallery = new Photoswiper(document.getElementById('my-gallery'));
```

### Browser

1. Add the script to your document
2. Instantiate Photoswiper with a [gallery element](http://photoswipe.com/documentation/getting-started.html#dom-to-slide-objects)

```html
<html lang="en">
  <head>
    <!-- ...other head stuff... -->
    <script src="scripts/photoswiper.browser.js" defer></script>
    <script src="scripts/main.js" defer></script>
  </head>
  <!-- ...body... -->
</html>
```

Main.js:

```javascript
"use strict"

var myGallery = new Photoswiper(document.getElementById('my-gallery'));
```

## API

A few helpful hooks are available on the Photoswiper instance.

### \#disable()

Disable the event listeners so that the PhotoSwipe instance isn't triggered on click.

### \#enable()

Enable the event listeners so that the PhotoSwipe instance is triggered on click.
Note that this is automatically set during instantiation.
You only need to call it if you've explicitly disabled the instance.

### \#toggle()

Switch between enabled/disabled.

### \#open(index: number, triggerEl: HTMLElement, fromUrl: boolean = false)

Open the PhotoSwipe instance. This is what is called on click.

For example, you can use this to open the PhotoSwipe instance when clicking another element:

```javascript
// this assumes a button with aria-controls:
// <button id="some-button" aria-controls="id-of-pswp-item">...</button>
// and a gallery item with a data-pid corresponding to its index in the gallery:
// <figure id="id-of-pswp-item" data-pid="2">...</figure>

const triggerBtn = document.getElementById('some-button');
triggerBtn.onclick = function openRelated() {
  const related = document.getElementById(this.getAttribute('aria-controls'));
  const i = parseInt(related.getAttribute('data-pid'), 10);
  myGallery.open(i, this);
}
```

## Options

Photoswiper provides a few extra options in addition to [all the PhotoSwipe options](http://photoswipe.com/documentation/options.html).

| Option | Type | Default |
| ---- | ---- | ---- |
| `bemRoot` | `string` | undefined |
| `onInit` | `function` | noop |
| `onOpen` | `function` | noop |
| `PhotoSwipeUI` | `function` | The [default PhotoSwipe UI](https://github.com/dimsemenov/PhotoSwipe/blob/master/src/js/ui/photoswipe-ui-default.js). |
| `selectors` | `object` | See the [Selectors](#selectors) documentation. |

* `bemRoot`

Use this to customize your [selectors](#selectors) according to BEM [BEM](https://css-tricks.com/bem-101/) conventions. For instance, passing `myImages` would cause the figure element selector to become `.myImages__figure` instead of `.pswp-gallery__figure`.

* `onInit(figures: NodeList)`

This is called at the end of Photoswiper construction, but before the PhotoSwipe gallery has been opened.
Note that PhotoSwipe has [an onInit](http://photoswipe.com/documentation/api.html) hook that is called when the PhotoSwipe instance opens.

```javascript
const myGallery = new Photoswiper(galleryEl, {
  onInit(figures) {
    // do something with the list of figures, such as setting data-pid indices
    figures.forEach((figure, i) => {
      figure.setAttribute('data-pid', i);
    });
  },
});
```

* `onOpen(pswp: PhotoSwipe instance)`

This is called when PhotoSwipe opens. It corresponds to PhotoSwipe's own `onInit` hook.

```javascript
const myGallery = new Photoswiper(galleryEl, {
  onOpen(pswp) {
    // do something with the photoswipe instance
    console.log(pswp);
  },
});
```

* `photoswipeUI`

Specify your PhotoSwipe ui function here. Defaults to the [default PhotoSwipe UI](https://github.com/dimsemenov/PhotoSwipe/blob/master/src/js/ui/photoswipe-ui-default.js).

### Selectors

> NOTE: this was renamed from "Structure" in v3.0

Photoswiper defaults to semantic element selectors, but all selectors can be explicitly overriden. Optionally use [BEM](https://css-tricks.com/bem-101/) by supplying a `bemRoot` class name in the options (e.g. `{ bemRoot: 'pswp-gallery' }`).
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

#### Example Markup

This example assumes a `bemRoot` of "pswp-gallery":

```javascript
const myGallery = new Photoswiper(galleryEl, { bemRoot: 'pswp-gallery' });
```

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
<!-- ...other content... -->

<!-- http://photoswipe.com/documentation/getting-started.html#init-add-pswp-to-dom -->
<div class="pswp">...</div>
```
