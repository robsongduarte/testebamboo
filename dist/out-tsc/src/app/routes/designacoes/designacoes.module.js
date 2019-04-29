"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var main_1 = require("ag-grid-angular/main");
var ngx_select_ex_1 = require("ngx-select-ex");
var formularios_permissao_component_1 = require("./formulariosPermissao/formularios.permissao.component");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_pagination_1 = require("ngx-pagination");
var shared_module_1 = require("../../shared/shared.module");
var routes = [
    { path: 'formulariosPermissao', component: formularios_permissao_component_1.FormulariosPermissaoComponent }
];
var DesignacoesModule = /** @class */ (function () {
    function DesignacoesModule() {
    }
    DesignacoesModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                ngx_select_ex_1.NgxSelectModule,
                main_1.AgGridModule,
                ngx_spinner_1.NgxSpinnerModule,
                ngx_pagination_1.NgxPaginationModule
            ],
            declarations: [
                formularios_permissao_component_1.FormulariosPermissaoComponent,
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], DesignacoesModule);
    return DesignacoesModule;
}());
exports.DesignacoesModule = DesignacoesModule;
//# sourceMappingURL=designacoes.module.js.map