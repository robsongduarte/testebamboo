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
var column_value_model_1 = require("../model/column-value.model");
var historico_config_model_1 = require("../model/historico-config.model");
var auditoria_model_1 = require("../model/auditoria.model");
var ColumnsComponent = /** @class */ (function () {
    function ColumnsComponent() {
        this.isChildren = false;
        this.columns = [];
    }
    ColumnsComponent.prototype.ngOnInit = function () {
        this.montarColunas();
    };
    ColumnsComponent.prototype.montarColunas = function () {
        if (!this.config) {
            return;
        }
        this.columns = this.colunas().concat(this.childrens());
    };
    ColumnsComponent.prototype.colunas = function () {
        var _this = this;
        return this.config.columns
            .filter(function (config) { return config != undefined; })
            .filter(function (config) { return _this.filtro(config); })
            .map(function (config) { return _this.columnValue(config); });
    };
    ColumnsComponent.prototype.columnValue = function (config) {
        var title = config.label;
        return new column_value_model_1.ColumnValue({ config: config, title: title, auditoria: this.auditoria });
    };
    ColumnsComponent.prototype.filtro = function (config) {
        var column = config.column, id = config.id;
        var _a = this.auditoria, older = _a.dadosOld, newer = _a.dadosNew, acao = _a.acao;
        var _b = this.config, _c = _b.skipNull, skipNull = _c === void 0 ? false : _c, _d = _b.skipEmpty, skipEmpty = _d === void 0 ? false : _d;
        return (acao == 'U' && newer[column]) || id ||
            ((acao == 'I' || acao == 'D') && (!skipNull || older[column] != null) && (!skipEmpty || older[column]));
    };
    ColumnsComponent.prototype.childrens = function () {
        var _this = this;
        var filhos = this.auditoria.filhos;
        if (!filhos) {
            return [];
        }
        return this.config.children
            .filter(function (child) { return child != undefined; })
            .map(function (child) { return _this.columnValueChildren(child, filhos); })
            .filter(function (child) { return child.children.length > 0; });
    };
    ColumnsComponent.prototype.columnValueChildren = function (child, filhos) {
        var _a = child.table, auditorias = _a[0], title = _a[1];
        return new column_value_model_1.ColumnValue({
            visible: child.visible,
            title: title,
            children: this.montarChildrens(filhos[auditorias], child)
        });
    };
    ColumnsComponent.prototype.montarChildrens = function (auditorias, config) {
        var _this = this;
        if (!auditorias) {
            return [];
        }
        return auditorias
            .map(function (auditoria) { return new auditoria_model_1.Auditoria(auditoria); })
            .map(function (auditoria) { return _this.montarTupla(auditoria, config); })
            .filter(function (tupla) { return tupla[0].isVisible(config); });
    };
    ColumnsComponent.prototype.montarTupla = function (auditoria, config) {
        return [auditoria, config];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ColumnsComponent.prototype, "isChildren", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", auditoria_model_1.Auditoria)
    ], ColumnsComponent.prototype, "auditoria", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", historico_config_model_1.HistoricoConfig)
    ], ColumnsComponent.prototype, "config", void 0);
    ColumnsComponent = __decorate([
        core_1.Component({
            selector: '[app-columns]',
            templateUrl: './columns.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], ColumnsComponent);
    return ColumnsComponent;
}());
exports.ColumnsComponent = ColumnsComponent;
//# sourceMappingURL=columns.component.js.map