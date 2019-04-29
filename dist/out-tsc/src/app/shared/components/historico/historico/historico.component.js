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
var lodash_1 = require("lodash");
var animations_1 = require("@angular/animations");
var historico_config_model_1 = require("../model/historico-config.model");
var HistoricoComponent = /** @class */ (function () {
    function HistoricoComponent() {
        this.auditorias = [];
        this.configs = [];
        this.exibir = false;
        this.configurar = false;
        this.configState = 'hidden';
    }
    HistoricoComponent.prototype.ngOnInit = function () {
        this.makeConfigsInit();
        this.configuracao = lodash_1.cloneDeep(this.config);
        this.configuracao.setVisible(true);
        this.configuracao.columns = this.configuracao.columns.concat(this.configuracao._columns);
        this.configuracao.children = this.configuracao.children.concat(this.configuracao._children);
        this.configuracao.order();
    };
    HistoricoComponent.prototype.makeConfigsInit = function () {
        var _this = this;
        this.configs = [];
        this.auditorias.forEach(function (auditoria) { return _this.configs.push([auditoria, lodash_1.cloneDeep(_this.config)]); });
    };
    HistoricoComponent.prototype.refresh = function () {
        var _this = this;
        var configs = lodash_1.cloneDeep(this.configs);
        this.configs = [];
        configs.forEach(function (config) { return _this.configs.push(config); });
    };
    HistoricoComponent.prototype.toogleExibir = function () {
        var _this = this;
        this.exibir = !this.exibir;
        this.configs.forEach(function (_a) {
            var config = _a[1];
            return config.setVisible(_this.exibir);
        });
        this.refresh();
    };
    HistoricoComponent.prototype.toogleColumnExibir = function (column) {
        this.showHideColumn(column.visible, column.column);
        this.refresh();
    };
    HistoricoComponent.prototype.toogleChildrenExibir = function (children) {
        this.showHideChildren(children.visible, children.table[0]);
        this.refresh();
    };
    HistoricoComponent.prototype.showHideColumn = function (visible, name) {
        this.configs.forEach(function (_a) {
            var config = _a[1];
            return config.showHideColumn(name, visible);
        });
    };
    HistoricoComponent.prototype.showHideChildren = function (visible, name) {
        this.configs.forEach(function (_a) {
            var config = _a[1];
            return config.showHideChildren(name, visible);
        });
    };
    HistoricoComponent.prototype.toogleConfigurar = function () {
        this.configurar = !this.configurar;
        this.configState = this.configState == 'hidden' ? 'visible' : 'hidden';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", historico_config_model_1.HistoricoConfig)
    ], HistoricoComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], HistoricoComponent.prototype, "auditorias", void 0);
    HistoricoComponent = __decorate([
        core_1.Component({
            selector: 'app-historico',
            templateUrl: './historico.component.html',
            animations: [
                animations_1.trigger('toggleConfig', [
                    animations_1.state('hidden', animations_1.style({
                        opacity: 0,
                        'max-width': '0px',
                        display: 'none'
                    })),
                    animations_1.state('visible', animations_1.style({
                        opacity: 1,
                        'max-width': '300px',
                        display: 'block'
                    })),
                    animations_1.transition('hidden => visible', animations_1.animate('500ms 500ms ease-in-out')),
                    animations_1.transition('visible => hidden', animations_1.animate('0ms 0ms ease-in-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [])
    ], HistoricoComponent);
    return HistoricoComponent;
}());
exports.HistoricoComponent = HistoricoComponent;
//# sourceMappingURL=historico.component.js.map