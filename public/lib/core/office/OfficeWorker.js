(function(a){function p(b,a){return fetch(b).then(function(b){console.log("Pos 1");if(200!==b.status)throw Error("Response failed with code "+b.status);console.log("Pos 2");console.log(b);console.log("Pos 2a");var e=!1,c=new ReadableStream({start:function(c){function q(){if(!e)return console.log("Pos 4"),f.read().then(function(b){e=b.done;b=b.value;e?(console.log("Done"),(b=a.End())?c.enqueue(b):c.close()):(b=a.GetNextChunk(b),console.log("Enqueue"),b&&c.enqueue(b))}).then(q)}console.log("Pos 3");
var B=b.body;console.log("Pos 3z"+B);var f=B.getReader();q()}});console.log("Pos 2b");return new Response(c,{headers:{"content-type":"application/wasm"}})})}var g=function(b){if("string"===typeof b){for(var a=new Uint8Array(b.length),d=b.length,e=0;e<d;e++)a[e]=b.charCodeAt(e);return a}return b},e=function(b){if("string"!==typeof b){for(var a="",d=0,e=b.length,c;d<e;)c=b.subarray(d,d+1024),d+=1024,a+=String.fromCharCode.apply(null,c);return a}return b},c=!1,k=function(b,w){c||(importScripts(a.basePath+
"decode.min.js"),c=!0);var d=self.BrotliDecode(g(b));return w?d:e(d)},f=function(){this.remainingDataArrays=[]};f.prototype={processRaw:function(b){return b},processBrotli:function(b){this.remainingDataArrays.push(b);return null},GetNextChunk:function(b){this.decodeFunction||(this.decodeFunction=0===b[0]&&97===b[1]&&115===b[2]&&109===b[3]?this.processRaw:this.processBrotli);return this.decodeFunction(b)},End:function(){if(this.remainingDataArrays.length){for(var b=this.arrays,a=0,d=0;d<b.length;++d)a+=
b[d].length;for(var a=new Uint8Array(a),e=0,d=0;d<b.length;++d){var c=b[d];a.set(c,e);e+=c.length}return k(a,!0)}return null}};var h=!1,l=function(b,c){h||(importScripts(a.basePath+"rawinflate.js",a.basePath+"pako_inflate.min.js"),h=!0);var d=10;if("string"===typeof b){if(b.charCodeAt(3)&8){for(;0!==b.charCodeAt(d);++d);++d}}else if(b[3]&8){for(;0!==b[d];++d);++d}if(c)return b=g(b),b=b.subarray(d,b.length-8),a.pako.inflate(b,{windowBits:-15});b=e(b);b=b.substring(d,b.length-8);return a.RawDeflate.inflate(b)},
r=function(b,a){return a?b:e(b)},t=function(b){var a=!b.shouldOutputArray,d=new XMLHttpRequest;d.open("GET",b.url,b.isAsync);var c=a&&d.overrideMimeType;d.responseType=c?"text":"arraybuffer";c&&d.overrideMimeType("text/plain; charset=x-user-defined");d.send();var f=function(){Date.now();var q;q=c?d.responseText:new Uint8Array(d.response);q.length<b.compressedMaximum?(q=b.decompressFunction(q,b.shouldOutputArray),console.warn("There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See http://www.pdftron.com/kb_content_encoding for instructions on how to resolve this.")):
a&&(q=e(q));return q},n;if(b.isAsync)n=new Promise(function(q,a){d.onload=function(){200===this.status?q(f()):a("Download Failed "+b.url)};d.onerror=function(){a("Network error occurred "+b.url)}});else{if(200===d.status)return f();throw Error("Failed to load "+b.url);}return n},u=function(b){var a=b.lastIndexOf("/");-1===a&&(a=0);var d=b.slice(a).replace(".",".br.");return b.slice(0,a)+d},m=function(b,a){var d=b.lastIndexOf("/");-1===d&&(d=0);var c=b.slice(d).replace(".",".gz.");a.url=b.slice(0,
d)+c;a.decompressFunction=l;return t(a)},n=function(b,a){a.url=u(b);a.decompressFunction=k;return t(a)},v=function(b,a){a.url=b;a.decompressFunction=r;return t(a)},y=function(b,a,d,c){return b["catch"](function(b){console.warn(b);return c(a,d)})},z=function(b,a,d){var c;if(d.isAsync){var e=a[0](b,d);for(c=1;c<a.length;++c)e=y(e,b,d,a[c]);return e}for(c=0;c<a.length;++c)try{return a[c](b,d)}catch(f){console.warn(f.message)}throw Error("");};a.getBrotliUrl=u;a.loadURLWithBrotliPriority=function(b,a,
c,e){var f={};f.compressedMaximum=a;f.isAsync=c;f.shouldOutputArray=e;return z(b,[n,m,v],f)};a.loadURLWithGzipPriority=function(a,c,e,f){var h={};h.compressedMaximum=c;h.isAsync=e;h.shouldOutputArray=f;return z(a,[m,n,v],h)};a.loadWasmBrotliStream=function(a){return p(a,new f)}})("undefined"===typeof window?this:window);(function(a){var p=a._trnDebugMode||a._trnLogMode,g=a._logFiltersEnabled?a._logFiltersEnabled:{};a.utils=a.utils?a.utils:{};a.utils.warn=function(a,c){c||(c=a,a="default");p&&g[a]&&console.warn(a+": "+c)};a.utils.log=function(a,c){c||(c=a,a="default");p&&g[a]&&console.log(a+": "+c)};a.utils.error=function(a){p&&console.error(a);throw Error(a);};a.info=function(a,c){};a.warn=function(e,c){a.utils.warn(e,c)};a.error=function(e){a.utils.error(e)}})("undefined"===typeof window?this:window);(function(a){function p(a){return new Promise(function(c,g){var f=indexedDB.open("wasm-cache",a);f.onerror=g.bind(null,"Error opening wasm cache database");f.onsuccess=function(){c(f.result)};f.onupgradeneeded=function(a){var c=f.result;c.objectStoreNames.contains("wasm-cache")&&(console.log("Clearing out version "+a.oldVersion+" wasm cache"),c.deleteObjectStore("wasm-cache"));console.log("Creating version "+a.newVersion+" wasm cache");c.createObjectStore("wasm-cache")}})}function g(a,c){return new Promise(function(g,
f){var h=a.transaction(["wasm-cache"]).objectStore("wasm-cache").get(c);h.onsuccess=function(a){h.result?g(h.result):f("Module "+c+" was not found in wasm cache")};h.onerror=f.bind(null,"Error getting wasm module "+c)})}a.isWasmCached=function(a,c){return p(a).then(function(a){return g(a,c).then(function(){return!0})})["catch"](function(){return!1})};a.instantiateCachedURL=function(e,c,k,f){function h(a,f){var e=a.transaction(["wasm-cache"],"readwrite").objectStore("wasm-cache").put(f,c);e.onerror=
function(a){console.log("Failed to store in wasm cache: "+a)};e.onsuccess=function(a){console.log("Successfully stored "+c+" in wasm cache")}}function l(e){r=r||Date.now();return e?fetch(a.getBrotliUrl(c)).then(function(a){return WebAssembly.instantiateStreaming(a,k)})["catch"](function(a){return l(!1)}):a.loadURLWithBrotliPriority(c,f,!0,!0).then(function(a){Date.now();return WebAssembly.instantiate(a,k)})}var r;return p(e).then(function(a){return g(a,c).then(function(a){return WebAssembly.instantiate(a,
k)},function(c){return l(!!WebAssembly.instantiateStreaming).then(function(c){try{h(a,c.module)}catch(f){}return c.instance})})},function(a){console.log(a);return l().then(function(a){return a.instance})})}})(this);(function(a){a.getWasmVersion=function(){return 25}})("undefined"===typeof window?this:window);(function(a){a.Uint8ClampedArray||(a.Uint8ClampedArray=a.Uint8Array);"undefined"===typeof a.crypto&&(a.crypto={getRandomValues:function(a){for(var c=0;c<a.length;c++)a[c]=256*Math.random()}});var p=!(!self.WebAssembly||!self.WebAssembly.validate),g=/^((?!chrome|android).)*safari/i.test(a.navigator.userAgent),e=/Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(a.navigator.userAgent),c=-1<a.navigator.userAgent.indexOf("Edge/16")||-1<a.navigator.userAgent.indexOf("MSAppHost"),k=function(a){var c=this;
this.promise=a.then(function(a){c.response=a;c.status=200})};k.prototype={addEventListener:function(a,c){this.promise.then(c)}};a.loadCompiledBackend=function(f,h,l){if(!p||l||c||g||e){l=loadURLWithGzipPriority((Module.asmjsPrefix?Module.asmjsPrefix:"")+f+".js.mem",h[".js.mem"],!1);var r=loadURLWithGzipPriority((Module.memoryInitializerPrefixURL?Module.memoryInitializerPrefixURL:"")+f+".mem",h[".mem"],!0,!0);Module.memoryInitializerRequest=new k(r)}else Module.instantiateWasm=function(c,e){return self.instantiateCachedURL(a.getWasmVersion(),
f+"Wasm.wasm",c,h["Wasm.wasm"]).then(function(a){e(a)})},l=loadURLWithBrotliPriority(f+"Wasm.js.mem",h["Wasm.js.mem"],!1,!1);l=new Blob([l],{type:"application/javascript"});importScripts(URL.createObjectURL(l))}})("undefined"===typeof window?this:window);(function(a){function p(){for(var a=0;a<x.length;a++)x[a][0](x[a][1]);x=[];A=!1}function g(a,b){x.push([a,b]);A||(A=!0,C(p,0))}function e(a,b){function c(a){f(b,a)}function d(a){l(b,a)}try{a(c,d)}catch(e){d(e)}}function c(a){var c=a.owner,d=c.state_,c=c.data_,e=a[d];a=a.then;if("function"===typeof e){d=b;try{c=e(c)}catch(g){l(a,g)}}k(a,c)||(d===b&&f(a,c),d===w&&l(a,c))}function k(a,b){var c;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(b&&("function"===
typeof b||"object"===typeof b)){var d=b.then;if("function"===typeof d)return d.call(b,function(d){c||(c=!0,b!==d?f(a,d):h(a,d))},function(b){c||(c=!0,l(a,b))}),!0}}catch(e){return c||l(a,e),!0}return!1}function f(a,b){a!==b&&k(a,b)||h(a,b)}function h(a,b){a.state_===y&&(a.state_=z,a.data_=b,g(t,a))}function l(a,b){a.state_===y&&(a.state_=z,a.data_=b,g(u,a))}function r(a){var b=a.then_;a.then_=void 0;for(a=0;a<b.length;a++)c(b[a])}function t(a){a.state_=b;r(a)}function u(a){a.state_=w;r(a)}function m(a){if("function"!==
typeof a)throw new TypeError("Promise constructor takes a function argument");if(!1===this instanceof m)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];e(a,this)}a.createPromiseCapability=function(){var a={},b=new m(function(b,c){a.resolve=b;a.reject=c});a.promise=b;return a};var n=a.Promise,v=n&&"resolve"in n&&"reject"in n&&"all"in n&&"race"in n&&function(){var a;new n(function(b){a=b});return"function"===
typeof a}();"undefined"!==typeof exports&&exports?(exports.Promise=v?n:m,exports.Polyfill=m):"function"==typeof define&&define.amd?define(function(){return v?n:m}):v||(a.Promise=m);var y="pending",z="sealed",b="fulfilled",w="rejected",d=function(){},C="undefined"!==typeof setImmediate?setImmediate:setTimeout,x=[],A;m.prototype={constructor:m,state_:y,then_:null,data_:void 0,then:function(a,e){var f={owner:this,then:new this.constructor(d),fulfilled:a,rejected:e};this.state_===b||this.state_===w?g(c,
f):this.then_.push(f);return f.then},"catch":function(a){return this.then(null,a)}};m.all=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(b,c){function d(a){f++;return function(c){e[a]=c;--f||b(e)}}for(var e=[],f=0,g=0,n;g<a.length;g++)(n=a[g])&&"function"===typeof n.then?n.then(d(g),c):e[g]=n;f||b(e)})};m.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");
return new this(function(b,c){for(var d=0,e;d<a.length;d++)(e=a[d])&&"function"===typeof e.then?e.then(b,c):b(e)})};m.resolve=function(a){return a&&"object"===typeof a&&a.constructor===this?a:new this(function(b){b(a)})};m.reject=function(a){return new this(function(b,c){c(a)})}})("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this);(function(a){ArrayBuffer.prototype.slice||(ArrayBuffer.prototype.slice=function(a,g){void 0===a&&(a=0);void 0===g&&(g=this.byteLength);a=Math.floor(a);g=Math.floor(g);0>a&&(a+=this.byteLength);0>g&&(g+=this.byteLength);a=Math.min(Math.max(0,a),this.byteLength);g=Math.min(Math.max(0,g),this.byteLength);if(0>=g-a)return new ArrayBuffer(0);var e=new ArrayBuffer(g-a),c=new Uint8Array(e),k=new Uint8Array(this,a,g-a);c.set(k);return e})})(this);var tikTokStart=null;
(function(a){function p(a){a=e(a);r(a.msg)}function g(){m=function(){}}function e(a){var c=[];return{resource_array:c,msg:JSON.stringify(a.data,function(a,e){if("object"===typeof e){var b=null;e instanceof Uint8Array?b=e:e instanceof ArrayBuffer&&(b=new Uint8Array(e));if(b){var f=t(b.length),d=u(f);d&&(new Uint8Array(Module.HEAPU8.buffer,d,b.length)).set(b);c.push(f);return{__trn_res_id:f}}}return e})}}a.basePath="../";var c=a.officeWorkerPath||"";a.workerBasePath&&(a.basePath=a.workerBasePath);var k=
function(a){var c={};decodeURIComponent(a.slice(1)).split("&").forEach(function(a){a=a.split("=",2);c[a[0]]=a[1]});return c}(a.location.search);a.basePath=k.externalPath?k.externalPath:a.basePath+"external/";importScripts(a.basePath+"Promise.js");var f=[];onmessage=function(a){f||(f=[]);f.push(a)};a.ContinueFunc=function(a){m("ContinueFunc called");setTimeout(function(){onmessage({data:{action:"continue"}})},a)};var h;k.pdfWorkerPath&&(h=k.pdfWorkerPath);var l;k.officeAsmPath&&(l=k.officeAsmPath);
a.Module={memoryInitializerPrefixURL:h,asmjsPrefix:l,onRuntimeInitialized:function(){console.log("on ready");m||g();var c=Date.now()-tikTokStart;a.utils.log("load","time duration from start to ready: "+JSON.stringify(c));r=function(a){if(null!==a&&void 0!==a&&0!==a){var c=(a.length<<2)+1,e=Module._malloc(c);0<Module.stringToUTF8(a,e,c)&&Module._TRN_OnMessage(e)}};t=function(a){return Module._TRN_CreateBufferResource(a)};u=function(a){return Module._TRN_GetResourcePointer(a)};m("OnReady called");onmessage=
p;Module._TRN_InitWorker();for(c=0;c<f.length;++c)onmessage(f[c]);f=null},fetchSelf:function(){tikTokStart=Date.now();a.loadCompiledBackend(c+"WebOfficeWorker",{"Wasm.wasm":5E6,"Wasm.js.mem":1E5,".js.mem":5E6,".mem":3E6},!!navigator.userAgent.match(/Edge/i));console.log("end of fetch self")},noExitRuntime:!0};var r,t,u,m;a.Module.fetchSelf()})("undefined"===typeof window?this:window);
