var LoadAssets=function(a,b,c){var d=this,e=(void 0!==c?c+"/":c)||"",f=[],g=[];d.count=0,d.get=function(a,b,c,d){d="boolean"==typeof d?d:!0;var e=new XMLHttpRequest;e.open("GET",a,d),e.onload=function(){"function"==typeof b&&b(e.response),"function"==typeof c&&c(e.response)},e.send()},d.validateObject=function(a){return"object"==typeof a&&-1!==Object.keys(a).indexOf("type")&&-1!==Object.keys(a).indexOf("filename")};var h=function(a,b){for(var c in a)"js"!=a[c].type&&"style"!=a[c].type||document.querySelector("head").appendChild(a[c].element);"function"==typeof b&&b(a)},i=function(b,c){"undefined"!=typeof b.order&&"number"==typeof b.order?f.push(b):g.push(b),f.concat(g).length==a.length&&(f.sort(function(a,b){return a.order-b.order}),"function"==typeof c&&c(f.concat(g)))};d.startLoad=function(){if("object"==typeof a&&a.length)for(var c in a){var e=a[c];if(d.validateObject(e))switch(e.type){case"image":d.loadImage(e,function(a){i(a,function(a){h(a,function(a){"function"==typeof b&&b(a)})})});break;case"svg":d.loadSVG(e,function(a){i(a,function(a){h(a,function(a){"function"==typeof b&&b(a)})})});break;case"js":d.loadScript(e,function(a){i(a,function(a){h(a,function(a){"function"==typeof b&&b(a)})})});break;case"style":d.loadCss(e,function(a){i(a,function(a){h(a,function(a){"function"==typeof b&&b(a)})})})}else console.alert("You need to pass the file name and type of "+e.filename)}else console.error("The first parameter of the constructor must be a list of objects")},d.loadScript=function(a,b){d.get(e+a.filename,function(c){var e=document.createElement("script");e.type="text/javascript",e.innerHTML=c,a.element=e,d.count++,"function"==typeof b&&b(a)})},d.loadImage=function(a,b){var c=new Image;c.onload=function(){a.element=c,d.count++,"function"==typeof b&&b(a)},c.src=e+a.filename},d.isSvgAble=function(){var a=document.createElement("div");return a.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&a.firstChild&&a.firstChild.namespaceURI)},d.loadSVG=function(a,b){var c=document.querySelectorAll(a.target);!d.isSvgAble()==!0?d.get(e+a.filename+".svg",function(e){for(var f=0;f<c.length;)c[f].insertAdjacentHTML("beforeend",e),f++;d.count++,"function"==typeof b&&b(a)}):a.hasFallback&&d.loadImage({type:"image",filename:e+a.filename+".png",callback:function(){console.log("dfjhdsfh");for(var f=0;f<c.length;)c[f].insertAdjacentHTML("beforeend",e+a.filename+".png"),f++;d.count++,"function"==typeof b&&b(a)}})},d.loadCss=function(a,b){d.get(e+a.filename,function(c){var e=document.createElement("style");e.type="text/css",e.innerHTML=c,a.element=e,d.count++,"function"==typeof b&&b(a)})}};