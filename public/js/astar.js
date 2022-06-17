/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/helpers.js":
/*!*********************************!*\
  !*** ./resources/js/helpers.js ***!
  \*********************************/
/***/ ((module) => {

var helpers = {
  generateHslaColors: function generateHslaColors() {
    var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var colors = [];
    var randomVal = helpers.randomVal;

    for (var i = 0; i < total; i++) {
      var hsl = 'hsl(' + randomVal(0, 360) + ', ' + randomVal(30, 95) + '%,  ' + randomVal(30, 80) + '%)';
      colors.push(hsl);
    }

    return colors;
  },
  randomVal: function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }
};
module.exports = helpers;

/***/ }),

/***/ "./node_modules/node-astar/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/node-astar/lib/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



// A* Search for nodejs based on 
// http://www.briangrinstead.com/blog/astar-search-algorithm-in-javascript

const Node = __webpack_require__(/*! ./node.js */ "./node_modules/node-astar/lib/node.js");



function Astar (neighboursFunction) {
  this.allNodes = [];
  this.openNodes = [];
  this.nodeStart = null;
  this.nodeEnd = null;
  this.callback = null;
  
  this.lastBestNode = null;

  this.neighboursFunction = neighboursFunction;
}

//----------------------------------------------------------------------------
//  search
//    start - start node
//    end - end node
//    cb - response callback f(err,result)
//----------------------------------------------------------------------------

Astar.prototype.search = function (start, end, cb) {
  this.nodeStart = start;
  this.nodeEnd = end;
  this.callback = cb;

  // find last node
  var self = this;
  this.nodeStart.closed = true;
  this.lastBestNode = this.nodeStart;    
  this.allNodes[this.nodeStart.id] = this.nodeStart;
  findNeighbours(this, this.nodeStart);
};

//----------------------------------------------------------------------------
//  continueSearch
//----------------------------------------------------------------------------

Astar.prototype.continueSearch = function () {

  if (this.openNodes.length > 0) {

    // choose best node
    this.lastBestNode = this.allNodes[this.openNodes[0]];
      
    for(var i=1; i < this.openNodes.length; i++) {
      var n = this.allNodes[this.openNodes[i]];

      if(n.f < this.lastBestNode.f) { 
        this.lastBestNode = n; 
      }
    }

    // Check if we have ended
    if(this.lastBestNode.id == this.nodeEnd.id) {
      var ret = [ ];
      var bestNode = this.lastBestNode;


      while(bestNode) {
        ret.push(bestNode);
        bestNode = this.allNodes[bestNode.parent];
      }

      // return result                
      if (this.callback) {
        return this.callback (undefined, ret.reverse());
      }
    }

    // Close node and remove form set
    this.lastBestNode.closed = true;
    var i = this.openNodes.indexOf(this.lastBestNode.id);
    if(i != -1) {
      this.openNodes.splice(i, 1);
    }

    // find last node
    findNeighbours(this, this.lastBestNode);
  }
  else {
    return this.callback (undefined, []);
  }
};

//----------------------------------------------------------------------------
//  processNewNodes
//----------------------------------------------------------------------------

Astar.prototype.processNewNodes = function (neighborsIds) {

  if (!neighborsIds) {
    return; 
  }

  for(var i = 0; i < neighborsIds.length; i++) {

    var newNode = this.allNodes[neighborsIds[i]];

    // if closed, continue
    if (!newNode || newNode.closed) {
      continue;
    }

    // g score is the shortest distance from start to current node, we need to check if
    //   the path we have arrived at this neighbor is the shortest one we have seen yet
    var tentativeGScore = this.lastBestNode.g + this.lastBestNode.distanceTo(newNode);

    var gScoreIsBest = false;

    // check if we already calculated heuristic
    if(newNode.h < 0) {
      gScoreIsBest = true;
      newNode.h = newNode.distanceTo(this.nodeEnd);
      this.openNodes.push(newNode.id);
    }
    else if(tentativeGScore < newNode.g) {
      // We have already seen the node, but last time it had a worse g (distance from start)
      gScoreIsBest = true;
    }

    if(gScoreIsBest) {
      // Found an optimal (so far) path to this node.  Store info on how we got here and
      //  just how good it really is...
      newNode.parent = this.lastBestNode.id;
      newNode.g = tentativeGScore;
      newNode.f = newNode.g + newNode.h;
    }
  }
};


const findNeighbours = function (self, node) {
  self.neighboursFunction(node, function (nodes) {
    add(self, nodes);
  });
}

//----------------------------------------------------------------------------
//  add
//----------------------------------------------------------------------------

const add = function (self, nodes) {

  // check nodes exists
  if (!nodes || (nodes.length == 0)) {

    self.continueSearch();
    return;
  }

  var myneighbors = [];
  
  // for each node (except first)
  for(var i=0; i < nodes.length; i++) {

    var node = nodes[i];

    var n = self.allNodes[node.id];
    if (!n) {
      self.allNodes[node.id] = node;
      n = node;
    }

    if (!n.closed) {
      myneighbors.push(n.id);
    }
  }
  
  self.processNewNodes(myneighbors);

  self.continueSearch();        
};


module.exports = Astar;

module.exports.Node = function (id, latitude, longitude) {
  return new Node(id, latitude, longitude);
}


/***/ }),

/***/ "./node_modules/node-astar/lib/node.js":
/*!*********************************************!*\
  !*** ./node_modules/node-astar/lib/node.js ***!
  \*********************************************/
/***/ ((module) => {





function Node(id, latitude, longitude) {
  this.id = id;
  this.lat = latitude;
  this.lng = longitude;

  // calculation
  this.f = 0;
  this.g = 0;
  this.h = -1;
  this.closed = false;
  this.parent = 0;
}


/**
 * Euclidean distance between two points
 * 
 * @param node {Node} 
 *
 * return {Double}
 */
Node.prototype.distanceTo = function (node) {
    const x = Math.abs(this.lat - node.lat);
    const y = Math.abs(this.lng - node.lng);

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

module.exports = Node

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./resources/js/astar.js ***!
  \*******************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

Astar = __webpack_require__(/*! node-astar */ "./node_modules/node-astar/lib/index.js");
helpers = __webpack_require__(/*! ./helpers */ "./resources/js/helpers.js");
var COLORS = helpers.generateHslaColors(20);
var CONFIG = {
  show_control: true
};
var LOKASI_SEKARANG = {
  lat: null,
  lng: null
};
var mymap = L.map("mapid");
var marker = L.layerGroup().addTo(mymap);
var routing = '';
var popup = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

function getlokasi() {
  //jika browser mendukung navigator.geolocation maka akan menjalankan perintah di bawahnya
  if (navigator.geolocation) {
    // getCurrentPosition digunakan untuk mendapatkan lokasi pengguna
    //showPosition adalah fungsi yang akan dijalankan
    navigator.geolocation.getCurrentPosition(showPosition), {
      enableHighAccuracy: true
    };
  }
}

function showPosition(position) {
  // set vaue latitude longitude
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  var capa = document.getElementById("capa");
  capa.innerHTML = "latitude: " + latitude + ", longitude: " + ", accuracy: " + accuracy; // call function set map

  setMapGeo(); // buat fungsi popup saat map diklik

  function onMapClick(e) {
    popup.setLatLng(e.latlng).setContent("koordinatnya adalah " + e.latlng) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
    .openOn(mymap); //value pada form latitde, longitude akan berganti secara otomatis

    document.getElementById('latlong').value = e.latlng;
  }

  mymap.on('click', onMapClick); //jalankan fungsi
} // set map


function setMapGeo() {
  mymap.setView([latitude, longitude], 13); //setting maps menggunakan api mapbox bukan google maps, daftar dan dapatkan token

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWhtYWRmYWRpbGxsbGFoIiwiYSI6ImNsMDdydXM3eDJrbm0zaGxzcXEyOTljbmUifQ.BChqppsKGxQnbG2vUDOoww", {
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap); // set marker untuk gps

  L.circle([latitude, longitude], {
    radius: 150
  }).addTo(mymap);
}

window.showMosque = function (params) {
  if (marker) {
    // clear layer marker
    mymap.eachLayer(function (layer) {
      layer.remove();
    }); // clear layer marker route

    if (routing) {
      routing.spliceWaypoints(0, 1);
      routing.remove();
    }

    setMapGeo();
  } // get data from api


  axios.get(BASE_URL + '/api/show-mosque/floyd', {
    // parameter send to controller
    params: {
      lat: latitude,
      "long": longitude,
      type: params
    }
  }).then(function (response) {
    // handle success
    response.data.map(function (element) {
      // get data from api
      var idMosque = element.id;
      var txtNameMosque = element.tempat;
      var txtAddressMosque = element.waktu;
      var txtTypeMosque = element.judul;
      var urlImage = element.image_url; //    custome icon markers

      var mosqueIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor: [1, -24],
        iconUrl: 'https://i.ibb.co/FVz3mxG/mosque.png'
      }); // remove latlong text

      var txtLatlong = element.latlong.replace('LatLng(', '');
      txtLatlong = txtLatlong.replace(')', ''); // convert to array

      txtLatlong = txtLatlong.split(","); // get latitude

      var lat = txtLatlong[0].replace(' ', '');

      var _long = txtLatlong[1].replace(' ', ''); // add marker to map


      L.marker([lat, _long], {
        icon: mosqueIcon
      }).addTo(mymap).on('click', function (e) {
        //    set data to input html
        $('#mosque_dest').val(txtNameMosque);
        $('#id_mosque').val(idMosque); // function callback when click action to show pop up

        L.popup().setLatLng(e.latlng).setContent("<div class=\"card-group\">\n                    <div class=\"card\">\n                        <img class=\"card-img-top\" src=\"" + urlImage + "\" alt=\"Card image cap\">\n                        <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + txtNameMosque + "</h5>\n                        <p class=\"text-secondary\">" + txtAddressMosque + "</p>\n                        <p class=\"card-text text-light\">" + txtTypeMosque + "</p>\n                        </div>\n                        <button onclick=\"showRoute('" + lat + "','" + _long + "', '" + idMosque + "')\" class=\"btn btn-primary btn-sm\">Tampilkan Rute</button>\n                    </div>").openOn(mymap);
      });
    });
  })["catch"](function (error) {
    // handle error
    console.log(error);
  }).then(function () {// always executed
  });
};

window.showRoute = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(lat, _long2, idMosque) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            navigator.geolocation.getCurrentPosition( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(position) {
                var _position$coords, latitude, longitude, response, datas, all_edges, all_nodes, lokasi_tujuan, i, _datas$i, rute, kajian_islami, nodes, edges, node_dari, node_tujuan, result;

                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _position$coords = position.coords, latitude = _position$coords.latitude, longitude = _position$coords.longitude;
                        LOKASI_SEKARANG.lat = latitude;
                        LOKASI_SEKARANG.lng = longitude;
                        clear_way_points();
                        _context.next = 6;
                        return axios.get(BASE_URL + '/api/show-mosque/rute?id=' + idMosque);

                      case 6:
                        response = _context.sent;
                        datas = response.data;
                        all_edges = [];
                        all_nodes = [];

                        for (i = 0; i < datas.length; i++) {
                          _datas$i = datas[i], rute = _datas$i.rute, kajian_islami = _datas$i.kajian_islami;
                          lokasi_tujuan = parse_koodinate(kajian_islami.latlong);
                          nodes = route_to_node(JSON.parse(rute), i);
                          edges = create_edges(nodes, LOKASI_SEKARANG, lokasi_tujuan); // let controls = draw_way_point(JSON.parse(rute), COLORS[i]);

                          all_edges = all_edges.concat(edges);
                          all_nodes = all_nodes.concat(nodes.coordinates);
                        }

                        node_dari = Astar.Node('dari', LOKASI_SEKARANG.lat, LOKASI_SEKARANG.lng);
                        node_tujuan = Astar.Node('tujuan', lokasi_tujuan.lat, lokasi_tujuan.lng);
                        result = astar_find(all_edges, node_dari, node_tujuan, function (result, summary) {
                          all_nodes.push({
                            lat: LOKASI_SEKARANG.lat,
                            lng: LOKASI_SEKARANG.lng,
                            nama: 'dari'
                          });
                          all_nodes.push({
                            lat: lokasi_tujuan.lat,
                            lng: lokasi_tujuan.lng,
                            nama: 'tujuan'
                          });
                          var controls = draw_way_to_map(result, all_nodes, "black");
                          print_performa(summary);
                        }); // remove all routes before add route
                        // if (routing) {
                        //     routing.spliceWaypoints(0, 1);
                        //     routing.remove()
                        // }
                        // // add route to map
                        // routing = L.Routing.control({
                        //     waypoints: [
                        //         L.latLng(position.coords.latitude, position.coords.longitude),
                        //         L.latLng(lat, long),
                        //     ],
                        // }).addTo(mymap);

                      case 14:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var print_performa = function print_performa(summary) {
  $("#performa").html(JSON.stringify(summary));
};

var draw_way_point = function draw_way_point(route, color) {
  var instructions = route.instructions,
      waypoints = route.waypoints;
  var _waypoints = [];

  for (var i = 0; i < waypoints.length; i++) {
    var pp = waypoints[i];
    var _pp$latLng = pp.latLng,
        lat = _pp$latLng.lat,
        lng = _pp$latLng.lng;

    _waypoints.push(L.latLng(lat, lng));
  }

  var control = L.Routing.control({
    waypoints: _waypoints,
    lineOptions: {
      styles: [{
        color: color,
        opacity: 1,
        weight: 5
      }]
    },
    createMarker: function createMarker(i, waypoint, n) {
      var numMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: i + 1,
        markerColor: color,
        svg: true
      });
      return L.marker(waypoint.latLng, {
        draggable: true,
        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
          "function": function _function() {
            bindPopup(myPopup).openOn(mymap);
          }
        },
        icon: numMarker
      });
    }
  }).addTo(mymap);

  if (!CONFIG.show_control) {
    control.hide();
  }

  return control;
};

var euclidean_distance = function euclidean_distance(a, b) {
  return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2));
};

var route_to_node = function route_to_node(route, key) {
  var instructions = route.instructions,
      waypoints = route.waypoints,
      coordinates = route.coordinates;

  for (var i = 0; i < coordinates.length - 1; i++) {
    coordinates[i].nama = "".concat(key).concat(i);

    if (i === 0) {
      coordinates[i].distance = 0;
    } else {
      coordinates[i].distance = euclidean_distance(coordinates[i - 1], coordinates[i]);
    }
  }

  return {
    coordinates: coordinates,
    total_distance: coordinates.reduce(function (a, b) {
      return a + (b.distance || 0);
    }, 0)
  };
}; // const route_to_node = (route) => {
//     let {instructions, waypoints} = route;
//     var way_point_reach_index = 0;
//     var tmp_distance = 0;
//     for (let i = 0; i < instructions.length; i++) {
//         const instruction = instructions[i];
//         tmp_distance += instruction.distance;
//         if (instruction.type === "WaypointReached") {
//             waypoints[way_point_reach_index + 1].distance = tmp_distance;
//             tmp_distance = 0;
//             way_point_reach_index++;
//         }
//     }
//     return {
//         waypoints: waypoints, total_distance: waypoints.reduce(function (a, b) {
//             return a + (b.distance || 0);
//         }, 0)
//     }
// }

/**
 * @param all_edges
 * @param dari
 * @param tujuan
 * @param result_callback
 * @returns {*}
 */


var astar_find = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(all_edges, dari, tujuan, result_callback) {
    var t0, list, astar, astar_run, path, t1, summary;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            t0 = performance.now();

            list = function list(node, next) {
              var _edges = all_edges.filter(function (edge) {
                return edge.from === node.id;
              });

              var _results = [];

              for (var i = 0; i < _edges.length; i++) {
                var edges = _edges[i];

                _results.push(Astar.Node(edges.to, edges.lat, edges.lng));
              }

              next(_results);
            };

            astar = new Astar(list);

            astar_run = function astar_run() {
              return new Promise(function (resolve, reject) {
                astar.search(dari, tujuan, function (err, result) {
                  resolve(result);
                });
              });
            };

            _context3.next = 6;
            return astar_run();

          case 6:
            path = _context3.sent;
            t1 = performance.now();
            summary = {
              time_ms: t1 - t0,
              total_node: all_edges.length
            };
            result_callback(path, summary);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function astar_find(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var parse_koodinate = function parse_koodinate(koordinat) {
  var lokasi = koordinat.replace("LatLng(", "").replace(")", "").split(",");
  return {
    lat: parseFloat(lokasi[0]),
    lng: parseFloat(lokasi[1])
  };
};

var clear_way_points = function clear_way_points() {
  var _this = this;

  mymap.eachLayer(function (layer) {
    if (layer.options.waypoints && layer.options.waypoints.length) {
      _this.map.removeLayer(layer);
    }
  });
};

var create_edges = function create_edges(nodes, dari, tujuan) {
  var edges = [];
  var coordinates = nodes.coordinates;

  for (var i = 0; i < coordinates.length - 1; i++) {
    var from = coordinates[i];
    var to = coordinates[i + 1];
    edges.push({
      from: from.nama,
      to: to.nama,
      weight: to.distance
    });
  }

  for (var _i = 0; _i < coordinates.length; _i++) {
    var _to = coordinates[_i];
    edges.push({
      from: "dari",
      to: _to.nama,
      weight: euclidean_distance(dari, _to)
    });
  }

  for (var _i2 = 0; _i2 < coordinates.length; _i2++) {
    var _dari = coordinates[_i2];
    edges.push({
      from: _dari.nama,
      to: "tujuan",
      weight: euclidean_distance(_dari, tujuan)
    });
  }

  return edges;
};

var draw_way_to_map = function draw_way_to_map(route, edges, color) {
  var _waypoints = [];

  var _loop = function _loop(i) {
    var node = route[i];
    var pp = edges.find(function (element) {
      return element.nama === node.id;
    });
    var lat = pp.lat,
        lng = pp.lng;

    _waypoints.push(L.latLng(lat, lng));
  };

  for (var i = 0; i < route.length; i++) {
    _loop(i);
  }

  var control = L.Routing.control({
    waypoints: _waypoints,
    routeWhileDragging: false,
    lineOptions: {
      styles: [{
        color: color,
        opacity: 1,
        weight: 5
      }],
      addWaypoints: false
    },
    createMarker: function createMarker(i, waypoint, n) {
      var numMarker = L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: i + 1,
        markerColor: color,
        svg: true
      });
      return L.marker(waypoint.latLng, {
        draggable: true,
        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
          "function": function _function() {
            bindPopup(myPopup).openOn(mymap);
          }
        },
        icon: numMarker
      });
    }
  }).addTo(mymap);

  if (!CONFIG.show_control) {
    control.hide();
  }

  return control;
};

$(document).ready(function () {
  // first call
  getlokasi();
  $('#show_mosque_all').on('click', function () {
    showMosque('all');
  });
});
})();

/******/ })()
;