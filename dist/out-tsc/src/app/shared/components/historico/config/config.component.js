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
var lodash_1 = require("lodash");
var historico_config_model_1 = require("../model/historico-config.model");
var ConfigComponent = /** @class */ (function () {
    function ConfigComponent() {
        this.toogleColumn = new core_1.EventEmitter();
        this.toogleChildren = new core_1.EventEmitter();
        this.columns = [];
        this.childrens = [];
    }
    ConfigComponent.prototype.ngOnInit = function () {
        this.columns = lodash_1.cloneDeep(this.config.columns);
        console.log(this.config);
        this.childrens = lodash_1.cloneDeep(this.config.children);
    };
    ConfigComponent.prototype.toogleColumnExibir = function (column) {
        column.toogleVisible();
        this.toogleColumn.emit(column);
    };
    ConfigComponent.prototype.toogleChildrenExibir = function (children) {
        children.toogleVisible();
        this.toogleChildren.emit(children);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", historico_config_model_1.HistoricoConfig)
    ], ConfigComponent.prototype, "config", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ConfigComponent.prototype, "toogleColumn", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ConfigComponent.prototype, "toogleChildren", void 0);
    ConfigComponent = __decorate([
        core_1.Component({
            selector: 'app-config',
            templateUrl: './config.component.html'
        }),
        __metadata("design:paramtypes", [])
    ], ConfigComponent);
    return ConfigComponent;
}());
exports.ConfigComponent = ConfigComponent;
//# sourceMappingURL=config.component.js.map