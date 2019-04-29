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
var ngx_spinner_1 = require("ngx-spinner");
var ngx_mask_1 = require("ngx-mask");
var formularios_permissao_editar_component_1 = require("./formularios.permissao.editar.component");
var historico_formularios_permissao_component_1 = require("./historico-formularios-permissao/historico-formularios-permissao.component");
var shared_module_1 = require("../../../../shared/shared.module");
var routes = [
    { path: '', component: formularios_permissao_editar_component_1.FormulariosPermissaoEditarComponent },
    { path: 'historico/:column', component: historico_formularios_permissao_component_1.HistoricoFormulariosPermissaoComponent },
    { path: 'historico', component: historico_formularios_permissao_component_1.HistoricoFormulariosPermissaoComponent },
];
var FormulariosPermissaoEditarModule = /** @class */ (function () {
    function FormulariosPermissaoEditarModule() {
    }
    FormulariosPermissaoEditarModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                ngx_select_ex_1.NgxSelectModule,
                ngx_spinner_1.NgxSpinnerModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
                main_1.AgGridModule
            ],
            declarations: [
                formularios_permissao_editar_component_1.FormulariosPermissaoEditarComponent,
                historico_formularios_permissao_component_1.HistoricoFormulariosPermissaoComponent
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], FormulariosPermissaoEditarModule);
    return FormulariosPermissaoEditarModule;
}());
exports.FormulariosPermissaoEditarModule = FormulariosPermissaoEditarModule;
//# sourceMappingURL=formularios.permissao.editar.module.js.map