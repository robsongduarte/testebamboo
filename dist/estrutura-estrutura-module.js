(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["estrutura-estrutura-module"],{

/***/ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ng2-search-filter/ng2-search-filter.es5.js ***!
  \*****************************************************************/
/*! exports provided: Ng2SearchPipeModule, Ng2SearchPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2SearchPipeModule", function() { return Ng2SearchPipeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2SearchPipe", function() { return Ng2SearchPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

var Ng2SearchPipe = /** @class */ (function () {
    function Ng2SearchPipe() {
    }
    /**
     * @param {?} items object from array
     * @param {?} term term's search
     * @return {?}
     */
    Ng2SearchPipe.prototype.transform = function (items, term) {
        if (!term || !items)
            return items;
        return Ng2SearchPipe.filter(items, term);
    };
    /**
     *
     * @param {?} items List of items to filter
     * @param {?} term  a string term to compare with every property of the list
     *
     * @return {?}
     */
    Ng2SearchPipe.filter = function (items, term) {
        var /** @type {?} */ toCompare = term.toLowerCase();
        return items.filter(function (item) {
            for (var /** @type {?} */ property in item) {
                if (item[property] === null) {
                    continue;
                }
                if (item[property].toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        });
    };
    return Ng2SearchPipe;
}());
Ng2SearchPipe.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                name: 'filter',
                pure: false
            },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
Ng2SearchPipe.ctorParameters = function () { return []; };
var Ng2SearchPipeModule = /** @class */ (function () {
    function Ng2SearchPipeModule() {
    }
    return Ng2SearchPipeModule;
}());
Ng2SearchPipeModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [Ng2SearchPipe],
                exports: [Ng2SearchPipe]
            },] },
];
/**
 * @nocollapse
 */
Ng2SearchPipeModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ng2-search-filter.es5.js.map


/***/ }),

/***/ "./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js":
/*!**************************************************************!*\
  !*** ./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js ***!
  \**************************************************************/
/*! exports provided: FilterPipeModule, FilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipeModule", function() { return FilterPipeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPipe", function() { return FilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    /**
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    FilterPipe.isFoundOnWalking = function (value, key) {
        var /** @type {?} */ walker = value;
        var /** @type {?} */ found = false;
        do {
            if (walker.hasOwnProperty(key) || Object.getOwnPropertyDescriptor(walker, key)) {
                found = true;
                break;
            }
        } while (walker = Object.getPrototypeOf(walker));
        return found;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FilterPipe.isNumber = function (value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    };
    /**
     * Checks function's value if type is function otherwise same value
     * @param {?} value
     * @return {?}
     */
    FilterPipe.getValue = function (value) {
        return typeof value === 'function' ? value() : value;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByString = function (filter) {
        if (filter) {
            filter = filter.toLowerCase();
        }
        return function (value) { return !filter || (value ? ('' + value).toLowerCase().indexOf(filter) !== -1 : false); };
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByBoolean = function (filter) {
        return function (value) { return Boolean(value) === filter; };
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByObject = function (filter) {
        var _this = this;
        return function (value) {
            for (var /** @type {?} */ key in filter) {
                if (key === '$or') {
                    if (!_this.filterByOr(filter.$or)(FilterPipe.getValue(value))) {
                        return false;
                    }
                    continue;
                }
                if (!value || !FilterPipe.isFoundOnWalking(value, key)) {
                    return false;
                }
                if (!_this.isMatching(filter[key], FilterPipe.getValue(value[key]))) {
                    return false;
                }
            }
            return true;
        };
    };
    /**
     * @param {?} filter
     * @param {?} val
     * @return {?}
     */
    FilterPipe.prototype.isMatching = function (filter, val) {
        switch (typeof filter) {
            case 'boolean':
                return this.filterByBoolean(filter)(val);
            case 'string':
                return this.filterByString(filter)(val);
            case 'object':
                return this.filterByObject(filter)(val);
        }
        return this.filterDefault(filter)(val);
    };
    /**
     * Filter value by $or
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterByOr = function (filter) {
        var _this = this;
        return function (value) {
            var /** @type {?} */ length = filter.length;
            var /** @type {?} */ arrayComparison = function (i) { return value.indexOf(filter[i]) !== -1; };
            var /** @type {?} */ otherComparison = function (i) { return _this.isMatching(filter[i], value); };
            var /** @type {?} */ comparison = Array.isArray(value) ? arrayComparison : otherComparison;
            for (var /** @type {?} */ i = 0; i < length; i++) {
                if (comparison(i)) {
                    return true;
                }
            }
            return false;
        };
    };
    /**
     * Default filterDefault function
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.filterDefault = function (filter) {
        return function (value) { return filter === undefined || filter == value; };
    };
    /**
     * @param {?} array
     * @param {?} filter
     * @return {?}
     */
    FilterPipe.prototype.transform = function (array, filter) {
        if (!array) {
            return array;
        }
        switch (typeof filter) {
            case 'boolean':
                return array.filter(this.filterByBoolean(filter));
            case 'string':
                if (FilterPipe.isNumber(filter)) {
                    return array.filter(this.filterDefault(filter));
                }
                return array.filter(this.filterByString(filter));
            case 'object':
                return array.filter(this.filterByObject(filter));
            case 'function':
                return array.filter(filter);
        }
        return array.filter(this.filterDefault(filter));
    };
    return FilterPipe;
}());
FilterPipe.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                name: 'filterBy',
                pure: false
            },] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/** @nocollapse */
FilterPipe.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FilterPipeModule = /** @class */ (function () {
    function FilterPipeModule() {
    }
    return FilterPipeModule;
}());
FilterPipeModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [FilterPipe],
                providers: [FilterPipe],
                exports: [FilterPipe]
            },] },
];
/** @nocollapse */
FilterPipeModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-filter-pipe.js.map


/***/ }),

/***/ "./node_modules/orgchart/dist/js/jquery.orgchart.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/orgchart/dist/js/jquery.orgchart.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function(e){"object"==typeof module&&"object"==typeof module.exports?e(__webpack_require__(/*! jquery */ "./node_modules/orgchart/node_modules/jquery/dist/jquery.js"),window,document):e(jQuery,window,document)}(function(e,t,i,n){var s=function(t,i){this.$chartContainer=e(t),this.opts=i,this.defaultOptions={nodeTitle:"name",nodeId:"id",toggleSiblingsResp:!1,depth:999,chartClass:"",exportButton:!1,exportFilename:"OrgChart",exportFileextension:"png",parentNodeSymbol:"fa-users",draggable:!1,direction:"t2b",pan:!1,zoom:!1,zoominLimit:7,zoomoutLimit:.5}};s.prototype={init:function(t){var i=this;this.options=e.extend({},this.defaultOptions,this.opts,t);var n=this.$chartContainer;this.$chart&&this.$chart.remove();var s=this.options.data,a=this.$chart=e("<div>",{data:{options:this.options},class:"orgchart"+(""!==this.options.chartClass?" "+this.options.chartClass:"")+("t2b"!==this.options.direction?" "+this.options.direction:""),click:function(t){e(t.target).closest(".node").length||a.find(".node.focused").removeClass("focused")}});return"undefined"!=typeof MutationObserver&&this.triggerInitEvent(),"object"===e.type(s)?s instanceof e?this.buildHierarchy(a,this.buildJsonDS(s.children()),0,this.options):this.buildHierarchy(a,this.options.ajaxURL?s:this.attachRel(s,"00"),0,this.options):(a.append('<i class="fa fa-circle-o-notch fa-spin spinner"></i>'),e.ajax({url:s,dataType:"json"}).done(function(e,t,n){i.buildHierarchy(a,i.options.ajaxURL?e:i.attachRel(e,"00"),0,i.options)}).fail(function(e,t,i){console.log(i)}).always(function(){a.children(".spinner").remove()})),n.append(a),this.options.exportButton&&!n.find(".oc-export-btn").length&&this.attachExportButton(),this.options.pan&&this.bindPan(),this.options.zoom&&this.bindZoom(),this},triggerInitEvent:function(){var t=this,i=new MutationObserver(function(n){i.disconnect();e:for(var s=0;s<n.length;s++)for(var a=0;a<n[s].addedNodes.length;a++)if(n[s].addedNodes[a].classList.contains("orgchart")&&t.options.initCompleted&&"function"==typeof t.options.initCompleted){t.options.initCompleted(t.$chart);var d=e.Event("init.orgchart");t.$chart.trigger(d);break e}});i.observe(this.$chartContainer[0],{childList:!0})},attachExportButton:function(){var t=this,i=e("<button>",{class:"oc-export-btn"+(""!==this.options.chartClass?" "+this.options.chartClass:""),text:"Export",click:function(e){e.preventDefault(),t.export()}});this.$chartContainer.append(i)},setOptions:function(e,t){return"string"==typeof e&&("pan"===e&&(t?this.bindPan():this.unbindPan()),"zoom"===e&&(t?this.bindZoom():this.unbindZoom())),"object"==typeof e&&(e.data?this.init(e):(void 0!==e.pan&&(e.pan?this.bindPan():this.unbindPan()),void 0!==e.zoom&&(e.zoom?this.bindZoom():this.unbindZoom()))),this},panStartHandler:function(t){var i=e(t.delegateTarget);if(e(t.target).closest(".node").length||t.touches&&t.touches.length>1)i.data("panning",!1);else{i.css("cursor","move").data("panning",!0);var n=0,s=0,a=i.css("transform");if("none"!==a){var d=a.split(",");-1===a.indexOf("3d")?(n=parseInt(d[4]),s=parseInt(d[5])):(n=parseInt(d[12]),s=parseInt(d[13]))}var o=0,r=0;if(t.targetTouches){if(1===t.targetTouches.length)o=t.targetTouches[0].pageX-n,r=t.targetTouches[0].pageY-s;else if(t.targetTouches.length>1)return}else o=t.pageX-n,r=t.pageY-s;i.on("mousemove touchmove",function(e){if(i.data("panning")){var t=0,n=0;if(e.targetTouches){if(1===e.targetTouches.length)t=e.targetTouches[0].pageX-o,n=e.targetTouches[0].pageY-r;else if(e.targetTouches.length>1)return}else t=e.pageX-o,n=e.pageY-r;var s=i.css("transform");if("none"===s)-1===s.indexOf("3d")?i.css("transform","matrix(1, 0, 0, 1, "+t+", "+n+")"):i.css("transform","matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, "+t+", "+n+", 0, 1)");else{var a=s.split(",");-1===s.indexOf("3d")?(a[4]=" "+t,a[5]=" "+n+")"):(a[12]=" "+t,a[13]=" "+n),i.css("transform",a.join(","))}}})}},panEndHandler:function(e){e.data.chart.data("panning")&&e.data.chart.data("panning",!1).css("cursor","default").off("mousemove")},bindPan:function(){this.$chartContainer.css("overflow","hidden"),this.$chart.on("mousedown touchstart",this.panStartHandler),e(i).on("mouseup touchend",{chart:this.$chart},this.panEndHandler)},unbindPan:function(){this.$chartContainer.css("overflow","auto"),this.$chart.off("mousedown touchstart",this.panStartHandler),e(i).off("mouseup touchend",this.panEndHandler)},zoomWheelHandler:function(e){var t=e.data.oc;e.preventDefault();var i=1+(e.originalEvent.deltaY>0?-.2:.2);t.setChartScale(t.$chart,i)},zoomStartHandler:function(e){if(e.touches&&2===e.touches.length){var t=e.data.oc;t.$chart.data("pinching",!0);var i=t.getPinchDist(e);t.$chart.data("pinchDistStart",i)}},zoomingHandler:function(e){var t=e.data.oc;if(t.$chart.data("pinching")){var i=t.getPinchDist(e);t.$chart.data("pinchDistEnd",i)}},zoomEndHandler:function(e){var t=e.data.oc;if(t.$chart.data("pinching")){t.$chart.data("pinching",!1);var i=t.$chart.data("pinchDistEnd")-t.$chart.data("pinchDistStart");i>0?t.setChartScale(t.$chart,1.2):i<0&&t.setChartScale(t.$chart,.8)}},bindZoom:function(){this.$chartContainer.on("wheel",{oc:this},this.zoomWheelHandler),this.$chartContainer.on("touchstart",{oc:this},this.zoomStartHandler),e(i).on("touchmove",{oc:this},this.zoomingHandler),e(i).on("touchend",{oc:this},this.zoomEndHandler)},unbindZoom:function(){this.$chartContainer.off("wheel",this.zoomWheelHandler),this.$chartContainer.off("touchstart",this.zoomStartHandler),e(i).off("touchmove",this.zoomingHandler),e(i).off("touchend",this.zoomEndHandler)},getPinchDist:function(e){return Math.sqrt((e.touches[0].clientX-e.touches[1].clientX)*(e.touches[0].clientX-e.touches[1].clientX)+(e.touches[0].clientY-e.touches[1].clientY)*(e.touches[0].clientY-e.touches[1].clientY))},setChartScale:function(e,i){var n=e.data("options"),s=e.css("transform"),a="",d=1;"none"===s?e.css("transform","scale("+i+","+i+")"):(a=s.split(","),-1===s.indexOf("3d")?(d=Math.abs(t.parseFloat(a[3])*i))>n.zoomoutLimit&&d<n.zoominLimit&&e.css("transform",s+" scale("+i+","+i+")"):(d=Math.abs(t.parseFloat(a[1])*i))>n.zoomoutLimit&&d<n.zoominLimit&&e.css("transform",s+" scale3d("+i+","+i+", 1)"))},buildJsonDS:function(t){var i=this,n={name:t.contents().eq(0).text().trim(),relationship:(t.parent().parent().is("li")?"1":"0")+(t.siblings("li").length?1:0)+(t.children("ul").length?1:0)};return t.attr("data-id")&&(n.id=t.attr("data-id")),t.children("ul").children().each(function(){n.children||(n.children=[]),n.children.push(i.buildJsonDS(e(this)))}),n},attachRel:function(e,t){var i=this;return e.relationship=t+(e.children&&e.children.length>0?1:0),e.children&&e.children.forEach(function(t){i.attachRel(t,"1"+(e.children.length>1?1:0))}),e},loopChart:function(t){var i=this,n=t.find("tr:first"),s={id:n.find(".node")[0].id};return n.siblings(":last").children().each(function(){s.children||(s.children=[]),s.children.push(i.loopChart(e(this)))}),s},getHierarchy:function(){if(void 0===this.$chart)return"Error: orgchart does not exist";if(!this.$chart.find(".node").length)return"Error: nodes do not exist";var e=!0;return this.$chart.find(".node").each(function(){if(!this.id)return e=!1,!1}),e?this.loopChart(this.$chart):"Error: All nodes of orghcart to be exported must have data-id attribute!"},getNodeState:function(e,t){var i={};if("parent"===(t=t||"self")){if((i=e.closest(".nodes").siblings(":first")).length)return i.is(".hidden")||!i.is(".hidden")&&i.closest(".nodes").is(".hidden")?{exist:!0,visible:!1}:{exist:!0,visible:!0}}else if("children"===t){if((i=e.closest("tr").siblings(":last")).length)return i.is(".hidden")?{exist:!0,visible:!1}:{exist:!0,visible:!0}}else if("siblings"===t){if((i=e.closest("table").parent().siblings()).length)return i.is(".hidden")||i.parent().is(".hidden")?{exist:!0,visible:!1}:{exist:!0,visible:!0}}else if((i=e).length)return i.closest(".nodes").length&&i.closest(".nodes").is(".hidden")||i.closest("table").parent().length&&i.closest("table").parent().is(".hidden")||i.parent().is("li")&&(i.closest("ul").is(".hidden")||i.closest("verticalNodes").is(".hidden"))?{exist:!0,visible:!1}:{exist:!0,visible:!0};return{exist:!1,visible:!1}},getRelatedNodes:function(t,i){return t&&t instanceof e&&t.is(".node")?"parent"===i?t.closest(".nodes").parent().children(":first").find(".node"):"children"===i?t.closest("tr").siblings(".nodes").children().find(".node:first"):"siblings"===i?t.closest("table").parent().siblings().find(".node:first"):e():e()},hideParentEnd:function(t){e(t.target).removeClass("sliding"),t.data.upperLevel.addClass("hidden").slice(1).removeAttr("style")},hideParent:function(e){var t=e.closest(".nodes").siblings();t.eq(0).find(".spinner").length&&e.closest(".orgchart").data("inAjax",!1),this.getNodeState(e,"siblings").visible&&this.hideSiblings(e),t.slice(1).css("visibility","hidden");var i=t.eq(0).find(".node");this.getNodeState(i).visible&&i.addClass("sliding slide-down").one("transitionend",{upperLevel:t},this.hideParentEnd),this.getNodeState(i,"parent").visible&&this.hideParent(i)},showParentEnd:function(t){var i=t.data.node;e(t.target).removeClass("sliding"),this.isInAction(i)&&this.switchVerticalArrow(i.children(".topEdge"))},showParent:function(e){var t=e.closest(".nodes").siblings().removeClass("hidden");t.eq(2).children().slice(1,-1).addClass("hidden");var i=t.eq(0).find(".node");this.repaint(i[0]),i.addClass("sliding").removeClass("slide-down").one("transitionend",{node:e},this.showParentEnd.bind(this))},stopAjax:function(e){e.find(".spinner").length&&e.closest(".orgchart").data("inAjax",!1)},isVisibleNode:function(t,i){return this.getNodeState(e(i)).visible},hideChildrenEnd:function(e){e.data.visibleNodes.removeClass("sliding"),e.data.isVerticalDesc?e.data.lowerLevel.addClass("hidden"):(e.data.visibleNodes.closest("table").closest("tr").prevAll(".lines").removeAttr("style").addClass("hidden").siblings(".nodes").addClass("hidden"),e.data.lowerLevel.last().find(".verticalNodes").addClass("hidden")),this.isInAction(e.data.node)&&this.switchVerticalArrow(e.data.node.children(".bottomEdge"))},hideChildren:function(e){var t=e.closest("tr").siblings();this.stopAjax(t.last());var i=t.last().find(".node").filter(this.isVisibleNode.bind(this)),n=!!t.last().is(".verticalNodes");n||i.closest("table").closest("tr").prevAll(".lines").css("visibility","hidden"),this.repaint(i.get(0)),i.addClass("sliding slide-up").eq(0).one("transitionend",{visibleNodes:i,lowerLevel:t,isVerticalDesc:n,node:e},this.hideChildrenEnd.bind(this))},showChildrenEnd:function(e){var t=e.data.node;e.data.descendants.removeClass("sliding"),this.isInAction(t)&&this.switchVerticalArrow(t.children(".bottomEdge"))},showChildren:function(e){var t=e.closest("tr").siblings(),i=!!t.is(".verticalNodes")?t.removeClass("hidden").find(".node").filter(this.isVisibleNode.bind(this)):t.removeClass("hidden").eq(2).children().find(".node:first").filter(this.isVisibleNode.bind(this));this.repaint(i.get(0)),i.addClass("sliding").removeClass("slide-up").eq(0).one("transitionend",{node:e,descendants:i},this.showChildrenEnd.bind(this))},hideSiblingsEnd:function(e){var t=e.data.node,i=e.data.nodeContainer,n=e.data.direction;e.data.lines.removeAttr("style");var s=n?"left"===n?i.prevAll(":not(.hidden)"):i.nextAll(":not(.hidden)"):i.siblings();i.closest(".nodes").prev().children(":not(.hidden)").slice(1,n?2*s.length+1:-1).addClass("hidden"),e.data.animatedNodes.removeClass("sliding"),s.find(".node:gt(0)").filter(this.isVisibleNode.bind(this)).removeClass("slide-left slide-right").addClass("slide-up"),s.find(".lines, .nodes, .verticalNodes").addClass("hidden").end().addClass("hidden"),this.isInAction(t)&&this.switchHorizontalArrow(t)},hideSiblings:function(e,t){var i=e.closest("table").parent();i.siblings().find(".spinner").length&&e.closest(".orgchart").data("inAjax",!1),t?"left"===t?i.prevAll().find(".node").filter(this.isVisibleNode.bind(this)).addClass("sliding slide-right"):i.nextAll().find(".node").filter(this.isVisibleNode.bind(this)).addClass("sliding slide-left"):(i.prevAll().find(".node").filter(this.isVisibleNode.bind(this)).addClass("sliding slide-right"),i.nextAll().find(".node").filter(this.isVisibleNode.bind(this)).addClass("sliding slide-left"));var n=i.siblings().find(".sliding"),s=n.closest(".nodes").prevAll(".lines").css("visibility","hidden");n.eq(0).one("transitionend",{node:e,nodeContainer:i,direction:t,animatedNodes:n,lines:s},this.hideSiblingsEnd.bind(this))},showSiblingsEnd:function(e){var t=e.data.node;e.data.visibleNodes.removeClass("sliding"),this.isInAction(t)&&(this.switchHorizontalArrow(t),t.children(".topEdge").removeClass("fa-chevron-up").addClass("fa-chevron-down"))},showRelatedParentEnd:function(t){e(t.target).removeClass("sliding")},showSiblings:function(t,i){var n=e();n=i?"left"===i?t.closest("table").parent().prevAll().removeClass("hidden"):t.closest("table").parent().nextAll().removeClass("hidden"):t.closest("table").parent().siblings().removeClass("hidden");var s=t.closest("table").closest("tr").siblings();if(i?s.eq(2).children(".hidden").slice(0,2*n.length).removeClass("hidden"):s.eq(2).children(".hidden").removeClass("hidden"),!this.getNodeState(t,"parent").visible){s.removeClass("hidden");var a=s.find(".node")[0];this.repaint(a),e(a).addClass("sliding").removeClass("slide-down").one("transitionend",this.showRelatedParentEnd)}var d=n.find(".node").filter(this.isVisibleNode.bind(this));this.repaint(d.get(0)),d.addClass("sliding").removeClass("slide-left slide-right"),d.eq(0).one("transitionend",{node:t,visibleNodes:d},this.showSiblingsEnd.bind(this))},startLoading:function(t){var i=this.$chart;return(void 0===i.data("inAjax")||!0!==i.data("inAjax"))&&(t.addClass("hidden"),t.parent().append('<i class="fa fa-circle-o-notch fa-spin spinner"></i>').children().not(".spinner").css("opacity",.2),i.data("inAjax",!0),e(".oc-export-btn"+(""!==this.options.chartClass?"."+this.options.chartClass:"")).prop("disabled",!0),!0)},endLoading:function(t){var i=t.parent();t.removeClass("hidden"),i.find(".spinner").remove(),i.children().removeAttr("style"),this.$chart.data("inAjax",!1),e(".oc-export-btn"+(""!==this.options.chartClass?"."+this.options.chartClass:"")).prop("disabled",!1)},isInAction:function(e){return e.children(".edge").attr("class").indexOf("fa-")>-1},switchVerticalArrow:function(e){e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down")},switchHorizontalArrow:function(e){var t=e.closest(".orgchart").data("options");if(t.toggleSiblingsResp&&(void 0===t.ajaxURL||e.closest(".nodes").data("siblingsLoaded"))){var i=e.closest("table").parent().prev();i.length&&(i.is(".hidden")?e.children(".leftEdge").addClass("fa-chevron-left").removeClass("fa-chevron-right"):e.children(".leftEdge").addClass("fa-chevron-right").removeClass("fa-chevron-left"));var n=e.closest("table").parent().next();n.length&&(n.is(".hidden")?e.children(".rightEdge").addClass("fa-chevron-right").removeClass("fa-chevron-left"):e.children(".rightEdge").addClass("fa-chevron-left").removeClass("fa-chevron-right"))}else{var s=e.closest("table").parent().siblings(),a=!!s.length&&!s.is(".hidden");e.children(".leftEdge").toggleClass("fa-chevron-right",a).toggleClass("fa-chevron-left",!a),e.children(".rightEdge").toggleClass("fa-chevron-left",a).toggleClass("fa-chevron-right",!a)}},repaint:function(e){e&&(e.style.offsetWidth=e.offsetWidth)},nodeEnterLeaveHandler:function(t){var i=e(t.delegateTarget),n=!1,s=i.children(".topEdge"),a=(i.children(".rightEdge"),i.children(".bottomEdge")),d=i.children(".leftEdge");"mouseenter"===t.type?(s.length&&(n=this.getNodeState(i,"parent").visible,s.toggleClass("fa-chevron-up",!n).toggleClass("fa-chevron-down",n)),a.length&&(n=this.getNodeState(i,"children").visible,a.toggleClass("fa-chevron-down",!n).toggleClass("fa-chevron-up",n)),d.length&&this.switchHorizontalArrow(i)):i.children(".edge").removeClass("fa-chevron-up fa-chevron-down fa-chevron-right fa-chevron-left")},nodeClickHandler:function(t){this.$chart.find(".focused").removeClass("focused"),e(t.delegateTarget).addClass("focused")},loadNodes:function(t,i,n){var s=this,a=this.options;e.ajax({url:i,dataType:"json"}).done(function(i){s.$chart.data("inAjax")&&("parent"===t?e.isEmptyObject(i)||s.addParent(n.parent(),i,a):"children"===t?i.children.length&&s.addChildren(n.parent(),i,e.extend({},a,{depth:0})):(i.siblings||i.children)&&s.addSiblings(n.parent(),i,a))}).fail(function(){console.log("Failed to get "+t+" data")}).always(function(){s.endLoading(n)})},HideFirstParentEnd:function(e){var t=e.data.topEdge,i=t.parent();this.isInAction(i)&&(this.switchVerticalArrow(t),this.switchHorizontalArrow(i))},topEdgeClickHandler:function(t){t.stopPropagation();var i=e(t.target),n=e(t.delegateTarget),s=this.getNodeState(n,"parent");if(s.exist){var a=n.closest("table").closest("tr").siblings(":first").find(".node");if(a.is(".sliding"))return;s.visible?(this.hideParent(n),a.one("transitionend",{topEdge:i},this.HideFirstParentEnd.bind(this))):this.showParent(n)}else if(this.startLoading(i)){var d=this.options,o=e.isFunction(d.ajaxURL.parent)?d.ajaxURL.parent(t.data.nodeData):d.ajaxURL.parent+n[0].id;this.loadNodes("parent",o,i)}},bottomEdgeClickHandler:function(t){t.stopPropagation();var i=e(t.target),n=e(t.delegateTarget),s=this.getNodeState(n,"children");if(s.exist){if(n.closest("tr").siblings(":last").find(".sliding").length)return;s.visible?this.hideChildren(n):this.showChildren(n)}else if(this.startLoading(i)){var a=this.options,d=e.isFunction(a.ajaxURL.children)?a.ajaxURL.children(t.data.nodeData):a.ajaxURL.children+n[0].id;this.loadNodes("children",d,i)}},hEdgeClickHandler:function(t){t.stopPropagation();var i=e(t.target),n=e(t.delegateTarget),s=this.options,a=this.getNodeState(n,"siblings");if(a.exist){if(n.closest("table").parent().siblings().find(".sliding").length)return;if(s.toggleSiblingsResp){var d=n.closest("table").parent().prev(),o=n.closest("table").parent().next();i.is(".leftEdge")?d.is(".hidden")?this.showSiblings(n,"left"):this.hideSiblings(n,"left"):o.is(".hidden")?this.showSiblings(n,"right"):this.hideSiblings(n,"right")}else a.visible?this.hideSiblings(n):this.showSiblings(n)}else if(this.startLoading(i)){var r=n[0].id,l=this.getNodeState(n,"parent").exist?e.isFunction(s.ajaxURL.siblings)?s.ajaxURL.siblings(t.data.nodeData):s.ajaxURL.siblings+r:e.isFunction(s.ajaxURL.families)?s.ajaxURL.families(t.data.nodeData):s.ajaxURL.families+r;this.loadNodes("siblings",l,i)}},expandVNodesEnd:function(e){e.data.vNodes.removeClass("sliding")},collapseVNodesEnd:function(e){e.data.vNodes.removeClass("sliding").closest("ul").addClass("hidden")},toggleVNodes:function(t){var i=e(t.target),n=i.parent().next(),s=n.find(".node"),a=n.children().children(".node");a.is(".sliding")||(i.toggleClass("fa-plus-square fa-minus-square"),s.eq(0).is(".slide-up")?(n.removeClass("hidden"),this.repaint(a.get(0)),a.addClass("sliding").removeClass("slide-up").eq(0).one("transitionend",{vNodes:a},this.expandVNodesEnd)):(s.addClass("sliding slide-up").eq(0).one("transitionend",{vNodes:s},this.collapseVNodesEnd),s.find(".toggleBtn").removeClass("fa-minus-square").addClass("fa-plus-square")))},createGhostNode:function(n){var s=e(n.target),a=this.options,d=n.originalEvent,o=/firefox/.test(t.navigator.userAgent.toLowerCase());o&&d.dataTransfer.setData("text/html","hack for firefox");var r,l;i.querySelector(".ghost-node")?(r=s.closest(".orgchart").children(".ghost-node").get(0),l=e(r).children().get(0)):((r=i.createElementNS("http://www.w3.org/2000/svg","svg")).classList.add("ghost-node"),l=i.createElementNS("http://www.w3.org/2000/svg","rect"),r.appendChild(l),s.closest(".orgchart").append(r));var h=s.closest(".orgchart").css("transform").split(","),c=Math.abs(t.parseFloat("t2b"===a.direction||"b2t"===a.direction?h[0].slice(h[0].indexOf("(")+1):h[1]));r.setAttribute("width",s.outerWidth(!1)),r.setAttribute("height",s.outerHeight(!1)),l.setAttribute("x",5*c),l.setAttribute("y",5*c),l.setAttribute("width",120*c),l.setAttribute("height",40*c),l.setAttribute("rx",4*c),l.setAttribute("ry",4*c),l.setAttribute("stroke-width",1*c);var g=d.offsetX*c,p=d.offsetY*c;if("l2r"===a.direction?(g=d.offsetY*c,p=d.offsetX*c):"r2l"===a.direction?(g=s.outerWidth(!1)-d.offsetY*c,p=d.offsetX*c):"b2t"===a.direction&&(g=s.outerWidth(!1)-d.offsetX*c,p=s.outerHeight(!1)-d.offsetY*c),o){l.setAttribute("fill","rgb(255, 255, 255)"),l.setAttribute("stroke","rgb(191, 0, 0)");var f=i.createElement("img");f.src="data:image/svg+xml;utf8,"+(new XMLSerializer).serializeToString(r),d.dataTransfer.setDragImage(f,g,p)}else d.dataTransfer.setDragImage(r,g,p)},filterAllowedDropNodes:function(t){var i=this.options,n=t.closest(".nodes").siblings().eq(0).find(".node:first"),s=t.closest("table").find(".node");this.$chart.data("dragged",t).find(".node").each(function(a,d){-1===s.index(d)&&(i.dropCriteria?i.dropCriteria(t,n,e(d))&&e(d).addClass("allowedDrop"):e(d).addClass("allowedDrop"))})},dragstartHandler:function(t){"none"!==this.$chart.css("transform")&&this.createGhostNode(t),this.filterAllowedDropNodes(e(t.target))},dragoverHandler:function(t){t.preventDefault(),e(t.delegateTarget).is(".allowedDrop")||(t.originalEvent.dataTransfer.dropEffect="none")},dragendHandler:function(e){this.$chart.find(".allowedDrop").removeClass("allowedDrop")},dropHandler:function(t){var i=e(t.delegateTarget),n=this.$chart.data("dragged"),s=n.closest(".nodes").siblings().eq(0).children(),a=e.Event("nodedrop.orgchart");if(this.$chart.trigger(a,{draggedNode:n,dragZone:s.children(),dropZone:i}),!a.isDefaultPrevented()){if(i.closest("tr").siblings().length){var d=parseInt(i.parent().attr("colspan"))+2,o='<i class="edge horizontalEdge rightEdge fa"></i><i class="edge horizontalEdge leftEdge fa"></i>';i.closest("tr").next().addBack().children().attr("colspan",d),n.find(".horizontalEdge").length||n.append(o),i.closest("tr").siblings().eq(1).children(":last").before('<td class="leftLine topLine"></td><td class="rightLine topLine"></td>').end().next().append(n.closest("table").parent());var r=n.closest("table").parent().siblings().find(".node:first");1===r.length&&r.append(o)}else i.append('<i class="edge verticalEdge bottomEdge fa"></i>').parent().attr("colspan",2).parent().after('<tr class="lines"><td colspan="2"><div class="downLine"></div></td></tr><tr class="lines"><td class="rightLine"></td><td class="leftLine"></td></tr><tr class="nodes"></tr>').siblings(":last").append(n.find(".horizontalEdge").remove().end().closest("table").parent());var l=parseInt(s.attr("colspan"));if(l>2){s.attr("colspan",l-2).parent().next().children().attr("colspan",l-2).end().next().children().slice(1,3).remove();var h=s.parent().siblings(".nodes").children().find(".node:first");1===h.length&&h.find(".horizontalEdge").remove()}else s.removeAttr("colspan").find(".bottomEdge").remove().end().end().siblings().remove()}},createNode:function(t,i,n){t.children||(t.children=[]),e.each(t.children,function(e,i){i.parentId=t.id});var s=e.Deferred(),a=e("<div"+(n.draggable?' draggable="true"':"")+(t[n.nodeId]?' id="'+t[n.nodeId]+'"':"")+(t.parentId?' data-parent="'+t.parentId+'"':"")+">").addClass("node "+(t.className||"")+(i>=n.depth?" slide-up":""));n.nodeTemplate?a.append(n.nodeTemplate(t)):a.append('<div class="title">'+t[n.nodeTitle]+"</div>").append(void 0!==n.nodeContent?'<div class="content">'+(t[n.nodeContent]||"")+"</div>":"");var d=t.relationship||"";if(n.verticalDepth&&i+2>n.verticalDepth){if(i+1>=n.verticalDepth&&Number(d.substr(2,1))){var o=i+1>=n.depth?"plus":"minus";a.append('<i class="toggleBtn fa fa-'+o+'-square"></i>')}}else Number(d.substr(0,1))&&a.append('<i class="edge verticalEdge topEdge fa"></i>'),Number(d.substr(1,1))&&a.append('<i class="edge horizontalEdge rightEdge fa"></i><i class="edge horizontalEdge leftEdge fa"></i>'),Number(d.substr(2,1))&&a.append('<i class="edge verticalEdge bottomEdge fa"></i>').children(".title").prepend('<i class="fa '+n.parentNodeSymbol+' symbol"></i>');return a.on("mouseenter mouseleave",this.nodeEnterLeaveHandler.bind(this)),a.on("click",this.nodeClickHandler.bind(this)),a.on("click",".topEdge",{nodeData:t},this.topEdgeClickHandler.bind(this)),a.on("click",".bottomEdge",{nodeData:t},this.bottomEdgeClickHandler.bind(this)),a.on("click",".leftEdge, .rightEdge",{nodeData:t},this.hEdgeClickHandler.bind(this)),a.on("click",".toggleBtn",this.toggleVNodes.bind(this)),n.draggable&&a.on("dragstart",this.dragstartHandler.bind(this)).on("dragover",this.dragoverHandler.bind(this)).on("dragend",this.dragendHandler.bind(this)).on("drop",this.dropHandler.bind(this)),n.createNode&&n.createNode(a,t),s.resolve(a),s.promise()},buildHierarchy:function(t,i,n,s,a){var d,o=this,r=i.children,l=!!r&&r.length,h=!!(s.verticalDepth&&n+1>=s.verticalDepth);if(Object.keys(i).length>1&&(d=h?t:e("<table>"),h||t.append(d),e.when(this.createNode(i,n,s)).done(function(t){h?d.append(t):d.append(e("<tr/>").append(e("<td"+(l?' colspan="'+2*r.length+'"':"")+"></td>").append(t))),a&&a()}).fail(function(){console.log("Failed to creat node")})),l){1===Object.keys(i).length&&(d=t);var c=n+1>=s.depth||i.collapsed?" hidden":"",g=!!(s.verticalDepth&&n+2>=s.verticalDepth);g||d.append('<tr class="lines'+c+'"><td colspan="'+2*r.length+'"><div class="downLine"></div></td></tr>');for(var p='<tr class="lines'+c+'"><td class="rightLine"></td>',f=1;f<r.length;f++)p+='<td class="leftLine topLine"></td><td class="rightLine topLine"></td>';p+='<td class="leftLine"></td></tr>';var v;g?(v=e("<ul>"),c&&s.depth+1!==s.verticalDepth&&v.addClass(c),n+2===s.verticalDepth?d.append('<tr class="verticalNodes'+c+'"><td></td></tr>').find(".verticalNodes").children().append(v):d.append(v)):(v=e('<tr class="nodes'+c+'">'),d.append(p).append(v)),e.each(r,function(){var t=e(g?"<li>":'<td colspan="2">');v.append(t),o.buildHierarchy(t,this,n+1,s,a)})}},buildChildNode:function(e,t,i,n){var i=i||e.closest(".orgchart").data("options"),s=t.children||t.siblings;e.find("td:first").attr("colspan",2*s.length),this.buildHierarchy(e,{children:s},0,i,n)},addChildren:function(e,t,i){var n=this,i=i||e.closest(".orgchart").data("options"),s=0;this.buildChildNode(e.closest("table"),t,i,function(){++s===t.children.length&&(e.children(".bottomEdge").length||e.append('<i class="edge verticalEdge bottomEdge fa"></i>'),e.find(".symbol").length||e.children(".title").prepend('<i class="fa '+i.parentNodeSymbol+' symbol"></i>'),n.showChildren(e))})},buildParentNode:function(t,i,n,s){var a=this,d=e("<table>");i.relationship=i.relationship||"001",e.when(this.createNode(i,0,n||t.closest(".orgchart").data("options"))).done(function(t){d.append(e('<tr class="hidden">').append(e('<td colspan="2">').append(t.removeClass("slide-up").addClass("slide-down")))),d.append('<tr class="lines hidden"><td colspan="2"><div class="downLine"></div></td></tr>');d.append('<tr class="lines hidden"><td class="rightLine"></td><td class="leftLine"></td></tr>');var i=a.$chart;i.prepend(d).children("table:first").append('<tr class="nodes"><td colspan="2"></td></tr>').children("tr:last").children().append(i.children("table").last()),s()}).fail(function(){console.log("Failed to create parent node")})},addParent:function(e,t,i){var n=this;this.buildParentNode(e,t,i,function(){e.children(".topEdge").length||e.children(".title").after('<i class="edge verticalEdge topEdge fa"></i>'),n.showParent(e)})},complementLine:function(e,t,i){for(var n="",s=0;s<i;s++)n+='<td class="leftLine topLine"></td><td class="rightLine topLine"></td>';e.parent().prevAll("tr:gt(0)").children().attr("colspan",2*t).end().next().children(":first").after(n)},buildSiblingNode:function(t,i,n,s){var a=this,n=n||t.closest(".orgchart").data("options"),d=i.siblings?i.siblings.length:i.children.length,o=t.parent().is("td")?t.closest("tr").children().length:1,r=o+d,l=r>1?Math.floor(r/2-1):0;if(t.parent().is("td")){t.closest("tr").prevAll("tr:last");t.closest("tr").prevAll("tr:lt(2)").remove();var h=0;this.buildChildNode(t.parent().closest("table"),i,n,function(){if(++h===d){var e=t.parent().closest("table").children("tr:last").children("td");o>1?(a.complementLine(e.eq(0).before(t.closest("td").siblings().addBack().unwrap()),r,o),e.addClass("hidden").find(".node").addClass("slide-left")):(a.complementLine(e.eq(l).after(t.closest("td").unwrap()),r,1),e.not(":eq("+l+"1)").addClass("hidden").slice(0,l).find(".node").addClass("slide-right").end().end().slice(l).find(".node").addClass("slide-left")),s()}})}else{var c=0;this.buildHierarchy(t.closest(".orgchart"),i,0,n,function(){++c===r&&(a.complementLine(t.next().children("tr:last").children().eq(l).after(e('<td colspan="2">').append(t)),r,1),t.closest("tr").siblings().eq(0).addClass("hidden").find(".node").addClass("slide-down"),t.parent().siblings().addClass("hidden").slice(0,l).find(".node").addClass("slide-right").end().end().slice(l).find(".node").addClass("slide-left"),s())})}},addSiblings:function(e,t,i){var n=this;this.buildSiblingNode(e.closest("table"),t,i,function(){e.closest(".nodes").data("siblingsLoaded",!0),e.children(".leftEdge").length||e.children(".topEdge").after('<i class="edge horizontalEdge rightEdge fa"></i><i class="edge horizontalEdge leftEdge fa"></i>'),n.showSiblings(e)})},removeNodes:function(e){var t=e.closest("table").parent(),i=t.parent().siblings();t.is("td")?this.getNodeState(e,"siblings").exist?(i.eq(2).children(".topLine:lt(2)").remove(),i.slice(0,2).children().attr("colspan",i.eq(2).children().length),t.remove()):i.eq(0).children().removeAttr("colspan").find(".bottomEdge").remove().end().end().siblings().remove():t.add(t.siblings()).remove()},export:function(n,s){var a=this;if(n=void 0!==n?n:this.options.exportFilename,s=void 0!==s?s:this.options.exportFileextension,e(this).children(".spinner").length)return!1;var d=this.$chartContainer,o=d.find(".mask");o.length?o.removeClass("hidden"):d.append('<div class="mask"><i class="fa fa-circle-o-notch fa-spin spinner"></i></div>');var r=d.addClass("canvasContainer").find('.orgchart:not(".hidden")').get(0),l="l2r"===a.options.direction||"r2l"===a.options.direction;html2canvas(r,{width:l?r.clientHeight:r.clientWidth,height:l?r.clientWidth:r.clientHeight,onclone:function(t){e(t).find(".canvasContainer").css("overflow","visible").find('.orgchart:not(".hidden"):first').css("transform","")},onrendered:function(e){if(d.find(".mask").addClass("hidden"),"pdf"===s.toLowerCase()){var o={},r=Math.floor(.2646*e.width),l=Math.floor(.2646*e.height);(o=r>l?new jsPDF("l","mm",[r,l]):new jsPDF("p","mm",[l,r])).addImage(e.toDataURL(),"png",0,0),o.save(n+".pdf")}else{var h="WebkitAppearance"in i.documentElement.style,c=!!t.sidebar,g="Microsoft Internet Explorer"===navigator.appName||"Netscape"===navigator.appName&&navigator.appVersion.indexOf("Edge")>-1;if(!h&&!c||g)t.navigator.msSaveBlob(e.msToBlob(),n+".png");else{var p=".oc-download-btn"+(""!==a.options.chartClass?"."+a.options.chartClass:"");d.find(p).length||d.append('<a class="oc-download-btn'+(""!==a.options.chartClass?" "+a.options.chartClass:"")+'" download="'+n+'.png"></a>'),d.find(p).attr("href",e.toDataURL())[0].click()}}}}).then(function(){d.removeClass("canvasContainer")},function(){d.removeClass("canvasContainer")})}},e.fn.orgchart=function(e){return new s(this,e).init()}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5vcmdjaGFydC5qcyJdLCJuYW1lcyI6WyJmYWN0b3J5IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImpRdWVyeSIsIiQiLCJ1bmRlZmluZWQiLCJPcmdDaGFydCIsImVsZW0iLCJvcHRzIiwidGhpcyIsIiRjaGFydENvbnRhaW5lciIsImRlZmF1bHRPcHRpb25zIiwibm9kZVRpdGxlIiwibm9kZUlkIiwidG9nZ2xlU2libGluZ3NSZXNwIiwiZGVwdGgiLCJjaGFydENsYXNzIiwiZXhwb3J0QnV0dG9uIiwiZXhwb3J0RmlsZW5hbWUiLCJleHBvcnRGaWxlZXh0ZW5zaW9uIiwicGFyZW50Tm9kZVN5bWJvbCIsImRyYWdnYWJsZSIsImRpcmVjdGlvbiIsInBhbiIsInpvb20iLCJ6b29taW5MaW1pdCIsInpvb21vdXRMaW1pdCIsInByb3RvdHlwZSIsImluaXQiLCJ0aGF0Iiwib3B0aW9ucyIsImV4dGVuZCIsIiRjaGFydCIsInJlbW92ZSIsImRhdGEiLCJjbGFzcyIsImNsaWNrIiwiZXZlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibGVuZ3RoIiwiZmluZCIsInJlbW92ZUNsYXNzIiwiTXV0YXRpb25PYnNlcnZlciIsInRyaWdnZXJJbml0RXZlbnQiLCJ0eXBlIiwiYnVpbGRIaWVyYXJjaHkiLCJidWlsZEpzb25EUyIsImNoaWxkcmVuIiwiYWpheFVSTCIsImF0dGFjaFJlbCIsImFwcGVuZCIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImRvbmUiLCJ0ZXh0U3RhdHVzIiwianFYSFIiLCJmYWlsIiwiZXJyb3JUaHJvd24iLCJjb25zb2xlIiwibG9nIiwiYWx3YXlzIiwiYXR0YWNoRXhwb3J0QnV0dG9uIiwiYmluZFBhbiIsImJpbmRab29tIiwibW8iLCJtdXRhdGlvbnMiLCJkaXNjb25uZWN0IiwiaW5pdFRpbWUiLCJpIiwiaiIsImFkZGVkTm9kZXMiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImluaXRDb21wbGV0ZWQiLCJpbml0RXZlbnQiLCJFdmVudCIsInRyaWdnZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiJGV4cG9ydEJ0biIsInRleHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJleHBvcnQiLCJzZXRPcHRpb25zIiwidmFsIiwidW5iaW5kUGFuIiwidW5iaW5kWm9vbSIsInBhblN0YXJ0SGFuZGxlciIsImRlbGVnYXRlVGFyZ2V0IiwidG91Y2hlcyIsImNzcyIsImxhc3RYIiwibGFzdFkiLCJsYXN0VGYiLCJ0ZW1wIiwic3BsaXQiLCJpbmRleE9mIiwicGFyc2VJbnQiLCJzdGFydFgiLCJzdGFydFkiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIm9uIiwibmV3WCIsIm5ld1kiLCJtYXRyaXgiLCJqb2luIiwicGFuRW5kSGFuZGxlciIsImNoYXJ0Iiwib2ZmIiwiem9vbVdoZWVsSGFuZGxlciIsIm9jIiwibmV3U2NhbGUiLCJvcmlnaW5hbEV2ZW50IiwiZGVsdGFZIiwic2V0Q2hhcnRTY2FsZSIsInpvb21TdGFydEhhbmRsZXIiLCJkaXN0IiwiZ2V0UGluY2hEaXN0Iiwiem9vbWluZ0hhbmRsZXIiLCJ6b29tRW5kSGFuZGxlciIsImRpZmYiLCJNYXRoIiwic3FydCIsImNsaWVudFgiLCJjbGllbnRZIiwidGFyZ2V0U2NhbGUiLCJhYnMiLCJwYXJzZUZsb2F0IiwiJGxpIiwic3ViT2JqIiwibmFtZSIsImNvbnRlbnRzIiwiZXEiLCJ0cmltIiwicmVsYXRpb25zaGlwIiwicGFyZW50IiwiaXMiLCJzaWJsaW5ncyIsImF0dHIiLCJpZCIsImVhY2giLCJwdXNoIiwiZmxhZ3MiLCJmb3JFYWNoIiwiaXRlbSIsImxvb3BDaGFydCIsIiR0ciIsImdldEhpZXJhcmNoeSIsInZhbGlkIiwiZ2V0Tm9kZVN0YXRlIiwiJG5vZGUiLCJyZWxhdGlvbiIsIiR0YXJnZXQiLCJleGlzdCIsInZpc2libGUiLCJnZXRSZWxhdGVkTm9kZXMiLCJoaWRlUGFyZW50RW5kIiwidXBwZXJMZXZlbCIsImFkZENsYXNzIiwic2xpY2UiLCJyZW1vdmVBdHRyIiwiaGlkZVBhcmVudCIsIiR1cHBlckxldmVsIiwiaGlkZVNpYmxpbmdzIiwiJHBhcmVudCIsIm9uZSIsInNob3dQYXJlbnRFbmQiLCJub2RlIiwiaXNJbkFjdGlvbiIsInN3aXRjaFZlcnRpY2FsQXJyb3ciLCJzaG93UGFyZW50IiwicmVwYWludCIsImJpbmQiLCJzdG9wQWpheCIsIiRub2RlTGV2ZWwiLCJpc1Zpc2libGVOb2RlIiwiaW5kZXgiLCJoaWRlQ2hpbGRyZW5FbmQiLCJ2aXNpYmxlTm9kZXMiLCJpc1ZlcnRpY2FsRGVzYyIsImxvd2VyTGV2ZWwiLCJwcmV2QWxsIiwibGFzdCIsImhpZGVDaGlsZHJlbiIsIiRsb3dlckxldmVsIiwiJHZpc2libGVOb2RlcyIsImZpbHRlciIsImdldCIsInNob3dDaGlsZHJlbkVuZCIsImRlc2NlbmRhbnRzIiwic2hvd0NoaWxkcmVuIiwiJGxldmVscyIsIiRkZXNjZW5kYW50cyIsImhpZGVTaWJsaW5nc0VuZCIsIiRub2RlQ29udGFpbmVyIiwibm9kZUNvbnRhaW5lciIsImxpbmVzIiwiJHNpYmxpbmdzIiwibmV4dEFsbCIsInByZXYiLCJhbmltYXRlZE5vZGVzIiwiZW5kIiwic3dpdGNoSG9yaXpvbnRhbEFycm93IiwiJGFuaW1hdGVkTm9kZXMiLCIkbGluZXMiLCJzaG93U2libGluZ3NFbmQiLCJzaG93UmVsYXRlZFBhcmVudEVuZCIsInNob3dTaWJsaW5ncyIsInN0YXJ0TG9hZGluZyIsIiRlZGdlIiwibm90IiwicHJvcCIsImVuZExvYWRpbmciLCIkYXJyb3ciLCJ0b2dnbGVDbGFzcyIsIiRwcmV2U2liIiwiJG5leHRTaWIiLCJuZXh0IiwiJHNpYnMiLCJzaWJzVmlzaWJsZSIsInN0eWxlIiwib2Zmc2V0V2lkdGgiLCJub2RlRW50ZXJMZWF2ZUhhbmRsZXIiLCJmbGFnIiwiJHRvcEVkZ2UiLCIkYm90dG9tRWRnZSIsIiRsZWZ0RWRnZSIsIm5vZGVDbGlja0hhbmRsZXIiLCJsb2FkTm9kZXMiLCJyZWwiLCJpc0VtcHR5T2JqZWN0IiwiYWRkUGFyZW50IiwiYWRkQ2hpbGRyZW4iLCJhZGRTaWJsaW5ncyIsIkhpZGVGaXJzdFBhcmVudEVuZCIsInRvcEVkZ2UiLCJ0b3BFZGdlQ2xpY2tIYW5kbGVyIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyZW50U3RhdGUiLCJpc0Z1bmN0aW9uIiwibm9kZURhdGEiLCJib3R0b21FZGdlQ2xpY2tIYW5kbGVyIiwiY2hpbGRyZW5TdGF0ZSIsImhFZGdlQ2xpY2tIYW5kbGVyIiwiJGhFZGdlIiwic2libGluZ3NTdGF0ZSIsImZhbWlsaWVzIiwiZXhwYW5kVk5vZGVzRW5kIiwidk5vZGVzIiwiY29sbGFwc2VWTm9kZXNFbmQiLCJ0b2dnbGVWTm9kZXMiLCIkdG9nZ2xlQnRuIiwiJGRlc2NXcmFwcGVyIiwiJGNoaWxkcmVuIiwiY3JlYXRlR2hvc3ROb2RlIiwiJG5vZGVEaXYiLCJvcmlnRXZlbnQiLCJpc0ZpcmVmb3giLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZ2hvc3ROb2RlIiwibm9kZUNvdmVyIiwicXVlcnlTZWxlY3RvciIsImNyZWF0ZUVsZW1lbnROUyIsImFkZCIsImFwcGVuZENoaWxkIiwidHJhbnNWYWx1ZXMiLCJzY2FsZSIsInNldEF0dHJpYnV0ZSIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsInhPZmZzZXQiLCJvZmZzZXRYIiwieU9mZnNldCIsIm9mZnNldFkiLCJnaG9zdE5vZGVXcmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsIlhNTFNlcmlhbGl6ZXIiLCJzZXJpYWxpemVUb1N0cmluZyIsInNldERyYWdJbWFnZSIsImZpbHRlckFsbG93ZWREcm9wTm9kZXMiLCIkZHJhZ2dlZCIsIiRkcmFnWm9uZSIsIiRkcmFnSGllciIsImRyb3BDcml0ZXJpYSIsImRyYWdzdGFydEhhbmRsZXIiLCJkcmFnb3ZlckhhbmRsZXIiLCJkcm9wRWZmZWN0IiwiZHJhZ2VuZEhhbmRsZXIiLCJkcm9wSGFuZGxlciIsIiRkcm9wWm9uZSIsImRyb3BFdmVudCIsImRyYWdnZWROb2RlIiwiZHJhZ1pvbmUiLCJkcm9wWm9uZSIsImlzRGVmYXVsdFByZXZlbnRlZCIsImRyb3BDb2xzcGFuIiwiaG9yaXpvbnRhbEVkZ2VzIiwiYWRkQmFjayIsImJlZm9yZSIsIiRkcm9wU2licyIsImFmdGVyIiwiZHJhZ0NvbHNwYW4iLCIkZHJhZ1NpYnMiLCJjcmVhdGVOb2RlIiwibGV2ZWwiLCJjaGlsZCIsInBhcmVudElkIiwiZHRkIiwiRGVmZXJyZWQiLCJjbGFzc05hbWUiLCJub2RlVGVtcGxhdGUiLCJub2RlQ29udGVudCIsInZlcnRpY2FsRGVwdGgiLCJOdW1iZXIiLCJzdWJzdHIiLCJpY29uIiwicHJlcGVuZCIsInJlc29sdmUiLCJwcm9taXNlIiwiJGFwcGVuZFRvIiwiY2FsbGJhY2siLCIkbm9kZVdyYXBwZXIiLCIkY2hpbGROb2RlcyIsImhhc0NoaWxkcmVuIiwiaXNWZXJ0aWNhbE5vZGUiLCJPYmplY3QiLCJrZXlzIiwid2hlbiIsImlzSGlkZGVuIiwiY29sbGFwc2VkIiwiaXNWZXJ0aWNhbExheWVyIiwibGluZUxheWVyIiwiJG5vZGVMYXllciIsIiRub2RlQ2VsbCIsImJ1aWxkQ2hpbGROb2RlIiwiY291bnQiLCJidWlsZFBhcmVudE5vZGUiLCIkY3VycmVudFJvb3QiLCIkdGFibGUiLCJjb21wbGVtZW50TGluZSIsIiRvbmVTaWJsaW5nIiwic2libGluZ0NvdW50IiwiZXhpc3RpbmdTaWJsaWdDb3VudCIsImJ1aWxkU2libGluZ05vZGUiLCIkbm9kZUNoYXJ0IiwibmV3U2libGluZ0NvdW50IiwiaW5zZXJ0UG9zdGlvbiIsImZsb29yIiwiY2hpbGRDb3VudCIsIiRzaWJsaW5nVGRzIiwidW53cmFwIiwibm9kZUNvdW50IiwicmVtb3ZlTm9kZXMiLCIkbWFzayIsInNvdXJjZUNoYXJ0IiwiaHRtbDJjYW52YXMiLCJ3aWR0aCIsImNsaWVudEhlaWdodCIsImNsaWVudFdpZHRoIiwiaGVpZ2h0Iiwib25jbG9uZSIsImNsb25lRG9jIiwib25yZW5kZXJlZCIsImNhbnZhcyIsImRvYyIsImRvY1dpZHRoIiwiZG9jSGVpZ2h0IiwianNQREYiLCJhZGRJbWFnZSIsInRvRGF0YVVSTCIsInNhdmUiLCJpc1dlYmtpdCIsImRvY3VtZW50RWxlbWVudCIsImlzRmYiLCJzaWRlYmFyIiwiaXNFZGdlIiwiYXBwTmFtZSIsImFwcFZlcnNpb24iLCJtc1NhdmVCbG9iIiwibXNUb0Jsb2IiLCJzZWxlY3RvciIsInRoZW4iLCJmbiIsIm9yZ2NoYXJ0Il0sIm1hcHBpbmdzIjoiQUFVQSxjQUVDLFNBQVVBLEdBQ2EsaUJBQVhDLFFBQWlELGlCQUFuQkEsT0FBT0MsUUFDOUNGLEVBQVFHLFFBQVEsVUFBV0MsT0FBUUMsVUFFbkNMLEVBQVFNLE9BQVFGLE9BQVFDLFVBSjVCLENBTUUsU0FBVUUsRUFBR0gsRUFBUUMsRUFBVUcsR0FDL0IsSUFBSUMsRUFBVyxTQUFVQyxFQUFNQyxHQUM3QkMsS0FBS0MsZ0JBQWtCTixFQUFFRyxHQUN6QkUsS0FBS0QsS0FBT0EsRUFDWkMsS0FBS0UsZ0JBQ0hDLFVBQWEsT0FDYkMsT0FBVSxLQUNWQyxvQkFBc0IsRUFDdEJDLE1BQVMsSUFDVEMsV0FBYyxHQUNkQyxjQUFnQixFQUNoQkMsZUFBa0IsV0FDbEJDLG9CQUF1QixNQUN2QkMsaUJBQW9CLFdBQ3BCQyxXQUFhLEVBQ2JDLFVBQWEsTUFDYkMsS0FBTyxFQUNQQyxNQUFRLEVBQ1JDLFlBQWUsRUFDZkMsYUFBZ0IsS0FJcEJwQixFQUFTcUIsV0FFUEMsS0FBTSxTQUFVcEIsR0FDZCxJQUFJcUIsRUFBT3BCLEtBQ1hBLEtBQUtxQixRQUFVMUIsRUFBRTJCLFVBQVd0QixLQUFLRSxlQUFnQkYsS0FBS0QsS0FBTUEsR0FFNUQsSUFBSUUsRUFBa0JELEtBQUtDLGdCQUN2QkQsS0FBS3VCLFFBQ1B2QixLQUFLdUIsT0FBT0MsU0FFZCxJQUFJQyxFQUFPekIsS0FBS3FCLFFBQVFJLEtBQ3BCRixFQUFTdkIsS0FBS3VCLE9BQVM1QixFQUFFLFNB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Q1AsSUFBSUMsTUFBTSxJQUFLLE1BQU9GLEVBQVVDLElBRWhDLElBQUlDLE1BQU0sSUFBSyxNQUFPRCxFQUFXRCxLQUVyQ0csU0FBU0wsRUFBT00sWUFBYSxNQUFPLEVBQUcsR0FDM0NMLEVBQUlNLEtBQUszVyxFQUFpQixZQUNyQixDQUNMLElBQUk0VyxFQUFXLHFCQUFzQjVYLEVBQVM2WCxnQkFBZ0I5SixNQUMxRCtKLElBQVMvWCxFQUFPZ1ksUUFDaEJDLEVBQStCLGdDQUF0QjFILFVBQVUySCxTQUFvRSxhQUF0QjNILFVBQVUySCxTQUEwQjNILFVBQVU0SCxXQUFXalMsUUFBUSxTQUFXLEVBRWpKLElBQU0yUixJQUFhRSxHQUFTRSxFQUMxQmpZLEVBQU91USxVQUFVNkgsV0FBV2YsRUFBT2dCLFdBQVlwWCxFQUFpQixZQUMzRCxDQUNMLElBQUlxWCxFQUFXLG9CQUFrRCxLQUE1QjFXLEVBQUtDLFFBQVFkLFdBQW9CLElBQU1hLEVBQUtDLFFBQVFkLFdBQWEsSUFDakdOLEVBQWdCK0IsS0FBSzhWLEdBQVUvVixRQUNsQzlCLEVBQWdCeUMsT0FBTyw2QkFBMkQsS0FBNUJ0QixFQUFLQyxRQUFRZCxXQUFvQixJQUFNYSxFQUFLQyxRQUFRZCxXQUFhLElBQU0sZUFDekdFLEVBQWlCLGNBRXZDUixFQUFnQitCLEtBQUs4VixHQUFVeFAsS0FBSyxPQUFRdU8sRUFBT00sYUFBYSxHQUFHeFYsYUFLMUVvVyxLQUFLLFdBQ0o5WCxFQUFnQmdDLFlBQVksb0JBQzNCLFdBQ0RoQyxFQUFnQmdDLFlBQVksdUJBS2xDdEMsRUFBRXFZLEdBQUdDLFNBQVcsU0FBVWxZLEdBQ3hCLE9BQU8sSUFBSUYsRUFBU0csS0FBTUQsR0FBTW9CIiwiZmlsZSI6ImpxdWVyeS5vcmdjaGFydC5taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogalF1ZXJ5IE9yZ0NoYXJ0IFBsdWdpblxuICogaHR0cHM6Ly9naXRodWIuY29tL2RhYmVuZy9PcmdDaGFydFxuICpcbiAqIENvcHlyaWdodCAyMDE2LCBkYWJlbmdcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kYWJlbmdcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4gKiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG4ndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JyksIHdpbmRvdywgZG9jdW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGZhY3RvcnkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcbiAgfVxufShmdW5jdGlvbiAoJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKSB7XG4gIHZhciBPcmdDaGFydCA9IGZ1bmN0aW9uIChlbGVtLCBvcHRzKSB7XG4gICAgdGhpcy4kY2hhcnRDb250YWluZXIgPSAkKGVsZW0pO1xuICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICdub2RlVGl0bGUnOiAnbmFtZScsXG4gICAgICAnbm9kZUlkJzogJ2lkJyxcbiAgICAgICd0b2dnbGVTaWJsaW5nc1Jlc3AnOiBmYWxzZSxcbiAgICAgICdkZXB0aCc6IDk5OSxcbiAgICAgICdjaGFydENsYXNzJzogJycsXG4gICAgICAnZXhwb3J0QnV0dG9uJzogZmFsc2UsXG4gICAgICAnZXhwb3J0RmlsZW5hbWUnOiAnT3JnQ2hhcnQnLFxuICAgICAgJ2V4cG9ydEZpbGVleHRlbnNpb24nOiAncG5nJyxcbiAgICAgICdwYXJlbnROb2RlU3ltYm9sJzogJ2ZhLXVzZXJzJyxcbiAgICAgICdkcmFnZ2FibGUnOiBmYWxzZSxcbiAgICAgICdkaXJlY3Rpb24nOiAndDJiJyxcbiAgICAgICdwYW4nOiBmYWxzZSxcbiAgICAgICd6b29tJzogZmFsc2UsXG4gICAgICAnem9vbWluTGltaXQnOiA3LFxuICAgICAgJ3pvb21vdXRMaW1pdCc6IDAuNVxuICAgIH07XG4gIH07XG4gIC8vXG4gIE9yZ0NoYXJ0LnByb3RvdHlwZSA9IHtcbiAgICAvL1xuICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgdGhpcy5vcHRzLCBvcHRzKTtcbiAgICAgIC8vIGJ1aWxkIHRoZSBvcmctY2hhcnRcbiAgICAgIHZhciAkY2hhcnRDb250YWluZXIgPSB0aGlzLiRjaGFydENvbnRhaW5lcjtcbiAgICAgIGlmICh0aGlzLiRjaGFydCkge1xuICAgICAgICB0aGlzLiRjaGFydC5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICAgIHZhciBkYXRhID0gdGhpcy5vcHRpb25zLmRhdGE7XG4gICAgICB2YXIgJGNoYXJ0ID0gdGhpcy4kY2hhcnQgPSAkKCc8ZGl2PicsIHtcbiAgICAgICAgJ2RhdGEnOiB7ICdvcHRpb25zJzogdGhpcy5vcHRpb25zIH0sXG4gICAgICAgICdjbGFzcyc6ICdvcmdjaGFydCcgKyAodGhpcy5vcHRpb25zLmNoYXJ0Q2xhc3MgIT09ICcnID8gJyAnICsgdGhpcy5vcHRpb25zLmNoYXJ0Q2xhc3MgOiAnJykgKyAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gJ3QyYicgPyAnICcgKyB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uIDogJycpLFxuICAgICAgICAnY2xpY2snOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICghJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5ub2RlJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkY2hhcnQuZmluZCgnLm5vZGUuZm9jdXNlZCcpLnJlbW92ZUNsYXNzKCdmb2N1c2VkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VySW5pdEV2ZW50KCk7XG4gICAgICB9XG4gICAgICBpZiAoJC50eXBlKGRhdGEpID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mICQpIHsgLy8gdWwgZGF0YXNvdXJjZVxuICAgICAgICAgIHRoaXMuYnVpbGRIaWVyYXJjaHkoJGNoYXJ0LCB0aGlzLmJ1aWxkSnNvbkRTKGRhdGEuY2hpbGRyZW4oKSksIDAsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGxvY2FsIGpzb24gZGF0YXNvdXJjZVxuICAgICAgICAgIHRoaXMuYnVpbGRIaWVyYXJjaHkoJGNoYXJ0LCB0aGlzLm9wdGlvbnMuYWpheFVSTCA/IGRhdGEgOiB0aGlzLmF0dGFjaFJlbChkYXRhLCAnMDAnKSwgMCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGNoYXJ0LmFwcGVuZCgnPGkgY2xhc3M9XCJmYSBmYS1jaXJjbGUtby1ub3RjaCBmYS1zcGluIHNwaW5uZXJcIj48L2k+Jyk7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgJ3VybCc6IGRhdGEsXG4gICAgICAgICAgJ2RhdGFUeXBlJzogJ2pzb24nXG4gICAgICAgIH0pXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG4gICAgICAgICAgdGhhdC5idWlsZEhpZXJhcmNoeSgkY2hhcnQsIHRoYXQub3B0aW9ucy5hamF4VVJMID8gZGF0YSA6IHRoYXQuYXR0YWNoUmVsKGRhdGEsICcwMCcpLCAwLCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgICB9KVxuICAgICAgICAuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvclRocm93bik7XG4gICAgICAgIH0pXG4gICAgICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJGNoYXJ0LmNoaWxkcmVuKCcuc3Bpbm5lcicpLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgICRjaGFydENvbnRhaW5lci5hcHBlbmQoJGNoYXJ0KTtcblxuICAgICAgLy8gYXBwZW5kIHRoZSBleHBvcnQgYnV0dG9uXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmV4cG9ydEJ1dHRvbiAmJiAhJGNoYXJ0Q29udGFpbmVyLmZpbmQoJy5vYy1leHBvcnQtYnRuJykubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoRXhwb3J0QnV0dG9uKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFuKSB7XG4gICAgICAgIHRoaXMuYmluZFBhbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnpvb20pIHtcbiAgICAgICAgdGhpcy5iaW5kWm9vbSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8vXG4gICAgdHJpZ2dlckluaXRFdmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIG1vID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICBtby5kaXNjb25uZWN0KCk7XG4gICAgICAgIGluaXRUaW1lOlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbXV0YXRpb25zW2ldLmFkZGVkTm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0uYWRkZWROb2Rlc1tqXS5jbGFzc0xpc3QuY29udGFpbnMoJ29yZ2NoYXJ0JykpIHtcbiAgICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5pbml0Q29tcGxldGVkICYmIHR5cGVvZiB0aGF0Lm9wdGlvbnMuaW5pdENvbXBsZXRlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoYXQub3B0aW9ucy5pbml0Q29tcGxldGVkKHRoYXQuJGNoYXJ0KTtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdEV2ZW50ID0gJC5FdmVudCgnaW5pdC5vcmdjaGFydCcpO1xuICAgICAgICAgICAgICAgIHRoYXQuJGNoYXJ0LnRyaWdnZXIoaW5pdEV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhayBpbml0VGltZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBtby5vYnNlcnZlKHRoaXMuJGNoYXJ0Q29udGFpbmVyWzBdLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICB9LFxuICAgIC8vXG4gICAgYXR0YWNoRXhwb3J0QnV0dG9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgJGV4cG9ydEJ0biA9ICQoJzxidXR0b24+Jywge1xuICAgICAgICAnY2xhc3MnOiAnb2MtZXhwb3J0LWJ0bicgKyAodGhpcy5vcHRpb25zLmNoYXJ0Q2xhc3MgIT09ICcnID8gJyAnICsgdGhpcy5vcHRpb25zLmNoYXJ0Q2xhc3MgOiAnJyksXG4gICAgICAgICd0ZXh0JzogJ0V4cG9ydCcsXG4gICAgICAgICdjbGljayc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhhdC5leHBvcnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLiRjaGFydENvbnRhaW5lci5hcHBlbmQoJGV4cG9ydEJ0bik7XG4gICAgfSxcbiAgICBzZXRPcHRpb25zOiBmdW5jdGlvbiAob3B0cywgdmFsKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChvcHRzID09PSAncGFuJykge1xuICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZFBhbigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZFBhbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0cyA9PT0gJ3pvb20nKSB7XG4gICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5iaW5kWm9vbSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZFpvb20oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG9wdHMuZGF0YSkge1xuICAgICAgICAgIHRoaXMuaW5pdChvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG9wdHMucGFuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKG9wdHMucGFuKSB7XG4gICAgICAgICAgICAgIHRoaXMuYmluZFBhbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy51bmJpbmRQYW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLnpvb20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAob3B0cy56b29tKSB7XG4gICAgICAgICAgICAgIHRoaXMuYmluZFpvb20oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudW5iaW5kWm9vbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8vXG4gICAgcGFuU3RhcnRIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyICRjaGFydCA9ICQoZS5kZWxlZ2F0ZVRhcmdldCk7XG4gICAgICBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLm5vZGUnKS5sZW5ndGggfHwgKGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID4gMSkpIHtcbiAgICAgICAgJGNoYXJ0LmRhdGEoJ3Bhbm5pbmcnLCBmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRjaGFydC5jc3MoJ2N1cnNvcicsICdtb3ZlJykuZGF0YSgncGFubmluZycsIHRydWUpO1xuICAgICAgfVxuICAgICAgdmFyIGxhc3RYID0gMDtcbiAgICAgIHZhciBsYXN0WSA9IDA7XG4gICAgICB2YXIgbGFzdFRmID0gJGNoYXJ0LmNzcygndHJhbnNmb3JtJyk7XG4gICAgICBpZiAobGFzdFRmICE9PSAnbm9uZScpIHtcbiAgICAgICAgdmFyIHRlbXAgPSBsYXN0VGYuc3BsaXQoJywnKTtcbiAgICAgICAgaWYgKGxhc3RUZi5pbmRleE9mKCczZCcpID09PSAtMSkge1xuICAgICAgICAgIGxhc3RYID0gcGFyc2VJbnQodGVtcFs0XSk7XG4gICAgICAgICAgbGFzdFkgPSBwYXJzZUludCh0ZW1wWzVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYXN0WCA9IHBhcnNlSW50KHRlbXBbMTJdKTtcbiAgICAgICAgICBsYXN0WSA9IHBhcnNlSW50KHRlbXBbMTNdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHN0YXJ0WCA9IDA7XG4gICAgICB2YXIgc3RhcnRZID0gMDtcbiAgICAgIGlmICghZS50YXJnZXRUb3VjaGVzKSB7IC8vIHBhbmQgb24gZGVza3RvcFxuICAgICAgICBzdGFydFggPSBlLnBhZ2VYIC0gbGFzdFg7XG4gICAgICAgIHN0YXJ0WSA9IGUucGFnZVkgLSBsYXN0WTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkgeyAvLyBwYW4gb24gbW9iaWxlIGRldmljZVxuICAgICAgICBzdGFydFggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBsYXN0WDtcbiAgICAgICAgc3RhcnRZID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gbGFzdFk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgICRjaGFydC5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoISRjaGFydC5kYXRhKCdwYW5uaW5nJykpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1ggPSAwO1xuICAgICAgICB2YXIgbmV3WSA9IDA7XG4gICAgICAgIGlmICghZS50YXJnZXRUb3VjaGVzKSB7IC8vIHBhbmQgb24gZGVza3RvcFxuICAgICAgICAgIG5ld1ggPSBlLnBhZ2VYIC0gc3RhcnRYO1xuICAgICAgICAgIG5ld1kgPSBlLnBhZ2VZIC0gc3RhcnRZO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHsgLy8gcGFuIG9uIG1vYmlsZSBkZXZpY2VcbiAgICAgICAgICBuZXdYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gc3RhcnRYO1xuICAgICAgICAgIG5ld1kgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSBzdGFydFk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhc3RUZiA9ICRjaGFydC5jc3MoJ3RyYW5zZm9ybScpO1xuICAgICAgICBpZiAobGFzdFRmID09PSAnbm9uZScpIHtcbiAgICAgICAgICBpZiAobGFzdFRmLmluZGV4T2YoJzNkJykgPT09IC0xKSB7XG4gICAgICAgICAgICAkY2hhcnQuY3NzKCd0cmFuc2Zvcm0nLCAnbWF0cml4KDEsIDAsIDAsIDEsICcgKyBuZXdYICsgJywgJyArIG5ld1kgKyAnKScpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkY2hhcnQuY3NzKCd0cmFuc2Zvcm0nLCAnbWF0cml4M2QoMSwgMCwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMSwgMCwgJyArIG5ld1ggKyAnLCAnICsgbmV3WSArICcsIDAsIDEpJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBtYXRyaXggPSBsYXN0VGYuc3BsaXQoJywnKTtcbiAgICAgICAgICBpZiAobGFzdFRmLmluZGV4T2YoJzNkJykgPT09IC0xKSB7XG4gICAgICAgICAgICBtYXRyaXhbNF0gPSAnICcgKyBuZXdYO1xuICAgICAgICAgICAgbWF0cml4WzVdID0gJyAnICsgbmV3WSArICcpJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0cml4WzEyXSA9ICcgJyArIG5ld1g7XG4gICAgICAgICAgICBtYXRyaXhbMTNdID0gJyAnICsgbmV3WTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGNoYXJ0LmNzcygndHJhbnNmb3JtJywgbWF0cml4LmpvaW4oJywnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy9cbiAgICBwYW5FbmRIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUuZGF0YS5jaGFydC5kYXRhKCdwYW5uaW5nJykpIHtcbiAgICAgICAgZS5kYXRhLmNoYXJ0LmRhdGEoJ3Bhbm5pbmcnLCBmYWxzZSkuY3NzKCdjdXJzb3InLCAnZGVmYXVsdCcpLm9mZignbW91c2Vtb3ZlJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvL1xuICAgIGJpbmRQYW46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGNoYXJ0Q29udGFpbmVyLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICB0aGlzLiRjaGFydC5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCB0aGlzLnBhblN0YXJ0SGFuZGxlcik7XG4gICAgICAkKGRvY3VtZW50KS5vbignbW91c2V1cCB0b3VjaGVuZCcsIHsgJ2NoYXJ0JzogdGhpcy4kY2hhcnQgfSwgdGhpcy5wYW5FbmRIYW5kbGVyKTtcbiAgICB9LFxuICAgIC8vXG4gICAgdW5iaW5kUGFuOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLiRjaGFydENvbnRhaW5lci5jc3MoJ292ZXJmbG93JywgJ2F1dG8nKTtcbiAgICAgIHRoaXMuJGNoYXJ0Lm9mZignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCB0aGlzLnBhblN0YXJ0SGFuZGxlcik7XG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ21vdXNldXAgdG91Y2hlbmQnLCB0aGlzLnBhbkVuZEhhbmRsZXIpO1xuICAgIH0sXG4gICAgLy9cbiAgICB6b29tV2hlZWxIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgdmFyIG9jID0gZS5kYXRhLm9jO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIG5ld1NjYWxlICA9IDEgKyAoZS5vcmlnaW5hbEV2ZW50LmRlbHRhWSA+IDAgPyAtMC4yIDogMC4yKTtcbiAgICAgIG9jLnNldENoYXJ0U2NhbGUob2MuJGNoYXJ0LCBuZXdTY2FsZSk7XG4gICAgfSxcbiAgICAvL1xuICAgIHpvb21TdGFydEhhbmRsZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZihlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB2YXIgb2MgPSBlLmRhdGEub2M7XG4gICAgICAgIG9jLiRjaGFydC5kYXRhKCdwaW5jaGluZycsIHRydWUpO1xuICAgICAgICB2YXIgZGlzdCA9IG9jLmdldFBpbmNoRGlzdChlKTtcbiAgICAgICAgb2MuJGNoYXJ0LmRhdGEoJ3BpbmNoRGlzdFN0YXJ0JywgZGlzdCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB6b29taW5nSGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBvYyA9IGUuZGF0YS5vYztcbiAgICAgIGlmKG9jLiRjaGFydC5kYXRhKCdwaW5jaGluZycpKSB7XG4gICAgICAgIHZhciBkaXN0ID0gb2MuZ2V0UGluY2hEaXN0KGUpO1xuICAgICAgICBvYy4kY2hhcnQuZGF0YSgncGluY2hEaXN0RW5kJywgZGlzdCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB6b29tRW5kSGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBvYyA9IGUuZGF0YS5vYztcbiAgICAgIGlmKG9jLiRjaGFydC5kYXRhKCdwaW5jaGluZycpKSB7XG4gICAgICAgIG9jLiRjaGFydC5kYXRhKCdwaW5jaGluZycsIGZhbHNlKTtcbiAgICAgICAgdmFyIGRpZmYgPSBvYy4kY2hhcnQuZGF0YSgncGluY2hEaXN0RW5kJykgLSBvYy4kY2hhcnQuZGF0YSgncGluY2hEaXN0U3RhcnQnKTtcbiAgICAgICAgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgICAgb2Muc2V0Q2hhcnRTY2FsZShvYy4kY2hhcnQsIDEuMik7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICBvYy5zZXRDaGFydFNjYWxlKG9jLiRjaGFydCwgMC44KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy9cbiAgICBiaW5kWm9vbTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kY2hhcnRDb250YWluZXIub24oJ3doZWVsJywgeyAnb2MnOiB0aGlzIH0sIHRoaXMuem9vbVdoZWVsSGFuZGxlcik7XG4gICAgICB0aGlzLiRjaGFydENvbnRhaW5lci5vbigndG91Y2hzdGFydCcsIHsgJ29jJzogdGhpcyB9LCB0aGlzLnpvb21TdGFydEhhbmRsZXIpO1xuICAgICAgJChkb2N1bWVudCkub24oJ3RvdWNobW92ZScsIHsgJ29jJzogdGhpcyB9LCB0aGlzLnpvb21pbmdIYW5kbGVyKTtcbiAgICAgICQoZG9jdW1lbnQpLm9uKCd0b3VjaGVuZCcsIHsgJ29jJzogdGhpcyB9LCB0aGlzLnpvb21FbmRIYW5kbGVyKTtcbiAgICB9LFxuICAgIHVuYmluZFpvb206IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGNoYXJ0Q29udGFpbmVyLm9mZignd2hlZWwnLCB0aGlzLnpvb21XaGVlbEhhbmRsZXIpO1xuICAgICAgdGhpcy4kY2hhcnRDb250YWluZXIub2ZmKCd0b3VjaHN0YXJ0JywgdGhpcy56b29tU3RhcnRIYW5kbGVyKTtcbiAgICAgICQoZG9jdW1lbnQpLm9mZigndG91Y2htb3ZlJywgdGhpcy56b29taW5nSGFuZGxlcik7XG4gICAgICAkKGRvY3VtZW50KS5vZmYoJ3RvdWNoZW5kJywgdGhpcy56b29tRW5kSGFuZGxlcik7XG4gICAgfSxcbiAgICAvL1xuICAgIGdldFBpbmNoRGlzdDogZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBNYXRoLnNxcnQoKGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50b3VjaGVzWzFdLmNsaWVudFgpICogKGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50b3VjaGVzWzFdLmNsaWVudFgpICtcbiAgICAgIChlLnRvdWNoZXNbMF0uY2xpZW50WSAtIGUudG91Y2hlc1sxXS5jbGllbnRZKSAqIChlLnRvdWNoZXNbMF0uY2xpZW50WSAtIGUudG91Y2hlc1sxXS5jbGllbnRZKSk7XG4gICAgfSxcbiAgICAvL1xuICAgIHNldENoYXJ0U2NhbGU6IGZ1bmN0aW9uICgkY2hhcnQsIG5ld1NjYWxlKSB7XG4gICAgICB2YXIgb3B0cyA9ICRjaGFydC5kYXRhKCdvcHRpb25zJyk7XG4gICAgICB2YXIgbGFzdFRmID0gJGNoYXJ0LmNzcygndHJhbnNmb3JtJyk7XG4gICAgICB2YXIgbWF0cml4ID0gJyc7XG4gICAgICB2YXIgdGFyZ2V0U2NhbGUgPSAxO1xuICAgICAgaWYgKGxhc3RUZiA9PT0gJ25vbmUnKSB7XG4gICAgICAgICRjaGFydC5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZSgnICsgbmV3U2NhbGUgKyAnLCcgKyBuZXdTY2FsZSArICcpJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRyaXggPSBsYXN0VGYuc3BsaXQoJywnKTtcbiAgICAgICAgaWYgKGxhc3RUZi5pbmRleE9mKCczZCcpID09PSAtMSkge1xuICAgICAgICAgIHRhcmdldFNjYWxlID0gTWF0aC5hYnMod2luZG93LnBhcnNlRmxvYXQobWF0cml4WzNdKSAqIG5ld1NjYWxlKTtcbiAgICAgICAgICBpZiAodGFyZ2V0U2NhbGUgPiBvcHRzLnpvb21vdXRMaW1pdCAmJiB0YXJnZXRTY2FsZSA8IG9wdHMuem9vbWluTGltaXQpIHtcbiAgICAgICAgICAgICRjaGFydC5jc3MoJ3RyYW5zZm9ybScsIGxhc3RUZiArICcgc2NhbGUoJyArIG5ld1NjYWxlICsgJywnICsgbmV3U2NhbGUgKyAnKScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRTY2FsZSA9IE1hdGguYWJzKHdpbmRvdy5wYXJzZUZsb2F0KG1hdHJpeFsxXSkgKiBuZXdTY2FsZSk7XG4gICAgICAgICAgaWYgKHRhcmdldFNjYWxlID4gb3B0cy56b29tb3V0TGltaXQgJiYgdGFyZ2V0U2NhbGUgPCBvcHRzLnpvb21pbkxpbWl0KSB7XG4gICAgICAgICAgICAkY2hhcnQuY3NzKCd0cmFuc2Zvcm0nLCBsYXN0VGYgKyAnIHNjYWxlM2QoJyArIG5ld1NjYWxlICsgJywnICsgbmV3U2NhbGUgKyAnLCAxKScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy9cbiAgICBidWlsZEpzb25EUzogZnVuY3Rpb24gKCRsaSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1Yk9iaiA9IHtcbiAgICAgICAgJ25hbWUnOiAkbGkuY29udGVudHMoKS5lcSgwKS50ZXh0KCkudHJpbSgpLFxuICAgICAgICAncmVsYXRpb25zaGlwJzogKCRsaS5wYXJlbnQoKS5wYXJlbnQoKS5pcygnbGknKSA/ICcxJzogJzAnKSArICgkbGkuc2libGluZ3MoJ2xpJykubGVuZ3RoID8gMTogMCkgKyAoJGxpLmNoaWxkcmVuKCd1bCcpLmxlbmd0aCA/IDEgOiAwKVxuICAgICAgfTtcbiAgICAgIGlmICgkbGkuYXR0cignZGF0YS1pZCcpKSB7XG4gICAgICAgIHN1Yk9iai5pZCA9ICRsaS5hdHRyKCdkYXRhLWlkJyk7XG4gICAgICB9XG4gICAgICAkbGkuY2hpbGRyZW4oJ3VsJykuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXN1Yk9iai5jaGlsZHJlbikgeyBzdWJPYmouY2hpbGRyZW4gPSBbXTsgfVxuICAgICAgICBzdWJPYmouY2hpbGRyZW4ucHVzaCh0aGF0LmJ1aWxkSnNvbkRTKCQodGhpcykpKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN1Yk9iajtcbiAgICB9LFxuICAgIC8vXG4gICAgYXR0YWNoUmVsOiBmdW5jdGlvbiAoZGF0YSwgZmxhZ3MpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGRhdGEucmVsYXRpb25zaGlwID0gZmxhZ3MgKyAoZGF0YS5jaGlsZHJlbiAmJiBkYXRhLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyAxIDogMCk7XG4gICAgICBpZiAoZGF0YS5jaGlsZHJlbikge1xuICAgICAgICBkYXRhLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHRoYXQuYXR0YWNoUmVsKGl0ZW0sICcxJyArIChkYXRhLmNoaWxkcmVuLmxlbmd0aCA+IDEgPyAxIDogMCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgLy9cbiAgICBsb29wQ2hhcnQ6IGZ1bmN0aW9uICgkY2hhcnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciAkdHIgPSAkY2hhcnQuZmluZCgndHI6Zmlyc3QnKTtcbiAgICAgIHZhciBzdWJPYmogPSB7ICdpZCc6ICR0ci5maW5kKCcubm9kZScpWzBdLmlkIH07XG4gICAgICAkdHIuc2libGluZ3MoJzpsYXN0JykuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXN1Yk9iai5jaGlsZHJlbikgeyBzdWJPYmouY2hpbGRyZW4gPSBbXTsgfVxuICAgICAgICBzdWJPYmouY2hpbGRyZW4ucHVzaCh0aGF0Lmxvb3BDaGFydCgkKHRoaXMpKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzdWJPYmo7XG4gICAgfSxcbiAgICAvL1xuICAgIGdldEhpZXJhcmNoeTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLiRjaGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuICdFcnJvcjogb3JnY2hhcnQgZG9lcyBub3QgZXhpc3QnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuJGNoYXJ0LmZpbmQoJy5ub2RlJykubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICdFcnJvcjogbm9kZXMgZG8gbm90IGV4aXN0J1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy4kY2hhcnQuZmluZCgnLm5vZGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuICdFcnJvcjogQWxsIG5vZGVzIG9mIG9yZ2hjYXJ0IHRvIGJlIGV4cG9ydGVkIG11c3QgaGF2ZSBkYXRhLWlkIGF0dHJpYnV0ZSEnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubG9vcENoYXJ0KHRoaXMuJGNoYXJ0KTtcbiAgICB9LFxuICAgIC8vIGRldGVjdCB0aGUgZXhpc3QvZGlzcGxheSBzdGF0ZSBvZiByZWxhdGVkIG5vZGVcbiAgICBnZXROb2RlU3RhdGU6IGZ1bmN0aW9uICgkbm9kZSwgcmVsYXRpb24pIHtcbiAgICAgIHZhciAkdGFyZ2V0ID0ge307XG4gICAgICB2YXIgcmVsYXRpb24gPSByZWxhdGlvbiB8fCAnc2VsZic7XG4gICAgICBpZiAocmVsYXRpb24gPT09ICdwYXJlbnQnKSB7XG4gICAgICAgICR0YXJnZXQgPSAkbm9kZS5jbG9zZXN0KCcubm9kZXMnKS5zaWJsaW5ncygnOmZpcnN0Jyk7XG4gICAgICAgIGlmICgkdGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgIGlmICgkdGFyZ2V0LmlzKCcuaGlkZGVuJykgfHwgKCEkdGFyZ2V0LmlzKCcuaGlkZGVuJykgJiYgJHRhcmdldC5jbG9zZXN0KCcubm9kZXMnKS5pcygnLmhpZGRlbicpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgJ2V4aXN0JzogdHJ1ZSwgJ3Zpc2libGUnOiBmYWxzZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyAnZXhpc3QnOiB0cnVlLCAndmlzaWJsZSc6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyZWxhdGlvbiA9PT0gJ2NoaWxkcmVuJykge1xuICAgICAgICAkdGFyZ2V0ID0gJG5vZGUuY2xvc2VzdCgndHInKS5zaWJsaW5ncygnOmxhc3QnKTtcbiAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKCEkdGFyZ2V0LmlzKCcuaGlkZGVuJykpIHtcbiAgICAgICAgICAgIHJldHVybiB7ICdleGlzdCc6IHRydWUsICd2aXNpYmxlJzogdHJ1ZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyAnZXhpc3QnOiB0cnVlLCAndmlzaWJsZSc6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVsYXRpb24gPT09ICdzaWJsaW5ncycpIHtcbiAgICAgICAgJHRhcmdldCA9ICRub2RlLmNsb3Nlc3QoJ3RhYmxlJykucGFyZW50KCkuc2libGluZ3MoKTtcbiAgICAgICAgaWYgKCR0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKCEkdGFyZ2V0LmlzKCcuaGlkZGVuJykgJiYgISR0YXJnZXQucGFyZW50KCkuaXMoJy5oaWRkZW4nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgJ2V4aXN0JzogdHJ1ZSwgJ3Zpc2libGUnOiB0cnVlIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7ICdleGlzdCc6IHRydWUsICd2aXNpYmxlJzogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRhcmdldCA9ICRub2RlO1xuICAgICAgICBpZiAoJHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAoISgoJHRhcmdldC5jbG9zZXN0KCcubm9kZXMnKS5sZW5ndGggJiYgJHRhcmdldC5jbG9zZXN0KCcubm9kZXMnKS5pcygnLmhpZGRlbicpKSB8fFxuICAgICAgICAgICAgKCR0YXJnZXQuY2xvc2VzdCgndGFibGUnKS5wYXJlbnQoKS5sZW5ndGggJiYgJHRhcmdldC5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpLmlzKCcuaGlkZGVuJykpIHx8XG4gICAgICAgICAgICAoJHRhcmdldC5wYXJlbnQoKS5pcygnbGknKSAmJiAoJHRhcmdldC5jbG9zZXN0KCd1bCcpLmlzKCcuaGlkZGVuJykgfHwgJHRhcmdldC5jbG9zZXN0KCd2ZXJ0aWNhbE5vZGVzJykuaXMoJy5oaWRkZW4nKSkpXG4gICAgICAgICAgKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgJ2V4aXN0JzogdHJ1ZSwgJ3Zpc2libGUnOiB0cnVlIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7ICdleGlzdCc6IHRydWUsICd2aXNpYmxlJzogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHsgJ2V4aXN0JzogZmFsc2UsICd2aXNpYmxlJzogZmFsc2UgfTtcbiAgICB9LFxuICAgIC8vIGZpbmQgdGhlIHJlbGF0ZWQgbm9kZXNcbiAgICBnZXRSZWxhdGVkTm9kZXM6IGZ1bmN0aW9uICgkbm9kZSwgcmVsYXRpb24pIHtcbiAgICAgIGlmICghJG5vZGUgfHwgISgkbm9kZSBpbnN0YW5jZW9mICQpIHx8ICEkbm9kZS5pcygnLm5vZGUnKSkge1xuICAgICAgICByZXR1cm4gJCgpO1xuICAgICAgfVxuICAgICAgaWYgKHJlbGF0aW9uID09PSAncGFyZW50Jykge1xuICAgICAgICByZXR1cm4gJG5vZGUuY2xvc2VzdCgnLm5vZGVzJykucGFyZW50KCkuY2hpbGRyZW4oJzpmaXJzdCcpLmZpbmQoJy5ub2RlJyk7XG4gICAgICB9IGVsc2UgaWYgKHJlbGF0aW9uID09PSAnY2hpbGRyZW4nKSB7XG4gICAgICAgIHJldHVybiAkbm9kZS5jbG9zZXN0KCd0cicpLnNpYmxpbmdzKCcubm9kZXMnKS5jaGlsZHJlbigpLmZpbmQoJy5ub2RlOmZpcnN0Jyk7XG4gICAgICB9IGVsc2UgaWYgKHJlbGF0aW9uID09PSAnc2libGluZ3MnKSB7XG4gICAgICAgIHJldHVybiAkbm9kZS5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpLnNpYmxpbmdzKCkuZmluZCgnLm5vZGU6Zmlyc3QnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAkKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBoaWRlUGFyZW50RW5kOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICQoZXZlbnQudGFyZ2V0KS5yZW1vdmVDbGFzcygnc2xpZGluZycpO1xuICAgICAgZXZlbnQuZGF0YS51cHBlckxldmVsLmFkZENsYXNzKCdoaWRkZW4nKS5zbGljZSgxKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgIH0sXG4gICAgLy8gcmVjdXJzaXZlbHkgaGlkZSB0aGUgYW5jZXN0b3Igbm9kZSBhbmQgc2libGluZyBub2RlcyBvZiB0aGUgc3BlY2lmaWVkIG5vZGVcbiAgICBoaWRlUGFyZW50OiBmdW5jdGlvbiAoJG5vZGUpIHtcbiAgICAgIHZhciAkdXBwZXJMZXZlbCA9ICRub2RlLmNsb3Nlc3QoJy5ub2RlcycpLnNpYmxpbmdzKCk7XG4gICAgICBpZiAoJHVwcGVyTGV2ZWwuZXEoMCkuZmluZCgnLnNwaW5uZXInKS5sZW5ndGgpIHtcbiAgICAgICAgJG5vZGUuY2xvc2VzdCgnLm9yZ2NoYXJ0JykuZGF0YSgnaW5BamF4JywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgLy8gaGlkZSB0aGUgc2libGluZyBub2Rlc1xuICAgICAgaWYgKHRoaXMuZ2V0Tm9kZVN0YXRlKCRub2RlLCAnc2libGluZ3MnKS52aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuaGlkZVNpYmxpbmdzKCRub2RlKTtcbiAgICAgIH1cbiAgICAgIC8vIGhpZGUgdGhlIGxpbmVzXG4gICAgICB2YXIgJGxpbmVzID0gJHVwcGVyTGV2ZWwuc2xpY2UoMSk7XG4gICAgICAkbGluZXMuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgLy8gaGlkZSB0aGUgc3VwZXJpb3Igbm9kZXMgd2l0aCB0cmFuc2l0aW9uXG4gICAgICB2YXIgJHBhcmVudCA9ICR1cHBlckxldmVsLmVxKDApLmZpbmQoJy5ub2RlJyk7XG4gICAgICBpZiAodGhpcy5nZXROb2RlU3RhdGUoJHBhcmVudCkudmlzaWJsZSkge1xuICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdzbGlkaW5nIHNsaWRlLWRvd24nKS5vbmUoJ3RyYW5zaXRpb25lbmQnLCB7ICd1cHBlckxldmVsJzogJHVwcGVyTGV2ZWwgfSwgdGhpcy5oaWRlUGFyZW50RW5kKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHRoZSBjdXJyZW50IG5vZGUgaGFzIHRoZSBwYXJlbnQgbm9kZSwgaGlkZSBpdCByZWN1cnNpdmVseVxuICAgICAgaWYgKHRoaXMuZ2V0Tm9kZVN0YXRlKCRwYXJlbnQsICdwYXJlbnQnKS52aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuaGlkZVBhcmVudCgkcGFyZW50KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dQYXJlbnRFbmQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdmFyICRub2RlID0gZXZlbnQuZGF0YS5ub2RlO1xuICAgICAgJChldmVudC50YXJnZXQpLnJlbW92ZUNsYXNzKCdzbGlkaW5nJyk7XG4gICAgICBpZiAodGhpcy5pc0luQWN0aW9uKCRub2RlKSkge1xuICAgICAgICB0aGlzLnN3aXRjaFZlcnRpY2FsQXJyb3coJG5vZGUuY2hpbGRyZW4oJy50b3BFZGdlJykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gc2hvdyB0aGUgcGFyZW50IG5vZGUgb2YgdGhlIHNwZWNpZmllZCBub2RlXG4gICAgc2hvd1BhcmVudDogZnVuY3Rpb24gKCRub2RlKSB7XG4gICAgICAvLyBqdXN0IHNob3cgb25seSBvbmUgc3VwZXJpb3IgbGV2ZWxcbiAgICAgIHZhciAkdXBwZXJMZXZlbCA9ICRub2RlLmNsb3Nlc3QoJy5ub2RlcycpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgLy8ganVzdCBzaG93IG9ubHkgb25lIGxpbmVcbiAgICAgICR1cHBlckxldmVsLmVxKDIpLmNoaWxkcmVuKCkuc2xpY2UoMSwgLTEpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgIC8vIHNob3cgcGFyZW50IG5vZGUgd2l0aCBhbmltYXRpb25cbiAgICAgIHZhciAkcGFyZW50ID0gJHVwcGVyTGV2ZWwuZXEoMCkuZmluZCgnLm5vZGUnKTtcbiAgICAgIHRoaXMucmVwYWludCgkcGFyZW50WzBdKTtcbiAgICAgICRwYXJlbnQuYWRkQ2xhc3MoJ3NsaWRpbmcnKS5yZW1vdmVDbGFzcygnc2xpZGUtZG93bicpLm9uZSgndHJhbnNpdGlvbmVuZCcsIHsgJ25vZGUnOiAkbm9kZSB9LCB0aGlzLnNob3dQYXJlbnRFbmQuYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICBzdG9wQWpheDogZnVuY3Rpb24gKCRub2RlTGV2ZWwpIHtcbiAgICAgIGlmICgkbm9kZUxldmVsLmZpbmQoJy5zcGlubmVyJykubGVuZ3RoKSB7XG4gICAgICAgICRub2RlTGV2ZWwuY2xvc2VzdCgnLm9yZ2NoYXJ0JykuZGF0YSgnaW5BamF4JywgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNWaXNpYmxlTm9kZTogZnVuY3Rpb24gKGluZGV4LCBlbGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXROb2RlU3RhdGUoJChlbGVtKSkudmlzaWJsZTtcbiAgICB9LFxuICAgIC8vXG4gICAgaGlkZUNoaWxkcmVuRW5kOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LmRhdGEudmlzaWJsZU5vZGVzLnJlbW92ZUNsYXNzKCdzbGlkaW5nJyk7XG4gICAgICBpZiAoZXZlbnQuZGF0YS5pc1ZlcnRpY2FsRGVzYykge1xuICAgICAgICBldmVudC5kYXRhLmxvd2VyTGV2ZWwuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQuZGF0YS52aXNpYmxlTm9kZXMuY2xvc2VzdCgndGFibGUnKS5jbG9zZXN0KCd0cicpLnByZXZBbGwoJy5saW5lcycpLnJlbW92ZUF0dHIoJ3N0eWxlJykuYWRkQ2xhc3MoJ2hpZGRlbicpXG4gICAgICAgICAgLnNpYmxpbmdzKCcubm9kZXMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIGV2ZW50LmRhdGEubG93ZXJMZXZlbC5sYXN0KCkuZmluZCgnLnZlcnRpY2FsTm9kZXMnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc0luQWN0aW9uKGV2ZW50LmRhdGEubm9kZSkpIHtcbiAgICAgICAgdGhpcy5zd2l0Y2hWZXJ0aWNhbEFycm93KGV2ZW50LmRhdGEubm9kZS5jaGlsZHJlbignLmJvdHRvbUVkZ2UnKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyByZWN1cnNpdmVseSBoaWRlIHRoZSBkZXNjZW5kYW50IG5vZGVzIG9mIHRoZSBzcGVjaWZpZWQgbm9kZVxuICAgIGhpZGVDaGlsZHJlbjogZnVuY3Rpb24gKCRub2RlKSB7XG4gICAgICB2YXIgJGxvd2VyTGV2ZWwgPSAkbm9kZS5jbG9zZXN0KCd0cicpLnNpYmxpbmdzKCk7XG4gICAgICB0aGlzLnN0b3BBamF4KCRsb3dlckxldmVsLmxhc3QoKSk7XG4gICAgICB2YXIgJHZpc2libGVOb2RlcyA9ICRsb3dlckxldmVsLmxhc3QoKS5maW5kKCcubm9kZScpLmZpbHRlcih0aGlzLmlzVmlzaWJsZU5vZGUuYmluZCh0aGlzKSk7XG4gICAgICB2YXIgaXNWZXJ0aWNhbERlc2MgPSAkbG93ZXJMZXZlbC5sYXN0KCkuaXMoJy52ZXJ0aWNhbE5vZGVzJykgPyB0cnVlIDogZmFsc2U7XG4gICAgICBpZiAoIWlzVmVydGljYWxEZXNjKSB7XG4gICAgICAgICR2aXNpYmxlTm9kZXMuY2xvc2VzdCgndGFibGUnKS5jbG9zZXN0KCd0cicpLnByZXZBbGwoJy5saW5lcycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVwYWludCgkdmlzaWJsZU5vZGVzLmdldCgwKSk7XG4gICAgICAkdmlzaWJsZU5vZGVzLmFkZENsYXNzKCdzbGlkaW5nIHNsaWRlLXVwJykuZXEoMCkub25lKCd0cmFuc2l0aW9uZW5kJywgeyAndmlzaWJsZU5vZGVzJzogJHZpc2libGVOb2RlcywgJ2xvd2VyTGV2ZWwnOiAkbG93ZXJMZXZlbCwgJ2lzVmVydGljYWxEZXNjJzogaXNWZXJ0aWNhbERlc2MsICdub2RlJzogJG5vZGUgfSwgdGhpcy5oaWRlQ2hpbGRyZW5FbmQuYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICAvL1xuICAgIHNob3dDaGlsZHJlbkVuZDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgJG5vZGUgPSBldmVudC5kYXRhLm5vZGU7XG4gICAgICBldmVudC5kYXRhLmRlc2NlbmRhbnRzLnJlbW92ZUNsYXNzKCdzbGlkaW5nJyk7XG4gICAgICBpZiAodGhpcy5pc0luQWN0aW9uKCRub2RlKSkge1xuICAgICAgICB0aGlzLnN3aXRjaFZlcnRpY2FsQXJyb3coJG5vZGUuY2hpbGRyZW4oJy5ib3R0b21FZGdlJykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gc2hvdyB0aGUgY2hpbGRyZW4gbm9kZXMgb2YgdGhlIHNwZWNpZmllZCBub2RlXG4gICAgc2hvd0NoaWxkcmVuOiBmdW5jdGlvbiAoJG5vZGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciAkbGV2ZWxzID0gJG5vZGUuY2xvc2VzdCgndHInKS5zaWJsaW5ncygpO1xuICAgICAgdmFyIGlzVmVydGljYWxEZXNjID0gJGxldmVscy5pcygnLnZlcnRpY2FsTm9kZXMnKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHZhciAkZGVzY2VuZGFudHMgPSBpc1ZlcnRpY2FsRGVzY1xuICAgICAgICA/ICRsZXZlbHMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpLmZpbmQoJy5ub2RlJykuZmlsdGVyKHRoaXMuaXNWaXNpYmxlTm9kZS5iaW5kKHRoaXMpKVxuICAgICAgICA6ICRsZXZlbHMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpLmVxKDIpLmNoaWxkcmVuKCkuZmluZCgnLm5vZGU6Zmlyc3QnKS5maWx0ZXIodGhpcy5pc1Zpc2libGVOb2RlLmJpbmQodGhpcykpO1xuICAgICAgLy8gdGhlIHR3byBmb2xsb3dpbmcgc3RhdGVtZW50cyBhcmUgdXNlZCB0byBlbmZvcmNlIGJyb3dzZXIgdG8gcmVwYWludFxuICAgICAgdGhpcy5yZXBhaW50KCRkZXNjZW5kYW50cy5nZXQoMCkpO1xuICAgICAgJGRlc2NlbmRhbnRzLmFkZENsYXNzKCdzbGlkaW5nJykucmVtb3ZlQ2xhc3MoJ3NsaWRlLXVwJykuZXEoMCkub25lKCd0cmFuc2l0aW9uZW5kJywgeyAnbm9kZSc6ICRub2RlLCAnZGVzY2VuZGFudHMnOiAkZGVzY2VuZGFudHMgfSwgdGhpcy5zaG93Q2hpbGRyZW5FbmQuYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICAvL1xuICAgIGhpZGVTaWJsaW5nc0VuZDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgJG5vZGUgPSBldmVudC5kYXRhLm5vZGU7XG4gICAgICB2YXIgJG5vZGVDb250YWluZXIgPSBldmVudC5kYXRhLm5vZGVDb250YWluZXI7XG4gICAgICB2YXIgZGlyZWN0aW9uID0gZXZlbnQuZGF0YS5kaXJlY3Rpb247XG4gICAgICBldmVudC5kYXRhLmxpbmVzLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICB2YXIgJHNpYmxpbmdzID0gZGlyZWN0aW9uID8gKGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gJG5vZGVDb250YWluZXIucHJldkFsbCgnOm5vdCguaGlkZGVuKScpIDogJG5vZGVDb250YWluZXIubmV4dEFsbCgnOm5vdCguaGlkZGVuKScpKSA6ICRub2RlQ29udGFpbmVyLnNpYmxpbmdzKCk7XG4gICAgICAkbm9kZUNvbnRhaW5lci5jbG9zZXN0KCcubm9kZXMnKS5wcmV2KCkuY2hpbGRyZW4oJzpub3QoLmhpZGRlbiknKVxuICAgICAgICAuc2xpY2UoMSwgZGlyZWN0aW9uID8gJHNpYmxpbmdzLmxlbmd0aCAqIDIgKyAxIDogLTEpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgIGV2ZW50LmRhdGEuYW5pbWF0ZWROb2Rlcy5yZW1vdmVDbGFzcygnc2xpZGluZycpO1xuICAgICAgJHNpYmxpbmdzLmZpbmQoJy5ub2RlOmd0KDApJykuZmlsdGVyKHRoaXMuaXNWaXNpYmxlTm9kZS5iaW5kKHRoaXMpKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWRlLWxlZnQgc2xpZGUtcmlnaHQnKS5hZGRDbGFzcygnc2xpZGUtdXAnKTtcbiAgICAgICRzaWJsaW5ncy5maW5kKCcubGluZXMsIC5ub2RlcywgLnZlcnRpY2FsTm9kZXMnKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgLmVuZCgpLmFkZENsYXNzKCdoaWRkZW4nKTtcblxuICAgICAgaWYgKHRoaXMuaXNJbkFjdGlvbigkbm9kZSkpIHtcbiAgICAgICAgdGhpcy5zd2l0Y2hIb3Jpem9udGFsQXJyb3coJG5vZGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy8gaGlkZSB0aGUgc2libGluZyBub2RlcyBvZiB0aGUgc3BlY2lmaWVkIG5vZGVcbiAgICBoaWRlU2libGluZ3M6IGZ1bmN0aW9uICgkbm9kZSwgZGlyZWN0aW9uKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgJG5vZGVDb250YWluZXIgPSAkbm9kZS5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpO1xuICAgICAgaWYgKCRub2RlQ29udGFpbmVyLnNpYmxpbmdzKCkuZmluZCgnLnNwaW5uZXInKS5sZW5ndGgpIHtcbiAgICAgICAgJG5vZGUuY2xvc2VzdCgnLm9yZ2NoYXJ0JykuZGF0YSgnaW5BamF4JywgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAkbm9kZUNvbnRhaW5lci5wcmV2QWxsKCkuZmluZCgnLm5vZGUnKS5maWx0ZXIodGhpcy5pc1Zpc2libGVOb2RlLmJpbmQodGhpcykpLmFkZENsYXNzKCdzbGlkaW5nIHNsaWRlLXJpZ2h0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG5vZGVDb250YWluZXIubmV4dEFsbCgpLmZpbmQoJy5ub2RlJykuZmlsdGVyKHRoaXMuaXNWaXNpYmxlTm9kZS5iaW5kKHRoaXMpKS5hZGRDbGFzcygnc2xpZGluZyBzbGlkZS1sZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRub2RlQ29udGFpbmVyLnByZXZBbGwoKS5maW5kKCcubm9kZScpLmZpbHRlcih0aGlzLmlzVmlzaWJsZU5vZGUuYmluZCh0aGlzKSkuYWRkQ2xhc3MoJ3NsaWRpbmcgc2xpZGUtcmlnaHQnKTtcbiAgICAgICAgJG5vZGVDb250YWluZXIubmV4dEFsbCgpLmZpbmQoJy5ub2RlJykuZmlsdGVyKHRoaXMuaXNWaXNpYmxlTm9kZS5iaW5kKHRoaXMpKS5hZGRDbGFzcygnc2xpZGluZyBzbGlkZS1sZWZ0Jyk7XG4gICAgICB9XG4gICAgICB2YXIgJGFuaW1hdGVkTm9kZXMgPSAkbm9kZUNvbnRhaW5lci5zaWJsaW5ncygpLmZpbmQoJy5zbGlkaW5nJyk7XG4gICAgICB2YXIgJGxpbmVzID0gJGFuaW1hdGVkTm9kZXMuY2xvc2VzdCgnLm5vZGVzJykucHJldkFsbCgnLmxpbmVzJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgJGFuaW1hdGVkTm9kZXMuZXEoMCkub25lKCd0cmFuc2l0aW9uZW5kJywgeyAnbm9kZSc6ICRub2RlLCAnbm9kZUNvbnRhaW5lcic6ICRub2RlQ29udGFpbmVyLCAnZGlyZWN0aW9uJzogZGlyZWN0aW9uLCAnYW5pbWF0ZWROb2Rlcyc6ICRhbmltYXRlZE5vZGVzLCAnbGluZXMnOiAkbGluZXMgfSwgdGhpcy5oaWRlU2libGluZ3NFbmQuYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICAvL1xuICAgIHNob3dTaWJsaW5nc0VuZDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgJG5vZGUgPSBldmVudC5kYXRhLm5vZGU7XG4gICAgICBldmVudC5kYXRhLnZpc2libGVOb2Rlcy5yZW1vdmVDbGFzcygnc2xpZGluZycpO1xuICAgICAgaWYgKHRoaXMuaXNJbkFjdGlvbigkbm9kZSkpIHtcbiAgICAgICAgdGhpcy5zd2l0Y2hIb3Jpem9udGFsQXJyb3coJG5vZGUpO1xuICAgICAgICAkbm9kZS5jaGlsZHJlbignLnRvcEVkZ2UnKS5yZW1vdmVDbGFzcygnZmEtY2hldnJvbi11cCcpLmFkZENsYXNzKCdmYS1jaGV2cm9uLWRvd24nKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vXG4gICAgc2hvd1JlbGF0ZWRQYXJlbnRFbmQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAkKGV2ZW50LnRhcmdldCkucmVtb3ZlQ2xhc3MoJ3NsaWRpbmcnKTtcbiAgICB9LFxuICAgIC8vIHNob3cgdGhlIHNpYmxpbmcgbm9kZXMgb2YgdGhlIHNwZWNpZmllZCBub2RlXG4gICAgc2hvd1NpYmxpbmdzOiBmdW5jdGlvbiAoJG5vZGUsIGRpcmVjdGlvbikge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy8gZmlyc3RseSwgc2hvdyB0aGUgc2libGluZyB0ZCB0YWdzXG4gICAgICB2YXIgJHNpYmxpbmdzID0gJCgpO1xuICAgICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAkc2libGluZ3MgPSAkbm9kZS5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpLnByZXZBbGwoKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHNpYmxpbmdzID0gJG5vZGUuY2xvc2VzdCgndGFibGUnKS5wYXJlbnQoKS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2libGluZ3MgPSAkbm9kZS5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgfVxuICAgICAgLy8gc2Vjb25kbHksIHNob3cgdGhlIGxpbmVzXG4gICAgICB2YXIgJHVwcGVyTGV2ZWwgPSAkbm9kZS5jbG9zZXN0KCd0YWJsZScpLmNsb3Nlc3QoJ3RyJykuc2libGluZ3MoKTtcbiAgICAgIGlmIChkaXJlY3Rpb24pIHtcbiAgICAgICAgJHVwcGVyTGV2ZWwuZXEoMikuY2hpbGRyZW4oJy5oaWRkZW4nKS5zbGljZSgwLCAkc2libGluZ3MubGVuZ3RoICogMikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHVwcGVyTGV2ZWwuZXEoMikuY2hpbGRyZW4oJy5oaWRkZW4nKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICB9XG4gICAgICAvLyB0aGlyZGx5LCBkbyBzb21lIGNsZWFuaW5nIHN0dWZmXG4gICAgICBpZiAoIXRoaXMuZ2V0Tm9kZVN0YXRlKCRub2RlLCAncGFyZW50JykudmlzaWJsZSkge1xuICAgICAgICAkdXBwZXJMZXZlbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIHZhciBwYXJlbnQgPSAkdXBwZXJMZXZlbC5maW5kKCcubm9kZScpWzBdO1xuICAgICAgICB0aGlzLnJlcGFpbnQocGFyZW50KTtcbiAgICAgICAgJChwYXJlbnQpLmFkZENsYXNzKCdzbGlkaW5nJykucmVtb3ZlQ2xhc3MoJ3NsaWRlLWRvd24nKS5vbmUoJ3RyYW5zaXRpb25lbmQnLCB0aGlzLnNob3dSZWxhdGVkUGFyZW50RW5kKTtcbiAgICAgIH1cbiAgICAgIC8vIGxhc3RseSwgc2hvdyB0aGUgc2libGluZyBub2RlcyB3aXRoIGFuaW1hdGlvblxuICAgICAgdmFyICR2aXNpYmxlTm9kZXMgPSAkc2libGluZ3MuZmluZCgnLm5vZGUnKS5maWx0ZXIodGhpcy5pc1Zpc2libGVOb2RlLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5yZXBhaW50KCR2aXNpYmxlTm9kZXMuZ2V0KDApKTtcbiAgICAgICR2aXNpYmxlTm9kZXMuYWRkQ2xhc3MoJ3NsaWRpbmcnKS5yZW1vdmVDbGFzcygnc2xpZGUtbGVmdCBzbGlkZS1yaWdodCcpO1xuICAgICAgJHZpc2libGVOb2Rlcy5lcSgwKS5vbmUoJ3RyYW5zaXRpb25lbmQnLCB7ICdub2RlJzogJG5vZGUsICd2aXNpYmxlTm9kZXMnOiAkdmlzaWJsZU5vZGVzIH0sIHRoaXMuc2hvd1NpYmxpbmdzRW5kLmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgLy8gc3RhcnQgdXAgbG9hZGluZyBzdGF0dXMgZm9yIHJlcXVlc3RpbmcgbmV3IG5vZGVzXG4gICAgc3RhcnRMb2FkaW5nOiBmdW5jdGlvbiAoJGVkZ2UpIHtcbiAgICAgIHZhciAkY2hhcnQgPSB0aGlzLiRjaGFydDtcbiAgICAgIGlmICh0eXBlb2YgJGNoYXJ0LmRhdGEoJ2luQWpheCcpICE9PSAndW5kZWZpbmVkJyAmJiAkY2hhcnQuZGF0YSgnaW5BamF4JykgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAkZWRnZS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAkZWRnZS5wYXJlbnQoKS5hcHBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY2lyY2xlLW8tbm90Y2ggZmEtc3BpbiBzcGlubmVyXCI+PC9pPicpXG4gICAgICAgIC5jaGlsZHJlbigpLm5vdCgnLnNwaW5uZXInKS5jc3MoJ29wYWNpdHknLCAwLjIpO1xuICAgICAgJGNoYXJ0LmRhdGEoJ2luQWpheCcsIHRydWUpO1xuICAgICAgJCgnLm9jLWV4cG9ydC1idG4nICsgKHRoaXMub3B0aW9ucy5jaGFydENsYXNzICE9PSAnJyA/ICcuJyArIHRoaXMub3B0aW9ucy5jaGFydENsYXNzIDogJycpKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAvLyB0ZXJtaW5hdGUgbG9hZGluZyBzdGF0dXMgZm9yIHJlcXVlc3RpbmcgbmV3IG5vZGVzXG4gICAgZW5kTG9hZGluZzogZnVuY3Rpb24gKCRlZGdlKSB7XG4gICAgICB2YXIgJG5vZGUgPSAkZWRnZS5wYXJlbnQoKTtcbiAgICAgICRlZGdlLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICRub2RlLmZpbmQoJy5zcGlubmVyJykucmVtb3ZlKCk7XG4gICAgICAkbm9kZS5jaGlsZHJlbigpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICB0aGlzLiRjaGFydC5kYXRhKCdpbkFqYXgnLCBmYWxzZSk7XG4gICAgICAkKCcub2MtZXhwb3J0LWJ0bicgKyAodGhpcy5vcHRpb25zLmNoYXJ0Q2xhc3MgIT09ICcnID8gJy4nICsgdGhpcy5vcHRpb25zLmNoYXJ0Q2xhc3MgOiAnJykpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgIH0sXG4gICAgLy8gd2hldGhlciB0aGUgY3Vyc29yIGlzIGhvdmVyaW5nIG92ZXIgdGhlIG5vZGVcbiAgICBpc0luQWN0aW9uOiBmdW5jdGlvbiAoJG5vZGUpIHtcbiAgICAgIHJldHVybiAkbm9kZS5jaGlsZHJlbignLmVkZ2UnKS5hdHRyKCdjbGFzcycpLmluZGV4T2YoJ2ZhLScpID4gLTEgPyB0cnVlIDogZmFsc2U7XG4gICAgfSxcbiAgICAvL1xuICAgIHN3aXRjaFZlcnRpY2FsQXJyb3c6IGZ1bmN0aW9uICgkYXJyb3cpIHtcbiAgICAgICRhcnJvdy50b2dnbGVDbGFzcygnZmEtY2hldnJvbi11cCcpLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLWRvd24nKTtcbiAgICB9LFxuICAgIC8vXG4gICAgc3dpdGNoSG9yaXpvbnRhbEFycm93OiBmdW5jdGlvbiAoJG5vZGUpIHtcbiAgICAgIHZhciBvcHRzID0gJG5vZGUuY2xvc2VzdCgnLm9yZ2NoYXJ0JykuZGF0YSgnb3B0aW9ucycpO1xuICAgICAgaWYgKG9wdHMudG9nZ2xlU2libGluZ3NSZXNwICYmICh0eXBlb2Ygb3B0cy5hamF4VVJMID09PSAndW5kZWZpbmVkJyB8fCAkbm9kZS5jbG9zZXN0KCcubm9kZXMnKS5kYXRhKCdzaWJsaW5nc0xvYWRlZCcpKSkge1xuICAgICAgICB2YXIgJHByZXZTaWIgPSAkbm9kZS5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpLnByZXYoKTtcbiAgICAgICAgaWYgKCRwcmV2U2liLmxlbmd0aCkge1xuICAgICAgICAgIGlmICgkcHJldlNpYi5pcygnLmhpZGRlbicpKSB7XG4gICAgICAgICAgICAkbm9kZS5jaGlsZHJlbignLmxlZnRFZGdlJykuYWRkQ2xhc3MoJ2ZhLWNoZXZyb24tbGVmdCcpLnJlbW92ZUNsYXNzKCdmYS1jaGV2cm9uLXJpZ2h0Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRub2RlLmNoaWxkcmVuKCcubGVmdEVkZ2UnKS5hZGRDbGFzcygnZmEtY2hldnJvbi1yaWdodCcpLnJlbW92ZUNsYXNzKCdmYS1jaGV2cm9uLWxlZnQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyICRuZXh0U2liID0gJG5vZGUuY2xvc2VzdCgndGFibGUnKS5wYXJlbnQoKS5uZXh0KCk7XG4gICAgICAgIGlmICgkbmV4dFNpYi5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAoJG5leHRTaWIuaXMoJy5oaWRkZW4nKSkge1xuICAgICAgICAgICAgJG5vZGUuY2hpbGRyZW4oJy5yaWdodEVkZ2UnKS5hZGRDbGFzcygnZmEtY2hldnJvbi1yaWdodCcpLnJlbW92ZUNsYXNzKCdmYS1jaGV2cm9uLWxlZnQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJG5vZGUuY2hpbGRyZW4oJy5yaWdodEVkZ2UnKS5hZGRDbGFzcygnZmEtY2hldnJvbi1sZWZ0JykucmVtb3ZlQ2xhc3MoJ2ZhLWNoZXZyb24tcmlnaHQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciAkc2licyA9ICRub2RlLmNsb3Nlc3QoJ3RhYmxlJykucGFyZW50KCkuc2libGluZ3MoKTtcbiAgICAgICAgdmFyIHNpYnNWaXNpYmxlID0gJHNpYnMubGVuZ3RoID8gISRzaWJzLmlzKCcuaGlkZGVuJykgOiBmYWxzZTtcbiAgICAgICAgJG5vZGUuY2hpbGRyZW4oJy5sZWZ0RWRnZScpLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLXJpZ2h0Jywgc2lic1Zpc2libGUpLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLWxlZnQnLCAhc2lic1Zpc2libGUpO1xuICAgICAgICAkbm9kZS5jaGlsZHJlbignLnJpZ2h0RWRnZScpLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLWxlZnQnLCBzaWJzVmlzaWJsZSkudG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tcmlnaHQnLCAhc2lic1Zpc2libGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9cbiAgICByZXBhaW50OiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5vZmZzZXRXaWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICB9XG4gICAgfSxcbiAgICAvL1xuICAgIG5vZGVFbnRlckxlYXZlSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgJG5vZGUgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KSwgZmxhZyA9IGZhbHNlO1xuICAgICAgdmFyICR0b3BFZGdlID0gJG5vZGUuY2hpbGRyZW4oJy50b3BFZGdlJyk7XG4gICAgICB2YXIgJHJpZ2h0RWRnZSA9ICRub2RlLmNoaWxkcmVuKCcucmlnaHRFZGdlJyk7XG4gICAgICB2YXIgJGJvdHRvbUVkZ2UgPSAkbm9kZS5jaGlsZHJlbignLmJvdHRvbUVkZ2UnKTtcbiAgICAgIHZhciAkbGVmdEVkZ2UgPSAkbm9kZS5jaGlsZHJlbignLmxlZnRFZGdlJyk7XG4gICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZW50ZXInKSB7XG4gICAgICAgIGlmICgkdG9wRWRnZS5sZW5ndGgpIHtcbiAgICAgICAgICBmbGFnID0gdGhpcy5nZXROb2RlU3RhdGUoJG5vZGUsICdwYXJlbnQnKS52aXNpYmxlO1xuICAgICAgICAgICR0b3BFZGdlLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLXVwJywgIWZsYWcpLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLWRvd24nLCBmbGFnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJGJvdHRvbUVkZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgZmxhZyA9IHRoaXMuZ2V0Tm9kZVN0YXRlKCRub2RlLCAnY2hpbGRyZW4nKS52aXNpYmxlO1xuICAgICAgICAgICRib3R0b21FZGdlLnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLWRvd24nLCAhZmxhZykudG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tdXAnLCBmbGFnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJGxlZnRFZGdlLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuc3dpdGNoSG9yaXpvbnRhbEFycm93KCRub2RlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJG5vZGUuY2hpbGRyZW4oJy5lZGdlJykucmVtb3ZlQ2xhc3MoJ2ZhLWNoZXZyb24tdXAgZmEtY2hldnJvbi1kb3duIGZhLWNoZXZyb24tcmlnaHQgZmEtY2hldnJvbi1sZWZ0Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvL1xuICAgIG5vZGVDbGlja0hhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdGhpcy4kY2hhcnQuZmluZCgnLmZvY3VzZWQnKS5yZW1vdmVDbGFzcygnZm9jdXNlZCcpO1xuICAgICAgJChldmVudC5kZWxlZ2F0ZVRhcmdldCkuYWRkQ2xhc3MoJ2ZvY3VzZWQnKTtcbiAgICB9LFxuICAgIC8vIGxvYWQgbmV3IG5vZGVzIGJ5IGFqYXhcbiAgICBsb2FkTm9kZXM6IGZ1bmN0aW9uIChyZWwsIHVybCwgJGVkZ2UpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBvcHRzID0gdGhpcy5vcHRpb25zO1xuICAgICAgJC5hamF4KHsgJ3VybCc6IHVybCwgJ2RhdGFUeXBlJzogJ2pzb24nIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhhdC4kY2hhcnQuZGF0YSgnaW5BamF4JykpIHtcbiAgICAgICAgICBpZiAocmVsID09PSAncGFyZW50Jykge1xuICAgICAgICAgICAgaWYgKCEkLmlzRW1wdHlPYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgdGhhdC5hZGRQYXJlbnQoJGVkZ2UucGFyZW50KCksIGRhdGEsIG9wdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVsID09PSAnY2hpbGRyZW4nKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhhdC5hZGRDaGlsZHJlbigkZWRnZS5wYXJlbnQoKSwgZGF0YSwgJC5leHRlbmQoe30sIG9wdHMsIHsgZGVwdGg6IDAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zaWJsaW5ncyB8fCBkYXRhLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgIHRoYXQuYWRkU2libGluZ3MoJGVkZ2UucGFyZW50KCksIGRhdGEsIG9wdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBnZXQgJyArIHJlbCArICcgZGF0YScpO1xuICAgICAgfSlcbiAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LmVuZExvYWRpbmcoJGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAvL1xuICAgIEhpZGVGaXJzdFBhcmVudEVuZDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgJHRvcEVkZ2UgPSBldmVudC5kYXRhLnRvcEVkZ2U7XG4gICAgICB2YXIgJG5vZGUgPSAkdG9wRWRnZS5wYXJlbnQoKTtcbiAgICAgIGlmICh0aGlzLmlzSW5BY3Rpb24oJG5vZGUpKSB7XG4gICAgICAgIHRoaXMuc3dpdGNoVmVydGljYWxBcnJvdygkdG9wRWRnZSk7XG4gICAgICAgIHRoaXMuc3dpdGNoSG9yaXpvbnRhbEFycm93KCRub2RlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vXG4gICAgdG9wRWRnZUNsaWNrSGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciAkdG9wRWRnZSA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciAkbm9kZSA9ICQoZXZlbnQuZGVsZWdhdGVUYXJnZXQpO1xuICAgICAgdmFyIHBhcmVudFN0YXRlID0gdGhpcy5nZXROb2RlU3RhdGUoJG5vZGUsICdwYXJlbnQnKTtcbiAgICAgIGlmIChwYXJlbnRTdGF0ZS5leGlzdCkge1xuICAgICAgICB2YXIgJHBhcmVudCA9ICRub2RlLmNsb3Nlc3QoJ3RhYmxlJykuY2xvc2VzdCgndHInKS5zaWJsaW5ncygnOmZpcnN0JykuZmluZCgnLm5vZGUnKTtcbiAgICAgICAgaWYgKCRwYXJlbnQuaXMoJy5zbGlkaW5nJykpIHsgcmV0dXJuOyB9XG4gICAgICAgIC8vIGhpZGUgdGhlIGFuY2VzdG9yIG5vZGVzIGFuZCBzaWJsaW5nIG5vZGVzIG9mIHRoZSBzcGVjaWZpZWQgbm9kZVxuICAgICAgICBpZiAocGFyZW50U3RhdGUudmlzaWJsZSkge1xuICAgICAgICAgIHRoaXMuaGlkZVBhcmVudCgkbm9kZSk7XG4gICAgICAgICAgJHBhcmVudC5vbmUoJ3RyYW5zaXRpb25lbmQnLCB7ICd0b3BFZGdlJzogJHRvcEVkZ2UgfSwgdGhpcy5IaWRlRmlyc3RQYXJlbnRFbmQuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNob3cgdGhlIGFuY2VzdG9ycyBhbmQgc2libGluZ3NcbiAgICAgICAgICB0aGlzLnNob3dQYXJlbnQoJG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBsb2FkIHRoZSBuZXcgcGFyZW50IG5vZGUgb2YgdGhlIHNwZWNpZmllZCBub2RlIGJ5IGFqYXggcmVxdWVzdFxuICAgICAgICAvLyBzdGFydCB1cCBsb2FkaW5nIHN0YXR1c1xuICAgICAgICBpZiAodGhpcy5zdGFydExvYWRpbmcoJHRvcEVkZ2UpKSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgICAgdmFyIHVybCA9ICQuaXNGdW5jdGlvbihvcHRzLmFqYXhVUkwucGFyZW50KSA/IG9wdHMuYWpheFVSTC5wYXJlbnQoZXZlbnQuZGF0YS5ub2RlRGF0YSkgOiBvcHRzLmFqYXhVUkwucGFyZW50ICsgJG5vZGVbMF0uaWQ7XG4gICAgICAgICAgdGhpcy5sb2FkTm9kZXMoJ3BhcmVudCcsIHVybCwgJHRvcEVkZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvL1xuICAgIGJvdHRvbUVkZ2VDbGlja0hhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB2YXIgJGJvdHRvbUVkZ2UgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICB2YXIgJG5vZGUgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KTtcbiAgICAgIHZhciBjaGlsZHJlblN0YXRlID0gdGhpcy5nZXROb2RlU3RhdGUoJG5vZGUsICdjaGlsZHJlbicpO1xuICAgICAgaWYgKGNoaWxkcmVuU3RhdGUuZXhpc3QpIHtcbiAgICAgICAgdmFyICRjaGlsZHJlbiA9ICRub2RlLmNsb3Nlc3QoJ3RyJykuc2libGluZ3MoJzpsYXN0Jyk7XG4gICAgICAgIGlmICgkY2hpbGRyZW4uZmluZCgnLnNsaWRpbmcnKS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICAgIC8vIGhpZGUgdGhlIGRlc2NlbmRhbnQgbm9kZXMgb2YgdGhlIHNwZWNpZmllZCBub2RlXG4gICAgICAgIGlmIChjaGlsZHJlblN0YXRlLnZpc2libGUpIHtcbiAgICAgICAgICB0aGlzLmhpZGVDaGlsZHJlbigkbm9kZSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNob3cgdGhlIGRlc2NlbmRhbnRzXG4gICAgICAgICAgdGhpcy5zaG93Q2hpbGRyZW4oJG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBsb2FkIHRoZSBuZXcgY2hpbGRyZW4gbm9kZXMgb2YgdGhlIHNwZWNpZmllZCBub2RlIGJ5IGFqYXggcmVxdWVzdFxuICAgICAgICBpZiAodGhpcy5zdGFydExvYWRpbmcoJGJvdHRvbUVkZ2UpKSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICAgICAgdmFyIHVybCA9ICQuaXNGdW5jdGlvbihvcHRzLmFqYXhVUkwuY2hpbGRyZW4pID8gb3B0cy5hamF4VVJMLmNoaWxkcmVuKGV2ZW50LmRhdGEubm9kZURhdGEpIDogb3B0cy5hamF4VVJMLmNoaWxkcmVuICsgJG5vZGVbMF0uaWQ7XG4gICAgICAgICAgdGhpcy5sb2FkTm9kZXMoJ2NoaWxkcmVuJywgdXJsLCAkYm90dG9tRWRnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIC8vXG4gICAgaEVkZ2VDbGlja0hhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB2YXIgJGhFZGdlID0gJChldmVudC50YXJnZXQpO1xuICAgICAgdmFyICRub2RlID0gJChldmVudC5kZWxlZ2F0ZVRhcmdldCk7XG4gICAgICB2YXIgb3B0cyA9IHRoaXMub3B0aW9ucztcbiAgICAgIHZhciBzaWJsaW5nc1N0YXRlID0gdGhpcy5nZXROb2RlU3RhdGUoJG5vZGUsICdzaWJsaW5ncycpO1xuICAgICAgaWYgKHNpYmxpbmdzU3RhdGUuZXhpc3QpIHtcbiAgICAgICAgdmFyICRzaWJsaW5ncyA9ICRub2RlLmNsb3Nlc3QoJ3RhYmxlJykucGFyZW50KCkuc2libGluZ3MoKTtcbiAgICAgICAgaWYgKCRzaWJsaW5ncy5maW5kKCcuc2xpZGluZycpLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKG9wdHMudG9nZ2xlU2libGluZ3NSZXNwKSB7XG4gICAgICAgICAgdmFyICRwcmV2U2liID0gJG5vZGUuY2xvc2VzdCgndGFibGUnKS5wYXJlbnQoKS5wcmV2KCk7XG4gICAgICAgICAgdmFyICRuZXh0U2liID0gJG5vZGUuY2xvc2VzdCgndGFibGUnKS5wYXJlbnQoKS5uZXh0KCk7XG4gICAgICAgICAgaWYgKCRoRWRnZS5pcygnLmxlZnRFZGdlJykpIHtcbiAgICAgICAgICAgIGlmICgkcHJldlNpYi5pcygnLmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd1NpYmxpbmdzKCRub2RlLCAnbGVmdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5oaWRlU2libGluZ3MoJG5vZGUsICdsZWZ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgkbmV4dFNpYi5pcygnLmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd1NpYmxpbmdzKCRub2RlLCAncmlnaHQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaGlkZVNpYmxpbmdzKCRub2RlLCAncmlnaHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNpYmxpbmdzU3RhdGUudmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlU2libGluZ3MoJG5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTaWJsaW5ncygkbm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsb2FkIHRoZSBuZXcgc2libGluZyBub2RlcyBvZiB0aGUgc3BlY2lmaWVkIG5vZGUgYnkgYWpheCByZXF1ZXN0XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0TG9hZGluZygkaEVkZ2UpKSB7XG4gICAgICAgICAgdmFyIG5vZGVJZCA9ICRub2RlWzBdLmlkO1xuICAgICAgICAgIHZhciB1cmwgPSAodGhpcy5nZXROb2RlU3RhdGUoJG5vZGUsICdwYXJlbnQnKS5leGlzdCkgP1xuICAgICAgICAgICAgKCQuaXNGdW5jdGlvbihvcHRzLmFqYXhVUkwuc2libGluZ3MpID8gb3B0cy5hamF4VVJMLnNpYmxpbmdzKGV2ZW50LmRhdGEubm9kZURhdGEpIDogb3B0cy5hamF4VVJMLnNpYmxpbmdzICsgbm9kZUlkKSA6XG4gICAgICAgICAgICAoJC5pc0Z1bmN0aW9uKG9wdHMuYWpheFVSTC5mYW1pbGllcykgPyBvcHRzLmFqYXhVUkwuZmFtaWxpZXMoZXZlbnQuZGF0YS5ub2RlRGF0YSkgOiBvcHRzLmFqYXhVUkwuZmFtaWxpZXMgKyBub2RlSWQpO1xuICAgICAgICAgIHRoaXMubG9hZE5vZGVzKCdzaWJsaW5ncycsIHVybCwgJGhFZGdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy9cbiAgICBleHBhbmRWTm9kZXNFbmQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuZGF0YS52Tm9kZXMucmVtb3ZlQ2xhc3MoJ3NsaWRpbmcnKTtcbiAgICB9LFxuICAgIC8vXG4gICAgY29sbGFwc2VWTm9kZXNFbmQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuZGF0YS52Tm9kZXMucmVtb3ZlQ2xhc3MoJ3NsaWRpbmcnKS5jbG9zZXN0KCd1bCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9LFxuICAgIC8vIGV2ZW50IGhhbmRsZXIgZm9yIHRvZ2dsZSBidXR0b25zIGluIEh5YnJpZChob3Jpem9udGFsICsgdmVydGljYWwpIE9yZ0NoYXJ0XG4gICAgdG9nZ2xlVk5vZGVzOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciAkdG9nZ2xlQnRuID0gJChldmVudC50YXJnZXQpO1xuICAgICAgdmFyICRkZXNjV3JhcHBlciA9ICR0b2dnbGVCdG4ucGFyZW50KCkubmV4dCgpO1xuICAgICAgdmFyICRkZXNjZW5kYW50cyA9ICRkZXNjV3JhcHBlci5maW5kKCcubm9kZScpO1xuICAgICAgdmFyICRjaGlsZHJlbiA9ICRkZXNjV3JhcHBlci5jaGlsZHJlbigpLmNoaWxkcmVuKCcubm9kZScpO1xuICAgICAgaWYgKCRjaGlsZHJlbi5pcygnLnNsaWRpbmcnKSkgeyByZXR1cm47IH1cbiAgICAgICR0b2dnbGVCdG4udG9nZ2xlQ2xhc3MoJ2ZhLXBsdXMtc3F1YXJlIGZhLW1pbnVzLXNxdWFyZScpO1xuICAgICAgaWYgKCRkZXNjZW5kYW50cy5lcSgwKS5pcygnLnNsaWRlLXVwJykpIHtcbiAgICAgICAgJGRlc2NXcmFwcGVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5yZXBhaW50KCRjaGlsZHJlbi5nZXQoMCkpO1xuICAgICAgICAkY2hpbGRyZW4uYWRkQ2xhc3MoJ3NsaWRpbmcnKS5yZW1vdmVDbGFzcygnc2xpZGUtdXAnKS5lcSgwKS5vbmUoJ3RyYW5zaXRpb25lbmQnLCB7ICd2Tm9kZXMnOiAkY2hpbGRyZW4gfSwgdGhpcy5leHBhbmRWTm9kZXNFbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGRlc2NlbmRhbnRzLmFkZENsYXNzKCdzbGlkaW5nIHNsaWRlLXVwJykuZXEoMCkub25lKCd0cmFuc2l0aW9uZW5kJywgeyAndk5vZGVzJzogJGRlc2NlbmRhbnRzIH0sIHRoaXMuY29sbGFwc2VWTm9kZXNFbmQpO1xuICAgICAgICAkZGVzY2VuZGFudHMuZmluZCgnLnRvZ2dsZUJ0bicpLnJlbW92ZUNsYXNzKCdmYS1taW51cy1zcXVhcmUnKS5hZGRDbGFzcygnZmEtcGx1cy1zcXVhcmUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vXG4gICAgY3JlYXRlR2hvc3ROb2RlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciAkbm9kZURpdiA9ICQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIHZhciBvcHRzID0gdGhpcy5vcHRpb25zO1xuICAgICAgdmFyIG9yaWdFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICB2YXIgaXNGaXJlZm94ID0gL2ZpcmVmb3gvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XG4gICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgIG9yaWdFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9odG1sJywgJ2hhY2sgZm9yIGZpcmVmb3gnKTtcbiAgICAgIH1cbiAgICAgIHZhciBnaG9zdE5vZGUsIG5vZGVDb3ZlcjtcbiAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdob3N0LW5vZGUnKSkge1xuICAgICAgICBnaG9zdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcInN2Z1wiKTtcbiAgICAgICAgZ2hvc3ROb2RlLmNsYXNzTGlzdC5hZGQoJ2dob3N0LW5vZGUnKTtcbiAgICAgICAgbm9kZUNvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsJ3JlY3QnKTtcbiAgICAgICAgZ2hvc3ROb2RlLmFwcGVuZENoaWxkKG5vZGVDb3Zlcik7XG4gICAgICAgICRub2RlRGl2LmNsb3Nlc3QoJy5vcmdjaGFydCcpLmFwcGVuZChnaG9zdE5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2hvc3ROb2RlID0gJG5vZGVEaXYuY2xvc2VzdCgnLm9yZ2NoYXJ0JykuY2hpbGRyZW4oJy5naG9zdC1ub2RlJykuZ2V0KDApO1xuICAgICAgICBub2RlQ292ZXIgPSAkKGdob3N0Tm9kZSkuY2hpbGRyZW4oKS5nZXQoMCk7XG4gICAgICB9XG4gICAgICB2YXIgdHJhbnNWYWx1ZXMgPSAkbm9kZURpdi5jbG9zZXN0KCcub3JnY2hhcnQnKS5jc3MoJ3RyYW5zZm9ybScpLnNwbGl0KCcsJyk7XG4gICAgICB2YXIgc2NhbGUgPSBNYXRoLmFicyh3aW5kb3cucGFyc2VGbG9hdCgob3B0cy5kaXJlY3Rpb24gPT09ICd0MmInIHx8IG9wdHMuZGlyZWN0aW9uID09PSAnYjJ0JykgPyB0cmFuc1ZhbHVlc1swXS5zbGljZSh0cmFuc1ZhbHVlc1swXS5pbmRleE9mKCcoJykgKyAxKSA6IHRyYW5zVmFsdWVzWzFdKSk7XG4gICAgICBnaG9zdE5vZGUuc2V0QXR0cmlidXRlKCd3aWR0aCcsICRub2RlRGl2Lm91dGVyV2lkdGgoZmFsc2UpKTtcbiAgICAgIGdob3N0Tm9kZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICRub2RlRGl2Lm91dGVySGVpZ2h0KGZhbHNlKSk7XG4gICAgICBub2RlQ292ZXIuc2V0QXR0cmlidXRlKCd4Jyw1ICogc2NhbGUpO1xuICAgICAgbm9kZUNvdmVyLnNldEF0dHJpYnV0ZSgneScsNSAqIHNjYWxlKTtcbiAgICAgIG5vZGVDb3Zlci5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgMTIwICogc2NhbGUpO1xuICAgICAgbm9kZUNvdmVyLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgNDAgKiBzY2FsZSk7XG4gICAgICBub2RlQ292ZXIuc2V0QXR0cmlidXRlKCdyeCcsIDQgKiBzY2FsZSk7XG4gICAgICBub2RlQ292ZXIuc2V0QXR0cmlidXRlKCdyeScsIDQgKiBzY2FsZSk7XG4gICAgICBub2RlQ292ZXIuc2V0QXR0cmlidXRlKCdzdHJva2Utd2lkdGgnLCAxICogc2NhbGUpO1xuICAgICAgdmFyIHhPZmZzZXQgPSBvcmlnRXZlbnQub2Zmc2V0WCAqIHNjYWxlO1xuICAgICAgdmFyIHlPZmZzZXQgPSBvcmlnRXZlbnQub2Zmc2V0WSAqIHNjYWxlO1xuICAgICAgaWYgKG9wdHMuZGlyZWN0aW9uID09PSAnbDJyJykge1xuICAgICAgICB4T2Zmc2V0ID0gb3JpZ0V2ZW50Lm9mZnNldFkgKiBzY2FsZTtcbiAgICAgICAgeU9mZnNldCA9IG9yaWdFdmVudC5vZmZzZXRYICogc2NhbGU7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZGlyZWN0aW9uID09PSAncjJsJykge1xuICAgICAgICB4T2Zmc2V0ID0gJG5vZGVEaXYub3V0ZXJXaWR0aChmYWxzZSkgLSBvcmlnRXZlbnQub2Zmc2V0WSAqIHNjYWxlO1xuICAgICAgICB5T2Zmc2V0ID0gb3JpZ0V2ZW50Lm9mZnNldFggKiBzY2FsZTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5kaXJlY3Rpb24gPT09ICdiMnQnKSB7XG4gICAgICAgIHhPZmZzZXQgPSAkbm9kZURpdi5vdXRlcldpZHRoKGZhbHNlKSAtIG9yaWdFdmVudC5vZmZzZXRYICogc2NhbGU7XG4gICAgICAgIHlPZmZzZXQgPSAkbm9kZURpdi5vdXRlckhlaWdodChmYWxzZSkgLSBvcmlnRXZlbnQub2Zmc2V0WSAqIHNjYWxlO1xuICAgICAgfVxuICAgICAgaWYgKGlzRmlyZWZveCkgeyAvLyBoYWNrIGZvciBvbGQgdmVyc2lvbiBvZiBGaXJlZm94KDwgNDguMClcbiAgICAgICAgbm9kZUNvdmVyLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdyZ2IoMjU1LCAyNTUsIDI1NSknKTtcbiAgICAgICAgbm9kZUNvdmVyLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ3JnYigxOTEsIDAsIDApJyk7XG4gICAgICAgIHZhciBnaG9zdE5vZGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGdob3N0Tm9kZVdyYXBwZXIuc3JjID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LCcgKyAobmV3IFhNTFNlcmlhbGl6ZXIoKSkuc2VyaWFsaXplVG9TdHJpbmcoZ2hvc3ROb2RlKTtcbiAgICAgICAgb3JpZ0V2ZW50LmRhdGFUcmFuc2Zlci5zZXREcmFnSW1hZ2UoZ2hvc3ROb2RlV3JhcHBlciwgeE9mZnNldCwgeU9mZnNldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmlnRXZlbnQuZGF0YVRyYW5zZmVyLnNldERyYWdJbWFnZShnaG9zdE5vZGUsIHhPZmZzZXQsIHlPZmZzZXQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9cbiAgICBmaWx0ZXJBbGxvd2VkRHJvcE5vZGVzOiBmdW5jdGlvbiAoJGRyYWdnZWQpIHtcbiAgICAgIHZhciBvcHRzID0gdGhpcy5vcHRpb25zO1xuICAgICAgdmFyICRkcmFnWm9uZSA9ICRkcmFnZ2VkLmNsb3Nlc3QoJy5ub2RlcycpLnNpYmxpbmdzKCkuZXEoMCkuZmluZCgnLm5vZGU6Zmlyc3QnKTtcbiAgICAgIHZhciAkZHJhZ0hpZXIgPSAkZHJhZ2dlZC5jbG9zZXN0KCd0YWJsZScpLmZpbmQoJy5ub2RlJyk7XG4gICAgICB0aGlzLiRjaGFydC5kYXRhKCdkcmFnZ2VkJywgJGRyYWdnZWQpXG4gICAgICAgIC5maW5kKCcubm9kZScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBub2RlKSB7XG4gICAgICAgICAgaWYgKCRkcmFnSGllci5pbmRleChub2RlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmRyb3BDcml0ZXJpYSkge1xuICAgICAgICAgICAgICBpZiAob3B0cy5kcm9wQ3JpdGVyaWEoJGRyYWdnZWQsICRkcmFnWm9uZSwgJChub2RlKSkpIHtcbiAgICAgICAgICAgICAgICAkKG5vZGUpLmFkZENsYXNzKCdhbGxvd2VkRHJvcCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKG5vZGUpLmFkZENsYXNzKCdhbGxvd2VkRHJvcCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvL1xuICAgIGRyYWdzdGFydEhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgLy8gaWYgdXNlcnMgZW5hYmxlIHpvb20gb3IgZGlyZWN0aW9uIG9wdGlvbnNcbiAgICAgIGlmICh0aGlzLiRjaGFydC5jc3MoJ3RyYW5zZm9ybScpICE9PSAnbm9uZScpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVHaG9zdE5vZGUoZXZlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJBbGxvd2VkRHJvcE5vZGVzKCQoZXZlbnQudGFyZ2V0KSk7XG4gICAgfSxcbiAgICAvL1xuICAgIGRyYWdvdmVySGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCEkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KS5pcygnLmFsbG93ZWREcm9wJykpIHtcbiAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vXG4gICAgZHJhZ2VuZEhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgdGhpcy4kY2hhcnQuZmluZCgnLmFsbG93ZWREcm9wJykucmVtb3ZlQ2xhc3MoJ2FsbG93ZWREcm9wJyk7XG4gICAgfSxcbiAgICAvL1xuICAgIGRyb3BIYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciAkZHJvcFpvbmUgPSAkKGV2ZW50LmRlbGVnYXRlVGFyZ2V0KTtcbiAgICAgIHZhciAkZHJhZ2dlZCA9IHRoaXMuJGNoYXJ0LmRhdGEoJ2RyYWdnZWQnKTtcbiAgICAgIHZhciAkZHJhZ1pvbmUgPSAkZHJhZ2dlZC5jbG9zZXN0KCcubm9kZXMnKS5zaWJsaW5ncygpLmVxKDApLmNoaWxkcmVuKCk7XG4gICAgICB2YXIgZHJvcEV2ZW50ID0gJC5FdmVudCgnbm9kZWRyb3Aub3JnY2hhcnQnKTtcbiAgICAgIHRoaXMuJGNoYXJ0LnRyaWdnZXIoZHJvcEV2ZW50LCB7ICdkcmFnZ2VkTm9kZSc6ICRkcmFnZ2VkLCAnZHJhZ1pvbmUnOiAkZHJhZ1pvbmUuY2hpbGRyZW4oKSwgJ2Ryb3Bab25lJzogJGRyb3Bab25lIH0pO1xuICAgICAgaWYgKGRyb3BFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBmaXJzdGx5LCBkZWFsIHdpdGggdGhlIGhpZXJhcmNoeSBvZiBkcm9wIHpvbmVcbiAgICAgIGlmICghJGRyb3Bab25lLmNsb3Nlc3QoJ3RyJykuc2libGluZ3MoKS5sZW5ndGgpIHsgLy8gaWYgdGhlIGRyb3Agem9uZSBpcyBhIGxlYWYgbm9kZVxuICAgICAgICAkZHJvcFpvbmUuYXBwZW5kKCc8aSBjbGFzcz1cImVkZ2UgdmVydGljYWxFZGdlIGJvdHRvbUVkZ2UgZmFcIj48L2k+JylcbiAgICAgICAgICAucGFyZW50KCkuYXR0cignY29sc3BhbicsIDIpXG4gICAgICAgICAgLnBhcmVudCgpLmFmdGVyKCc8dHIgY2xhc3M9XCJsaW5lc1wiPjx0ZCBjb2xzcGFuPVwiMlwiPjxkaXYgY2xhc3M9XCJkb3duTGluZVwiPjwvZGl2PjwvdGQ+PC90cj4nXG4gICAgICAgICAgKyAnPHRyIGNsYXNzPVwibGluZXNcIj48dGQgY2xhc3M9XCJyaWdodExpbmVcIj48L3RkPjx0ZCBjbGFzcz1cImxlZnRMaW5lXCI+PC90ZD48L3RyPidcbiAgICAgICAgICArICc8dHIgY2xhc3M9XCJub2Rlc1wiPjwvdHI+JylcbiAgICAgICAgICAuc2libGluZ3MoJzpsYXN0JykuYXBwZW5kKCRkcmFnZ2VkLmZpbmQoJy5ob3Jpem9udGFsRWRnZScpLnJlbW92ZSgpLmVuZCgpLmNsb3Nlc3QoJ3RhYmxlJykucGFyZW50KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRyb3BDb2xzcGFuID0gcGFyc2VJbnQoJGRyb3Bab25lLnBhcmVudCgpLmF0dHIoJ2NvbHNwYW4nKSkgKyAyO1xuICAgICAgICB2YXIgaG9yaXpvbnRhbEVkZ2VzID0gJzxpIGNsYXNzPVwiZWRnZSBob3Jpem9udGFsRWRnZSByaWdodEVkZ2UgZmFcIj48L2k+PGkgY2xhc3M9XCJlZGdlIGhvcml6b250YWxFZGdlIGxlZnRFZGdlIGZhXCI+PC9pPic7XG4gICAgICAgICRkcm9wWm9uZS5jbG9zZXN0KCd0cicpLm5leHQoKS5hZGRCYWNrKCkuY2hpbGRyZW4oKS5hdHRyKCdjb2xzcGFuJywgZHJvcENvbHNwYW4pO1xuICAgICAgICBpZiAoISRkcmFnZ2VkLmZpbmQoJy5ob3Jpem9udGFsRWRnZScpLmxlbmd0aCkge1xuICAgICAgICAgICRkcmFnZ2VkLmFwcGVuZChob3Jpem9udGFsRWRnZXMpO1xuICAgICAgICB9XG4gICAgICAgICRkcm9wWm9uZS5jbG9zZXN0KCd0cicpLnNpYmxpbmdzKCkuZXEoMSkuY2hpbGRyZW4oJzpsYXN0JykuYmVmb3JlKCc8dGQgY2xhc3M9XCJsZWZ0TGluZSB0b3BMaW5lXCI+PC90ZD48dGQgY2xhc3M9XCJyaWdodExpbmUgdG9wTGluZVwiPjwvdGQ+JylcbiAgICAgICAgICAuZW5kKCkubmV4dCgpLmFwcGVuZCgkZHJhZ2dlZC5jbG9zZXN0KCd0YWJsZScpLnBhcmVudCgpKTtcbiAgICAgICAgdmFyICRkcm9wU2licyA9ICRkcmFnZ2VkLmNsb3Nlc3QoJ3RhYmxlJykucGFyZW50KCkuc2libGluZ3MoKS5maW5kKCcubm9kZTpmaXJzdCcpO1xuICAgICAgICBpZiAoJGRyb3BTaWJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICRkcm9wU2licy5hcHBlbmQoaG9yaXpvbnRhbEVkZ2VzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gc2Vjb25kbHksIGRlYWwgd2l0aCB0aGUgaGllcmFyY2h5IG9mIGRyYWdnZWQgbm9kZVxuICAgICAgdmFyIGRyYWdDb2xzcGFuID0gcGFyc2VJbnQoJGRyYWdab25lLmF0dHIoJ2NvbHNwYW4nKSk7XG4gICAgICBpZiAoZHJhZ0NvbHNwYW4gPiAyKSB7XG4gICAgICAgICRkcmFnWm9uZS5hdHRyKCdjb2xzcGFuJywgZHJhZ0NvbHNwYW4gLSAyKVxuICAgICAgICAgIC5wYXJlbnQoKS5uZXh0KCkuY2hpbGRyZW4oKS5hdHRyKCdjb2xzcGFuJywgZHJhZ0NvbHNwYW4gLSAyKVxuICAgICAgICAgIC5lbmQoKS5uZXh0KCkuY2hpbGRyZW4oKS5zbGljZSgxLCAzKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyICRkcmFnU2licyA9ICRkcmFnWm9uZS5wYXJlbnQoKS5zaWJsaW5ncygnLm5vZGVzJykuY2hpbGRyZW4oKS5maW5kKCcubm9kZTpmaXJzdCcpO1xuICAgICAgICBpZiAoJGRyYWdTaWJzLmxlbmd0aCA9PT0xKSB7XG4gICAgICAgICAgJGRyYWdTaWJzLmZpbmQoJy5ob3Jpem9udGFsRWRnZScpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZHJhZ1pvbmUucmVtb3ZlQXR0cignY29sc3BhbicpXG4gICAgICAgICAgLmZpbmQoJy5ib3R0b21FZGdlJykucmVtb3ZlKClcbiAgICAgICAgICAuZW5kKCkuZW5kKCkuc2libGluZ3MoKS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIGNyZWF0ZSBub2RlXG4gICAgY3JlYXRlTm9kZTogZnVuY3Rpb24gKG5vZGVEYXRhLCBsZXZlbCwgb3B0cykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCFub2RlRGF0YS5jaGlsZHJlbikgeyBub2RlRGF0YS5jaGlsZHJlbiA9IFtdOyB9XG4gICAgICAkLmVhY2gobm9kZURhdGEuY2hpbGRyZW4sIGZ1bmN0aW9uIChpbmRleCwgY2hpbGQpIHtcbiAgICAgICAgY2hpbGQucGFyZW50SWQgPSBub2RlRGF0YS5pZDtcbiAgICAgIH0pO1xuICAgICAgdmFyIGR0ZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgIC8vIGNvbnN0cnVjdCB0aGUgY29udGVudCBvZiBub2RlXG4gICAgICB2YXIgJG5vZGVEaXYgPSAkKCc8ZGl2JyArIChvcHRzLmRyYWdnYWJsZSA/ICcgZHJhZ2dhYmxlPVwidHJ1ZVwiJyA6ICcnKSArIChub2RlRGF0YVtvcHRzLm5vZGVJZF0gPyAnIGlkPVwiJyArIG5vZGVEYXRhW29wdHMubm9kZUlkXSArICdcIicgOiAnJykgKyAobm9kZURhdGEucGFyZW50SWQgPyAnIGRhdGEtcGFyZW50PVwiJyArIG5vZGVEYXRhLnBhcmVudElkICsgJ1wiJyA6ICcnKSArICc+JylcbiAgICAgICAgLmFkZENsYXNzKCdub2RlICcgKyAobm9kZURhdGEuY2xhc3NOYW1lIHx8ICcnKSArICAobGV2ZWwgPj0gb3B0cy5kZXB0aCA/ICcgc2xpZGUtdXAnIDogJycpKTtcbiAgICAgIGlmIChvcHRzLm5vZGVUZW1wbGF0ZSkge1xuICAgICAgICAkbm9kZURpdi5hcHBlbmQob3B0cy5ub2RlVGVtcGxhdGUobm9kZURhdGEpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRub2RlRGl2LmFwcGVuZCgnPGRpdiBjbGFzcz1cInRpdGxlXCI+JyArIG5vZGVEYXRhW29wdHMubm9kZVRpdGxlXSArICc8L2Rpdj4nKVxuICAgICAgICAgIC5hcHBlbmQodHlwZW9mIG9wdHMubm9kZUNvbnRlbnQgIT09ICd1bmRlZmluZWQnID8gJzxkaXYgY2xhc3M9XCJjb250ZW50XCI+JyArIChub2RlRGF0YVtvcHRzLm5vZGVDb250ZW50XSB8fCAnJykgKyAnPC9kaXY+JyA6ICcnKTtcbiAgICAgIH1cbiAgICAgIC8vIGFwcGVuZCA0IGRpcmVjdGlvbiBhcnJvd3Mgb3IgZXhwYW5kL2NvbGxhcHNlIGJ1dHRvbnNcbiAgICAgIHZhciBmbGFncyA9IG5vZGVEYXRhLnJlbGF0aW9uc2hpcCB8fCAnJztcbiAgICAgIGlmIChvcHRzLnZlcnRpY2FsRGVwdGggJiYgKGxldmVsICsgMikgPiBvcHRzLnZlcnRpY2FsRGVwdGgpIHtcbiAgICAgICAgaWYgKChsZXZlbCArIDEpID49IG9wdHMudmVydGljYWxEZXB0aCAmJiBOdW1iZXIoZmxhZ3Muc3Vic3RyKDIsMSkpKSB7XG4gICAgICAgICAgdmFyIGljb24gPSBsZXZlbCArIDEgID49IG9wdHMuZGVwdGggPyAncGx1cycgOiAnbWludXMnO1xuICAgICAgICAgICRub2RlRGl2LmFwcGVuZCgnPGkgY2xhc3M9XCJ0b2dnbGVCdG4gZmEgZmEtJyArIGljb24gKyAnLXNxdWFyZVwiPjwvaT4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE51bWJlcihmbGFncy5zdWJzdHIoMCwxKSkpIHtcbiAgICAgICAgICAkbm9kZURpdi5hcHBlbmQoJzxpIGNsYXNzPVwiZWRnZSB2ZXJ0aWNhbEVkZ2UgdG9wRWRnZSBmYVwiPjwvaT4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZihOdW1iZXIoZmxhZ3Muc3Vic3RyKDEsMSkpKSB7XG4gICAgICAgICAgJG5vZGVEaXYuYXBwZW5kKCc8aSBjbGFzcz1cImVkZ2UgaG9yaXpvbnRhbEVkZ2UgcmlnaHRFZGdlIGZhXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwiZWRnZSBob3Jpem9udGFsRWRnZSBsZWZ0RWRnZSBmYVwiPjwvaT4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZihOdW1iZXIoZmxhZ3Muc3Vic3RyKDIsMSkpKSB7XG4gICAgICAgICAgJG5vZGVEaXYuYXBwZW5kKCc8aSBjbGFzcz1cImVkZ2UgdmVydGljYWxFZGdlIGJvdHRvbUVkZ2UgZmFcIj48L2k+JylcbiAgICAgICAgICAgIC5jaGlsZHJlbignLnRpdGxlJykucHJlcGVuZCgnPGkgY2xhc3M9XCJmYSAnKyBvcHRzLnBhcmVudE5vZGVTeW1ib2wgKyAnIHN5bWJvbFwiPjwvaT4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkbm9kZURpdi5vbignbW91c2VlbnRlciBtb3VzZWxlYXZlJywgdGhpcy5ub2RlRW50ZXJMZWF2ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAkbm9kZURpdi5vbignY2xpY2snLCB0aGlzLm5vZGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAkbm9kZURpdi5vbignY2xpY2snLCAnLnRvcEVkZ2UnLCB7ICdub2RlRGF0YSc6IG5vZGVEYXRhIH0sIHRoaXMudG9wRWRnZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgICRub2RlRGl2Lm9uKCdjbGljaycsICcuYm90dG9tRWRnZScsIHsgJ25vZGVEYXRhJzogbm9kZURhdGEgfSwgdGhpcy5ib3R0b21FZGdlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgJG5vZGVEaXYub24oJ2NsaWNrJywgJy5sZWZ0RWRnZSwgLnJpZ2h0RWRnZScsIHsgJ25vZGVEYXRhJzogbm9kZURhdGEgfSwgdGhpcy5oRWRnZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICAgICRub2RlRGl2Lm9uKCdjbGljaycsICcudG9nZ2xlQnRuJywgdGhpcy50b2dnbGVWTm9kZXMuYmluZCh0aGlzKSk7XG5cbiAgICAgIGlmIChvcHRzLmRyYWdnYWJsZSkge1xuICAgICAgICAkbm9kZURpdi5vbignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnc3RhcnRIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAgIC5vbignZHJhZ292ZXInLCB0aGlzLmRyYWdvdmVySGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgICAub24oJ2RyYWdlbmQnLCB0aGlzLmRyYWdlbmRIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAgIC5vbignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICB9XG4gICAgICAvLyBhbGxvdyB1c2VyIHRvIGFwcGVuZCBkb20gbW9kaWZpY2F0aW9uIGFmdGVyIGZpbmlzaGluZyBub2RlIGNyZWF0ZSBvZiBvcmdjaGFydFxuICAgICAgaWYgKG9wdHMuY3JlYXRlTm9kZSkge1xuICAgICAgICBvcHRzLmNyZWF0ZU5vZGUoJG5vZGVEaXYsIG5vZGVEYXRhKTtcbiAgICAgIH1cbiAgICAgIGR0ZC5yZXNvbHZlKCRub2RlRGl2KTtcbiAgICAgIHJldHVybiBkdGQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgLy8gcmVjdXJzaXZlbHkgYnVpbGQgdGhlIHRyZWVcbiAgICBidWlsZEhpZXJhcmNoeTogZnVuY3Rpb24gKCRhcHBlbmRUbywgbm9kZURhdGEsIGxldmVsLCBvcHRzLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyICRub2RlV3JhcHBlcjtcbiAgICAgIC8vIENvbnN0cnVjdCB0aGUgbm9kZVxuICAgICAgdmFyICRjaGlsZE5vZGVzID0gbm9kZURhdGEuY2hpbGRyZW47XG4gICAgICB2YXIgaGFzQ2hpbGRyZW4gPSAkY2hpbGROb2RlcyA/ICRjaGlsZE5vZGVzLmxlbmd0aCA6IGZhbHNlO1xuICAgICAgdmFyIGlzVmVydGljYWxOb2RlID0gKG9wdHMudmVydGljYWxEZXB0aCAmJiAobGV2ZWwgKyAxKSA+PSBvcHRzLnZlcnRpY2FsRGVwdGgpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKG5vZGVEYXRhKS5sZW5ndGggPiAxKSB7IC8vIGlmIG5vZGVEYXRhIGhhcyBuZXN0ZWQgc3RydWN0dXJlXG4gICAgICAgICRub2RlV3JhcHBlciA9IGlzVmVydGljYWxOb2RlID8gJGFwcGVuZFRvIDogJCgnPHRhYmxlPicpO1xuICAgICAgICBpZiAoIWlzVmVydGljYWxOb2RlKSB7XG4gICAgICAgICAgJGFwcGVuZFRvLmFwcGVuZCgkbm9kZVdyYXBwZXIpO1xuICAgICAgICB9XG4gICAgICAgICQud2hlbih0aGlzLmNyZWF0ZU5vZGUobm9kZURhdGEsIGxldmVsLCBvcHRzKSlcbiAgICAgICAgLmRvbmUoZnVuY3Rpb24oJG5vZGVEaXYpIHtcbiAgICAgICAgICBpZiAoaXNWZXJ0aWNhbE5vZGUpIHtcbiAgICAgICAgICAgICRub2RlV3JhcHBlci5hcHBlbmQoJG5vZGVEaXYpO1xuICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICRub2RlV3JhcHBlci5hcHBlbmQoJCgnPHRyLz4nKS5hcHBlbmQoJCgnPHRkJyArIChoYXNDaGlsZHJlbiA/ICcgY29sc3Bhbj1cIicgKyAkY2hpbGROb2Rlcy5sZW5ndGggKiAyICsgJ1wiJyA6ICcnKSArICc+PC90ZD4nKS5hcHBlbmQoJG5vZGVEaXYpKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gY3JlYXQgbm9kZScpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgLy8gQ29uc3RydWN0IHRoZSBpbmZlcmlvciBub2RlcyBhbmQgY29ubmVjdGlvbmcgbGluZXNcbiAgICAgIGlmIChoYXNDaGlsZHJlbikge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobm9kZURhdGEpLmxlbmd0aCA9PT0gMSkgeyAvLyBpZiBub2RlRGF0YSBpcyBqdXN0IGFuIGFycmF5XG4gICAgICAgICAgJG5vZGVXcmFwcGVyID0gJGFwcGVuZFRvO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc0hpZGRlbiA9IChsZXZlbCArIDEgPj0gb3B0cy5kZXB0aCB8fCBub2RlRGF0YS5jb2xsYXBzZWQpID8gJyBoaWRkZW4nIDogJyc7XG4gICAgICAgIHZhciBpc1ZlcnRpY2FsTGF5ZXIgPSAob3B0cy52ZXJ0aWNhbERlcHRoICYmIChsZXZlbCArIDIpID49IG9wdHMudmVydGljYWxEZXB0aCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgLy8gZHJhdyB0aGUgbGluZSBjbG9zZSB0byBwYXJlbnQgbm9kZVxuICAgICAgICBpZiAoIWlzVmVydGljYWxMYXllcikge1xuICAgICAgICAgICRub2RlV3JhcHBlci5hcHBlbmQoJzx0ciBjbGFzcz1cImxpbmVzJyArIGlzSGlkZGVuICsgJ1wiPjx0ZCBjb2xzcGFuPVwiJyArICRjaGlsZE5vZGVzLmxlbmd0aCAqIDIgKyAnXCI+PGRpdiBjbGFzcz1cImRvd25MaW5lXCI+PC9kaXY+PC90ZD48L3RyPicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRyYXcgdGhlIGxpbmVzIGNsb3NlIHRvIGNoaWxkcmVuIG5vZGVzXG4gICAgICAgIHZhciBsaW5lTGF5ZXIgPSAnPHRyIGNsYXNzPVwibGluZXMnICsgaXNIaWRkZW4gKyAnXCI+PHRkIGNsYXNzPVwicmlnaHRMaW5lXCI+PC90ZD4nO1xuICAgICAgICBmb3IgKHZhciBpPTE7IGk8JGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsaW5lTGF5ZXIgKz0gJzx0ZCBjbGFzcz1cImxlZnRMaW5lIHRvcExpbmVcIj48L3RkPjx0ZCBjbGFzcz1cInJpZ2h0TGluZSB0b3BMaW5lXCI+PC90ZD4nO1xuICAgICAgICB9XG4gICAgICAgIGxpbmVMYXllciArPSAnPHRkIGNsYXNzPVwibGVmdExpbmVcIj48L3RkPjwvdHI+JztcbiAgICAgICAgdmFyICRub2RlTGF5ZXI7XG4gICAgICAgIGlmIChpc1ZlcnRpY2FsTGF5ZXIpIHtcbiAgICAgICAgICAkbm9kZUxheWVyID0gJCgnPHVsPicpO1xuICAgICAgICAgIGlmIChpc0hpZGRlbiAmJiBvcHRzLmRlcHRoICsgMSAhPT0gb3B0cy52ZXJ0aWNhbERlcHRoKSB7XG4gICAgICAgICAgICAkbm9kZUxheWVyLmFkZENsYXNzKGlzSGlkZGVuKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxldmVsICsgMiA9PT0gb3B0cy52ZXJ0aWNhbERlcHRoKSB7XG4gICAgICAgICAgICAkbm9kZVdyYXBwZXIuYXBwZW5kKCc8dHIgY2xhc3M9XCJ2ZXJ0aWNhbE5vZGVzJyArIGlzSGlkZGVuICsgJ1wiPjx0ZD48L3RkPjwvdHI+JylcbiAgICAgICAgICAgICAgLmZpbmQoJy52ZXJ0aWNhbE5vZGVzJykuY2hpbGRyZW4oKS5hcHBlbmQoJG5vZGVMYXllcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRub2RlV3JhcHBlci5hcHBlbmQoJG5vZGVMYXllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRub2RlTGF5ZXIgPSAkKCc8dHIgY2xhc3M9XCJub2RlcycgKyBpc0hpZGRlbiArICdcIj4nKTtcbiAgICAgICAgICAkbm9kZVdyYXBwZXIuYXBwZW5kKGxpbmVMYXllcikuYXBwZW5kKCRub2RlTGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlY3Vyc2UgdGhyb3VnaCBjaGlsZHJlbiBub2Rlc1xuICAgICAgICAkLmVhY2goJGNoaWxkTm9kZXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciAkbm9kZUNlbGwgPSBpc1ZlcnRpY2FsTGF5ZXIgPyAkKCc8bGk+JykgOiAkKCc8dGQgY29sc3Bhbj1cIjJcIj4nKTtcbiAgICAgICAgICAkbm9kZUxheWVyLmFwcGVuZCgkbm9kZUNlbGwpO1xuICAgICAgICAgIHRoYXQuYnVpbGRIaWVyYXJjaHkoJG5vZGVDZWxsLCB0aGlzLCBsZXZlbCArIDEsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBidWlsZCB0aGUgY2hpbGQgbm9kZXMgb2Ygc3BlY2lmaWMgbm9kZVxuICAgIGJ1aWxkQ2hpbGROb2RlOiBmdW5jdGlvbiAoJGFwcGVuZFRvLCBub2RlRGF0YSwgb3B0cywgY2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRzID0gb3B0cyB8fCAkYXBwZW5kVG8uY2xvc2VzdCgnLm9yZ2NoYXJ0JykuZGF0YSgnb3B0aW9ucycpO1xuICAgICAgdmFyIGRhdGEgPSBub2RlRGF0YS5jaGlsZHJlbiB8fCBub2RlRGF0YS5zaWJsaW5ncztcbiAgICAgICRhcHBlbmRUby5maW5kKCd0ZDpmaXJzdCcpLmF0dHIoJ2NvbHNwYW4nLCBkYXRhLmxlbmd0aCAqIDIpO1xuICAgICAgdGhpcy5idWlsZEhpZXJhcmNoeSgkYXBwZW5kVG8sIHsgJ2NoaWxkcmVuJzogZGF0YSB9LCAwLCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfSxcbiAgICAvLyBleHBvc2VkIG1ldGhvZFxuICAgIGFkZENoaWxkcmVuOiBmdW5jdGlvbiAoJG5vZGUsIGRhdGEsIG9wdHMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBvcHRzID0gb3B0cyB8fCAkbm9kZS5jbG9zZXN0KCcub3JnY2hhcnQnKS5kYXRhKCdvcHRpb25zJyk7XG4gICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgdGhpcy5idWlsZENoaWxkTm9kZSgkbm9kZS5jbG9zZXN0KCd0YWJsZScpLCBkYXRhLCBvcHRzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCsrY291bnQgPT09IGRhdGEuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKCEkbm9kZS5jaGlsZHJlbignLmJvdHRvbUVkZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICRub2RlLmFwcGVuZCgnPGkgY2xhc3M9XCJlZGdlIHZlcnRpY2FsRWRnZSBib3R0b21FZGdlIGZhXCI+PC9pPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoISRub2RlLmZpbmQoJy5zeW1ib2wnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICRub2RlLmNoaWxkcmVuKCcudGl0bGUnKS5wcmVwZW5kKCc8aSBjbGFzcz1cImZhICcrIG9wdHMucGFyZW50Tm9kZVN5bWJvbCArICcgc3ltYm9sXCI+PC9pPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LnNob3dDaGlsZHJlbigkbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLy8gYnVpbGQgdGhlIHBhcmVudCBub2RlIG9mIHNwZWNpZmljIG5vZGVcbiAgICBidWlsZFBhcmVudE5vZGU6IGZ1bmN0aW9uICgkY3VycmVudFJvb3QsIG5vZGVEYXRhLCBvcHRzLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyICR0YWJsZSA9ICQoJzx0YWJsZT4nKTtcbiAgICAgIG5vZGVEYXRhLnJlbGF0aW9uc2hpcCA9IG5vZGVEYXRhLnJlbGF0aW9uc2hpcCB8fCAnMDAxJztcbiAgICAgICQud2hlbih0aGlzLmNyZWF0ZU5vZGUobm9kZURhdGEsIDAsIG9wdHMgfHwgJGN1cnJlbnRSb290LmNsb3Nlc3QoJy5vcmdjaGFydCcpLmRhdGEoJ29wdGlvbnMnKSkpXG4gICAgICAgIC5kb25lKGZ1bmN0aW9uKCRub2RlRGl2KSB7XG4gICAgICAgICAgJHRhYmxlLmFwcGVuZCgkKCc8dHIgY2xhc3M9XCJoaWRkZW5cIj4nKS5hcHBlbmQoJCgnPHRkIGNvbHNwYW49XCIyXCI+JykuYXBwZW5kKCRub2RlRGl2LnJlbW92ZUNsYXNzKCdzbGlkZS11cCcpLmFkZENsYXNzKCdzbGlkZS1kb3duJykpKSk7XG4gICAgICAgICAgJHRhYmxlLmFwcGVuZCgnPHRyIGNsYXNzPVwibGluZXMgaGlkZGVuXCI+PHRkIGNvbHNwYW49XCIyXCI+PGRpdiBjbGFzcz1cImRvd25MaW5lXCI+PC9kaXY+PC90ZD48L3RyPicpO1xuICAgICAgICAgIHZhciBsaW5lc1JvdyA9ICc8dGQgY2xhc3M9XCJyaWdodExpbmVcIj48L3RkPjx0ZCBjbGFzcz1cImxlZnRMaW5lXCI+PC90ZD4nO1xuICAgICAgICAgICR0YWJsZS5hcHBlbmQoJzx0ciBjbGFzcz1cImxpbmVzIGhpZGRlblwiPicgKyBsaW5lc1JvdyArICc8L3RyPicpO1xuICAgICAgICAgIHZhciAkY2hhcnQgPSB0aGF0LiRjaGFydDtcbiAgICAgICAgICAkY2hhcnQucHJlcGVuZCgkdGFibGUpXG4gICAgICAgICAgICAuY2hpbGRyZW4oJ3RhYmxlOmZpcnN0JykuYXBwZW5kKCc8dHIgY2xhc3M9XCJub2Rlc1wiPjx0ZCBjb2xzcGFuPVwiMlwiPjwvdGQ+PC90cj4nKVxuICAgICAgICAgICAgLmNoaWxkcmVuKCd0cjpsYXN0JykuY2hpbGRyZW4oKS5hcHBlbmQoJGNoYXJ0LmNoaWxkcmVuKCd0YWJsZScpLmxhc3QoKSk7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBjcmVhdGUgcGFyZW50IG5vZGUnKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyBleHBvc2VkIG1ldGhvZFxuICAgIGFkZFBhcmVudDogZnVuY3Rpb24gKCRjdXJyZW50Um9vdCwgZGF0YSwgb3B0cykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5idWlsZFBhcmVudE5vZGUoJGN1cnJlbnRSb290LCBkYXRhLCBvcHRzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCEkY3VycmVudFJvb3QuY2hpbGRyZW4oJy50b3BFZGdlJykubGVuZ3RoKSB7XG4gICAgICAgICAgJGN1cnJlbnRSb290LmNoaWxkcmVuKCcudGl0bGUnKS5hZnRlcignPGkgY2xhc3M9XCJlZGdlIHZlcnRpY2FsRWRnZSB0b3BFZGdlIGZhXCI+PC9pPicpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc2hvd1BhcmVudCgkY3VycmVudFJvb3QpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAvLyBzdWJzZXF1ZW50IHByb2Nlc3Npbmcgb2YgYnVpbGQgc2libGluZyBub2Rlc1xuICAgIGNvbXBsZW1lbnRMaW5lOiBmdW5jdGlvbiAoJG9uZVNpYmxpbmcsIHNpYmxpbmdDb3VudCwgZXhpc3RpbmdTaWJsaWdDb3VudCkge1xuICAgICAgdmFyIGxpbmVzID0gJyc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU2libGlnQ291bnQ7IGkrKykge1xuICAgICAgICBsaW5lcyArPSAnPHRkIGNsYXNzPVwibGVmdExpbmUgdG9wTGluZVwiPjwvdGQ+PHRkIGNsYXNzPVwicmlnaHRMaW5lIHRvcExpbmVcIj48L3RkPic7XG4gICAgICB9XG4gICAgICAkb25lU2libGluZy5wYXJlbnQoKS5wcmV2QWxsKCd0cjpndCgwKScpLmNoaWxkcmVuKCkuYXR0cignY29sc3BhbicsIHNpYmxpbmdDb3VudCAqIDIpXG4gICAgICAgIC5lbmQoKS5uZXh0KCkuY2hpbGRyZW4oJzpmaXJzdCcpLmFmdGVyKGxpbmVzKTtcbiAgICB9LFxuICAgIC8vIGJ1aWxkIHRoZSBzaWJsaW5nIG5vZGVzIG9mIHNwZWNpZmljIG5vZGVcbiAgICBidWlsZFNpYmxpbmdOb2RlOiBmdW5jdGlvbiAoJG5vZGVDaGFydCwgbm9kZURhdGEsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgb3B0cyA9IG9wdHMgfHwgJG5vZGVDaGFydC5jbG9zZXN0KCcub3JnY2hhcnQnKS5kYXRhKCdvcHRpb25zJyk7XG4gICAgICB2YXIgbmV3U2libGluZ0NvdW50ID0gbm9kZURhdGEuc2libGluZ3MgPyBub2RlRGF0YS5zaWJsaW5ncy5sZW5ndGggOiBub2RlRGF0YS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICB2YXIgZXhpc3RpbmdTaWJsaWdDb3VudCA9ICRub2RlQ2hhcnQucGFyZW50KCkuaXMoJ3RkJykgPyAkbm9kZUNoYXJ0LmNsb3Nlc3QoJ3RyJykuY2hpbGRyZW4oKS5sZW5ndGggOiAxO1xuICAgICAgdmFyIHNpYmxpbmdDb3VudCA9IGV4aXN0aW5nU2libGlnQ291bnQgKyBuZXdTaWJsaW5nQ291bnQ7XG4gICAgICB2YXIgaW5zZXJ0UG9zdGlvbiA9IChzaWJsaW5nQ291bnQgPiAxKSA/IE1hdGguZmxvb3Ioc2libGluZ0NvdW50LzIgLSAxKSA6IDA7XG4gICAgICAvLyBqdXN0IGJ1aWxkIHRoZSBzaWJsaW5nIG5vZGVzIGZvciB0aGUgc3BlY2lmaWMgbm9kZVxuICAgICAgaWYgKCRub2RlQ2hhcnQucGFyZW50KCkuaXMoJ3RkJykpIHtcbiAgICAgICAgdmFyICRwYXJlbnQgPSAkbm9kZUNoYXJ0LmNsb3Nlc3QoJ3RyJykucHJldkFsbCgndHI6bGFzdCcpO1xuICAgICAgICAkbm9kZUNoYXJ0LmNsb3Nlc3QoJ3RyJykucHJldkFsbCgndHI6bHQoMiknKS5yZW1vdmUoKTtcbiAgICAgICAgdmFyIGNoaWxkQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmJ1aWxkQ2hpbGROb2RlKCRub2RlQ2hhcnQucGFyZW50KCkuY2xvc2VzdCgndGFibGUnKSwgbm9kZURhdGEsIG9wdHMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgrK2NoaWxkQ291bnQgPT09IG5ld1NpYmxpbmdDb3VudCkge1xuICAgICAgICAgICAgdmFyICRzaWJsaW5nVGRzID0gJG5vZGVDaGFydC5wYXJlbnQoKS5jbG9zZXN0KCd0YWJsZScpLmNoaWxkcmVuKCd0cjpsYXN0JykuY2hpbGRyZW4oJ3RkJyk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdTaWJsaWdDb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgdGhhdC5jb21wbGVtZW50TGluZSgkc2libGluZ1Rkcy5lcSgwKS5iZWZvcmUoJG5vZGVDaGFydC5jbG9zZXN0KCd0ZCcpLnNpYmxpbmdzKCkuYWRkQmFjaygpLnVud3JhcCgpKSwgc2libGluZ0NvdW50LCBleGlzdGluZ1NpYmxpZ0NvdW50KTtcbiAgICAgICAgICAgICAgJHNpYmxpbmdUZHMuYWRkQ2xhc3MoJ2hpZGRlbicpLmZpbmQoJy5ub2RlJykuYWRkQ2xhc3MoJ3NsaWRlLWxlZnQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoYXQuY29tcGxlbWVudExpbmUoJHNpYmxpbmdUZHMuZXEoaW5zZXJ0UG9zdGlvbikuYWZ0ZXIoJG5vZGVDaGFydC5jbG9zZXN0KCd0ZCcpLnVud3JhcCgpKSwgc2libGluZ0NvdW50LCAxKTtcbiAgICAgICAgICAgICAgJHNpYmxpbmdUZHMubm90KCc6ZXEoJyArIGluc2VydFBvc3Rpb24gKyAxICsgJyknKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgaW5zZXJ0UG9zdGlvbikuZmluZCgnLm5vZGUnKS5hZGRDbGFzcygnc2xpZGUtcmlnaHQnKVxuICAgICAgICAgICAgICAgIC5lbmQoKS5lbmQoKS5zbGljZShpbnNlcnRQb3N0aW9uKS5maW5kKCcubm9kZScpLmFkZENsYXNzKCdzbGlkZS1sZWZ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgeyAvLyBidWlsZCB0aGUgc2libGluZyBub2RlcyBhbmQgcGFyZW50IG5vZGUgZm9yIHRoZSBzcGVjaWZpYyBuZG9lXG4gICAgICAgIHZhciBub2RlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmJ1aWxkSGllcmFyY2h5KCRub2RlQ2hhcnQuY2xvc2VzdCgnLm9yZ2NoYXJ0JyksIG5vZGVEYXRhLCAwLCBvcHRzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoKytub2RlQ291bnQgPT09IHNpYmxpbmdDb3VudCkge1xuICAgICAgICAgICAgdGhhdC5jb21wbGVtZW50TGluZSgkbm9kZUNoYXJ0Lm5leHQoKS5jaGlsZHJlbigndHI6bGFzdCcpXG4gICAgICAgICAgICAgIC5jaGlsZHJlbigpLmVxKGluc2VydFBvc3Rpb24pLmFmdGVyKCQoJzx0ZCBjb2xzcGFuPVwiMlwiPicpXG4gICAgICAgICAgICAgIC5hcHBlbmQoJG5vZGVDaGFydCkpLCBzaWJsaW5nQ291bnQsIDEpO1xuICAgICAgICAgICAgJG5vZGVDaGFydC5jbG9zZXN0KCd0cicpLnNpYmxpbmdzKCkuZXEoMCkuYWRkQ2xhc3MoJ2hpZGRlbicpLmZpbmQoJy5ub2RlJykuYWRkQ2xhc3MoJ3NsaWRlLWRvd24nKTtcbiAgICAgICAgICAgICRub2RlQ2hhcnQucGFyZW50KCkuc2libGluZ3MoKS5hZGRDbGFzcygnaGlkZGVuJylcbiAgICAgICAgICAgICAgLnNsaWNlKDAsIGluc2VydFBvc3Rpb24pLmZpbmQoJy5ub2RlJykuYWRkQ2xhc3MoJ3NsaWRlLXJpZ2h0JylcbiAgICAgICAgICAgICAgLmVuZCgpLmVuZCgpLnNsaWNlKGluc2VydFBvc3Rpb24pLmZpbmQoJy5ub2RlJykuYWRkQ2xhc3MoJ3NsaWRlLWxlZnQnKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vXG4gICAgYWRkU2libGluZ3M6IGZ1bmN0aW9uICgkbm9kZSwgZGF0YSwgb3B0cykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhpcy5idWlsZFNpYmxpbmdOb2RlKCRub2RlLmNsb3Nlc3QoJ3RhYmxlJyksIGRhdGEsIG9wdHMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkbm9kZS5jbG9zZXN0KCcubm9kZXMnKS5kYXRhKCdzaWJsaW5nc0xvYWRlZCcsIHRydWUpO1xuICAgICAgICBpZiAoISRub2RlLmNoaWxkcmVuKCcubGVmdEVkZ2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAkbm9kZS5jaGlsZHJlbignLnRvcEVkZ2UnKS5hZnRlcignPGkgY2xhc3M9XCJlZGdlIGhvcml6b250YWxFZGdlIHJpZ2h0RWRnZSBmYVwiPjwvaT48aSBjbGFzcz1cImVkZ2UgaG9yaXpvbnRhbEVkZ2UgbGVmdEVkZ2UgZmFcIj48L2k+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zaG93U2libGluZ3MoJG5vZGUpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICAvL1xuICAgIHJlbW92ZU5vZGVzOiBmdW5jdGlvbiAoJG5vZGUpIHtcbiAgICAgIHZhciAkcGFyZW50ID0gJG5vZGUuY2xvc2VzdCgndGFibGUnKS5wYXJlbnQoKTtcbiAgICAgIHZhciAkc2licyA9ICRwYXJlbnQucGFyZW50KCkuc2libGluZ3MoKTtcbiAgICAgIGlmICgkcGFyZW50LmlzKCd0ZCcpKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5vZGVTdGF0ZSgkbm9kZSwgJ3NpYmxpbmdzJykuZXhpc3QpIHtcbiAgICAgICAgICAkc2licy5lcSgyKS5jaGlsZHJlbignLnRvcExpbmU6bHQoMiknKS5yZW1vdmUoKTtcbiAgICAgICAgICAkc2licy5zbGljZSgwLCAyKS5jaGlsZHJlbigpLmF0dHIoJ2NvbHNwYW4nLCAkc2licy5lcSgyKS5jaGlsZHJlbigpLmxlbmd0aCk7XG4gICAgICAgICAgJHBhcmVudC5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkc2licy5lcSgwKS5jaGlsZHJlbigpLnJlbW92ZUF0dHIoJ2NvbHNwYW4nKVxuICAgICAgICAgICAgLmZpbmQoJy5ib3R0b21FZGdlJykucmVtb3ZlKClcbiAgICAgICAgICAgIC5lbmQoKS5lbmQoKS5zaWJsaW5ncygpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkcGFyZW50LmFkZCgkcGFyZW50LnNpYmxpbmdzKCkpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgLy9cbiAgICBleHBvcnQ6IGZ1bmN0aW9uIChleHBvcnRGaWxlbmFtZSwgZXhwb3J0RmlsZWV4dGVuc2lvbikge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgZXhwb3J0RmlsZW5hbWUgPSAodHlwZW9mIGV4cG9ydEZpbGVuYW1lICE9PSAndW5kZWZpbmVkJykgPyAgZXhwb3J0RmlsZW5hbWUgOiB0aGlzLm9wdGlvbnMuZXhwb3J0RmlsZW5hbWU7XG4gICAgICBleHBvcnRGaWxlZXh0ZW5zaW9uID0gKHR5cGVvZiBleHBvcnRGaWxlZXh0ZW5zaW9uICE9PSAndW5kZWZpbmVkJykgPyAgZXhwb3J0RmlsZWV4dGVuc2lvbiA6IHRoaXMub3B0aW9ucy5leHBvcnRGaWxlZXh0ZW5zaW9uO1xuICAgICAgaWYgKCQodGhpcykuY2hpbGRyZW4oJy5zcGlubmVyJykubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciAkY2hhcnRDb250YWluZXIgPSB0aGlzLiRjaGFydENvbnRhaW5lcjtcbiAgICAgIHZhciAkbWFzayA9ICRjaGFydENvbnRhaW5lci5maW5kKCcubWFzaycpO1xuICAgICAgaWYgKCEkbWFzay5sZW5ndGgpIHtcbiAgICAgICAgJGNoYXJ0Q29udGFpbmVyLmFwcGVuZCgnPGRpdiBjbGFzcz1cIm1hc2tcIj48aSBjbGFzcz1cImZhIGZhLWNpcmNsZS1vLW5vdGNoIGZhLXNwaW4gc3Bpbm5lclwiPjwvaT48L2Rpdj4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRtYXNrLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBzb3VyY2VDaGFydCA9ICRjaGFydENvbnRhaW5lci5hZGRDbGFzcygnY2FudmFzQ29udGFpbmVyJykuZmluZCgnLm9yZ2NoYXJ0Om5vdChcIi5oaWRkZW5cIiknKS5nZXQoMCk7XG4gICAgICB2YXIgZmxhZyA9IHRoYXQub3B0aW9ucy5kaXJlY3Rpb24gPT09ICdsMnInIHx8IHRoYXQub3B0aW9ucy5kaXJlY3Rpb24gPT09ICdyMmwnO1xuICAgICAgaHRtbDJjYW52YXMoc291cmNlQ2hhcnQsIHtcbiAgICAgICAgJ3dpZHRoJzogZmxhZyA/IHNvdXJjZUNoYXJ0LmNsaWVudEhlaWdodCA6IHNvdXJjZUNoYXJ0LmNsaWVudFdpZHRoLFxuICAgICAgICAnaGVpZ2h0JzogZmxhZyA/IHNvdXJjZUNoYXJ0LmNsaWVudFdpZHRoIDogc291cmNlQ2hhcnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAnb25jbG9uZSc6IGZ1bmN0aW9uIChjbG9uZURvYykge1xuICAgICAgICAgICQoY2xvbmVEb2MpLmZpbmQoJy5jYW52YXNDb250YWluZXInKS5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKVxuICAgICAgICAgICAgLmZpbmQoJy5vcmdjaGFydDpub3QoXCIuaGlkZGVuXCIpOmZpcnN0JykuY3NzKCd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdvbnJlbmRlcmVkJzogZnVuY3Rpb24gKGNhbnZhcykge1xuICAgICAgICAgICRjaGFydENvbnRhaW5lci5maW5kKCcubWFzaycpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICBpZiAoZXhwb3J0RmlsZWV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpID09PSAncGRmJykge1xuICAgICAgICAgICAgdmFyIGRvYyA9IHt9O1xuICAgICAgICAgICAgdmFyIGRvY1dpZHRoID0gTWF0aC5mbG9vcihjYW52YXMud2lkdGggKiAwLjI2NDYpO1xuICAgICAgICAgICAgdmFyIGRvY0hlaWdodCA9IE1hdGguZmxvb3IoY2FudmFzLmhlaWdodCAqIDAuMjY0Nik7XG4gICAgICAgICAgICBpZiAoZG9jV2lkdGggPiBkb2NIZWlnaHQpIHtcbiAgICAgICAgICAgICAgZG9jID0gbmV3IGpzUERGKCdsJywgJ21tJywgW2RvY1dpZHRoLCBkb2NIZWlnaHRdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvYyA9IG5ldyBqc1BERigncCcsICdtbScsIFtkb2NIZWlnaHQsIGRvY1dpZHRoXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2MuYWRkSW1hZ2UoY2FudmFzLnRvRGF0YVVSTCgpLCAncG5nJywgMCwgMCk7XG4gICAgICAgICAgICBkb2Muc2F2ZShleHBvcnRGaWxlbmFtZSArICcucGRmJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpc1dlYmtpdCA9ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG4gICAgICAgICAgICB2YXIgaXNGZiA9ICEhd2luZG93LnNpZGViYXI7XG4gICAgICAgICAgICB2YXIgaXNFZGdlID0gbmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInIHx8IChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gXCJOZXRzY2FwZVwiICYmIG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ0VkZ2UnKSA+IC0xKTtcblxuICAgICAgICAgICAgaWYgKCghaXNXZWJraXQgJiYgIWlzRmYpIHx8IGlzRWRnZSkge1xuICAgICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZUJsb2IoY2FudmFzLm1zVG9CbG9iKCksIGV4cG9ydEZpbGVuYW1lICsgJy5wbmcnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9ICcub2MtZG93bmxvYWQtYnRuJyArICh0aGF0Lm9wdGlvbnMuY2hhcnRDbGFzcyAhPT0gJycgPyAnLicgKyB0aGF0Lm9wdGlvbnMuY2hhcnRDbGFzcyA6ICcnKTtcbiAgICAgICAgICAgICAgaWYgKCEkY2hhcnRDb250YWluZXIuZmluZChzZWxlY3RvcikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJGNoYXJ0Q29udGFpbmVyLmFwcGVuZCgnPGEgY2xhc3M9XCJvYy1kb3dubG9hZC1idG4nICsgKHRoYXQub3B0aW9ucy5jaGFydENsYXNzICE9PSAnJyA/ICcgJyArIHRoYXQub3B0aW9ucy5jaGFydENsYXNzIDogJycpICsgJ1wiJ1xuICAgICAgICAgICAgICAgICAgKyAnIGRvd25sb2FkPVwiJyArIGV4cG9ydEZpbGVuYW1lICsgJy5wbmdcIj48L2E+Jyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJGNoYXJ0Q29udGFpbmVyLmZpbmQoc2VsZWN0b3IpLmF0dHIoJ2hyZWYnLCBjYW52YXMudG9EYXRhVVJMKCkpWzBdLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAkY2hhcnRDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NhbnZhc0NvbnRhaW5lcicpO1xuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkY2hhcnRDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NhbnZhc0NvbnRhaW5lcicpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gICQuZm4ub3JnY2hhcnQgPSBmdW5jdGlvbiAob3B0cykge1xuICAgIHJldHVybiBuZXcgT3JnQ2hhcnQodGhpcywgb3B0cykuaW5pdCgpO1xuICB9O1xuXG59KSk7XG4iXX0=


/***/ }),

/***/ "./node_modules/orgchart/node_modules/jquery/dist/jquery.js":
/*!******************************************************************!*\
  !*** ./node_modules/orgchart/node_modules/jquery/dist/jquery.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./src/app/routes/estrutura/empresas/empresas.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/empresas.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading d-flex\">\r\n  <div class=\"mr-auto\">\r\n    Empresas\r\n  </div>\r\n  <div>\r\n    <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"incluirEmpresa()\">\r\n      <i class=\"fa fa-plus-square\"></i>\r\n      Incluir\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<!-- START card-->\r\n<section>\r\n  <div class=\"card border-dark radius-top-only mb-0\">\r\n    <div class=\"card-header bg-dark text-white radius-top-only\">\r\n      <h5 class=\"mb-0 pb-1 pt-1\">\r\n        <i class=\"fas fa-search\"></i>\r\n        &nbsp;\r\n        Buscar Empresa\r\n      </h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"card rounded-0 border-grey\">\r\n    <div class=\"card-body\">\r\n      <form [formGroup]=\"formEmpresa\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n        <fieldset>\r\n          <!--Spinner-->\r\n          <ngx-spinner bdColor = \"rgba(245,238,238,0.8)\"\r\n                       size = \"default\"\r\n                       color = \"#00f2f2\"\r\n                       type = \"ball-clip-rotate\">\r\n          </ngx-spinner>\r\n          <!--Empresa e Sigla-->\r\n          <div class=\"row\">\r\n            <div class=\"form-group col-md-8\">\r\n              <label class=\"col-form-label text-left\">Empresa</label>\r\n              <input class=\"form-control\" type=\"text\" formControlName=\"nmEmpresa\" autofocus=\"autofocus\" placeholder=\"Informe um nome ou parte dele\"/>\r\n            </div>\r\n            <div class=\"form-group col-md-4\">\r\n                <label class=\"col-form-label text-left\">Sigla</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nmSigla\" placeholder=\"ABC, XYZ\"/>\r\n              </div>\r\n          </div>\r\n          <!--Tipo Empresa e Situação-->\r\n          <div class=\"row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"col-form-label text-left\">Tipo Empresa</label>\r\n                <ngx-select [allowClear]=\"false\"\r\n                            [items]=\"itemsTipoEmpresa\"\r\n                            [disabled]=\"false\"\r\n                            [(ngModel)]=\"ngxTipoEmpresa\"\r\n                            optionValueField=\"id\" optionTextField=\"tipo\"\r\n                            [ngModelOptions]=\"{standalone: true}\">\r\n                </ngx-select>\r\n                <input type=\"hidden\" formControlName=\"tipoEmpresa\" name=\"tipoEmpresa\" [(ngModel)]=\"ngxTipoEmpresa\">\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"col-form-label text-left\">Situação</label>\r\n                <ngx-select [allowClear]=\"false\"\r\n                            [items]=\"itemsSituacao\"\r\n                            [disabled]=\"false\"\r\n                            [(ngModel)]=\"ngxSituacao\"\r\n                            optionValueField=\"id\" optionTextField=\"situacao\"\r\n                            [ngModelOptions]=\"{standalone: true}\">\r\n                </ngx-select>\r\n                <input type=\"hidden\" formControlName=\"flAtivo\" name=\"flAtivo\" [(ngModel)]=\"ngxSituacao\">\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n        <!--Botões-->\r\n        <fieldset>\r\n        <div class=\"panel-footer text-right\">\r\n            <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"limpar()\">Limpar</button>\r\n            <button style=\"margin: 0 5px;\" type=\"submit\" class=\"btn btn-primary\" (click)=\"pesquisar()\">Pesquisar</button>\r\n        </div>\r\n      </fieldset>\r\n      </form>\r\n\r\n      <!--Tabela de Empresas-->\r\n      <div class=\"card mb-0 border-dark radius-top-only\">\r\n        <div class=\"card-header bg-dark text-white radius-top-only\">\r\n          <h5 class=\"mb-0 pb-1 pt-1\">\r\n            <i class=\"fa fa-table\"></i>\r\n            &nbsp;\r\n            Empresas\r\n          </h5>\r\n        </div>\r\n      </div>\r\n      <div class=\"card rounded-0 border-grey\">\r\n        <div class=\"table-responsive\">\r\n          <table class=\"table table-striped\">\r\n            <thead>\r\n                <tr>\r\n                  <th *ngFor=\"let head of headElements; let i = index\" scope=\"col\">\r\n                    {{head}}\r\n                  </th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let i = index; let empresa of empresas | paginate: { itemsPerPage: 10, currentPage: p }\">\r\n                <td>{{empresa.nmEmpresa}}</td>\r\n                <td>{{empresa.nmSigla}}</td>\r\n                <td>{{empresa.tipoEmpresa}}</td>\r\n                <td>{{empresa.flAtivo == true ? 'Ativa' : 'Inativa'}}</td>\r\n                <td>\r\n                  <div class=\"d-flex flex-row-reverse\">\r\n                    <button style=\"margin: 0 0px;\" type=\"button\" class=\"btn btn-info fa fa-edit\" (click)=\"editar(empresa)\"></button>\r\n                  </div>\r\n                </td>\r\n                <td>\r\n                  <div class=\"d-flex\">\r\n                    <label class=\"switch switch-lg m-0\">\r\n                      <input type=\"checkbox\" [checked]=\"empresa.flAtivo\" (click)=\"inativar(empresa, i, $event)\"/>\r\n                      <span></span>\r\n                    </label>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <div *ngIf=\"empresas.length==0\">\r\n            <div class=\"alert alert-light\" role=\"alert\">\r\n              Nenhum registro encontrado.\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"mx-auto w-50 text-center\" *ngIf=\"empresas.length>0\">\r\n          <pagination-controls previousLabel=\"Anterior\" nextLabel=\"Próximo\" (pageChange)=\"p = $event\"></pagination-controls>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/routes/estrutura/empresas/empresas.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/empresas.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-tabset:not(.disable-style) {\n  list-style: none;\n  padding: 0;\n  display: flex;\n  align-items: center; }\n  .nav-tabset:not(.disable-style) .nav-tab {\n    padding: 10px;\n    border-bottom: solid 1px transparent;\n    transition: border 200ms ease-out; }\n  .nav-tabset:not(.disable-style) .nav-tab.active {\n      border-color: red; }\n  .nav-tabset:not(.disable-style) .nav-tab.disabled {\n      opacity: 0.5; }\n  .nav-tabset:not(.disable-style) .nav-tab:not(.active):not(.disabled) {\n      cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcm91dGVzL2VzdHJ1dHVyYS9lbXByZXNhcy9DOlxcQW1iaWVudGVcXFdvcmtzcGFjZVxcZnJvbnRcXEdPVkMtNTgyLU5pdmVsXFxnb3ZjLWF3cy13ZWIvbm9kZV9tb2R1bGVzXFxuZ3gtdGFic2V0XFxuZ3gtdGFic2V0LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUE7RUFDRSxpQkFBZ0I7RUFDaEIsV0FBVTtFQUNWLGNBQWE7RUFDYixvQkFBbUIsRUFtQnBCO0VBdkJEO0lBT0ksY0FYa0I7SUFZbEIscUNBZnNDO0lBZ0J0QyxrQ0FkNEMsRUEyQjdDO0VBdEJIO01BWU0sa0JBcEJnQixFQXFCakI7RUFiTDtNQWdCTSxhQW5CbUIsRUFvQnBCO0VBakJMO01Bb0JNLGdCQXRCYyxFQXVCZiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlcy9lc3RydXR1cmEvZW1wcmVzYXMvZW1wcmVzYXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYWN0aXZlLXRhYi1jb2xvcjogcmVkICFkZWZhdWx0O1xuJGRlZmF1bHQtdGFiLWJvcmRlcjogc29saWQgMXB4IHRyYW5zcGFyZW50ICFkZWZhdWx0O1xuJHRhYi1ib3JkZXItdHJhbnNpdGlvbi1kdXJhdGlvbjogMjAwbXMgIWRlZmF1bHQ7XG4kdGFiLWJvcmRlci10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQgIWRlZmF1bHQ7XG4kbmF2LXRhYi1wYWRkaW5nOiAxMHB4ICFkZWZhdWx0O1xuJGRpc2FibGVkLXRhYi1vcGFjaXR5OiAuNSAhZGVmYXVsdDtcbiR0YWItY3Vyc29yOiBwb2ludGVyICFkZWZhdWx0O1xuXG4ubmF2LXRhYnNldDpub3QoLmRpc2FibGUtc3R5bGUpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAubmF2LXRhYiB7XG4gICAgcGFkZGluZzogJG5hdi10YWItcGFkZGluZztcbiAgICBib3JkZXItYm90dG9tOiAkZGVmYXVsdC10YWItYm9yZGVyO1xuICAgIHRyYW5zaXRpb246IGJvcmRlciAkdGFiLWJvcmRlci10cmFuc2l0aW9uLWR1cmF0aW9uICR0YWItYm9yZGVyLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uO1xuXG4gICAgJi5hY3RpdmUge1xuICAgICAgYm9yZGVyLWNvbG9yOiAkYWN0aXZlLXRhYi1jb2xvcjtcbiAgICB9XG5cbiAgICAmLmRpc2FibGVkIHtcbiAgICAgIG9wYWNpdHk6ICRkaXNhYmxlZC10YWItb3BhY2l0eTtcbiAgICB9XG5cbiAgICAmOm5vdCguYWN0aXZlKTpub3QoLmRpc2FibGVkKSB7XG4gICAgICBjdXJzb3I6ICR0YWItY3Vyc29yO1xuICAgIH1cbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/routes/estrutura/empresas/empresas.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/empresas.component.ts ***!
  \*****************************************************************/
/*! exports provided: EmpresasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmpresasComponent", function() { return EmpresasComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var swal = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
var EmpresasComponent = /** @class */ (function () {
    function EmpresasComponent(fb, router, spinner, empresaService) {
        this.fb = fb;
        this.router = router;
        this.spinner = spinner;
        this.empresaService = empresaService;
        this.empresas = [];
        this.ngxTipoEmpresa = 'TODAS';
        this.ngxSituacao = 'TODAS';
        this.itemsTipoEmpresa = [{ 'id': 'TODAS', 'tipo': 'Todas' },
            { 'id': 'HOLDING', 'tipo': 'Holding' },
            { 'id': 'OPERACIONALHOLDING', 'tipo': 'Operacional/Holding' },
            { 'id': 'OPERACIONAL', 'tipo': 'Operacional' }];
        this.itemsSituacao = [{ 'id': 'TODAS', 'situacao': 'Todas' },
            { 'id': 'ATIVA', 'situacao': 'Ativa' },
            { 'id': 'INATIVA', 'situacao': 'Inativa' }];
        this.headElements = ['Empresa', 'Sigla', 'Tipo Empresa', 'Situação', '', ''];
        this.spinner.show();
        this._createForm();
        this.spinner.hide();
    }
    EmpresasComponent.prototype._createForm = function () {
        this.formEmpresa = this.fb
            .group({
            cdEmpresa: [null],
            nmEmpresa: [null],
            nmSigla: [null],
            tipoEmpresa: [null],
            flAtivo: [null]
        });
    };
    EmpresasComponent.prototype.limpar = function () {
        this._createForm();
        this.ngxTipoEmpresa = 'TODAS';
        this.ngxSituacao = 'TODAS';
    };
    EmpresasComponent.prototype.pesquisar = function () {
        var _this = this;
        this.spinner.show();
        this.empresas = [];
        if (this.formEmpresa.value.nmEmpresa == '') {
            this.formEmpresa.value.nmEmpresa = null;
        }
        if (this.formEmpresa.value.nmSigla == '') {
            this.formEmpresa.value.nmSigla = null;
        }
        if (this.formEmpresa.value.tipoEmpresa == '') {
            this.formEmpresa.value.tipoEmpresa = null;
        }
        this.empresaService.allByEmpresas(this.formEmpresa.value.nmEmpresa, this.formEmpresa.value.nmSigla, this.formEmpresa.value.tipoEmpresa, this.formEmpresa.value.flAtivo)
            .subscribe(function (empresas) {
            if (empresas != null) {
                for (var _i = 0, empresas_1 = empresas; _i < empresas_1.length; _i++) {
                    var empresa = empresas_1[_i];
                    _this.empresas.push(empresa.empresa);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    EmpresasComponent.prototype.ngOnInit = function () {
        this.spinner.show();
        this.spinner.hide();
    };
    EmpresasComponent.prototype.incluirEmpresa = function () {
        this.router.navigate(['empresas-incluir', 0, false]);
    };
    EmpresasComponent.prototype.editar = function (editarEmpresa) {
        this.router.navigate(['empresas-incluir', editarEmpresa.cdEmpresa, false]);
    };
    EmpresasComponent.prototype.inativar = function (inativarEmpresa, indexEmpresa, event) {
        var _this = this;
        this.title = inativarEmpresa.flAtivo == false ? 'Deseja reativar a empresa?' : 'Deseja realmente inativar a empresa?';
        swal.fire({
            title: this.title,
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: '#F90808',
            cancelButtonClass: "btn btn-danger",
            cancelButtonText: 'Não',
            confirmButtonColor: '#23AB16',
            confirmButtonClass: "btn btn-success",
            confirmButtonText: 'Sim',
            closeOnConfirm: true,
            closeOnCancel: true
        }).then(function (result) {
            if (result.value) {
                _this.spinner.show();
                inativarEmpresa.flAtivo = event.target.checked;
                _this.empresaService.save(inativarEmpresa)
                    .subscribe(function (result) {
                    _this.spinner.hide();
                }, function (error) { return console.log(error); });
            }
            else {
                event.target.checked = inativarEmpresa.flAtivo;
            }
        });
    };
    EmpresasComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-empresas-component',
            template: __webpack_require__(/*! ./empresas.component.html */ "./src/app/routes/estrutura/empresas/empresas.component.html"),
            styles: [__webpack_require__(/*! ./empresas.component.scss */ "./src/app/routes/estrutura/empresas/empresas.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_4__["EmpresaService"]])
    ], EmpresasComponent);
    return EmpresasComponent;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/estrutura.module.ts":
/*!******************************************************!*\
  !*** ./src/app/routes/estrutura/estrutura.module.ts ***!
  \******************************************************/
/*! exports provided: EstruturaModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstruturaModule", function() { return EstruturaModule; });
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/fesm5/ngx-mask.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ag-grid-angular/main */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngx_select_ex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-select-ex */ "./node_modules/ngx-select-ex/esm5/ngx-select-ex.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ngx_filter_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-filter-pipe */ "./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js");
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ "./node_modules/ng2-search-filter/ng2-search-filter.es5.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _empresas_empresas_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./empresas/empresas.component */ "./src/app/routes/estrutura/empresas/empresas.component.ts");
/* harmony import */ var _organogramaEmpresas_organograma_empresa_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./organogramaEmpresas/organograma.empresa.component */ "./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.ts");
/* harmony import */ var _niveis_niveis_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./niveis/niveis.component */ "./src/app/routes/estrutura/niveis/niveis.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    { path: 'empresas', component: _empresas_empresas_component__WEBPACK_IMPORTED_MODULE_10__["EmpresasComponent"] },
    { path: 'organogramaEmpresas/:cdEmpresaNivel/:carregarOrganogramaNivel', component: _organogramaEmpresas_organograma_empresa_component__WEBPACK_IMPORTED_MODULE_11__["OrganogramaEmpresaComponent"] },
    { path: 'niveis', component: _niveis_niveis_component__WEBPACK_IMPORTED_MODULE_12__["NiveisComponent"] }
];
var EstruturaModule = /** @class */ (function () {
    function EstruturaModule() {
    }
    EstruturaModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                ngx_select_ex__WEBPACK_IMPORTED_MODULE_4__["NgxSelectModule"],
                ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_3__["AgGridModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_6__["NgxPaginationModule"],
                ngx_filter_pipe__WEBPACK_IMPORTED_MODULE_7__["FilterPipeModule"],
                ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__["Ng2SearchPipeModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_0__["NgxMaskModule"].forRoot()
            ],
            declarations: [
                _empresas_empresas_component__WEBPACK_IMPORTED_MODULE_10__["EmpresasComponent"],
                _organogramaEmpresas_organograma_empresa_component__WEBPACK_IMPORTED_MODULE_11__["OrganogramaEmpresaComponent"],
                _niveis_niveis_component__WEBPACK_IMPORTED_MODULE_12__["NiveisComponent"]
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ]
        })
    ], EstruturaModule);
    return EstruturaModule;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/niveis/niveis.component.html":
/*!***************************************************************!*\
  !*** ./src/app/routes/estrutura/niveis/niveis.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"content-heading d-flex\">\r\n  <div class=\"mr-auto\">\r\n      Níveis\r\n  </div>\r\n  <div>\r\n    <!--Botão incluir Nivel-->\r\n    <button type=\"button\" class=\"btn btn-outline-primary\">\r\n      <i class=\"fa fa-plus-square\"></i>\r\n      Incluir\r\n    </button>\r\n  </div>\r\n</div>\r\n\r\n<section>  \r\n  <div class=\"card border-dark radius-top-only mb-0\">\r\n    <div class=\"card-header bg-dark text-white radius-top-only\">\r\n      <h5 class=\"mb-0 pb-1 pt-1\">\r\n        <i class=\"fas fa-search\"></i>\r\n        &nbsp;\r\n        Buscar Nível\r\n      </h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"card rounded-0 border-grey\">\r\n    <div class=\"card-body\">\r\n      <form [formGroup]=\"formNiveis\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n        <fieldset>\r\n          <!--Spinner-->\r\n          <ngx-spinner bdColor = \"rgba(245,238,238,0.8)\"\r\n                        size = \"default\"\r\n                        color = \"#00f2f2\"\r\n                        type = \"ball-clip-rotate\">\r\n          </ngx-spinner>\r\n\r\n          <!--Empresa-->\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <label class=\"col-form-label text-left\">Empresa*</label>\r\n                <ngx-select [allowClear]=\"true\"\r\n                            [(items)]=\"empresas\"\r\n                            [disabled]=\"false\"\r\n                            [(ngModel)]=\"ngxValueEmpresa\"\r\n                            [ngModelOptions]=\"{standalone: true}\"\r\n                            optionValueField=\"cdEmpresa\" optionTextField=\"nmEmpresa\"\r\n                            (remove)=\"removerEmpresa()\"\r\n                            (keyup)=\"onKeyUp($event)\"\r\n                            placeholder=\"Digite o nome da empresa\">\r\n                </ngx-select>\r\n                <ng-template ngx-select-option-not-found>\r\n                  Empresa não encontrada!\r\n                </ng-template>\r\n                <input type=\"hidden\" formControlName=\"cdEmpresa\" name=\"cdEmpresa\" [(ngModel)]=\"ngxValueEmpresa\">\r\n            </div>\r\n          </div>\r\n          <!--Situacao-->\r\n          <div class=\"row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"col-form-label text-left\">Situação</label>\r\n                <ngx-select [allowClear]=\"false\"\r\n                            [items]=\"itemsSituacao\"\r\n                            [disabled]=\"false\"\r\n                            [(ngModel)]=\"ngxSituacao\"\r\n                            optionValueField=\"id\" optionTextField=\"situacao\"\r\n                            [ngModelOptions]=\"{standalone: true}\">\r\n                </ngx-select>    \r\n                <input type=\"hidden\" formControlName=\"flAtivo\" name=\"flAtivo\" [(ngModel)]=\"ngxSituacao\">\r\n            </div>         \r\n          </div>   \r\n          <!--Data Vigencia-->\r\n          <div class=\"row\">\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"col-form-label text-left\">Vigência Inicial*</label>\r\n              <input class=\"form-control\" type=\"date\" (change)=\"carregarDataInicioVigencia()\" formControlName=\"dtVigenciaInicio\" [formControl]=\"formNiveis.controls['dtVigenciaInicio']\"/>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formNiveis.controls['dtVigenciaInicio'].invalid && (formNiveis.controls['dtVigenciaInicio'].dirty || formNiveis.controls['dtVigenciaInicio'].touched)\">\r\n                Digite uma data válida.\r\n              </span>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formNiveis.controls['dtVigenciaInicio'].hasError('dataInvalida') && (formNiveis.controls['dtVigenciaInicio'].dirty || formNiveis.controls['dtVigenciaInicio'].touched)\">\r\n                Data deve ser maior ou igual a 01/01/2000.\r\n              </span>\r\n            </div>\r\n            <div class=\"form-group col-md-6\">\r\n              <label class=\"col-form-label text-right\">Até</label>\r\n              <input class=\"form-control\" type=\"date\" [min]=\"dataMinima\" (change)=\"carregarDataFimVigencia()\" formControlName=\"dtVigenciaFim\" [formControl]=\"formNiveis.controls['dtVigenciaFim']\"/>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formNiveis.controls['dtVigenciaFim'].hasError('dateValidator') && (formNiveis.controls['dtVigenciaFim'].dirty || formNiveis.controls['dtVigenciaFim'].touched)\">\r\n                Digite uma data válida.\r\n              </span>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formNiveis.hasError('dataInicioMaior') && !formNiveis.controls['dtVigenciaFim'].hasError('dataInvalida')\">\r\n                Data fim menor que a data de início.\r\n              </span>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formNiveis.controls['dtVigenciaFim'].hasError('dataInvalida') && (formNiveis.controls['dtVigenciaFim'].dirty || formNiveis.controls['dtVigenciaFim'].touched)\">\r\n                Data deve ser maior ou igual a 01/01/2000.\r\n              </span>\r\n            </div>\r\n          </div>       \r\n        </fieldset>\r\n        <!--Botões-->\r\n        <fieldset>\r\n          <div class=\"panel-footer text-right\">\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"limpar()\">Limpar</button>\r\n              <button style=\"margin: 0 5px;\" type=\"submit\" class=\"btn btn-primary\" [disabled]=\"formNiveis.invalid\" (click)=\"pesquisar()\">Pesquisar</button>\r\n          </div>\r\n          <div class=\"panel-footer text-right\"> \r\n            <span class=\"text-danger\" *ngIf=\"formNiveis.invalid\">*Preencher todos os campos obrigatórios.</span>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n      <!--Tabela de Niveis-->\r\n      <div class=\"card mb-0 border-dark radius-top-only\">\r\n        <div class=\"card-header bg-dark text-white radius-top-only\">\r\n          <h5 class=\"mb-0 pb-1 pt-1\">\r\n            <i class=\"fa fa-table\"></i>\r\n            &nbsp;\r\n            Níveis\r\n          </h5>\r\n        </div>\r\n      </div>     \r\n      <div class=\"card rounded-0 border-grey\">\r\n        <!--Pesquisa Niveis-->\r\n        <form [formGroup]=\"formPesquisaNivel\" class=\"form-horizontal\">\r\n          <div class=\"form-group input-group\">\r\n            <div class=\"input-group-text\"><i class=\"fa fa-search\"></i></div>\r\n            <input formControlName=\"pesquisaNivel\" [(ngModel)]=\"nivelFilter.nivel\" [readonly]=\"niveis.length==0\" placeholder=\"Pesquisa por niveis.\" type=\"text\" class=\"form-control\">\r\n          </div>\r\n        </form>     \r\n        <div class=\"table-responsive\">\r\n          <table class=\"table table-striped\">\r\n            <thead>\r\n                <tr>\r\n                  <th *ngFor=\"let head of headElements; let i = index\" scope=\"col\">\r\n                    {{head}}\r\n                  </th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>                  \r\n              <tr *ngFor=\"let i = index; let nivel of niveis | filterBy: nivelFilter | paginate: { itemsPerPage: 10, currentPage: p }\">\r\n                <td>{{nivel.nivel}}</td>   \r\n                <td>{{nivel.dtVigenciaInicio | date:'dd/MM/yyyy'}}</td>\r\n                <td>{{nivel.dtVigenciaFim | date:'dd/MM/yyyy'}}</td>   \r\n                <td>\r\n                  <div class=\"d-flex flex-row-reverse\">\r\n                    <button style=\"margin: 0 0px;\" type=\"button\" class=\"btn btn-info fa fa-edit\" (click)=\"editar(nivel)\"></button>\r\n                  </div>\r\n                </td>           \r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <div *ngIf=\"niveis.length==0 || (niveis | filterBy: nivelFilter).length == 0\">\r\n            <div class=\"alert alert-light\" role=\"alert\">\r\n              Nenhum registro encontrado.\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"mx-auto w-50 text-center\" *ngIf=\"niveis.length>0\">\r\n          <pagination-controls previousLabel=\"Anterior\" nextLabel=\"Próximo\" (pageChange)=\"p = $event\"></pagination-controls>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>"

/***/ }),

/***/ "./src/app/routes/estrutura/niveis/niveis.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/routes/estrutura/niveis/niveis.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlcy9lc3RydXR1cmEvbml2ZWlzL25pdmVpcy5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/routes/estrutura/niveis/niveis.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/routes/estrutura/niveis/niveis.component.ts ***!
  \*************************************************************/
/*! exports provided: NiveisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NiveisComponent", function() { return NiveisComponent; });
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
/* harmony import */ var _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/validators/dateRange.validator */ "./src/app/shared/validators/dateRange.validator.ts");
/* harmony import */ var _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/validators/date.validator */ "./src/app/shared/validators/date.validator.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/estrutura/nivel.service */ "./src/app/service/estrutura/nivel.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NiveisComponent = /** @class */ (function () {
    function NiveisComponent(spinner, router, fb, empresaService, nivelService) {
        this.spinner = spinner;
        this.router = router;
        this.fb = fb;
        this.empresaService = empresaService;
        this.nivelService = nivelService;
        this.empresas = [];
        this.niveis = [];
        this.itemsSituacao = [{ 'id': true, 'situacao': 'Ativa' },
            { 'id': false, 'situacao': 'Inativa' }];
        this.nivelFilter = [];
        this.headElements = ['Nível', 'Início', 'Fim', '', ''];
        this.ngxSituacao = true;
        this.value = null;
        this.dtInicio = new Date();
        this.dtFim = new Date();
        this.createForm();
    }
    NiveisComponent.prototype.ngOnInit = function () {
        this.dataMinima = new Date().toISOString().substr(0, 10).toString();
    };
    NiveisComponent.prototype.createForm = function () {
        this.carregarData = new Date().toISOString().substr(0, 10).toString();
        this.formNiveis = this.fb
            .group({
            cdEmpresa: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            flAtivo: [null],
            dtVigenciaInicio: [this.carregarData, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_2__["DateValidator"].dateValidator, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_2__["DateValidator"].dataInvalida])],
            dtVigenciaFim: [this.carregarData, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_2__["DateValidator"].dateValidator, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_2__["DateValidator"].dataInvalida])],
        }, { validator: _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_1__["DateRangeValidator"].dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
        this.formPesquisaNivel = this.fb
            .group({ pesquisaNivel: [null] });
    };
    NiveisComponent.prototype.carregarDataInicioVigencia = function () {
        this.dataMinima = this.formNiveis.value.dtVigenciaInicio;
        this.carregarDatas();
    };
    NiveisComponent.prototype.carregarDataFimVigencia = function () {
        this.carregarDatas();
    };
    NiveisComponent.prototype.carregarDatas = function () {
        this.dtFim = new Date(this.formNiveis.value.dtVigenciaFim);
        this.dtInicio = new Date(this.formNiveis.value.dtVigenciaInicio);
    };
    NiveisComponent.prototype.limpar = function () {
        this.createForm();
        this.ngxSituacao = true;
        this.ngxValueEmpresa = 0;
        this.dataMinima = new Date().toISOString().substr(0, 10);
    };
    NiveisComponent.prototype.removerEmpresa = function () {
        this.empresas = [];
        this.ngxValueEmpresa = 0;
        this.formNiveis.patchValue({
            nmEmpresa: null
        });
    };
    NiveisComponent.prototype.onKeyUp = function (event) {
        var _this = this;
        this.value = event.target.value;
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (_this.value.length > 0) {
                    _this.findByName(_this.value);
                }
                else {
                    _this.empresas = [];
                }
            }, 2000);
        });
    };
    NiveisComponent.prototype.findByName = function (nmEmpresa) {
        var _this = this;
        this.spinner.show();
        this.empresaService.findByName(nmEmpresa)
            .subscribe(function (empresas) {
            if (empresas != null) {
                _this.empresas = [];
                for (var _i = 0, empresas_1 = empresas; _i < empresas_1.length; _i++) {
                    var empresa = empresas_1[_i];
                    _this.empresas.push(empresa.empresa);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    NiveisComponent.prototype.pesquisar = function () {
        var _this = this;
        this.spinner.show();
        this.niveis = [];
        if (this.formNiveis.value.dtVigenciaFim == '') {
            this.formNiveis.value.dtVigenciaFim = null;
        }
        this.nivelService.findNivelByEmpresa(this.formNiveis.value.cdEmpresa, this.formNiveis.value.flAtivo, this.formNiveis.value.dtVigenciaInicio, this.formNiveis.value.dtVigenciaFim)
            .subscribe(function (niveis) {
            if (niveis != null) {
                for (var _i = 0, niveis_1 = niveis; _i < niveis_1.length; _i++) {
                    var nivel = niveis_1[_i];
                    _this.niveis.push(nivel);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
        this.formPesquisaNivel.patchValue({
            pesquisaNivel: null,
        });
    };
    NiveisComponent.prototype.editar = function (niveis) {
        this.router.navigate(['niveis-incluir', niveis.cdNivel]);
    };
    NiveisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"])({
            selector: 'app-niveis-component',
            template: __webpack_require__(/*! ./niveis.component.html */ "./src/app/routes/estrutura/niveis/niveis.component.html"),
            styles: [__webpack_require__(/*! ./niveis.component.scss */ "./src/app/routes/estrutura/niveis/niveis.component.scss")]
        }),
        __metadata("design:paramtypes", [ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_0__["EmpresaService"],
            _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_6__["NivelService"]])
    ], NiveisComponent);
    return NiveisComponent;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"content-heading\">\r\n  <div *ngIf=\"!habilitarOrgNivel\">\r\n    <div>Organograma de Empresas</div>\r\n  </div>  \r\n  <div *ngIf=\"habilitarOrgNivel\">\r\n    <div>Organograma de Niveis</div>\r\n  </div>  \r\n</div>\r\n<form [formGroup]=\"formOrganograma\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-2\">\r\n        <div class=\"panel-footer text-left\">\r\n          <legend>\r\n            <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-info\" (click)=\"zoomOut()\"><i class=\"fa fa-plus-square\"></i></button>\r\n            <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-info\" (click)=\"zoomMin()\"><i class=\"fa fa-minus-square\"></i></button>    \r\n          </legend>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-6\">\r\n        <div class=\"form-group input-group\">\r\n          <input class=\"form-control\"  type=\"text\" autofocus=\"autofocus\" formControlName=\"pesquisaOrganograma\" placeholder=\"Digite para efetuar a busca!\"/>                                  \r\n          <button class=\"btn btn-info\" type=\"submit\" (click)=\"pesquisaOrganograma()\" [disabled]=\"formOrganograma.invalid\">\r\n            <i class=\"fa fa-search\"></i>\r\n          </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-4\">\r\n        <div class=\"panel-footer text-right\">\r\n          <legend>\r\n            <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-info\" (click)=\"expandirOrganograma()\">Expandir Todos</button>\r\n            <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-info\" (click)=\"recolherOrganograma()\">Recolher Todos</button>    \r\n          </legend>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"habilitarOrgNivel\">\r\n    <div class=\"panel-footer text-right\">\r\n      <legend>\r\n        <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-info\" (click)=\"voltarOrganograma()\">Voltar Org. Empresa</button>\r\n      </legend>\r\n    </div>\r\n  </div> \r\n</form>\r\n\r\n<div id=\"chart-container\" (click)=\"abrirOrganogramaNivel()\"></div>\r\n\r\n"

/***/ }),

/***/ "./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.scss":
/*!*****************************************************************************************!*\
  !*** ./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlcy9lc3RydXR1cmEvb3JnYW5vZ3JhbWFFbXByZXNhcy9vcmdhbm9ncmFtYS5lbXByZXNhLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.ts ***!
  \***************************************************************************************/
/*! exports provided: OrganogramaEmpresaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganogramaEmpresaComponent", function() { return OrganogramaEmpresaComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/estrutura/nivel.service */ "./src/app/service/estrutura/nivel.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var swal = __webpack_require__(/*! sweetalert */ "./node_modules/sweetalert/lib/sweetalert.js");
__webpack_require__(/*! orgchart */ "./node_modules/orgchart/dist/js/jquery.orgchart.min.js");
var OrganogramaEmpresaComponent = /** @class */ (function () {
    function OrganogramaEmpresaComponent(fb, router, route, empresaService, nivelService, spinner) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.empresaService = empresaService;
        this.nivelService = nivelService;
        this.spinner = spinner;
        this.cdEmpresa = 1;
        this.empresaNiveis = [];
        this.organogramaNiveis = [];
        this.tree = [];
        this.childrenOf = {};
        this.childrenOfNivel = {};
        this.zoomval = .8;
        this.habilitarOrgNivel = false;
        this.carregarOrganogramaNivel = false;
    }
    OrganogramaEmpresaComponent.prototype.createFormOrganograma = function () {
        this.spinner.show();
        this.formOrganograma = this.fb
            .group({
            pesquisaOrganograma: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]
        });
        this.spinner.hide();
    };
    OrganogramaEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.cdEmpresaNivel = params['cdEmpresaNivel'];
            _this.carregarOrganogramaNivel = JSON.parse(params['carregarOrganogramaNivel']);
        });
        this.createFormOrganograma();
        this.empresaService.findEmpresasFilhaByEmpresaPaiWithLevels(this.cdEmpresa)
            .subscribe(function (empresaNiveis) {
            _this.spinner.show();
            if (empresaNiveis != null) {
                for (var _i = 0, empresaNiveis_1 = empresaNiveis; _i < empresaNiveis_1.length; _i++) {
                    var empresaNivel = empresaNiveis_1[_i];
                    _this.empresaNiveis.push(empresaNivel);
                }
                for (_this.index = 0, length = _this.empresaNiveis.length; _this.index < length; _this.index++) {
                    _this.item = _this.empresaNiveis[_this.index];
                    _this.id = _this.item["id"];
                    _this.parentId = _this.item["children"] || 0;
                    _this.childrenOf[_this.id] = _this.childrenOf[_this.id] || [];
                    _this.item["children"] = _this.childrenOf[_this.id];
                    if (_this.parentId != 0) {
                        _this.childrenOf[_this.parentId] = _this.childrenOf[_this.parentId] || [];
                        _this.childrenOf[_this.parentId].push(_this.item);
                    }
                    else {
                        _this.tree.push(_this.item);
                    }
                }
                _this.jsonOrganograma = JSON.stringify(_this.childrenOf[1]);
                _this.jsonOrganograma = _this.jsonOrganograma.substring(1, _this.jsonOrganograma.length - 1);
                _this.datasource = _this.jsonOrganograma;
                _this.datasourceEmpresa = _this.jsonOrganograma;
                _this.loadOrgChartEmpresa();
                if (_this.carregarOrganogramaNivel) {
                    _this.habilitarOrgNivel = true;
                    _this.organogramaNivel(_this.cdEmpresaNivel);
                    _this.abrirOrganogramaNivel();
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    OrganogramaEmpresaComponent.prototype.loadOrgChartEmpresa = function () {
        this.oc = $('#chart-container').orgchart({
            'data': JSON.parse(this.datasource),
            'nodeContent': 'title',
            'direction': 'l2r',
            'pan': true,
            'zoom': true
        });
        this.recolherOrganograma();
        this.scaleZoom();
        //$('.orgchart').css('overflow','scroll');
    };
    OrganogramaEmpresaComponent.prototype.recolherOrganograma = function () {
        this.oc.hideChildren(this.oc.$chart.find('.node:first'));
        $('.orgchart').css('transform', '');
        this.currentZoom = 1;
        this.createFormOrganograma();
    };
    OrganogramaEmpresaComponent.prototype.expandirOrganograma = function () {
        this.cancelarPesquisa();
        var $temp = this.oc.$chart.find('.hidden')
            .removeClass('hidden');
        if ($temp.length > 0) {
            $temp[0].offsetWidth;
            $temp.find(".slide-up, .slide-left, .slide-right")
                .removeClass("slide-up slide-right slide-left");
        }
        this.createFormOrganograma();
    };
    OrganogramaEmpresaComponent.prototype.zoomMin = function () {
        this.zoomval = this.currentZoom -= 0.1;
        this.$chart.css('transform', this.div + " scale(" + this.zoomval + "," + this.zoomval + ")");
    };
    OrganogramaEmpresaComponent.prototype.zoomOut = function () {
        this.zoomval = this.currentZoom += 0.1;
        this.$chart.css('transform', this.div + " scale(" + this.zoomval + "," + this.zoomval + ")");
    };
    OrganogramaEmpresaComponent.prototype.scaleZoom = function () {
        this.$chart = $('.orgchart');
        this.div = this.$chart.css('transform');
        var values = this.div.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        this.currentZoom = Math.sqrt(a * a + b * b);
    };
    OrganogramaEmpresaComponent.prototype.pesquisaOrganograma = function () {
        this.cancelarPesquisa();
        var pesquisa = this.formOrganograma.value.pesquisaOrganograma;
        var retornoPesquisa = false;
        var $chart = $(".orgchart");
        // disalbe the expand/collapse feture
        $chart.addClass("noncollapsable");
        // distinguish the matched nodes and the unmatched nodes according to the given key word
        $chart
            .find(".node")
            .filter(function (index, node) {
            return ($(node)
                .text()
                .toLowerCase()
                .indexOf(pesquisa.toLowerCase()) > -1);
        })
            .addClass("matched")
            .closest("table")
            .parents("table")
            .find("tr:first")
            .find(".node")
            .addClass("retained");
        // hide the unmatched nodes      
        $chart.find(".matched,.retained").each(function (index, node) {
            retornoPesquisa = true;
            $(node)
                .removeClass("slide-up")
                .closest(".nodes")
                .removeClass("hidden")
                .siblings(".lines")
                .removeClass("hidden");
            var $unmatched = $(node)
                .closest("table")
                .parent()
                .siblings()
                .find(".node:first:not(.matched,.retained)")
                .closest("table")
                .parent()
                .addClass("hidden");
            $unmatched
                .parent()
                .prev()
                .children()
                .slice(1, $unmatched.length * 2 + 1)
                .addClass("hidden");
        });
        // hide the redundant descendant nodes of the matched nodes
        $chart.find(".matched").each(function (index, node) {
            if (!$(node)
                .closest("tr")
                .siblings(":last")
                .find(".matched").length) {
                $(node)
                    .closest("tr")
                    .siblings()
                    .addClass("hidden");
            }
        });
        if (!retornoPesquisa) {
            swal(this.habilitarOrgNivel ? "Nivel não encontrado!" : "Empresa não encontrada!");
            this.recolherOrganograma();
        }
    };
    OrganogramaEmpresaComponent.prototype.cancelarPesquisa = function () {
        $(".orgchart")
            .removeClass("noncollapsable")
            .find(".node")
            .removeClass("matched retained")
            .end()
            .find(".hidden")
            .removeClass("hidden")
            .end()
            .find(".slide-up, .slide-left, .slide-right")
            .removeClass("slide-up slide-right slide-left");
    };
    OrganogramaEmpresaComponent.prototype.organogramaNivel = function (cdEmpresa) {
        var _this = this;
        this.item = null;
        this.id = null;
        this.parentId = null;
        this.childrenOfNivel = {};
        this.spinner.show();
        this.nivelService.findNivelByPaiAndEmpresaClean(cdEmpresa)
            .subscribe(function (organogramaNiveis) {
            if (organogramaNiveis != null) {
                for (var _i = 0, organogramaNiveis_1 = organogramaNiveis; _i < organogramaNiveis_1.length; _i++) {
                    var organogramaNivel = organogramaNiveis_1[_i];
                    _this.organogramaNiveis.push(organogramaNivel);
                }
                for (_this.index = 0, length = _this.organogramaNiveis.length; _this.index < length; _this.index++) {
                    _this.item = _this.organogramaNiveis[_this.index];
                    _this.id = _this.item["id"];
                    _this.parentId = _this.item["children"] || 0;
                    _this.childrenOfNivel[_this.id] = _this.childrenOfNivel[_this.id] || [];
                    _this.item["children"] = _this.childrenOfNivel[_this.id];
                    if (_this.parentId != 0) {
                        _this.childrenOfNivel[_this.parentId] = _this.childrenOfNivel[_this.parentId] || [];
                        _this.childrenOfNivel[_this.parentId].push(_this.item);
                    }
                    else {
                        _this.tree.push(_this.item);
                    }
                }
                _this.jsonOrganograma = JSON.stringify(_this.childrenOfNivel["EMPRESA_PAI"]);
                _this.jsonOrganograma = _this.jsonOrganograma.substring(1, _this.jsonOrganograma.length - 1);
                _this.datasource = _this.jsonOrganograma;
                _this.loadOrgChartNivel();
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    OrganogramaEmpresaComponent.prototype.loadOrgChartNivel = function () {
        this.oc.init({ 'data': JSON.parse(this.datasource) });
        this.recolherOrganograma();
        this.carregarOrganogramaNivel = false;
        this.scaleZoom();
    };
    OrganogramaEmpresaComponent.prototype.abrirOrganogramaNivel = function () {
        this.str = this.oc.getHierarchy();
        var $codigoEmpresa = $('#chart-container').find('.node.focused');
        if ($codigoEmpresa.length > 0) {
            if (!this.habilitarOrgNivel) {
                this.habilitarOrgNivel = true;
                this.organogramaNivel(this.carregarOrganogramaNivel ? this.cdEmpresaNivel : $codigoEmpresa[0].id);
            }
            else {
                this.codigoNivelEmpresa = $codigoEmpresa[0].id;
                if (!!+this.codigoNivelEmpresa) {
                    console.log('nivel');
                }
                else {
                    this.nivelEmpresaSplit = this.codigoNivelEmpresa.split('-');
                    this.router.navigate(['empresas-incluir', this.carregarOrganogramaNivel ?
                            this.cdEmpresaNivel : this.nivelEmpresaSplit[0],
                        true]);
                }
            }
        }
    };
    OrganogramaEmpresaComponent.prototype.voltarOrganograma = function () {
        this.habilitarOrgNivel = false;
        this.oc.init({ 'data': JSON.parse(this.datasourceEmpresa) });
        this.recolherOrganograma();
    };
    OrganogramaEmpresaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-organograma-empresa-component',
            template: __webpack_require__(/*! ./organograma.empresa.component.html */ "./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.html"),
            styles: [__webpack_require__(/*! ./organograma.empresa.component.scss */ "./src/app/routes/estrutura/organogramaEmpresas/organograma.empresa.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_2__["EmpresaService"],
            _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_4__["NivelService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"]])
    ], OrganogramaEmpresaComponent);
    return OrganogramaEmpresaComponent;
}());



/***/ })

}]);
//# sourceMappingURL=estrutura-estrutura-module.js.map