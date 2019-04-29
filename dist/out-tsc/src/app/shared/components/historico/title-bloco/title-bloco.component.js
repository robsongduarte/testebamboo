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
var historico_config_model_1 = require("../model/historico-config.model");
var auditoria_model_1 = require("../model/auditoria.model");
var TitleBlocoComponent = /** @class */ (function () {
    function TitleBlocoComponent() {
        this.auditoria = new auditoria_model_1.Auditoria();
        this.config = new historico_config_model_1.HistoricoConfig();
    }
    TitleBlocoComponent.prototype.ngOnInit = function () { };
    TitleBlocoComponent.prototype.getNome = function () {
        try {
            var _a = this.config.nome, _b = this.auditoria.dadosOld[_a], nome = _b === void 0 ? '' : _b;
            return nome.toLowerCase();
        }
        catch (e) {
            console.log('Erro ao tentar carregar a coluna: getNome(), ', e, this.constructor.name);
        }
        return '';
    };
    TitleBlocoComponent.prototype.getDescricao = function () {
        try {
            var _a = this.auditoria.acao, _b = this.config.descricoes[_a], acao = _b === void 0 ? '' : _b;
            return acao.toLowerCase();
        }
        catch (e) {
            console.log('Erro ao tentar carregar a coluna: getDescricao() ', e, this.constructor.name);
        }
        return '';
    };
    TitleBlocoComponent.prototype.toogleDetalhe = function () {
        this.config.visible = !this.config.visible;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", auditoria_model_1.Auditoria)
    ], TitleBlocoComponent.prototype, "auditoria", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", historico_config_model_1.HistoricoConfig)
    ], TitleBlocoComponent.prototype, "config", void 0);
    TitleBlocoComponent = __decorate([
        core_1.Component({
            selector: '[app-title-bloco]',
            templateUrl: './title-bloco.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], TitleBlocoComponent);
    return TitleBlocoComponent;
}());
exports.TitleBlocoComponent = TitleBlocoComponent;
//# sourceMappingURL=title-bloco.component.js.map