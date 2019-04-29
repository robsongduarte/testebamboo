(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/service/designacoes/designacao.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/service/designacoes/designacao.service.ts ***!
  \***********************************************************/
/*! exports provided: DesignacaoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignacaoService", function() { return DesignacaoService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json'
    })
};
var DesignacaoService = /** @class */ (function () {
    function DesignacaoService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url_designacoes;
        this.API = this.url + '/api/govc/v1/designacoes/';
        console.log('DesignacaoService');
    }
    DesignacaoService.prototype.ngOnInit = function () {
    };
    DesignacaoService.prototype.list = function (termoBusca) {
        return this.http.get(this.API.concat('find?name=' + termoBusca))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(console.log));
    };
    DesignacaoService.prototype.allaByDesignadoAndEmpresaAndVigencia = function (nmDesignado, cdEmpresa, cdNivel, dtVigenciaInicial, dtVigenciaFinal) {
        return this.http.get(this.API.concat('find-designados/designado/' + nmDesignado + '/empresa/' + cdEmpresa + '/nivel/' + cdNivel +
            '/inicioVigencia/' + dtVigenciaInicial + '/finalVigencia/' + dtVigenciaFinal))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result == null) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    DesignacaoService.prototype.findById = function (id) {
        return this.http.get(this.API.concat(id))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DesignacaoService);
    return DesignacaoService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map