# LoadAssets

A small library to load assets dinamically. Use it when you need to preload your assets and add it dinamically to the DOM.
The supported assets are:
  - Images (anything than can be used in the img tag)
  - SVG (inline)
  - CSS
  - JavaScript

**It's less than 2Kb minified and les than 1Kb Gziped.**

## SVG
The library loads and injects SVG files inline with support for fallback to a png file in case the browser doesn't support SVG. To use it, you've got to pass the argument `hasFallback: true`.

You can also load a SVG as an image, using the `<img>` tag, is you pass the SVG with the type image, instead of SVG. Note that this won't check for SVG support and won't provide any fallback.

## How to use it

    //LoadAssets Object
    var loadAssets = new LoadAssets([{
      type: 'style',
      filename: 'test/assets/css/style.css',
      order: 1
    },{
      type: 'js',
      filename: 'test/assets/js/test.js',
      order: 2
    },{
      type: 'svg',
      filename: 'test/assets/images/advance',
      target: '.advance',
      hasFallback: true
    },{
      type: 'image',
      filename: 'test/assets/images/javascript.png'
    }], function(object) {
      console.info('Count: '+loadAssets.count, object);
      // This is already cached
      document.querySelector('.javascript')
              .insertAdjacentHTML('beforeend', '<img src="test/assets/images/javascript.png">')
    });

## License
LoadAssets is licensed under the MIT license. (http://opensource.org/licenses/MIT)
