"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SparklineDirective = /** @class */ (function () {
    function SparklineDirective(el) {
        this.el = el;
        // generate a unique resize event so we can detach later
        this.resizeEventId = 'resize.sparkline' + 1324;
        this.$element = $(el.nativeElement);
    }
    SparklineDirective.prototype.ngOnInit = function () {
        this.initSparkLine();
    };
    SparklineDirective.prototype.initSparkLine = function () {
        var _this = this;
        var options = this.sparkline, data = this.$element.data();
        if (!options) { // if no scope options, try with data attributes
            options = data;
        }
        else {
            if (data) { // data attributes overrides scope options
                options = $.extend({}, options, data);
            }
        }
        options.type = options.type || 'bar'; // default chart is bar
        options.disableHiddenCheck = true;
        this.runSparkline(options);
        if (options.resize) {
            $(window).on(this.resizeEventId, function () {
                _this.runSparkline(options);
            });
        }
    };
    SparklineDirective.prototype.runSparkline = function (options) {
        if (this.values) {
            if (typeof this.values === 'string')
                this.values = this.values.split(','); // assume comma separated string
            this.$element.sparkline(this.values, options);
        }
        else {
            this.$element.sparkline('html', options);
        }
    };
    SparklineDirective.prototype.ngOnDestroy = function () {
        $(window).off(this.resizeEventId);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SparklineDirective.prototype, "sparkline", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SparklineDirective.prototype, "values", void 0);
    SparklineDirective = __decorate([
        core_1.Directive({
            selector: '[sparkline]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], SparklineDirective);
    return SparklineDirective;
}());
exports.SparklineDirective = SparklineDirective;
//# sourceMappingURL=sparkline.directive.js.map