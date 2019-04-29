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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var lodash_1 = require("lodash");
var historico_config_1 = require("./historico.config");
var designacao_service_1 = require("../../../../../service/designacoes/designacao.service");
var auditoria_model_1 = require("../../../../../shared/components/historico/model/auditoria.model");
var HistoricoFormulariosPermissaoComponent = /** @class */ (function () {
    function HistoricoFormulariosPermissaoComponent(activatedRoute, location, designacaoService) {
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.designacaoService = designacaoService;
        this.auditorias = [];
    }
    HistoricoFormulariosPermissaoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.column = this.activatedRoute.snapshot.paramMap.get('column');
        var id = ['cd_designacao', this.activatedRoute.parent.snapshot.params['id']];
        this.designacaoService.findAuditoria(historico_config_1.historicoConfig.table[0], id[0], id[1])
            .subscribe(function (auditorias) { return _this.auditorias = _this.transformAuditorias(auditorias); });
    };
    HistoricoFormulariosPermissaoComponent.prototype.transformAuditorias = function (auditorias) {
        return auditorias.map(function (auditoria) { return new auditoria_model_1.Auditoria(auditoria); });
    };
    HistoricoFormulariosPermissaoComponent.prototype.getConfig = function () {
        this.config = lodash_1.cloneDeep(historico_config_1.historicoConfig);
        if (this.column) {
            this.config.setUniqueColumn(this.column);
        }
        return this.config;
    };
    HistoricoFormulariosPermissaoComponent.prototype.goBack = function () {
        if (window.history.length > 1) {
            this.location.back();
        }
    };
    HistoricoFormulariosPermissaoComponent = __decorate([
        core_1.Component({
            selector: 'app-historico-formularios-permissao',
            templateUrl: './historico-formularios-permissao.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            common_1.Location,
            designacao_service_1.DesignacaoService])
    ], HistoricoFormulariosPermissaoComponent);
    return HistoricoFormulariosPermissaoComponent;
}());
exports.HistoricoFormulariosPermissaoComponent = HistoricoFormulariosPermissaoComponent;
//# sourceMappingURL=historico-formularios-permissao.component.js.map