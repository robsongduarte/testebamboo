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
require("rxjs/add/operator/map");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var EmpresaService = /** @class */ (function () {
    function EmpresaService(http) {
        this.http = http;
        this.url = environment_1.environment.url_estrutura;
        this.API = this.url + '/api/govc/v1/empresas/';
        console.log('EmpresaService');
    }
    EmpresaService.prototype.all = function () {
        return this.http.get(this.API).pipe(operators_1.map(function (result) {
            if (result.page.totalElements == 0) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.findById = function (id) {
        return this.http.get(this.API.concat(id.toString()))
            .pipe(operators_1.map(function (result) {
            if (result == null) {
                return null;
            }
            return result.empresa;
        }));
    };
    EmpresaService.prototype.findByName = function (nmEmpresa) {
        return this.http.get(this.API.concat('find?name=' + nmEmpresa)).pipe(operators_1.map(function (result) {
            if (result.page.totalElements == 0) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.allByEmpresas = function (nmEmpresa, nmSigla, tipoEmpresa, situacao) {
        return this.http.get(this.API.concat('find-empresas/empresa/' + nmEmpresa + '/sigla/' + nmSigla + '/tipo/' + tipoEmpresa +
            '/situacao/' + situacao))
            .pipe(operators_1.map(function (result) {
            if (result == null) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.allByEmpresaControladora = function (cdEmpresa) {
        return this.http.get(this.API.concat('/find-empresa-controladora/cdEmpresa/' + cdEmpresa))
            .pipe(operators_1.map(function (result) {
            if (result == null) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.save = function (empresa) {
        return this.http.post(this.API, empresa, httpOptions)
            .pipe(operators_1.map(function (result) {
            if (result == null) {
                return null;
            }
            return result;
        }));
    };
    EmpresaService.prototype.findAuditoria = function (table, idColumn, idValue) {
        return this.http.post(this.API + "auditoria", {
            table: table,
            idColumn: idColumn,
            idValue: idValue,
            children: [{
                    table: 'govc_localidade',
                    columnParent: 'cd_empresa',
                    columnChildren: 'cd_empresa'
                },
                {
                    table: 'govc_empresa_anexo',
                    columnParent: 'cd_empresa',
                    columnChildren: 'cd_empresa'
                }]
        });
    };
    EmpresaService.prototype.findEmpresasFilhaByEmpresaPaiWithLevels = function (cdEmpresa) {
        return this.http.get(this.API.concat('/find/empresas-filhas-withlevel/' + cdEmpresa))
            .pipe(operators_1.map(function (result) {
            if (result == null) {
                return null;
            }
            return result;
        }));
    };
    EmpresaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EmpresaService);
    return EmpresaService;
}());
exports.EmpresaService = EmpresaService;
//# sourceMappingURL=empresa.service.js.map