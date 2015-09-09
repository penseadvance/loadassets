/**
 * Class for loading assets
 * @param {Object[]}  listAssets    List of objects with parameters for each file
 * @param {function}  callbackLoad  Callback for each asset loaded
 * @param {string}    assetsRoot    Callback for each asset loaded
 */
var LoadAssets = function(listAssets, callbackLoad, assetsRoot){
  
  var self = this;
  var baseUrl = (assetsRoot !== undefined ? assetsRoot+'/' : assetsRoot) || '';
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
   * Starts loading the files
   */
  self.startLoad = function(){
    if(typeof listAssets === "object" && listAssets.length){
      for(item in listAssets){
        var currentItem = listAssets[item];
        if(self.validateObject(currentItem)){
          switch(currentItem.type){
            case 'image':
              self.loadImage(baseUrl+currentItem.filename);
              break;
            case 'js':
              self.loadScript(baseUrl+currentItem.filename);
              break;
            case 'style':
              self.loadCss(baseUrl+currentItem.filename);
              break;
          }
        }
      }
    }else {
      console.error("The first parameter of the constructor must be a list of objects");
    }
  };

  /**
   * Loads and inserts the contents of a script in the DOM
   * @param  {string}    url       A string containing the URL to which the request is sent.
   * @param  {function}  callback  A callback function that is executed if the request succeeds.
   */
  self.loadScript = function(url, callback){
    self.get(url, function(content){
      var newScript = document.createElement('script');
      newScript.type = 'text/javascript';
      newScript.innerHTML = content;
      document.querySelector('head').appendChild(newScript);
      self.count++;
      if(typeof callbackLoad == 'function') callbackLoad();
      if(typeof callback == 'function') callback(newStyle);
    });
  };

  /**
   * Loads a image
   * @param  {string}    url       A string containing the URL to which the request is sent.
   * @param  {function}  callback  A callback function that is executed if the request succeeds.
   */
  self.loadImage = function(url, callback){
    var newImage = new Image();
    newImage.onload = function(){
      self.count++;
      if(typeof callbackLoad == 'function') callbackLoad();
      if(typeof callback == 'function') callback(newImage);
    };
    newImage.src = url;
  };

  /**
   * Loads and inserts the contents of a style in the DOM
   * @param  {string}    url       A string containing the URL to which the request is sent.
   * @param  {function}  callback  A callback function that is executed if the request succeeds.
   */
  self.loadCss = function(url, callback){
    self.get(url, function(content){
      var newStyle = document.createElement('style');
      newStyle.type = "text/css";
      newStyle.innerHTML = content;
      document.querySelector('head').appendChild(newStyle);
      self.count++;
      if(typeof callbackLoad == 'function') callbackLoad();
      if(typeof callback == 'function') callback(newStyle);
    });
  };
  
};
