/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./resources/js/floyd_warshall.js ***!
  \****************************************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

fw = __webpack_require__(/*! floyd-warshall-shortest */ "./node_modules/floyd-warshall-shortest/dist/index.js");
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

        L.popup().setLatLng(e.latlng).setContent("<div class=\"card-group\">\n                    <div class=\"card\">\n                        <img class=\"card-img-top\" src=\"" + urlImage + "\" alt=\"Card image cap\">\n                        <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + txtNameMosque + "</h5>\n                        <p class=\"text-secondary\">" + txtAddressMosque + "</p>\n                        <p class=\"card-text text-light\">" + txtTypeMosque + "</p>\n                        </div>\n                        <button onclick=\"showRoute('" + lat + "','" + _long + "', '" + idMosque + "')\" class=\"btn btn-primary btn-sm\">Tampilkan Rute</button>\n                    </div>").openOn(mymap);
      });
    });
  })["catch"](function (error) {
    // handle error
    console.log(error);
  }).then(function () {// always executed
  });
}

window.showRoute = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(lat, _long2, idMosque) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            navigator.geolocation.getCurrentPosition( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(position) {
                var _position$coords, latitude, longitude, response, datas, all_edges, all_nodes, lokasi_tujuan, i, _datas$i, rute, kajian_islami, nodes, edges, result;

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

                        result = floyd_warshall_find(all_edges, "dari", "tujuan", function (result, summary) {
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

                      case 12:
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
 * edges = [
 *     { from: 'A', to: 'B', weight: 4 },
 *     { from: 'A', to: 'C', weight: 2 },
 *     { from: 'B', to: 'C', weight: 5 },
 *     { from: 'B', to: 'D', weight: 10 },
 *     { from: 'C', to: 'E', weight: 3 },
 *     { from: 'E', to: 'D', weight: 4 },
 *     { from: 'D', to: 'F', weight: 11 },
 * ];
 * @param edges
 * @param dari
 * @param tujuan
 * @param result_callback
 * @returns {*}
 */


var floyd_warshall_find = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(edges, dari, tujuan, result_callback) {
    var t0, t1, summary;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            t0 = performance.now();
            graph = new fw.FloydWarshall(edges);
            path = graph.getShortestPath(dari, tujuan);
            t1 = performance.now();
            summary = {
              time_ms: t1 - t0,
              total_node: edges.length
            };
            result_callback(path, summary);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function floyd_warshall_find(_x5, _x6, _x7, _x8) {
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
  console.info("edges", edges);
  var _waypoints = [];

  var _loop = function _loop(i) {
    var nama = route[i];
    var pp = edges.find(function (element) {
      return element.nama === nama;
    });
    console.info("pp", pp);
    var lat = pp.lat,
        lng = pp.lng;

    _waypoints.push(L.latLng(lat, lng));
  };

  for (var i = 0; i < route.length; i++) {
    _loop(i);
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
  }).addTo(mymap); // console.info("instructions", control.getWaypoints());

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