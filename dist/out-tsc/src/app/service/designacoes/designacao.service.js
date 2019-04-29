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
var environment_1 = require("./../../../environments/environment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var operators_2 = require("rxjs/operators");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var DesignacaoService = /** @class */ (function () {
    function DesignacaoService(http) {
        this.http = http;
        this.url = environment_1.environment.url_designacoes;
        this.API = this.url + '/api/govc/v1/designacoes/';
        console.log('DesignacaoService');
    }
    DesignacaoService.prototype.ngOnInit = function () {
    };
    DesignacaoService.prototype.list = function (termoBusca) {
        return this.http.get(this.API.concat('find?name=' + termoBusca))
            .pipe(operators_1.tap(console.log));
    };
    DesignacaoService.prototype.allaByDesignadoAndEmpresaAndVigencia = function (nmDesignado, cdEmpresa, cdNivel, dtVigenciaInicial, dtVigenciaFinal) {
        return this.http.get(this.API.concat('find-designados/designado/' + nmDesignado + '/empresa/' + cdEmpresa + '/nivel/' + cdNivel +
            '/inicioVigencia/' + dtVigenciaInicial + '/finalVigencia/' + dtVigenciaFinal))
            .pipe(operators_2.map(function (result) {
            if (result == null) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    DesignacaoService.prototype.findById = function (id) {
        return this.http.get(this.API.concat(id))
            .pipe(operators_2.map(function (result) {
            if (result == null) {
                return null;
            }
            return result.designacao;
        }));
    };
    DesignacaoService.prototype.save = function (designado) {
        return this.http.post(this.API, designado);
    };
    DesignacaoService.prototype.findAuditoria = function (table, idColumn, idValue) {
        return this.http.post(this.API + "auditoria", {
            table: table,
            idColumn: idColumn,
            idValue: idValue,
            children: [{
                    table: 'govc_designacao_nivel',
                    columnParent: 'cd_designacao',
                    columnChildren: 'cd_designacao'
                }]
        });
    };
    DesignacaoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DesignacaoService);
    return DesignacaoService;
}());
exports.DesignacaoService = DesignacaoService;
//# sourceMappingURL=designacao.service.js.map