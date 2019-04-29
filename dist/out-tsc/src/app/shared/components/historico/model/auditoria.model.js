"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auditoria = /** @class */ (function () {
    function Auditoria(init) {
        if (init) {
            Object.assign(this, init);
        }
    }
    Auditoria.prototype.isVisible = function (config) {
        var columns = config.columns, children = config.children, skipNull = config.skipNull, skipEmpty = config.skipEmpty;
        return this.hasColumns(columns, skipNull, skipEmpty) || this.hasChildrens(children);
    };
    Auditoria.prototype.hasChildrens = function (configs) {
        var _this = this;
        if (configs === void 0) { configs = []; }
        return this.filhos &&
            configs
                .filter(function (config) { return config != undefined; })
                .filter(function (config) { return config.table[0] in _this.filhos; })
                .map(function (config) { return [_this.filhos[config.table[0]], config]; })
                .map(function (config) {
                return config[0]
                    .map(function (auditoria) { return new Auditoria(auditoria).isVisible(config[1]); })
                    .reduce(function (b1, b2) { return b1 || b2; }, false);
            })
                .reduce(function (b1, b2) { return b1 || b2; }, false);
    };
    Auditoria.prototype.hasColumns = function (columns, skipNull, skipEmpty) {
        var _this = this;
        if (columns === void 0) { columns = []; }
        return !this.isEmpty() &&
            columns
                .filter(function (config) { return config != undefined; })
                .map(function (config) { return config.column; })
                .map(function (column) { return (_this.update() && column in _this.dadosNew) ||
                ((_this.insert() || _this.delete()) && column in _this.dadosOld &&
                    (!skipNull || _this.dadosOld[column] != null) &&
                    (!skipEmpty || _this.dadosOld[column])); })
                .reduce(function (b1, b2) { return b1 || b2; }, false);
    };
    Auditoria.prototype.isEmpty = function () {
        return !this.dadosOld || (!this.dadosNew && this.update());
    };
    Auditoria.prototype.insert = function () {
        return this.acao == 'I';
    };
    Auditoria.prototype.update = function () {
        return this.acao == 'U';
    };
    Auditoria.prototype.delete = function () {
        return this.acao == 'D';
    };
    return Auditoria;
}());
exports.Auditoria = Auditoria;
//# sourceMappingURL=auditoria.model.js.map