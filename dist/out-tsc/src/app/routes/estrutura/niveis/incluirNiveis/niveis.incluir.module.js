"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var niveis_incluir_component_1 = require("./niveis.incluir.component");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../../../shared/shared.module");
var ngx_tabset_1 = require("ngx-tabset");
var ngx_spinner_1 = require("ngx-spinner");
var ngx_select_ex_1 = require("ngx-select-ex");
var ngx_pagination_1 = require("ngx-pagination");
var ngx_mask_1 = require("ngx-mask");
var ngx_filter_pipe_1 = require("ngx-filter-pipe");
var ngx_currency_1 = require("ngx-currency");
var angular_tree_component_1 = require("angular-tree-component");
var routes = [
    { path: '', component: niveis_incluir_component_1.NiveisIncluirComponent }
];
var NiveisIncluirModule = /** @class */ (function () {
    function NiveisIncluirModule() {
    }
    NiveisIncluirModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                ngx_tabset_1.TabsModule.forRoot(),
                ngx_spinner_1.NgxSpinnerModule,
                ngx_select_ex_1.NgxSelectModule,
                ngx_pagination_1.NgxPaginationModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
                ngx_filter_pipe_1.FilterPipeModule,
                ngx_currency_1.NgxCurrencyModule,
                angular_tree_component_1.TreeModule.forRoot()
            ],
            declarations: [niveis_incluir_component_1.NiveisIncluirComponent],
            exports: [
                router_1.RouterModule
            ],
            providers: [common_1.DatePipe]
        })
    ], NiveisIncluirModule);
    return NiveisIncluirModule;
}());
exports.NiveisIncluirModule = NiveisIncluirModule;
//# sourceMappingURL=niveis.incluir.module.js.map