"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_mask_1 = require("ngx-mask");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var main_1 = require("ag-grid-angular/main");
var ngx_select_ex_1 = require("ngx-select-ex");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_pagination_1 = require("ngx-pagination");
var ngx_filter_pipe_1 = require("ngx-filter-pipe");
var ng2_search_filter_1 = require("ng2-search-filter");
var shared_module_1 = require("../../shared/shared.module");
var empresas_component_1 = require("./empresas/empresas.component");
var organograma_empresa_component_1 = require("./organogramaEmpresas/organograma.empresa.component");
var niveis_component_1 = require("./niveis/niveis.component");
var routes = [
    { path: 'empresas', component: empresas_component_1.EmpresasComponent },
    { path: 'organogramaEmpresas/:cdEmpresaNivel/:carregarOrganogramaNivel', component: organograma_empresa_component_1.OrganogramaEmpresaComponent },
    { path: 'niveis', component: niveis_component_1.NiveisComponent }
];
var EstruturaModule = /** @class */ (function () {
    function EstruturaModule() {
    }
    EstruturaModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                ngx_select_ex_1.NgxSelectModule,
                main_1.AgGridModule,
                ngx_spinner_1.NgxSpinnerModule,
                ngx_pagination_1.NgxPaginationModule,
                ngx_filter_pipe_1.FilterPipeModule,
                ng2_search_filter_1.Ng2SearchPipeModule,
                ngx_mask_1.NgxMaskModule.forRoot()
            ],
            declarations: [
                empresas_component_1.EmpresasComponent,
                organograma_empresa_component_1.OrganogramaEmpresaComponent,
                niveis_component_1.NiveisComponent
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], EstruturaModule);
    return EstruturaModule;
}());
exports.EstruturaModule = EstruturaModule;
//# sourceMappingURL=estrutura.module.js.map