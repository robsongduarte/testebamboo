(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["designacoes-designacoes-module"],{

/***/ "./src/app/routes/designacoes/designacoes.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/routes/designacoes/designacoes.module.ts ***!
  \**********************************************************/
/*! exports provided: DesignacoesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignacoesModule", function() { return DesignacoesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ag-grid-angular/main */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_select_ex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-select-ex */ "./node_modules/ngx-select-ex/esm5/ngx-select-ex.js");
/* harmony import */ var _formulariosPermissao_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formulariosPermissao/formularios.permissao.component */ "./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: 'formulariosPermissao', component: _formulariosPermissao_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_4__["FormulariosPermissaoComponent"] }
];
var DesignacoesModule = /** @class */ (function () {
    function DesignacoesModule() {
    }
    DesignacoesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes),
                ngx_select_ex__WEBPACK_IMPORTED_MODULE_3__["NgxSelectModule"],
                ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2__["AgGridModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_6__["NgxPaginationModule"]
            ],
            declarations: [
                _formulariosPermissao_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_4__["FormulariosPermissaoComponent"],
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], DesignacoesModule);
    return DesignacoesModule;
}());



/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading\">\r\n  <div>Lista de Designações\r\n  </div>\r\n</div>\r\n<!-- START card-->\r\n<section>\r\n  <div class=\"card border-dark radius-top-only mb-0\">\r\n    <div class=\"card-header bg-dark text-white radius-top-only\">\r\n      <h5 class=\"mb-0 pb-1 pt-1\">\r\n        Filtros\r\n      </h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"card rounded-0 border-grey\">\r\n    <div class=\"card-body\">\r\n      <form [formGroup]=\"formPermissao\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n\r\n        <fieldset>\r\n          <!--Spinner-->\r\n          <ngx-spinner\r\n                      bdColor = \"rgba(245,238,238,0.8)\"\r\n                      size = \"default\"\r\n                      color = \"#00f2f2\"\r\n                      type = \"ball-clip-rotate\"\r\n                      >\r\n          </ngx-spinner>\r\n          <!--Designado-->\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <label class=\"col-form-label text-left\">Designado</label>\r\n              <input class=\"form-control\" type=\"text\" autofocus=\"autofocus\" maxlength=\"100\" formControlName=\"designado\"/>\r\n            </div>\r\n          </div>\r\n          <!--Empresa-->\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <label class=\"col-form-label text-left\">Empresa</label>\r\n                <ngx-select [allowClear]=\"true\"\r\n                            [(items)]=\"empresas\"\r\n                            [disabled]=\"false\"\r\n                            [(ngModel)]=\"ngxValue\"\r\n                            [ngModelOptions]=\"{standalone: true}\"\r\n                            optionValueField=\"cdEmpresa\" optionTextField=\"nmEmpresa\"\r\n                            (select)=\"carregarNivel()\"\r\n                            (remove)=\"removerEmpresa()\"\r\n                            (keyup)=\"onKeyUp($event)\"\r\n                            placeholder=\"Digite o nome da empresa\">\r\n                </ngx-select>\r\n                <ng-template ngx-select-option-not-found>\r\n                  Empresa não encontrada!\r\n                </ng-template>\r\n                <input type=\"hidden\" formControlName=\"empresa\" name=\"empresa\" [(ngModel)]=\"ngxValue\">\r\n            </div>\r\n          </div>\r\n          <!--Nivel-->\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <label class=\"col-form-label text-left\">Nível</label>\r\n                <ngx-select [allowClear]=\"true\"\r\n                            [(items)]=\"niveis\"\r\n                            [disabled]=\"habilitarNivel\"\r\n                            [(ngModel)]=\"ngxValueNivel\"\r\n                            [ngModelOptions]=\"{standalone: true}\"\r\n                            optionValueField=\"cdNivel\" optionTextField=\"nmAbreviatura\"\r\n                            (remove)=\"removerNivel()\"\r\n                            placeholder=\"Nenhum nível selecionado\">\r\n                            <ng-template ngx-select-option ngx-select-option-selected let-option let-text=\"text\">\r\n                              {{option.data.nmAbreviatura}} - {{option.data.nmNivel}}\r\n                            </ng-template>\r\n                </ngx-select>\r\n                <input type=\"hidden\" formControlName=\"nivel\" name=\"nivel\" [(ngModel)]=\"ngxValueNivel\">\r\n            </div>\r\n          </div>\r\n          <!--Data Vigencia-->\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <label class=\"col-form-label text-left\">Vigência Inicial</label>\r\n              <input class=\"form-control\" type=\"date\" (change)=\"carregarDatainicioVigencia()\" formControlName=\"inicioVigencia\" [formControl]=\"formPermissao.controls['inicioVigencia']\"/>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formPermissao.controls['inicioVigencia'].hasError('dateValidator') && (formPermissao.controls['inicioVigencia'].dirty || formPermissao.controls['inicioVigencia'].touched)\">\r\n                Digite uma data válida.\r\n              </span>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formPermissao.controls['inicioVigencia'].hasError('dataInvalida') && (formPermissao.controls['inicioVigencia'].dirty || formPermissao.controls['inicioVigencia'].touched)\">\r\n                Data deve ser maior ou igual a 01/01/2000.\r\n              </span>\r\n            </div>\r\n            <div class=\"col\">\r\n              <label class=\"col-form-label text-right\">Até</label>\r\n              <input class=\"form-control\" type=\"date\" [min]=\"dataMinima\" (change)=\"carregarDataFimVigencia()\" formControlName=\"finalVigencia\" [formControl]=\"formPermissao.controls['finalVigencia']\"/>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formPermissao.controls['finalVigencia'].hasError('dateValidator') && (formPermissao.controls['finalVigencia'].dirty || formPermissao.controls['finalVigencia'].touched)\">\r\n                Digite uma data válida.\r\n              </span>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formPermissao.controls['finalVigencia'].hasError('dataInvalida') && (formPermissao.controls['finalVigencia'].dirty || formPermissao.controls['finalVigencia'].touched)\">\r\n                Data deve ser maior ou igual a 01/01/2000.\r\n              </span>\r\n              <span\r\n                class=\"text-danger\"\r\n                *ngIf=\"formPermissao.hasError('dataInicioMaior') && !formPermissao.controls['finalVigencia'].hasError('dataInvalida')\">\r\n                Data fim menor que a data de início.\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </fieldset>\r\n        <!--Botões-->\r\n        <fieldset>\r\n          <div class=\"panel-footer text-right\">\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-outline-primary\" (click)=\"limpar()\">Limpar</button>\r\n              <button style=\"margin: 0 5px;\" type=\"submit\" class=\"btn btn-primary\" (click)=\"pesquisar()\" [disabled]=\"formPermissao.invalid\">Pesquisar</button>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n\r\n      <div class=\"card border-dark radius-top-only mb-0\">\r\n        <div class=\"card-header bg-dark text-white radius-top-only\">\r\n          <h5 class=\"mb-0 pb-1 pt-1\">\r\n            <i class=\"fa fa-table\"></i>\r\n            Lista de formulários de permissões\r\n          </h5>\r\n        </div>\r\n      </div>\r\n      <!--Tabela de retorno designado-->\r\n      <div class=\"card rounded-0 border-grey\">\r\n        <table class=\"table table-bordered\">\r\n          <thead>\r\n            <tr>\r\n              <th scope=\"col\" *ngFor=\"let head of headElements; let i = index\">\r\n                {{head}}\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tbody *ngFor=\"let j = index; let designado of designados | paginate: { itemsPerPage: 10, currentPage: p }\">\r\n            <tr (click)=\"abrirNiveis(j)\" [attr.aria-expanded]=\"!isCollapsed\" aria-controls=\"collapseBasic\" class=\"clickable\">\r\n              <td class=\"col-md-4\">{{designado.nmDesignado}}</td>\r\n              <td class=\"col-md-5\">{{designado.tipoDesignacao == null ? \"\" : designado.tipoDesignacao.nome}}</td>\r\n              <td class=\"col-md-3\">{{designado.dsTitulo}}</td>\r\n              <td>\r\n                <div class=\"text-right\">\r\n                  <button type=\"button\" class=\"btn btn-info btn-sm mr-1\" (click)=\"editar(designado)\">\r\n                    <i class=\"fa fa-eye\"></i>\r\n                  </button>\r\n                </div>\r\n              </td>\r\n            </tr>\r\n            <tr *ngIf=\"designado.designacoesNiveis.length>0 && indiceTabela == j && !isCollapsed\">\r\n              <td colspan=\"4\" class=\"text-center\">\r\n                <div  display=\"table-row\" [collapse]=\"isCollapsed\">\r\n                  <table class=\"table\">\r\n                    <thead class=\"black white-text\">\r\n                      <tr>\r\n                        <th *ngFor=\"let nivel of headNivel; let i = index\" scope=\"col\">\r\n                          {{nivel}}\r\n                        </th>\r\n                      </tr>\r\n                    </thead>\r\n                      <tbody>\r\n                        <tr *ngFor=\"let designacoesNiveis of designado.designacoesNiveis\">\r\n                          <td>{{designacoesNiveis.nivel.nmEmpresa}}</td>\r\n                          <td>{{designacoesNiveis.nivel.nmAbreviatura}}</td>\r\n                          <td>{{designacoesNiveis.dtVigenciaInicio | date:'dd/MM/yyyy'}}</td>\r\n                          <td>{{designacoesNiveis.dtVigenciaFim | date:'dd/MM/yyyy'}}</td>\r\n                        </tr>\r\n                      </tbody>\r\n                  </table>\r\n                </div>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div *ngIf=\"designados.length==0\">\r\n          <div class=\"alert alert-light\" role=\"alert\">\r\n            Nenhum registro encontrado.\r\n          </div>\r\n        </div>\r\n        <div class=\"mx-auto w-50 text-center\" *ngIf=\"designados.length > 0\">\r\n          <pagination-controls previousLabel=\"Anterior\" (click)=\"mudancaPagina()\" nextLabel=\"Próximo\" (pageChange)=\"p = $event\"></pagination-controls>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.scss":
/*!**********************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlcy9kZXNpZ25hY29lcy9mb3JtdWxhcmlvc1Blcm1pc3Nhby9mb3JtdWxhcmlvcy5wZXJtaXNzYW8uY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.ts ***!
  \********************************************************************************************/
/*! exports provided: FormulariosPermissaoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormulariosPermissaoComponent", function() { return FormulariosPermissaoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
/* harmony import */ var _service_designacoes_designacao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../service/designacoes/designacao.service */ "./src/app/service/designacoes/designacao.service.ts");
/* harmony import */ var _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../service/estrutura/nivel.service */ "./src/app/service/estrutura/nivel.service.ts");
/* harmony import */ var _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/validators/date.validator */ "./src/app/shared/validators/date.validator.ts");
/* harmony import */ var _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/validators/dateRange.validator */ "./src/app/shared/validators/dateRange.validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FormulariosPermissaoComponent = /** @class */ (function () {
    function FormulariosPermissaoComponent(fb, router, empresaService, designacaoService, nivelService, spinner) {
        this.fb = fb;
        this.router = router;
        this.empresaService = empresaService;
        this.designacaoService = designacaoService;
        this.nivelService = nivelService;
        this.spinner = spinner;
        this.isCollapsed = true;
        this.indiceTabela = null;
        this.empresas = [];
        this.niveis = [];
        this.designados = [];
        this.ngxValue = 0;
        this.ngxValueNivel = 0;
        this.headElements = ['Designado', 'Tipo de Designação', 'Título', ' '];
        this.headNivel = ['Empresa', 'Nivel', 'Início', 'Fim'];
        this.value = null;
        this.p = 1;
        this.dtInicio = new Date();
        this.dtFim = new Date();
        this.habilitarNivel = true;
        this.spinner.show();
        this._createForm();
        this.spinner.hide();
    }
    FormulariosPermissaoComponent.prototype._createForm = function () {
        this.formPermissao = this.fb
            .group({
            designado: [null],
            empresa: [0],
            nivel: [0],
            inicioVigencia: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_7__["DateValidator"].dateValidator, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_7__["DateValidator"].dataInvalida])],
            finalVigencia: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_7__["DateValidator"].dateValidator, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_7__["DateValidator"].dataInvalida])]
        }, { validator: _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_8__["DateRangeValidator"].dataInicioMaior('inicioVigencia', 'finalVigencia') });
    };
    FormulariosPermissaoComponent.prototype.ngOnInit = function () {
        //this._all();
    };
    FormulariosPermissaoComponent.prototype.limpar = function () {
        this._createForm();
        this.ngxValue = 0;
        this.ngxValueNivel = 0;
        this.habilitarNivel = true;
    };
    FormulariosPermissaoComponent.prototype.carregarNivel = function () {
        this.habilitarNivel = false;
        this.allByEmpresa();
        //Array.from(new Set(this.niveis.map((item: any) => item.nmAbreviatura)));
        this.niveis = this.niveis.filter(function (obj, pos, arr) {
            return arr.map(function (mapObj) { return mapObj.nmAbreviatura; }).indexOf(obj.nmAbreviatura) === pos;
        });
    };
    FormulariosPermissaoComponent.prototype.removerEmpresa = function () {
        this.empresas = [];
        this.niveis = [];
        this.ngxValue = 0;
        this.habilitarNivel = true;
        this.ngxValueNivel = 0;
    };
    FormulariosPermissaoComponent.prototype.removerNivel = function () {
        this.ngxValueNivel = 0;
    };
    FormulariosPermissaoComponent.prototype.pesquisar = function () {
        var _this = this;
        this.spinner.show();
        this.designados = [];
        if (this.formPermissao.value.designado == '') {
            this.formPermissao.value.designado = null;
        }
        if (this.formPermissao.value.inicioVigencia == '') {
            this.formPermissao.value.inicioVigencia = null;
        }
        if (this.formPermissao.value.finalVigencia == '') {
            this.formPermissao.value.finalVigencia = null;
        }
        if (this.formPermissao.value.empresa == null) {
            this.formPermissao.value.empresa = 0;
        }
        if (this.formPermissao.value.nivel == null) {
            this.formPermissao.value.nivel = 0;
        }
        this.designacaoService.allaByDesignadoAndEmpresaAndVigencia(this.formPermissao.value.designado, this.formPermissao.value.empresa, this.formPermissao.value.nivel, this.formPermissao.value.inicioVigencia, this.formPermissao.value.finalVigencia)
            .subscribe(function (designados) {
            if (designados != null) {
                for (var _i = 0, designados_1 = designados; _i < designados_1.length; _i++) {
                    var designado = designados_1[_i];
                    _this.designados.push(designado.designacao);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoComponent.prototype.editar = function (editarDesignado) {
        console.log('teste');
        this.router.navigate(['editar-formularios-permissao', editarDesignado.cdDesignacao]);
    };
    FormulariosPermissaoComponent.prototype._all = function () {
        var _this = this;
        this.spinner.show();
        this.empresas = [];
        this.empresaService.all()
            .subscribe(function (empresas) {
            if (empresas != null) {
                for (var _i = 0, empresas_1 = empresas; _i < empresas_1.length; _i++) {
                    var empresa = empresas_1[_i];
                    _this.empresas.push(empresa.empresa);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoComponent.prototype.allByEmpresa = function () {
        var _this = this;
        this.spinner.show();
        this.niveis = [];
        this.nivelService.allByEmpresa(this.ngxValue)
            .subscribe(function (niveis) {
            if (niveis != null) {
                for (var _i = 0, niveis_1 = niveis; _i < niveis_1.length; _i++) {
                    var nivel = niveis_1[_i];
                    _this.niveis.push(nivel.nivel);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoComponent.prototype.onKeyUp = function (event) {
        var _this = this;
        this.value = event.target.value;
        var promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (_this.value.length > 0) {
                    _this.findByName(_this.value);
                }
                else {
                    _this.empresas = [];
                }
            }, 2000);
        });
    };
    FormulariosPermissaoComponent.prototype.findByName = function (nmEmpresa) {
        var _this = this;
        this.removerEmpresa();
        this.spinner.show();
        this.empresaService.findByName(nmEmpresa)
            .subscribe(function (empresas) {
            if (empresas != null) {
                _this.empresas = [];
                for (var _i = 0, empresas_2 = empresas; _i < empresas_2.length; _i++) {
                    var empresa = empresas_2[_i];
                    _this.empresas.push(empresa.empresa);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoComponent.prototype.carregarDatainicioVigencia = function () {
        this.dataMinima = this.formPermissao.value.inicioVigencia;
        this.carregarDatas();
    };
    FormulariosPermissaoComponent.prototype.carregarDataFimVigencia = function () {
        this.carregarDatas();
    };
    FormulariosPermissaoComponent.prototype.carregarDatas = function () {
        this.dtFim = new Date(this.formPermissao.value.finalVigencia);
        this.dtInicio = new Date(this.formPermissao.value.inicioVigencia);
    };
    FormulariosPermissaoComponent.prototype.abrirNiveis = function (indice) {
        this.isCollapsed = !this.isCollapsed;
        if (this.indiceTabela != null && this.indiceTabela != indice && this.isCollapsed) {
            this.isCollapsed = !this.isCollapsed;
        }
        this.indiceTabela = indice;
    };
    FormulariosPermissaoComponent.prototype.mudancaPagina = function () {
        this.isCollapsed = true;
        this.indiceTabela = null;
    };
    FormulariosPermissaoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formularios-permissao-component',
            template: __webpack_require__(/*! ./formularios.permissao.component.html */ "./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.html"),
            styles: [__webpack_require__(/*! ./formularios.permissao.component.scss */ "./src/app/routes/designacoes/formulariosPermissao/formularios.permissao.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_4__["EmpresaService"],
            _service_designacoes_designacao_service__WEBPACK_IMPORTED_MODULE_5__["DesignacaoService"],
            _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_6__["NivelService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"]])
    ], FormulariosPermissaoComponent);
    return FormulariosPermissaoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=designacoes-designacoes-module.js.map