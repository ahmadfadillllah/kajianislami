/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// require('./bootstrap');
fw = __webpack_require__(/*! floyd-warshall-shortest */ "./node_modules/floyd-warshall-shortest/dist/index.js");
Astar = __webpack_require__(/*! node-astar */ "./node_modules/node-astar/lib/index.js");
var n1 = Astar.Node('edinburgh', -1.616729, 103.623597);
var n2 = Astar.Node('london', -1.616739, 103.628054);

var list = function list(node, next) {
  var arr = [{
    "lat": -1.6149694672541492,
    "lng": 103.62394809722902
  }, {
    "lat": -1.6161920683695923,
    "lng": 103.62631916999818
  }, {
    "lat": -1.6186265438365828,
    "lng": 103.62719893455507
  }];
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    result.push(Astar.Node("".concat(i), arr[i].lat, arr[i].lng));
  }

  console.log(node);
  next(result);
};

var astar = new Astar(list);
astar.search(n1, n2, function (err, result) {
  result.forEach(function (doc) {
    console.log(doc.id);
  });
  console.log(result);
});
helpers = __webpack_require__(/*! ./helpers */ "./resources/js/helpers.js");
edges = [{
  from: 'A',
  to: 'B',
  weight: 4
}, {
  from: 'A',
  to: 'C',
  weight: 2
}, {
  from: 'B',
  to: 'C',
  weight: 5
}, {
  from: 'B',
  to: 'D',
  weight: 10
}, {
  from: 'C',
  to: 'E',
  weight: 3
}, {
  from: 'E',
  to: 'D',
  weight: 4
}, {
  from: 'D',
  to: 'F',
  weight: 11
}];
graph = new fw.FloydWarshall(edges);
path = graph.getShortestPath('A', 'F');
console.log(path);
var COLORS = helpers.generateHslaColors(9);
var mymap = L.map("mapid");
var marker = L.layerGroup().addTo(mymap);
var popup = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mymap);
L.popup();
var control = L.Routing.control({
  waypoints: [L.latLng(-1.616729, 103.623597), L.latLng(-1.616739, 103.628054)],
  routeWhileDragging: true,
  lineOptions: {
    styles: [{
      color: COLORS[0],
      opacity: 1,
      weight: 5
    }] // addWaypoints: false

  },
  routingOptions: {
    alternatives: true
  } // geocoder: L.Control.Geocoder.nominatim()

}).on('routeselected', function (e) {
  var route = e.route;
  console.info(JSON.stringify(route.inputWaypoints, null, 2));
}).addTo(mymap); // control.hide();

var TARGET = {
  location: null
};

var mapError = function mapError(error) {
  if (error.code == 1) {
    alert("Silahkan aktif izin lokasi");
  } else if (error.code == 2) {
    alert("Lokasi tidak tersedia");
  } else if (error.code == 3) {
    alert("Timeout akses lokasi");
  }
};

$(document).ready(function () {
  getlokasi();
});

function getlokasi() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, mapError, {
      enableHighAccuracy: true
    });
  }
}

var onMapClick = function onMapClick(e) {
  popup.setLatLng(e.latlng).setContent("koordinatnya adalah " + e.latlng) //set isi konten yang ingin ditampilkan, kali ini kita akan menampilkan latitude dan longitude
  .openOn(mymap); //value pada form latitde, longitude akan berganti secara otomatis

  TARGET.location = e.latlng;
  document.getElementById('latlong').innerHTML = e.latlng;
};

function showPosition(position) {
  // set vaue latitude longitude
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  var capa = document.getElementById("capa");
  capa.innerHTML = "latitude: " + latitude + ", longitude: " + longitude + ", accuracy: " + accuracy;
  console.log("capa.innerHTML", capa.innerHTML); // call function set map

  setMapGeo(); // buat fungsi popup saat map diklik

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

function showMosque(params) {
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


  axios.get("{{url('api/show-mosque/floyd')}}", {
    // parameter send to controller
    params: {
      lat: latitude,
      "long": longitude,
      type: params
    }
  }).then(function (response) {
    // handle success
    response.data.map(function (element) {
      console.log(element); // get data from api

      var idMosque = element.id;
      var txtNameMosque = element.namamasjid;
      var txtAddressMosque = element.alamat;
      var txtTypeMosque = element.jeniskajian;
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

        L.popup().setLatLng(e.latlng).setContent("<div class=\"card-group\">\n                    <div class=\"card\">\n                        <img class=\"card-img-top\" src=\"" + urlImage + "\" alt=\"Card image cap\">\n                        <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + txtNameMosque + "</h5>\n                        <p class=\"text-secondary\">" + txtAddressMosque + "</p>\n                        <p class=\"card-text text-light\">" + txtTypeMosque + "</p>\n                        </div>\n                        <button onclick=\"showRoute('" + lat + "','" + _long + "')\" class=\"btn btn-primary btn-sm\">Tampilkan Rute</button>\n                    </div>").openOn(mymap);
      });
    });
  })["catch"](function (error) {
    // handle error
    console.log(error);
  }).then(function () {// always executed
  });
}

function showRoute(lat, _long2) {
  //    var routeControl  = L.routing.control
  // get curren location
  navigator.geolocation.getCurrentPosition(function (position) {
    var _position$coords = position.coords,
        latitude = _position$coords.latitude,
        longitude = _position$coords.longitude; // remove all routes before add route

    if (routing) {
      routing.spliceWaypoints(0, 1);
      routing.remove();
    } // add route to map


    routing = L.Routing.control({
      waypoints: [L.latLng(position.coords.latitude, position.coords.longitude), L.latLng(lat, _long2)]
    }).addTo(mymap);
  });
}

/***/ }),

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

/***/ "./node_modules/floyd-warshall-shortest/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/floyd-warshall-shortest/dist/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FloydWarshall = void 0;
var permutation_sjt_1 = __webpack_require__(/*! permutation-sjt */ "./node_modules/permutation-sjt/dist/index.js");
/**
 * class implementing the Floyd-Warshall algorithm for finding shortest paths.
 *
 */
var FloydWarshall = /** @class */ (function () {
    function FloydWarshall(arg1, arg2, arg3) {
        var _this = this;
        if (arg3 === void 0) { arg3 = true; }
        this.numNodes = 0;
        this.distance = [];
        this.next = [];
        this.nodeIndex = new Map();
        this.node = new Map();
        var nodes = [];
        var edges = [];
        var directed = true;
        if (arg1.length > 0) {
            // arg1[0].hasOwnProperty('from'))
            if (Object.prototype.hasOwnProperty.call(arg1[0], 'from')) {
                edges = arg1;
                if (arg2 !== undefined) {
                    directed = arg2;
                }
            }
            else {
                nodes = arg1;
                edges = arg2;
            }
        }
        else {
            if (Array.isArray(arg2)) {
                edges = arg2;
                directed = arg3;
            }
            else {
                if (arg2 !== undefined) {
                    directed = arg2;
                }
            }
        }
        this.directed = directed;
        if (nodes.length === 0)
            nodes = this.getImplicitNodes(edges);
        nodes.forEach(function (n) {
            _this.nodeIndex.set(n, _this.numNodes);
            _this.node.set(_this.numNodes, n);
            _this.numNodes++;
        });
        var numericalEdges = [];
        edges.forEach(function (d) {
            var fromNode = _this.nodeIndex.get(d.from);
            if (fromNode === undefined)
                throw new Error('Node ' + fromNode + ' is not in list of nodes.');
            var toNode = _this.nodeIndex.get(d.to);
            if (toNode === undefined)
                throw new Error('Node ' + toNode + ' is not in list of nodes.');
            numericalEdges.push({
                from: fromNode,
                to: toNode,
                weight: d.weight,
            });
        });
        this.initDistanceMatrix(numericalEdges);
        this.floydWarshall();
    }
    FloydWarshall.prototype.getImplicitNodes = function (edges) {
        var nodes = [];
        edges.forEach(function (d) {
            var indexFrom = nodes.indexOf(d.from);
            if (indexFrom < 0)
                nodes.push(d.from);
            var indexTo = nodes.indexOf(d.to);
            if (indexTo < 0)
                nodes.push(d.to);
        });
        return nodes;
    };
    FloydWarshall.prototype.initDistanceMatrix = function (edges) {
        var _this = this;
        for (var i = 0; i < this.numNodes; i++) {
            this.distance.push([]);
            this.next.push([]);
            for (var j = 0; j < this.numNodes; j++) {
                if (i == j) {
                    this.distance[i].push(0);
                    this.next[i].push(i);
                }
                else {
                    this.distance[i].push(Infinity);
                    this.next[i].push(Infinity); // null
                }
            }
        }
        edges.forEach(function (e) {
            _this.distance[e.from][e.to] = e.weight;
            _this.next[e.from][e.to] = e.to;
            if (!_this.directed) {
                _this.distance[e.to][e.from] = e.weight;
                _this.next[e.to][e.from] = e.from;
            }
        });
    };
    /**
     * Caculates the V x V matrix of shortest distances between all nodes V.
     */
    FloydWarshall.prototype.floydWarshall = function () {
        for (var k = 0; k < this.numNodes; k++) {
            for (var i = 0; i < this.numNodes; i++) {
                for (var j = 0; j < this.numNodes; j++) {
                    if (this.distance[i][j] > this.distance[i][k] + this.distance[k][j]) {
                        this.distance[i][j] = this.distance[i][k] + this.distance[k][j];
                        this.next[i][j] = this.next[i][k];
                    }
                }
            }
        }
    };
    FloydWarshall.prototype.shortestPath = function (u, v) {
        if (this.next[u][v] == Infinity) {
            return [];
        }
        var path = [u];
        while (u != v) {
            u = this.next[u][v];
            path.push(u);
        }
        return path;
    };
    /**
     * Returns the shortest path (list of nodes) between the two parameters.
     *
     * @param from node
     * @param to node
     * @returns a list of nodes
     */
    FloydWarshall.prototype.getShortestPath = function (from, to) {
        var fromNode = this.nodeIndex.get(from);
        var toNode = this.nodeIndex.get(to);
        if (fromNode !== undefined && toNode !== undefined) {
            return this.numberListToNodeList(this.shortestPath(fromNode, toNode));
        }
        else {
            throw new Error('Unknown node');
        }
    };
    FloydWarshall.prototype.shortestVisitingPath = function (nodeArray) {
        var p = new permutation_sjt_1.Permutation(nodeArray.length);
        var bestPermutation = [];
        var bestDistance = Infinity;
        while (p.hasNext()) {
            var permutation = p.next().map(function (i) { return nodeArray[i]; });
            var permutationDistance = 0;
            for (var i = 0; i < permutation.length - 1; i++) {
                permutationDistance += this.distance[permutation[i]][permutation[i + 1]];
            }
            if (permutationDistance < bestDistance) {
                bestDistance = permutationDistance;
                bestPermutation = permutation;
            }
        }
        var path = [];
        if (bestPermutation.length > 0) {
            path.push(bestPermutation[0]);
        }
        for (var i = 0; i < bestPermutation.length - 1; i++) {
            path = path.concat(this.shortestPath(bestPermutation[i], bestPermutation[i + 1]).slice(1));
        }
        return path;
    };
    /**
     * Returns the shortest path (list of nodes) visiting all the nodes in the parameter list.
     *
     * @param visiting an array of nodes that have to be visited by the path
     * @returns a list of nodes (the shortest path)
     */
    FloydWarshall.prototype.getShortestVisitingPath = function (visiting) {
        var visitingNum = [];
        for (var i = 0; i < visiting.length; i++) {
            var num = this.nodeIndex.get(visiting[i]);
            if (num === undefined)
                throw new Error('Unknown node: ' + visiting[i]);
            visitingNum.push(num);
        }
        return this.numberListToNodeList(this.shortestVisitingPath(visitingNum));
    };
    FloydWarshall.prototype.numberListToNodeList = function (numbers) {
        var nodes = [];
        for (var i = 0; i < numbers.length; i++) {
            var node = this.node.get(numbers[i]);
            if (node === undefined)
                throw new Error('Unknown node');
            nodes.push(node);
        }
        return nodes;
    };
    FloydWarshall.prototype.isDirected = function () {
        return this.directed;
    };
    /**
     * Shortest distance uses the internal distance table calculated by the
     * Floyd-Warshall algorithm to return the shortest distance between two nodes.
     *
     * @param from node
     * @param to node
     * @returns shortest distance or Infinity if the nodes are not connected
     */
    FloydWarshall.prototype.getShortestDistance = function (from, to) {
        var fromNode = this.nodeIndex.get(from);
        var toNode = this.nodeIndex.get(to);
        if (fromNode !== undefined && toNode !== undefined) {
            return this.distance[fromNode][toNode];
        }
        else {
            throw new Error('Unknown node');
        }
    };
    return FloydWarshall;
}());
exports.FloydWarshall = FloydWarshall;


/***/ }),

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ }),

/***/ "./node_modules/permutation-sjt/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/permutation-sjt/dist/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permutation = void 0;
/**
 * Steinhaus–Johnson–Trotter algorithm, Even's speedup
 * https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm
 *
 *
 * The Steinhaus–Johnson–Trotter algorithm or Johnson–Trotter algorithm generates
 * all of the permutations of n elements. Each permutation in the sequence that
 * it generates differs from the previous permutation by swapping two adjacent
 * elements of the sequence.
 *
 * An improvement of the Steinhaus–Johnson–Trotter algorithm by Shimon Even
 * provides an improvement to the running time
 * of the algorithm by storing additional information for each element in the
 * permutation: its position, and a direction (positive, negative, or zero) in which
 * it is currently moving.
 */
var Permutation = /** @class */ (function () {
    /**
     *
     * @param n numbers in the arrray 1..n
     */
    function Permutation(n, start) {
        if (start === void 0) { start = 0; }
        this.n = n;
        this.start = start;
        this.numbers = [];
        this.directions = [];
        this.positions = [];
        this.terminated = false;
        if (n < 0)
            throw new Error('Permutation constructor expects a positive number');
        /**
         * Initially, the direction of the number 1 is zero,
         * and all other elements have a negative direction
         */
        for (var i = 0; i < n; i++) {
            this.numbers.push(i);
            this.positions.push(i);
            if (i === 0)
                this.directions.push(0);
            else
                this.directions.push(-1);
        }
    }
    /**
     * Checks if there is a permutation to return.
     *
     * @returns
     */
    Permutation.prototype.hasNext = function () {
        return !this.terminated;
    };
    /**
     * Returns the next permutation of the Steinhaus–Johnson–Trotter algorithm,
     * starting with [1,2,3, ..., n].
     *
     * Returns undefined if the permutations have been exhausted.
     *
     * @returns the next permutation or undefined
     */
    Permutation.prototype.next = function () {
        var _this = this;
        if (this.terminated) {
            throw new Error('next(): there is no next permutation');
        }
        var copy = this.numbers.slice(0);
        this.generateNext();
        if (this.start > 0)
            return copy.map(function (i) { return i + _this.start; });
        else
            return copy;
    };
    /**
     * At each step, the algorithm finds the greatest element with a nonzero direction,
     * and swaps it in the indicated direction.
     *
     * When all numbers become unmarked, the algorithm terminates.
     */
    Permutation.prototype.generateNext = function () {
        // findMaxWithDirection;
        var index = -1;
        for (var i = this.n - 1; i >= 0; i--) {
            if (this.directions[i] !== 0) {
                index = this.positions[i];
                break;
            }
        }
        // swap
        if (index !== -1)
            this.swapWithNextElementInDirection(index);
        else
            this.terminated = true;
    };
    Permutation.prototype.swapWithNextElementInDirection = function (index) {
        var _a, _b;
        // precondition this.directions[index] not 0
        /**
         * swaps it in the indicated direction
         */
        var number = this.numbers[index];
        var newIndex = index + this.directions[number];
        var otherNumber = this.numbers[newIndex];
        _a = [this.positions[otherNumber], this.positions[number]], this.positions[number] = _a[0], this.positions[otherNumber] = _a[1];
        _b = [this.numbers[index], this.numbers[newIndex]], this.numbers[newIndex] = _b[0], this.numbers[index] = _b[1];
        /**
         * If this causes the chosen element to reach the first or last position
         * within the permutation, or if the next element in the same direction
         * is greater than the chosen element, the direction of the chosen element is set to zero:
         */
        if (newIndex === 0 ||
            newIndex === this.numbers.length - 1 ||
            this.numbers[newIndex] < this.numbers[newIndex + this.directions[number]]) {
            this.directions[number] = 0;
        }
        /**
         * After each step, all elements greater than the chosen element
         * (which previously had direction zero) have their directions
         * set to indicate motion toward the chosen element.
         * */
        for (var i = 0; i < this.numbers.length; i++) {
            if (i === newIndex)
                continue;
            if (this.numbers[i] > this.numbers[newIndex]) {
                this.directions[this.numbers[i]] = i < newIndex ? 1 : -1;
            }
        }
    };
    return Permutation;
}());
exports.Permutation = Permutation;


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/css/app.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;