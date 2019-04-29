"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ngx_mask_1 = require("ngx-mask");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations"); // this is needed!
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var common_1 = require("@angular/common");
var pt_1 = require("@angular/common/locales/pt");
var app_component_1 = require("./app.component");
var core_module_1 = require("./core/core.module");
var layout_module_1 = require("./layout/layout.module");
var shared_module_1 = require("./shared/shared.module");
var routes_module_1 = require("./routes/routes.module");
var common_2 = require("@angular/common");
var okta_service_1 = require("./service/okta/okta.service");
var auth_guard_service_1 = require("./guards/auth-guard.service");
// https://github.com/ocombe/ng2-translate/issues/218
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
common_1.registerLocaleData(pt_1.default, 'pt');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                http_1.HttpClientModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                core_module_1.CoreModule,
                layout_module_1.LayoutModule,
                shared_module_1.SharedModule.forRoot(),
                routes_module_1.RoutesModule,
                ngx_mask_1.NgxMaskModule.forRoot(),
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            providers: [
                okta_service_1.Okta,
                auth_guard_service_1.AuthGuardService,
                common_1.DecimalPipe,
                common_1.CurrencyPipe,
                common_1.DatePipe,
                { provide: common_2.LocationStrategy, useClass: common_2.HashLocationStrategy },
                { provide: core_1.LOCALE_ID, useValue: 'pt' }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map