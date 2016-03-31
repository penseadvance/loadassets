# LoadAssets

A small library to load assets dinamically. Use it when you need to preload your assets and add it dinamically to the DOM.
The supported assets are:
  - Images (anything than can be used in the img tag)
  - SVG (inline)
  - CSS
  - JavaScript

It's less than 2Kb minified and les than 1Kb Gziped.

## How to use it

    var loadAssets = new LoadAssets([{ // Load style
      type: 'style',
      filename: 'assets/css/style.css',
      order: 1
    },{
      type: 'js',
      filename: 'assets/js/test.js',
      order: 2
    },{
      type: 'image',
      filename: 'assets/images/image.png'
    }], function(object){ // Callback for this file
      console.info('Count: '+loadAssets.count, object);
    });

## License
LoadAssets is licensed under the MIT license. (http://opensource.org/licenses/MIT)
