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
var router_1 = require("@angular/router");
var lodash_1 = require("lodash");
var historico_config_1 = require("./historico.config");
var empresa_service_1 = require("../../../../../service/estrutura/empresa.service");
var auditoria_model_1 = require("../../../../../shared/components/historico/model/auditoria.model");
var HistoricoEmpresaComponent = /** @class */ (function () {
    function HistoricoEmpresaComponent(activatedRoute, router, empresaService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.empresaService = empresaService;
        this.auditorias = [];
    }
    HistoricoEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.column = this.activatedRoute.snapshot.paramMap.get('column');
        var id = ['cd_empresa', this.activatedRoute.parent.snapshot.params['id']];
        console.log(id, historico_config_1.historicoConfig.table[0]);
        this.empresaService.findAuditoria(historico_config_1.historicoConfig.table[0], id[0], id[1])
            .subscribe(function (auditorias) { return _this.auditorias = _this.transformAuditorias(auditorias); });
    };
    HistoricoEmpresaComponent.prototype.transformAuditorias = function (auditorias) {
        return auditorias.map(function (auditoria) { return new auditoria_model_1.Auditoria(auditoria); });
    };
    HistoricoEmpresaComponent.prototype.getConfig = function () {
        this.config = lodash_1.cloneDeep(historico_config_1.historicoConfig);
        if (this.column) {
            this.config.setUniqueColumn(this.column);
        }
        return this.config;
    };
    HistoricoEmpresaComponent.prototype.goBack = function () {
        this.router.navigate([this.router.url.replace('/historico', '')]);
    };
    HistoricoEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-historico-empresa',
            templateUrl: './historico-empresa.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            empresa_service_1.EmpresaService])
    ], HistoricoEmpresaComponent);
    return HistoricoEmpresaComponent;
}());
exports.HistoricoEmpresaComponent = HistoricoEmpresaComponent;
//# sourceMappingURL=historico-empresa.component.js.map