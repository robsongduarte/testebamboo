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
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../environments/environment");
var AnexoEmpresaService = /** @class */ (function () {
    function AnexoEmpresaService(http) {
        this.http = http;
        this.url = environment_1.environment.url_estrutura;
        this.API = this.url + '/api/govc/v1/empresaAnexos';
        console.log('AnexoService');
    }
    AnexoEmpresaService.prototype.download = function (cdAnexo) {
        return this.http.get(this.API + "/downloadFile/" + cdAnexo);
    };
    AnexoEmpresaService.prototype.deleteFile = function (cdAnexo) {
        return this.http.delete(this.API + "/deleteFile/" + cdAnexo);
    };
    AnexoEmpresaService.prototype.delete = function (cdAnexo) {
        return this.http.delete(this.API + "/" + cdAnexo);
    };
    AnexoEmpresaService.prototype.findAllByEmpresa = function (cdEmpresa) {
        return this.http.get(this.API + "/findAll/" + cdEmpresa);
    };
    AnexoEmpresaService.prototype.save = function (anexo) {
        return this.http.post("" + this.API, anexo);
    };
    AnexoEmpresaService.prototype.upload = function (arquivo) {
        var formData = new FormData();
        formData.append('file', arquivo);
        var headers = new http_1.HttpHeaders({
            'Accept': 'application/json'
        });
        return this.http.post(this.API + "/uploadFile", formData, { headers: headers });
    };
    AnexoEmpresaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AnexoEmpresaService);
    return AnexoEmpresaService;
}());
exports.AnexoEmpresaService = AnexoEmpresaService;
//# sourceMappingURL=anexo-empresa.service.js.map