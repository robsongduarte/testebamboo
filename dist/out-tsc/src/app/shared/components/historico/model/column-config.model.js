"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var ColumnConfig = /** @class */ (function () {
    function ColumnConfig(init) {
        Object.assign(this, init);
    }
    ColumnConfig.prototype.toogleVisible = function () {
        this.visible = !(this.visible || !('visible' in this));
    };
    ColumnConfig.prototype.equals = function (column) {
        return lodash_1.isEqual(this, column);
    };
    ColumnConfig.compareSort = function (_a, _b) {
        var l1 = _a.label;
        var l2 = _b.label;
        return l1.toLowerCase().localeCompare(l2.toLowerCase());
    };
    return ColumnConfig;
}());
exports.ColumnConfig = ColumnConfig;
//# sourceMappingURL=column-config.model.js.map