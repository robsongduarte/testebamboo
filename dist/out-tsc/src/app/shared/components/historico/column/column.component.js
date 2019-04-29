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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/animations");
var column_value_model_1 = require("../model/column-value.model");
var column_config_model_1 = require("../model/column-config.model");
var ColumnComponent = /** @class */ (function () {
    function ColumnComponent(decimalPipe, currencyPipe, datePipe, locale) {
        this.decimalPipe = decimalPipe;
        this.currencyPipe = currencyPipe;
        this.datePipe = datePipe;
        this.locale = locale;
        this.column = new column_value_model_1.ColumnValue({});
        this.columnState = 'hidden';
    }
    ColumnComponent.prototype.ngOnInit = function () {
        this.exibir();
    };
    ColumnComponent.prototype.getLabel = function () {
        try {
            var _a = this.column.config, config = _a === void 0 ? new column_config_model_1.ColumnConfig({}) : _a;
            return config.label;
        }
        catch (e) {
            return '';
        }
    };
    ColumnComponent.prototype.exibir = function () {
        var _this = this;
        setTimeout(function () {
            _this.columnState = _this.isVisible() ? 'visible' : 'hidden';
        }, 0);
    };
    ColumnComponent.prototype.isVisible = function () {
        try {
            var _a = this.column, children = _a.children, auditoria = _a.auditoria, config = _a.config;
            if (children) {
                return children && children.length > 0;
            }
            if (auditoria && config) {
                var column = config.column, id = config.id;
                var _b = auditoria.dadosNew, dadosNew = _b === void 0 ? {} : _b, _c = auditoria.dadosOld, dadosOld = _c === void 0 ? {} : _c;
                return auditoria.update() && column in dadosNew || id ||
                    (auditoria.insert() || auditoria.delete()) && column in dadosOld;
            }
        }
        catch (e) {
            console.log('Erro ao exibir coluna: exibir() ', this.column, this.constructor.name);
        }
        return false;
    };
    ColumnComponent.prototype.toogleColumns = function () {
        var _this = this;
        this.column.visible = !this.column.visible;
        if (this.column.children) {
            this.column.children.map(function (column) { return column[1].visible = _this.column.visible; });
        }
    };
    ColumnComponent.prototype.update = function () {
        try {
            return this.column.auditoria.acao == 'U';
        }
        catch (e) {
            console.log('Erro ao exibir coluna: update() ', this.column, this.constructor.name);
        }
        return false;
    };
    ColumnComponent.prototype.isNewer = function () {
        var _a = this.column, auditoria = _a.auditoria, config = _a.config;
        if (auditoria && config) {
            var column = config.column;
            var _b = auditoria.dadosNew, dadosNew = _b === void 0 ? {} : _b;
            return auditoria.update() && column in dadosNew;
        }
        return false;
    };
    ColumnComponent.prototype.older = function () {
        var _a = this.column, auditoria = _a.auditoria, column = _a.config.column;
        var _b = column, older = auditoria.dadosOld[_b];
        return this.format(older);
    };
    ColumnComponent.prototype.newer = function () {
        var _a = this.column, auditoria = _a.auditoria, column = _a.config.column;
        var _b = auditoria.dadosNew, dadosNew = _b === void 0 ? {} : _b;
        var _c = column, newer = dadosNew[_c];
        return this.format(newer);
    };
    ColumnComponent.prototype.format = function (valor) {
        if (valor === null) {
            return 'NULL';
        }
        if (valor == undefined || valor.trim() == '') {
            return '';
        }
        return this.formatType(valor, this.column.config);
    };
    ColumnComponent.prototype.formatType = function (value, columnConfig) {
        switch (columnConfig.type) {
            case 'boolean':
                return this.formatBoolean(value, columnConfig.booleanLabel);
            case 'date':
                return this.formatDate(value, columnConfig.formatDate);
            case 'number':
                return this.formatNumber(value, columnConfig.casasDecimais, columnConfig.currency);
            default:
                if (columnConfig.funcoes && columnConfig.funcoes.indexOf('substring') > -1) {
                    var index = columnConfig.funcoes.indexOf('substring');
                    var indexEnd = columnConfig.funcoes.indexOf(';', index);
                    var substring = columnConfig.funcoes.substring(index, indexEnd > -1 ? indexEnd : columnConfig.funcoes.length);
                    var _a = substring.split(':'), param = _a[1];
                    return value.substring(value.indexOf(param) + 1);
                }
                return value;
        }
    };
    ColumnComponent.prototype.formatBoolean = function (value, labels) {
        if (labels === void 0) { labels = ['Verdadeiro', 'Falso']; }
        return labels[+(!!(value.toLowerCase().startsWith('f')))];
    };
    ColumnComponent.prototype.formatDate = function (value, format) {
        if (format === void 0) { format = 'medium'; }
        return this.datePipe.transform(new Date(value), format, this.locale);
    };
    ColumnComponent.prototype.formatNumber = function (value, casasDecimais, currency) {
        if (currency === void 0) { currency = false; }
        var numberInfo = "1." + this.casasDecimais(casasDecimais)[0] + "-" + this.casasDecimais(casasDecimais)[1];
        if (currency) {
            return this.currencyPipe.transform(value, '', 'R$', numberInfo, this.locale);
        }
        return this.decimalPipe.transform(value, numberInfo, this.locale);
    };
    ColumnComponent.prototype.casasDecimais = function (casasDecimais) {
        return [casasDecimais | 0, (casasDecimais | 0) + 2];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", column_value_model_1.ColumnValue)
    ], ColumnComponent.prototype, "column", void 0);
    ColumnComponent = __decorate([
        core_1.Component({
            selector: '[app-column]',
            templateUrl: './column.component.html',
            animations: [
                animations_1.trigger('toggleColumn', [
                    animations_1.state('hidden', animations_1.style({
                        opacity: 0
                    })),
                    animations_1.state('visible', animations_1.style({
                        opacity: 1
                    })),
                    animations_1.transition('hidden => visible', animations_1.animate('1000ms 0s ease-in-out'))
                ])
            ]
        }),
        __param(3, core_1.Inject(core_1.LOCALE_ID)),
        __metadata("design:paramtypes", [common_1.DecimalPipe,
            common_1.CurrencyPipe,
            common_1.DatePipe, String])
    ], ColumnComponent);
    return ColumnComponent;
}());
exports.ColumnComponent = ColumnComponent;
//# sourceMappingURL=column.component.js.map