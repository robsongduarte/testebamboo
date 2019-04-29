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
var moment = require("moment");
var historico_config_model_1 = require("../model/historico-config.model");
var auditoria_model_1 = require("../model/auditoria.model");
var BlocoHistoricoComponent = /** @class */ (function () {
    function BlocoHistoricoComponent() {
    }
    BlocoHistoricoComponent.prototype.ngOnInit = function () { };
    BlocoHistoricoComponent.prototype.exibir = function () {
        return this.auditoria.isVisible(this.config);
    };
    BlocoHistoricoComponent.prototype.getDataFormatada = function () {
        moment.locale('pt-br');
        return moment(new Date(this.auditoria.timestampClk)).format(this.config.dateFormat || 'lll');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", auditoria_model_1.Auditoria)
    ], BlocoHistoricoComponent.prototype, "auditoria", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", historico_config_model_1.HistoricoConfig)
    ], BlocoHistoricoComponent.prototype, "config", void 0);
    BlocoHistoricoComponent = __decorate([
        core_1.Component({
            selector: '[app-bloco-historico]',
            templateUrl: './bloco-historico.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], BlocoHistoricoComponent);
    return BlocoHistoricoComponent;
}());
exports.BlocoHistoricoComponent = BlocoHistoricoComponent;
//# sourceMappingURL=bloco-historico.component.js.map