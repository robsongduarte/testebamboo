"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var accordion_1 = require("ngx-bootstrap/accordion");
var alert_1 = require("ngx-bootstrap/alert");
var buttons_1 = require("ngx-bootstrap/buttons");
var carousel_1 = require("ngx-bootstrap/carousel");
var collapse_1 = require("ngx-bootstrap/collapse");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var modal_1 = require("ngx-bootstrap/modal");
var pagination_1 = require("ngx-bootstrap/pagination");
var progressbar_1 = require("ngx-bootstrap/progressbar");
var rating_1 = require("ngx-bootstrap/rating");
var tabs_1 = require("ngx-bootstrap/tabs");
var timepicker_1 = require("ngx-bootstrap/timepicker");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var popover_1 = require("ngx-bootstrap/popover");
var typeahead_1 = require("ngx-bootstrap/typeahead");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var datepicker_2 = require("ngx-bootstrap/datepicker");
var flot_directive_1 = require("./directives/flot/flot.directive");
var sparkline_directive_1 = require("./directives/sparkline/sparkline.directive");
var easypiechart_directive_1 = require("./directives/easypiechart/easypiechart.directive");
var colors_service_1 = require("./colors/colors.service");
var checkall_directive_1 = require("./directives/checkall/checkall.directive");
var vectormap_directive_1 = require("./directives/vectormap/vectormap.directive");
var now_directive_1 = require("./directives/now/now.directive");
var scrollable_directive_1 = require("./directives/scrollable/scrollable.directive");
var jqcloud_directive_1 = require("./directives/jqcloud/jqcloud.directive");
var button_historico_component_1 = require("./components/button-historico/button-historico.component");
var bloco_historico_component_1 = require("./components/historico/bloco-historico/bloco-historico.component");
var historico_component_1 = require("./components/historico/historico/historico.component");
var column_component_1 = require("./components/historico/column/column.component");
var columns_component_1 = require("./components/historico/columns/columns.component");
var title_bloco_component_1 = require("./components/historico/title-bloco/title-bloco.component");
var config_component_1 = require("./components/historico/config/config.component");
// https://angular.io/styleguide#!#04-10
var SharedModule = /** @class */ (function () {
    // https://github.com/ocombe/ng2-translate/issues/209
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1
        };
    };
    var SharedModule_1;
    SharedModule = SharedModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule,
                accordion_1.AccordionModule.forRoot(),
                alert_1.AlertModule.forRoot(),
                buttons_1.ButtonsModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                collapse_1.CollapseModule.forRoot(),
                datepicker_1.DatepickerModule.forRoot(),
                datepicker_2.BsDatepickerModule.forRoot(),
                dropdown_1.BsDropdownModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                pagination_1.PaginationModule.forRoot(),
                progressbar_1.ProgressbarModule.forRoot(),
                rating_1.RatingModule.forRoot(),
                tabs_1.TabsModule.forRoot(),
                timepicker_1.TimepickerModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                popover_1.PopoverModule.forRoot(),
                typeahead_1.TypeaheadModule.forRoot(),
                angular2_toaster_1.ToasterModule,
                ng_bootstrap_1.NgbModalModule.forRoot()
            ],
            providers: [
                colors_service_1.ColorsService
            ],
            declarations: [
                flot_directive_1.FlotDirective,
                sparkline_directive_1.SparklineDirective,
                easypiechart_directive_1.EasypiechartDirective,
                checkall_directive_1.CheckallDirective,
                vectormap_directive_1.VectormapDirective,
                now_directive_1.NowDirective,
                scrollable_directive_1.ScrollableDirective,
                jqcloud_directive_1.JqcloudDirective,
                button_historico_component_1.ButtonHistoricoComponent,
                bloco_historico_component_1.BlocoHistoricoComponent,
                historico_component_1.HistoricoComponent,
                columns_component_1.ColumnsComponent,
                column_component_1.ColumnComponent,
                title_bloco_component_1.TitleBlocoComponent,
                config_component_1.ConfigComponent,
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                core_2.TranslateModule,
                router_1.RouterModule,
                accordion_1.AccordionModule,
                alert_1.AlertModule,
                buttons_1.ButtonsModule,
                carousel_1.CarouselModule,
                collapse_1.CollapseModule,
                datepicker_1.DatepickerModule,
                datepicker_2.BsDatepickerModule,
                dropdown_1.BsDropdownModule,
                modal_1.ModalModule,
                pagination_1.PaginationModule,
                progressbar_1.ProgressbarModule,
                rating_1.RatingModule,
                tabs_1.TabsModule,
                timepicker_1.TimepickerModule,
                tooltip_1.TooltipModule,
                popover_1.PopoverModule,
                typeahead_1.TypeaheadModule,
                angular2_toaster_1.ToasterModule,
                flot_directive_1.FlotDirective,
                sparkline_directive_1.SparklineDirective,
                easypiechart_directive_1.EasypiechartDirective,
                checkall_directive_1.CheckallDirective,
                vectormap_directive_1.VectormapDirective,
                now_directive_1.NowDirective,
                scrollable_directive_1.ScrollableDirective,
                jqcloud_directive_1.JqcloudDirective,
                button_historico_component_1.ButtonHistoricoComponent,
                bloco_historico_component_1.BlocoHistoricoComponent,
                historico_component_1.HistoricoComponent,
                columns_component_1.ColumnsComponent,
                column_component_1.ColumnComponent,
            ]
        })
        // https://github.com/ocombe/ng2-translate/issues/209
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map