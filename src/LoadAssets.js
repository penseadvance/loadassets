/**
 * Class for loading assets
 * @param {Object[]}  listAssets    List of objects with parameters for each file
 * @param {function}  callbackLoad  Callback for each asset loaded
 * @param {string}    assetsRoot    Relative or absolute path from the root of assets
 */
var LoadAssets = function(listAssets, callbackLoad, assetsRoot){

  var self = this;
  var baseUrl = (assetsRoot !== undefined ? assetsRoot+'/' : assetsRoot) || '';
  var orderedList = [];
  var unorderedList = [];
  self.count = 0;


  /**
   * Load data from the server using a HTTP GET request.
   * @param  {string}    url            A string containing the URL to which the request is sent.
   * @param  {function}  callback       A callback function that is executed if the request succeeds.
   * @param  {function}  errorCallback  A function to be called if the request fails.
   * @param  {boolean}   async          Parameter that defines whether the request is synchronous or asynchronous
   */
  self.get = function(url, callback, errorCallback, async){
    async = (typeof async == "boolean" ? async : true);
    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, async);
    ajax.onload = function(){
      if(typeof callback == "function") callback(ajax.response);
      if(typeof errorCallback == "function") errorCallback(ajax.response);
    };
    ajax.send();
  };

  /**
   * Checks whether the object has the necessary properties to be used
   * @param  {Object}  obj  The object that is loaded
   */
  self.validateObject = function(obj){
    return (typeof obj === "object" && Object.keys(obj).indexOf('type') !== -1 && Object.keys(obj).indexOf('filename') !== -1 ? true : false);
  };

  /**
   * Injects the elements loaded in the DOM
   * @param  {Object[]}  allElements  Loaded elements
   * @param  {function}  callback     A callback function that is executed if the process succeeds.
   */
  var injectElements = function(allElements, callback){
    for(var el in allElements){
      if(allElements[el].type == 'js' || allElements[el].type == 'style'){
        document.querySelector('head').appendChild(allElements[el].element);
      }
    }
    if(typeof callback === 'function') callback(allElements);
  };

  /**
   * Sorts the elements loaded
   * @param  {object}  object  Loaded elements
   */
  var putInOrder = function(object, callback){
    if(typeof object.order !== 'undefined' && typeof object.order == 'number'){
      orderedList.push(object);
    }else {
      unorderedList.push(object);
    }
    if(orderedList.concat(unorderedList).length == listAssets.length){
      orderedList.sort(function(a, b){
        return a.order - b.order;
      });
      if(typeof callback === 'function') callback(orderedList.concat(unorderedList));
    }
  };

  /**
   * Starts loading the files
   */
  self.startLoad = function() {

    if(typeof listAssets === "object" && listAssets.length) {
      for(var item in listAssets) {
        var currentItem = listAssets[item];
        if(self.validateObject(currentItem)) {
          switch(currentItem.type) {
            case 'image':
              self.loadImage(currentItem, function(object) {
                putInOrder(object, function(allElements) {
                  injectElements(allElements, function(object) {
                    if(typeof callbackLoad == 'function') callbackLoad(object);
                  });
                });
              });
              break;

            case 'svg':
              self.loadSVG(currentItem, function(object) {
                putInOrder(object, function(allElements) {
                  injectElements(allElements, function(object) {
                    if(typeof callbackLoad == 'function') callbackLoad(object);
                  });
                });
              });
              break;

            case 'js':
              self.loadScript(currentItem, function(object) {
                putInOrder(object, function(allElements) {
                  injectElements(allElements, function(object) {
                    if(typeof callbackLoad == 'function') callbackLoad(object);
                  });
                });
              });
              break;

            case 'style':
              self.loadCss(currentItem, function(object) {
                putInOrder(object, function(allElements){
                  injectElements(allElements, function(object){
                    if(typeof callbackLoad == 'function') callbackLoad(object);
                  });
                });
              });
              break;
          }
        }else {
          console.alert("You need to pass the file name and type of " + currentItem.filename);
        }
      }
    }else {
      console.error("The first parameter of the constructor must be a list of objects");
    }
  };

  /**
   * Loads and inserts the contents of a script in the DOM
   * @param  {object}    object    Object configured for asset loading
   * @param  {function}  callback  A callback function that is executed if the request succeeds
   */
  self.loadScript = function(object, callback){
    self.get(baseUrl+object.filename, function(content){
      var newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.innerHTML = content;
      object.element = newScript;

      self.count++;
      if(typeof callback == 'function') callback(object);
    });
  };

  /**
   * Loads a image
   * @param  {object}    object    Object configured for asset loading
   * @param  {function}  callback  A callback function that is executed if the request succeeds
   */
  self.loadImage = function(object, callback){
    var newImage = new Image();
    newImage.onload = function(){
      object.element = newImage;

      self.count++;
      if(typeof callback == 'function') callback(object);
    };
    newImage.src = baseUrl+object.filename;
  };

  /**
   * Test if the browser is capable of use inline SVG
   */
  self.isSvgAble = function() {
    var div = document.createElement('div');
     div.innerHTML = '<svg/>';
    if((typeof SVGRect != 'undefined' && div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg') {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Loads and inserts the contents of a svg into the DOM
   * @param  {object}    object    Object configured for asset loading
   * @param  {function}  callback  A callback function that is executed if the request succeeds
   */
  self.loadSVG = function(object, callback) {
    var target = document.querySelectorAll(object.target);

    if(self.isSvgAble() === true) {
      self.get(baseUrl + object.filename + '.svg', function(content) {
        var i = 0;
        while(i < target.length) {
          target[i].insertAdjacentHTML('beforeend', content);
          i++;
        }

        self.count++;
        if(typeof callback == 'function') callback(object);
      });

    } else {
      if(object.hasFallback) {
        self.loadImage({
          type: 'image',
          filename: baseUrl + object.filename + '.png'
        }, function(){
          console.log('dfjhdsfh')
          var i = 0;
          while(i < target.length) {
            target[i].insertAdjacentHTML('beforeend', '<img src="'+ baseUrl + object.filename + '.png">');
            i++;
          }
          self.count++;
          if(typeof callback == 'function') callback(object);
        });
      }
    }

  }

  /**
   * Loads and inserts the contents of a style in the DOM
   * @param  {object}    object    Object configured for asset loading
   * @param  {function}  callback  A callback function that is executed if the request succeeds
   */
  self.loadCss = function(object, callback) {
    self.get(baseUrl + object.filename, function(content) {
      var newStyle = document.createElement('style');
      newStyle.type = "text/css";
      newStyle.innerHTML = content;
      object.element = newStyle;

      self.count++;
      if(typeof callback == 'function') callback(object);
    });
  };


};
