"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var column_config_model_1 = require("./column-config.model");
var HistoricoConfig = /** @class */ (function () {
    function HistoricoConfig(init) {
        this.descricoes = { I: 'Criado', U: 'Atualizado', D: 'Deletado' };
        this.columns = [];
        this._columns = [];
        this.children = [];
        this._children = [];
        if (init) {
            Object.assign(this, init);
            this.indexarColuns();
            this.order();
        }
    }
    HistoricoConfig.prototype.indexarColuns = function () {
        var _this = this;
        this.columns.forEach(function (_a) {
            var column = _a.column, _b = _a.visible, visible = _b === void 0 ? true : _b;
            return _this.showHideColumn(column, visible);
        });
        this.children.forEach(function (child) { return child.indexarColuns(); });
        this._children.forEach(function (child) { return child.indexarColuns(); });
    };
    HistoricoConfig.prototype.showHideChildren = function (name, visible) {
        var children = this.deleteChildren(visible ? this._children : this.children, name);
        if (children) {
            visible ? this.children.push(children) : this._children.push(children);
        }
        this.order();
    };
    HistoricoConfig.prototype.deleteChildren = function (children, childName) {
        var index = children.findIndex(function (_a) {
            var name = _a.table[0];
            return name == childName;
        });
        return index > -1 ? children.splice(index, 1)[0] : undefined;
    };
    HistoricoConfig.prototype.showHideColumn = function (name, visible) {
        var column = this.deleteColumn(visible ? this._columns : this.columns, name);
        if (column) {
            visible ? this.columns.push(column) : this._columns.push(column);
        }
        this.order();
    };
    HistoricoConfig.prototype.deleteColumn = function (columns, name) {
        var index = columns.findIndex(function (_a) {
            var column = _a.column;
            return name == column;
        });
        return index > -1 ? columns.splice(index, 1)[0] : undefined;
    };
    HistoricoConfig.prototype.setVisible = function (visible) {
        this.visible = visible;
        this.children.forEach(function (config) { return config.setVisible(visible); });
        this._children.forEach(function (config) { return config.setVisible(visible); });
    };
    HistoricoConfig.prototype.order = function () {
        this.orderColumns();
        this.orderChildrens();
    };
    HistoricoConfig.prototype.orderColumns = function () {
        this.columns = this.columns.sort(column_config_model_1.ColumnConfig.compareSort);
    };
    HistoricoConfig.prototype.orderChildrens = function () {
        this.children = this.children.sort(this.compareSort);
    };
    HistoricoConfig.prototype.compareSort = function (_a, _b) {
        var _c = _a.table, l1 = _c[1];
        var _d = _b.table, l2 = _d[1];
        return l1.toLowerCase().localeCompare(l2.toLowerCase());
    };
    HistoricoConfig.prototype.setUniqueColumn = function (column) {
        var indexColumn = this.columns.findIndex(function (_a) {
            var col = _a.column;
            return col == column;
        });
        if (indexColumn > -1) {
            this.columns = this.columns.slice(indexColumn, indexColumn + 1);
            this._columns = [];
            this.children = [];
            this._children = [];
            return;
        }
        var index_Column = this._columns.findIndex(function (_a) {
            var col = _a.column;
            return col == column;
        });
        if (index_Column > -1) {
            this._columns = this.columns.slice(index_Column, index_Column + 1);
            this.columns = [];
            this.children = [];
            this._children = [];
            return;
        }
        var indexChildren = this.children.findIndex(function (_a) {
            var col = _a.table[0];
            return col == column;
        });
        if (indexChildren > -1) {
            this.children = this.children.slice(indexChildren, indexChildren + 1);
            this.columns = [];
            this._columns = [];
            this._children = [];
            return;
        }
        var index_Children = this._children.findIndex(function (_a) {
            var col = _a.table[0];
            return col == column;
        });
        if (index_Children > -1) {
            this._children = this._children.slice(index_Children, index_Children + 1);
            this.columns = [];
            this._columns = [];
            this.children = [];
            return;
        }
    };
    HistoricoConfig.prototype.toogleVisible = function () {
        this.visible = !(this.visible || !('visible' in this));
    };
    return HistoricoConfig;
}());
exports.HistoricoConfig = HistoricoConfig;
//# sourceMappingURL=historico-config.model.js.map