(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["estrutura-empresas-incluirEmpresas-empresas-incluir-module"],{

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/anexos/anexos.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/anexos/anexos.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Botão incluir Anexo -->\r\n<div class=\"row\">\r\n  <div class=\"form-group col-md-12 text-right\">\r\n    <label class=\"btn btn-info\" (click)=\"openAnexoModal(anexomodal)\">\r\n      Novo Arquivo\r\n    </label>\r\n  </div>\r\n</div>\r\n\r\n<!-- Lista de Anexos -->\r\n<div class=\"card border-dark radius-top-only mb-0\">\r\n  <div class=\"card-header bg-dark text-white radius-top-only\">\r\n    <h5 class=\"mb-0 pb-1 pt-1\">\r\n      <i class=\"fas fa-table\"></i>\r\n      &nbsp;\r\n      Anexos\r\n    </h5>\r\n  </div>\r\n</div>\r\n<div class=\"card rounded-0 border-grey\">\r\n  <div class=\"table-responsive\">\r\n    <table class=\"table table-striped\">\r\n      <thead>\r\n        <tr>\r\n          <th *ngFor=\"let head of heads; let i = index\" scope=\"col\">\r\n            {{ head }}\r\n          </th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let i = index; let anexo of anexos | paginate: { itemsPerPage: 10, currentPage: p }\">\r\n          <td>{{ getNameFile(anexo.nomeArquivo) }}</td>\r\n          <td>{{ getDateFile(anexo.dateCreate) }}</td>\r\n          <td class=\"text-right\">\r\n            <div class=\"text-right\">\r\n              <button type=\"button\" class=\"btn btn-info btn-sm ml-1\" (click)=\"download(anexo)\">\r\n                <i class=\"fa fa-download\"></i>\r\n              </button>\r\n              <button type=\"button\" class=\"btn btn-danger btn-sm ml-1\" (click)=\"excluir(anexo)\">\r\n                <i class=\"fa fa-trash\"></i>\r\n              </button>\r\n            </div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  <div *ngIf=\"anexos.length == 0\">\r\n    <div class=\"alert alert-light\" role=\"alert\">\r\n      Nenhum registro encontrado.\r\n    </div>\r\n  </div>\r\n  <div class=\"mx-auto w-50 text-center\" *ngIf=\"anexos.length > 0\">\r\n    <pagination-controls previousLabel=\"Anterior\" nextLabel=\"Próximo\" (pageChange)=\"p = $event\"></pagination-controls>\r\n  </div>\r\n</div>\r\n\r\n<ng-template #anexomodal let-d=\"dismiss\" let-c=\"close\">\r\n  <div class=\"modal-header bg-dark text-white pt-3 pb-3 rounded-0\">\r\n    <h5 class=\"modal-title\" id=\"modal-basic-title\" class=\"mb-0\">\r\n      Adicionar Arquivo\r\n    </h5>\r\n    <button type=\"button\" class=\"close text-white pt-2 pb-2\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <label class=\"btn-lg btn btn-primary btn-block btn-file\">\r\n      <i class=\"fa fa-file\"></i>\r\n      &nbsp;\r\n      Selecionar arquivo\r\n      <input type=\"file\" (change)=\"onFileSelected($event)\" style=\"display: none\" />\r\n    </label>\r\n    <label class=\"btn btn-outline-primary btn-block border-white text-secondary bg-white\" *ngIf=\"arquivoSelecionado\">\r\n      Arquivo: {{ arquivoSelecionado?.name }}\r\n    </label>\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"c('cancelar')\">Cancelar</button>\r\n    <button type=\"button\" class=\"btn btn-success\" (click)=\"c('salvar')\" [disabled]=\"arquivoSelecionado == undefined\">Salvar</button>\r\n  </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/anexos/anexos.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/anexos/anexos.component.ts ***!
  \**************************************************************************************/
/*! exports provided: AnexosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnexosComponent", function() { return AnexosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _service_estrutura_anexo_empresa_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../service/estrutura/anexo-empresa.service */ "./src/app/service/estrutura/anexo-empresa.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var AnexosComponent = /** @class */ (function () {
    function AnexosComponent(anexoEmpresaService, modalService, document, locale, datePipe) {
        this.anexoEmpresaService = anexoEmpresaService;
        this.modalService = modalService;
        this.document = document;
        this.locale = locale;
        this.datePipe = datePipe;
        this.anexos = [];
        this.heads = ['Arquivo', 'Criação'];
    }
    AnexosComponent.prototype.ngOnInit = function () {
        if (this.cdEmpresa != undefined) {
            this.carregarAnexos();
        }
    };
    AnexosComponent.prototype.carregarAnexos = function () {
        var _this = this;
        this.anexoEmpresaService.findAllByEmpresa(this.cdEmpresa)
            .subscribe(function (anexos) { return _this.anexos = anexos; });
    };
    AnexosComponent.prototype.onFileSelected = function (event) {
        if (event == undefined) {
            return;
        }
        this.arquivoSelecionado = event.target.files[0];
    };
    AnexosComponent.prototype.clearFileSelected = function () {
        this.arquivoSelecionado = undefined;
    };
    AnexosComponent.prototype.salvarArquivo = function () {
        var _this = this;
        this.anexoEmpresaService.upload(this.arquivoSelecionado)
            .subscribe(function (_a) {
            var value0 = _a.value0;
            return _this.salvarAnexo(value0);
        }, function () { return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(_this.error({
            text: 'Houve um erro ao salvar o arquivo.'
        })); });
    };
    AnexosComponent.prototype.salvarAnexo = function (nomeArquivo) {
        var _this = this;
        this.anexoEmpresaService.save(this.createEmpresaAnexo(nomeArquivo))
            .subscribe(function () {
            _this.carregarAnexos();
            _this.clearFileSelected();
        }, function () { return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(_this.error({
            text: 'Houve um erro ao salvar o anexo.'
        })); }, function () { return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(_this.success({
            text: 'Seu arquivo foi salvo com sucesso.'
        })); });
    };
    AnexosComponent.prototype.createEmpresaAnexo = function (nomeArquivo) {
        var empresa = { cdEmpresa: this.cdEmpresa };
        return { nomeArquivo: nomeArquivo, empresa: empresa, dateCreate: new Date() };
    };
    AnexosComponent.prototype.success = function (settings) {
        var options = {
            type: 'success',
            title: 'Sucesso',
            showCancelButton: false,
            confirmButtonText: 'Ok'
        };
        return this.modal(Object.assign(options, settings ? settings : {}));
    };
    AnexosComponent.prototype.error = function (settings) {
        var options = {
            type: 'error',
            title: 'Erro',
            showCancelButton: false,
            confirmButtonText: 'Ok'
        };
        return this.modal(Object.assign(options, settings ? settings : {}));
    };
    AnexosComponent.prototype.modal = function (settings) {
        var options = {
            title: 'Deseja realmente excluir o Anexo?',
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: '#F90808',
            cancelButtonClass: "btn btn-danger",
            cancelButtonText: 'Não',
            confirmButtonColor: '#23AB16',
            confirmButtonClass: "btn btn-success",
            confirmButtonText: 'Sim'
        };
        return Object.assign(options, settings ? settings : {});
    };
    AnexosComponent.prototype.download = function (_a) {
        var _this = this;
        var cdAnexo = _a.cdAnexo, nomeArquivo = _a.nomeArquivo;
        this.anexoEmpresaService.download(cdAnexo)
            .subscribe(function (_a) {
            var value0 = _a.value0, value1 = _a.value1;
            return _this.downloadFile(value1, value0, _this.getNameFile(nomeArquivo));
        }, function () { return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(_this.error({
            text: 'Houve um erro ao baixar o arquivo.'
        })); });
    };
    AnexosComponent.prototype.downloadFile = function (arquivo, type, name) {
        var link = this.document.createElement("a");
        link.href = "data:" + type + ";base64, " + encodeURIComponent(arquivo);
        link.download = name;
        this.document.body.appendChild(link);
        link.click();
        link.remove();
    };
    AnexosComponent.prototype.excluir = function (_a) {
        var _this = this;
        var cdAnexo = _a.cdAnexo;
        sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(this.modal()).then(function (result) {
            if (result.value) {
                _this.deleteFile(cdAnexo);
            }
        });
    };
    AnexosComponent.prototype.deleteFile = function (cdAnexo) {
        var _this = this;
        this.anexoEmpresaService.deleteFile(cdAnexo)
            .subscribe(function () { return _this.deleteAnexo(cdAnexo); }, function () { return _this.deleteAnexo(cdAnexo); });
    };
    AnexosComponent.prototype.deleteAnexo = function (cdAnexo) {
        var _this = this;
        this.anexoEmpresaService.delete(cdAnexo)
            .subscribe(function () { return _this.carregarAnexos(); }, function () { return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(_this.error({
            text: 'Houve um erro ao excluir o anexo.'
        })); }, function () { return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire(_this.success({
            text: 'Seu arquivo foi excluído com sucesso.'
        })); });
    };
    AnexosComponent.prototype.openAnexoModal = function (anexomodal) {
        var _this = this;
        this.modalService.open(anexomodal, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(function (result) { return _this.saveOrClear(result); }, function () { return _this.clearFileSelected(); });
    };
    AnexosComponent.prototype.saveOrClear = function (result) {
        result == 'salvar' ? this.salvarArquivo() : this.clearFileSelected();
    };
    AnexosComponent.prototype.getNameFile = function (name) {
        return name ? name.substring(name.indexOf('-') + 1) : '';
    };
    AnexosComponent.prototype.getDateFile = function (timestamp) {
        return timestamp ? this.datePipe.transform(new Date(timestamp), 'medium', this.locale) : '';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AnexosComponent.prototype, "cdEmpresa", void 0);
    AnexosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-anexos',
            template: __webpack_require__(/*! ./anexos.component.html */ "./src/app/routes/estrutura/empresas/incluirEmpresas/anexos/anexos.component.html"),
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"])),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"])),
        __metadata("design:paramtypes", [_service_estrutura_anexo_empresa_service__WEBPACK_IMPORTED_MODULE_3__["AnexoEmpresaService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], Object, String, _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]])
    ], AnexosComponent);
    return AnexosComponent;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading d-flex\">\r\n  <div class=\"mr-auto\">\r\n    Empresa\r\n  </div>\r\n  <div>\r\n    <app-button-historico label=\"Auditoria\" [link]=\"getLinkHistorico()\" [desabilitar]=\"desabilitarHistorico()\"></app-button-historico>\r\n  </div>\r\n</div>\r\n\r\n<!-- START card-->\r\n<section>\r\n  <div class=\"card border-dark radius-top-only mb-0\">\r\n    <div class=\"card-header bg-dark text-white radius-top-only\">\r\n      <h5 class=\"mb-0 pb-1 pt-1\">\r\n        <i class=\"fas fa-table\"></i>\r\n        &nbsp;\r\n        Empresa\r\n      </h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"card rounded-0 border-grey\">\r\n    <div class=\"card-body\">\r\n      <form [formGroup]=\"formEmpresaIncluir\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n        <fieldset>\r\n          <!--Spinner-->\r\n          <ngx-spinner bdColor = \"rgba(245,238,238,0.8)\"\r\n                       size = \"default\"\r\n                       color = \"#00f2f2\"\r\n                       type = \"ball-clip-rotate\">\r\n          </ngx-spinner>\r\n          <!--Tabs-->\r\n          <ngx-tabset>\r\n            <ngx-tab tabTitle=\"Dados da empresa\">\r\n              <!--Código, Empresa e Sigla-->\r\n              <div class=\"row\">\r\n                <div class=\"form-group col-md-3\">\r\n                  <label class=\"col-form-label text-left\">Código</label>\r\n                  <input class=\"form-control\" type=\"text\" formControlName=\"cdEmpresa\" readonly/>\r\n                </div>\r\n                <div class=\"form-group col-md-6\">\r\n                  <label class=\"col-form-label text-left\">Nome*</label>\r\n                  <input class=\"form-control\" type=\"text\" maxlength=\"100\" formControlName=\"nmEmpresa\" autofocus=\"autofocus\" placeholder=\"Digite um nome\"/>\r\n                </div>\r\n                <div class=\"form-group col-md-3\">\r\n                  <label class=\"col-form-label text-left\">Sigla*</label>\r\n                  <input class=\"form-control\" type=\"text\" maxlength=\"4\" formControlName=\"nmSigla\" [formControl]=\"formEmpresaIncluir.controls['nmSigla']\" placeholder=\"ABC, XYZ\"/>\r\n                  <span class=\"text-danger\" *ngIf=\"formEmpresaIncluir.controls['nmSigla'].hasError('maxLength')\">Tamanho deve estar entre 1 e 4.</span>\r\n                </div>\r\n              </div>\r\n              <!--Denominação Social e Situação-->\r\n              <div class=\"row\">\r\n                <div class=\"form-group col-md-8\">\r\n                  <label class=\"col-form-label text-left\">Denominação Social*</label>\r\n                  <input class=\"form-control\" type=\"text\" maxlength=\"255\" formControlName=\"nmDenominacaoSocial\" [formControl]=\"formEmpresaIncluir.controls['nmDenominacaoSocial']\" placeholder=\"Razão social\"/>\r\n                </div>\r\n                <div class=\"form-group col-md-4\">\r\n                  <label class=\"col-form-label text-left\">Situação</label>\r\n                  <ngx-select [allowClear]=\"false\"\r\n                              [items]=\"itemsSituacao\"\r\n                              [disabled]=\"false\"\r\n                              [(ngModel)]=\"ngxSituacao\"\r\n                              optionValueField=\"id\" optionTextField=\"situacao\"\r\n                              [ngModelOptions]=\"{standalone: true}\">\r\n                  </ngx-select>\r\n                  <input type=\"hidden\" formControlName=\"flAtivo\" name=\"flAtivo\" [(ngModel)]=\"ngxSituacao\">\r\n                </div>\r\n              </div>\r\n              <!--Tipo Empresa-->\r\n              <div class=\"row\">\r\n                <div class=\"form-group col-md-6\">\r\n                    <label class=\"col-form-label text-left\">Tipo de Empresa</label>\r\n                    <ngx-select [allowClear]=\"false\"\r\n                                [items]=\"itemsTipoEmpresa\"\r\n                                [disabled]=\"false\"\r\n                                [(ngModel)]=\"ngxTipoEmpresa\"\r\n                                optionValueField=\"id\" optionTextField=\"tipo\"\r\n                                (select)=\"carregarEmpresaControladora()\"\r\n                                [ngModelOptions]=\"{standalone: true}\">\r\n                    </ngx-select>\r\n                    <input type=\"hidden\" formControlName=\"tipoEmpresa\" name=\"tipoEmpresa\" [(ngModel)]=\"ngxTipoEmpresa\">\r\n                </div>\r\n              </div>\r\n              <!--Empresa Controladora e Participação Capital-->\r\n              <div class=\"form-group row\">\r\n                <div class=\"col-md-8\">\r\n                  <label class=\"col-form-label text-left\">Empresa Controladora</label>\r\n                  <ngx-select [allowClear]=\"true\"\r\n                              [items]=\"empresas\"\r\n                              [disabled]=\"habilitarEmpresaControladora\"\r\n                              [(ngModel)]=\"ngxEmpresaControladora\"\r\n                              optionValueField=\"cdEmpresa\" optionTextField=\"nmEmpresa\"\r\n                              [ngModelOptions]=\"{standalone: true}\"\r\n                              placeholder=\"Selecione\">\r\n                  </ngx-select>\r\n                  <input type=\"hidden\" formControlName=\"empresaControladora\" name=\"empresaControladora\" [(ngModel)]=\"ngxEmpresaControladora\">\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                  <label class=\"col-form-label text-left\">Participação Capital</label>\r\n                  <div class=\"input-group-append\">\r\n                      <input type=\"text\" class=\"form-control\" currencyMask formControlName=\"nrParticipacaoCapital\" [formControl]=\"formEmpresaIncluir.controls['nrParticipacaoCapital']\" [options]=\"{ prefix: '', decimal: ',', allowNegative: 'false' }\"/>\r\n                    <span class=\"input-group-text\">%</span>\r\n                  </div>\r\n                  <span class=\"text-danger\" *ngIf=\"formEmpresaIncluir.controls['nrParticipacaoCapital'].hasError('range') && !formEmpresaIncluir.controls['nrParticipacaoCapital'].hasError('pattern')\">Permitido somente entre 0 à 100.</span>\r\n                </div>\r\n              </div>\r\n              <!--Tipo de Norma-->\r\n              <div class=\"row\">\r\n                <div class=\"form-group col-md-6\">\r\n                    <label class=\"col-form-label text-left\">Tipo de Norma</label>\r\n                    <ngx-select [allowClear]=\"true\"\r\n                                [items]=\"dominiosTipo\"\r\n                                [disabled]=\"false\"\r\n                                [(ngModel)]=\"ngxTipoDominio\"\r\n                                optionValueField=\"cdDominio\" optionTextField=\"nome\"\r\n                                [ngModelOptions]=\"{standalone: true}\"\r\n                                placeholder=\"Selecione\">\r\n                    </ngx-select>\r\n                </div>\r\n              </div>\r\n            </ngx-tab>\r\n            <ngx-tab tabTitle=\"Sede e filiais\" [disabled]=\"habilitarTabs\">\r\n              <div class=\"row mb-1\">\r\n                <div class=\"col-9\">\r\n                  <div class=\"form-group input-group\">\r\n                    <input formControlName=\"pesquisaLocalidade\" [(ngModel)]=\"localidadeFilter.dsLocalidade\" placeholder=\"Pesquisa por localidades.\" type=\"text\" class=\"form-control\">\r\n                    <div class=\"input-group-append\">\r\n                      <button class=\"btn btn-primary\" type=\"button\">\r\n                        <i class=\"fa fa-search\"></i>\r\n                      </button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-3 text-right\">\r\n                  <button type=\"button\" class=\"btn btn-info\" (click)=\"incluirLocalidade()\" data-toggle=\"modal\" data-target=\"#addLocalidadeModal\">\r\n                    <i class=\"fa fa-plus-square\"></i>\r\n                    Incluir\r\n                  </button>\r\n                </div>\r\n              </div>\r\n\r\n              <!--Tabela de localidades-->\r\n              <div class=\"card border-dark radius-top-only mb-0\">\r\n                <div class=\"card-header bg-dark text-white radius-top-only\">\r\n                  <h5 class=\"mb-0 pb-1 pt-1\">\r\n                    <i class=\"fas fa-search\"></i>\r\n                    &nbsp;\r\n                    Buscar Empresa\r\n                  </h5>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"card rounded-0 border-grey\">\r\n                <div class=\"table-responsive\">\r\n                  <table class=\"table table-striped\">\r\n                    <thead>\r\n                        <tr>\r\n                          <th *ngFor=\"let head of headLocalidade; let i = index\" scope=\"col\">\r\n                            {{head}}\r\n                          </th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let i = index; let localidade of localidades | filterBy: localidadeFilter | paginate: { itemsPerPage: 10, currentPage: p }\">\r\n                          <td>{{localidade.dsLocalidade}}</td>\r\n                          <td>{{localidade.nmEnderecoRodape}}</td>\r\n                          <td>{{localidade.situacaoLocalidade ? \"ATIVO\" : \"INATIVO\"}}</td>\r\n                          <td>\r\n                            <div class=\"d-flex flex-row-reverse\">\r\n                              <button style=\"margin: 0 0px;\" type=\"button\" class=\"btn btn-info fa fa-edit\" (click)=\"editarLocalidade(localidade, i)\" data-toggle=\"modal\" data-target=\"#addLocalidadeModal\"></button>\r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"d-flex\">\r\n                              <label class=\"switch switch-lg m-0\">\r\n                                <input type=\"checkbox\"\r\n                                [checked]=\"localidade.situacaoLocalidade\"\r\n                                (change)=\"inativar(localidade, i, $event)\"/>\r\n                                <span></span>\r\n                              </label>\r\n                            </div>\r\n                          </td>\r\n                          <td>\r\n                            <div class=\"d-flex\">\r\n                                <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-danger icon-trash\" *ngIf=\"localidade.cdLocalidade == null\" (click)=\"excluirLocalidade(localidade)\"></button>\r\n                            </div>\r\n                          </td>\r\n                        </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n                <div *ngIf=\"localidades.length == 0 || (localidades | filterBy: localidadeFilter).length == 0\">\r\n                  <div class=\"alert alert-light\" role=\"alert\">\r\n                    Nenhum registro encontrado.\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"mx-auto w-50 text-center\" *ngIf=\"localidades.length>0\">\r\n                <pagination-controls previousLabel=\"Anterior\" nextLabel=\"Próximo\" (pageChange)=\"p = $event\"></pagination-controls>\r\n              </div>\r\n            </ngx-tab>\r\n            <ngx-tab tabTitle=\"Anexos\" [disabled]=\"habilitarTabs\">\r\n              <app-anexos [cdEmpresa]=\"empresa?.cdEmpresa\" *ngIf=\"empresa != undefined && empresa != null\"></app-anexos>\r\n            </ngx-tab>\r\n          </ngx-tabset>\r\n          <!--Botões-->\r\n          <div class=\"panel-footer text-right\">\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-light\" onClick=\"history.go(-1)\">Voltar</button>\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-primary\" *ngIf=\"organograma\" (click)=\"voltarOrganograma()\">Voltar Organograma</button>\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-success\" [disabled]=\"formEmpresaIncluir.invalid\" (click)=\"salvar()\">Salvar</button>\r\n          </div>\r\n          <div class=\"panel-footer text-right\">\r\n            <span class=\"text-danger\" *ngIf=\"formEmpresaIncluir.invalid\">*Preencher todos os campos obrigatórios.</span>\r\n          </div>\r\n        </fieldset>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</section>\r\n\r\n<!-- Modal Localidade -->\r\n<div class=\"modal fade bd-localidade-modal-lg\" id=\"addLocalidadeModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addLocalidadeModalLabel\" aria-hidden=\"true\">\r\n  <form [formGroup]=\"formIncluirLocalidade\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n    <!--Spinner-->\r\n    <ngx-spinner\r\n    bdColor = \"rgba(245,238,238,0.8)\"\r\n    size = \"default\"\r\n    color = \"#00f2f2\"\r\n    type = \"ball-clip-rotate\"\r\n    >\r\n    </ngx-spinner>\r\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header bg-dark text-white pt-3 pb-3\">\r\n          <h5 class=\"modal-title\" id=\"modal-basic-title\" class=\"mb-0\">\r\n            <i class=\"fa fa-table\"></i> Incluir Localidade\r\n          </h5>\r\n          <button type=\"button\" class=\"close text-white pt-2 pb-2\" data-dismiss=\"modal\" aria-label=\"Fechar\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <fieldset>\r\n            <!--Sede, Nome da localidade e Situação-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-2\">\r\n                <br><br>\r\n                <div class=\"form-check mb-1 mr-sm-1\">\r\n                  <div class=\"checkbox c-checkbox\">\r\n                    <label>\r\n                      <input type=\"checkbox\" formControlName=\"flSede\"/>\r\n                      <span class=\"fa fa-check\"></span>Sede\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group col-md-6\">\r\n                <label class=\"col-form-label text-left\">Nome da localidade*</label>\r\n                <input class=\"form-control\" type=\"text\" maxlength=\"100\" formControlName=\"dsLocalidade\" placeholder=\"Digite um nome.\"/>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <label class=\"col-form-label text-left\">Situação*</label>\r\n                <ngx-select [allowClear]=\"false\"\r\n                            [items]=\"itemsSituacao\"\r\n                            [disabled]=\"false\"\r\n                            [(ngModel)]=\"ngxSituacaoLocalidade\"\r\n                            optionValueField=\"id\" optionTextField=\"situacao\"\r\n                            [ngModelOptions]=\"{standalone: true}\">\r\n                </ngx-select>\r\n                <input type=\"hidden\" formControlName=\"situacaoLocalidade\" name=\"situacaoLocalidade\" [(ngModel)]=\"ngxSituacaoLocalidade\">\r\n              </div>\r\n            </div>\r\n            <!--Cep, Logradouro e Número-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">CEP*</label>\r\n                <div class=\"input-group-append\">\r\n                  <input class=\"form-control\" type=\"text\" formControlName=\"vlCep\" mask=\"00000-000\" [formControl]=\"formIncluirLocalidade.controls['vlCep']\"/>\r\n                  <button class=\"btn btn-info\" type=\"button\" [disabled]=\"formIncluirLocalidade.controls['vlCep'].hasError('minlength') || formIncluirLocalidade.controls['vlCep'].hasError('required')\" (click)=\"buscarCep()\">\r\n                    <i class=\"fa fa-search\"></i>\r\n                  </button>\r\n                </div>\r\n                <span class=\"text-danger\" *ngIf=\"formIncluirLocalidade.controls['vlCep'].hasError('minlength')\">Cep inválido.</span>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Logradouro</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nmLogradouro\" maxlength=\"250\"/>\r\n              </div>\r\n              <div class=\"col-md-2\">\r\n                <label class=\"col-form-label text-left\">Número*</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nrLogradouro\" maxlength=\"8\"/>\r\n              </div>\r\n            </div>\r\n            <!--Complemento e Bairro/Distrito-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Complemento</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nmComplemento\" placeholder=\"ex: bloco B, casa 4...\" maxlength=\"50\"/>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Bairro/Distrito</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nmBairro\" maxlength=\"100\"/>\r\n              </div>\r\n            </div>\r\n            <!--Município e UF-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Município</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nmMunicipio\" maxlength=\"100\"/>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label class=\"col-form-label text-left\">UF</label>\r\n                <input class=\"form-control\" maxlength=\"2\" type=\"text\" formControlName=\"nmUf\" [formControl]=\"formIncluirLocalidade.controls['nmUf']\"/>\r\n                <span class=\"text-danger\" *ngIf=\"formIncluirLocalidade.controls['nmUf'].hasError('pattern')\">Permitido somente texto.</span>\r\n                <span class=\"text-danger\" *ngIf=\"formIncluirLocalidade.controls['nmUf'].hasError('minlength')\">Informar dois caracteres.</span>\r\n              </div>\r\n            </div>\r\n            <!--Caixa Postal e Telefone-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">Caixa Postal</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nrCaixaPostal\" placeholder=\"Informe caixa postal'.\" mask=\"0000000000\"/>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">Telefone</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nrTelefone\" placeholder=\"Informe o telefone.\" mask=\"(00) 0000-0000\"/>\r\n              </div>\r\n            </div>\r\n            <!--Endereço p/ rodapés dos documentos-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <label class=\"col-form-label text-left\">Endereço para rodapés dos documentos*</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nmEnderecoRodape\" placeholder=\"Digite como exibir o endereço em documentos.\" maxlength=\"500\"/>\r\n              </div>\r\n            </div>\r\n            <!--CNPJ, Inscrição Estadual e Inscrição Municipal-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">CNPJ</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"CNPJ\" placeholder=\"Informe o CNPJ.\" mask=\"00.000.000/0000-00\"/>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">Inscrição Estadual</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nrInscEstadual\" placeholder=\"Número da inscrição.\" maxlength=\"25\"/>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">Inscrição Municipal</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nrInscMunicipal\" placeholder=\"Número da inscrição.\" maxlength=\"25\"/>\r\n              </div>\r\n            </div>\r\n            <!--Número NIRE e Data registro NIRE-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-4\">\r\n                <label class=\"col-form-label text-left\">Número NIRE</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nrNIRE\" placeholder=\"Informe o NIRE.\" maxlength=\"25\"/>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Data registro NIRE</label>\r\n                <input class=\"form-control\" type=\"date\" formControlName=\"dtRegistroNire\" [formControl]=\"formIncluirLocalidade.controls['dtRegistroNire']\"/>\r\n               <span\r\n                  class=\"text-danger\"\r\n                  *ngIf=\"formIncluirLocalidade.controls['dtRegistroNire'].invalid && (formIncluirLocalidade.controls['dtRegistroNire'].dirty || formIncluirLocalidade.controls['dtRegistroNire'].touched)\">\r\n                  Digite uma data válida.\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </div>\r\n        <!--Botões-->\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Fechar</button>\r\n          <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" (click)=\"salvarLocalidade()\" [disabled]=\"formIncluirLocalidade.invalid\">Salvar</button>\r\n        </div>\r\n        <div class=\"panel-footer text-right\">\r\n          <span class=\"text-danger\" *ngIf=\"formIncluirLocalidade.invalid\">*Preencher todos os campos obrigatórios.</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.scss":
/*!*******************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-tabset:not(.disable-style) {\n  list-style: none;\n  padding: 0;\n  display: flex;\n  align-items: center; }\n  .nav-tabset:not(.disable-style) .nav-tab {\n    padding: 10px;\n    border-bottom: solid 1px transparent;\n    transition: border 200ms ease-out; }\n  .nav-tabset:not(.disable-style) .nav-tab.active {\n      border-color: red; }\n  .nav-tabset:not(.disable-style) .nav-tab.disabled {\n      opacity: 0.5; }\n  .nav-tabset:not(.disable-style) .nav-tab:not(.active):not(.disabled) {\n      cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcm91dGVzL2VzdHJ1dHVyYS9lbXByZXNhcy9pbmNsdWlyRW1wcmVzYXMvQzpcXEFtYmllbnRlXFxXb3Jrc3BhY2VcXGZyb250XFxHT1ZDLTU4Mi1OaXZlbFxcZ292Yy1hd3Mtd2ViL25vZGVfbW9kdWxlc1xcbmd4LXRhYnNldFxcbmd4LXRhYnNldC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBO0VBQ0UsaUJBQWdCO0VBQ2hCLFdBQVU7RUFDVixjQUFhO0VBQ2Isb0JBQW1CLEVBbUJwQjtFQXZCRDtJQU9JLGNBWGtCO0lBWWxCLHFDQWZzQztJQWdCdEMsa0NBZDRDLEVBMkI3QztFQXRCSDtNQVlNLGtCQXBCZ0IsRUFxQmpCO0VBYkw7TUFnQk0sYUFuQm1CLEVBb0JwQjtFQWpCTDtNQW9CTSxnQkF0QmMsRUF1QmYiLCJmaWxlIjoic3JjL2FwcC9yb3V0ZXMvZXN0cnV0dXJhL2VtcHJlc2FzL2luY2x1aXJFbXByZXNhcy9lbXByZXNhcy5pbmNsdWlyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGFjdGl2ZS10YWItY29sb3I6IHJlZCAhZGVmYXVsdDtcbiRkZWZhdWx0LXRhYi1ib3JkZXI6IHNvbGlkIDFweCB0cmFuc3BhcmVudCAhZGVmYXVsdDtcbiR0YWItYm9yZGVyLXRyYW5zaXRpb24tZHVyYXRpb246IDIwMG1zICFkZWZhdWx0O1xuJHRhYi1ib3JkZXItdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0ICFkZWZhdWx0O1xuJG5hdi10YWItcGFkZGluZzogMTBweCAhZGVmYXVsdDtcbiRkaXNhYmxlZC10YWItb3BhY2l0eTogLjUgIWRlZmF1bHQ7XG4kdGFiLWN1cnNvcjogcG9pbnRlciAhZGVmYXVsdDtcblxuLm5hdi10YWJzZXQ6bm90KC5kaXNhYmxlLXN0eWxlKSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgLm5hdi10YWIge1xuICAgIHBhZGRpbmc6ICRuYXYtdGFiLXBhZGRpbmc7XG4gICAgYm9yZGVyLWJvdHRvbTogJGRlZmF1bHQtdGFiLWJvcmRlcjtcbiAgICB0cmFuc2l0aW9uOiBib3JkZXIgJHRhYi1ib3JkZXItdHJhbnNpdGlvbi1kdXJhdGlvbiAkdGFiLWJvcmRlci10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjtcblxuICAgICYuYWN0aXZlIHtcbiAgICAgIGJvcmRlci1jb2xvcjogJGFjdGl2ZS10YWItY29sb3I7XG4gICAgfVxuXG4gICAgJi5kaXNhYmxlZCB7XG4gICAgICBvcGFjaXR5OiAkZGlzYWJsZWQtdGFiLW9wYWNpdHk7XG4gICAgfVxuXG4gICAgJjpub3QoLmFjdGl2ZSk6bm90KC5kaXNhYmxlZCkge1xuICAgICAgY3Vyc29yOiAkdGFiLWN1cnNvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: EmpresasIncluirComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmpresasIncluirComponent", function() { return EmpresasIncluirComponent; });
/* harmony import */ var _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../../shared/validators/date.validator */ "./src/app/shared/validators/date.validator.ts");
/* harmony import */ var _service_correios_correios_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../service/correios/correios.service */ "./src/app/service/correios/correios.service.ts");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-validation */ "./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_validation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
/* harmony import */ var _service_estrutura_dominio_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../service/estrutura/dominio.service */ "./src/app/service/estrutura/dominio.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_filter_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-filter-pipe */ "./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js");
/* harmony import */ var _service_estrutura_anexo_empresa_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../service/estrutura/anexo-empresa.service */ "./src/app/service/estrutura/anexo-empresa.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var swal = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
var EmpresasIncluirComponent = /** @class */ (function () {
    function EmpresasIncluirComponent(fb, route, router, spinner, empresaService, dominioService, correioService, datePipe, anexoEmpresaService, filterPipe) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.spinner = spinner;
        this.empresaService = empresaService;
        this.dominioService = dominioService;
        this.correioService = correioService;
        this.datePipe = datePipe;
        this.anexoEmpresaService = anexoEmpresaService;
        this.filterPipe = filterPipe;
        this.headLocalidade = ['Localidade', 'Endereço', 'Situação', ' ', ' '];
        this.empresas = [];
        this.dominiosTipo = [];
        this.localidades = [];
        this.localidadeFilter = [];
        this.habilitarTabs = true;
        this.habilitarEmpresaControladora = true;
        this.itemsSituacao = [{ 'id': true, 'situacao': 'ATIVO' },
            { 'id': false, 'situacao': 'INATIVO' }];
        this.itemsTipoEmpresa = [{ 'id': 'HOLDING', 'tipo': 'HOLDING' },
            { 'id': 'OPERACIONALHOLDING', 'tipo': 'OPERACIONAL/HOLDING' },
            { 'id': 'OPERACIONAL', 'tipo': 'OPERACIONAL' }];
        this.ngxSituacao = true;
        this.ngxTipoEmpresa = 'HOLDING';
        this.ngxEmpresaControladora = null;
        this.ngxTipoDominio = null;
        this.ngxSituacaoLocalidade = true;
        this.tipoDominio = 'TIPO_EMPRESA_NORMA';
        this.indexLocalidade = null;
        this.organograma = false;
    }
    EmpresasIncluirComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._createForm();
        this.carregarDominioTipo();
        this.route.params.subscribe(function (params) {
            _this.cdEmpresa = params['id'];
            _this.organograma = JSON.parse(params['organograma']);
        });
        if (this.cdEmpresa > 0) {
            this.habilitarTabs = false;
            this.montForm();
        }
    };
    EmpresasIncluirComponent.prototype.montForm = function () {
        var _this = this;
        this.spinner.show();
        this.empresaService.findById(this.cdEmpresa)
            .subscribe(function (empresa) {
            _this.empresa = empresa;
            _this.participacao = empresa.nrParticipacaoCapital;
            _this.formEmpresaIncluir.patchValue({
                cdEmpresa: empresa.cdEmpresa,
                nmEmpresa: empresa.nmEmpresa,
                nmSigla: empresa.nmSigla,
                nmDenominacaoSocial: empresa.nmDenominacaoSocial,
                flAtivo: empresa.flAtivo,
                nrParticipacaoCapital: empresa.nrParticipacaoCapital == null ? null :
                    empresa.nrParticipacaoCapital.toString().replace(",", "."),
                tipoEmpresa: empresa.tipoEmpresa,
                tipoNorma: empresa.tipoNorma,
                empresaControladora: empresa.empresaControladora,
                localidades: empresa.localidades,
                empresaAnexos: empresa.empresaAnexos,
                codigoEmpresaEbs: empresa.codigoEmpresaEbs,
                creationTime: new Date(empresa.creationTime),
                createdByUser: empresa.createdByUser,
                modificationTime: empresa.modificationTime ? new Date(empresa.modificationTime) : null,
                modifiedByUser: empresa.modifiedByUser,
            });
            _this.spinner.hide();
            _this.ngxTipoEmpresa = _this.formEmpresaIncluir.value.tipoEmpresa;
            if (_this.formEmpresaIncluir.value.empresaControladora != null) {
                _this.ngxEmpresaControladora = _this.formEmpresaIncluir.value.empresaControladora.cdEmpresa;
            }
            if (_this.formEmpresaIncluir.value.tipoNorma != null) {
                _this.ngxTipoDominio = _this.formEmpresaIncluir.value.tipoNorma.cdDominio;
            }
            _this.carregarEmpresaControladora();
            _this.localidades = _this.formEmpresaIncluir.value.localidades;
        }, function (error) { return console.log(error); });
    };
    EmpresasIncluirComponent.prototype.createFormIncluirLocalidade = function () {
        this.formIncluirLocalidade = this.fb
            .group({
            cdLocalidade: [null],
            flSede: [null],
            dsLocalidade: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            situacaoLocalidade: [this.ngxSituacaoLocalidade, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            vlCep: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(8)])],
            nmLogradouro: [null],
            nrLogradouro: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            nmComplemento: [null],
            nmBairro: [null],
            nmMunicipio: [null],
            nmUf: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^[a-zA-ZÀ-ú ]+$'), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(2)])],
            nrCaixaPostal: [null],
            nrTelefone: [null],
            nmEnderecoRodape: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            CNPJ: [null],
            nrInscEstadual: [null],
            nrInscMunicipal: [null],
            nrNIRE: [null],
            dtRegistroNire: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_0__["DateValidator"].dateValidator])],
            modificationTime: [null],
            modifiedByUser: [null],
            creationTime: [null],
            createdByUser: [null]
        });
    };
    EmpresasIncluirComponent.prototype.createFormIncluirAnexo = function () {
        this.formIncluirAnexo = this.fb
            .group({
            nomeArquivo: [null]
        });
    };
    EmpresasIncluirComponent.prototype.montFormIncluirLocalidade = function () {
        this.formIncluirLocalidade.patchValue({
            cdLocalidade: this.localidade.cdLocalidade,
            flSede: this.localidade.flSede,
            dsLocalidade: this.localidade.dsLocalidade,
            situacaoLocalidade: this.localidade.situacaoLocalidade,
            vlCep: this.localidade.vlCep,
            nmLogradouro: this.localidade.nmLogradouro,
            nrLogradouro: this.localidade.nrLogradouro,
            nmComplemento: this.localidade.nmComplemento,
            nmBairro: this.localidade.nmBairro,
            nmMunicipio: this.localidade.nmMunicipio,
            nmUf: this.localidade.nmUf,
            nrCaixaPostal: this.localidade.nrCaixaPostal,
            nrTelefone: this.localidade.nrTelefone,
            nmEnderecoRodape: this.localidade.nmEnderecoRodape,
            CNPJ: this.localidade.CNPJ,
            nrInscEstadual: this.localidade.nrInscEstadual,
            nrInscMunicipal: this.localidade.nrInscMunicipal,
            nrNIRE: this.localidade.nrNIRE,
            dtRegistroNire: this.datePipe.transform(this.localidade.dtRegistroNire, 'yyyy-MM-dd'),
            modificationTime: this.localidade.modificationTime,
            modifiedByUser: this.localidade.modifiedByUser,
            creationTime: this.localidade.creationTime,
            createdByUser: this.localidade.createdByUser
        });
    };
    EmpresasIncluirComponent.prototype._createForm = function () {
        this.formEmpresaIncluir = this.fb.group({
            cdEmpresa: [null],
            nmEmpresa: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            nmSigla: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            nmDenominacaoSocial: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            flAtivo: [null],
            nrParticipacaoCapital: [null, ng2_validation__WEBPACK_IMPORTED_MODULE_2__["CustomValidators"].range([0, 10000])],
            tipoEmpresa: [null],
            tipoNorma: [null],
            empresaControladora: [null],
            localidades: [null],
            empresaAnexos: [null],
            codigoEmpresaEbs: [null],
            pesquisaLocalidade: [null],
            creationTime: [null],
            createdByUser: [null],
            modificationTime: [null],
            modifiedByUser: [null],
        });
        this.createFormIncluirLocalidade();
        this.createFormIncluirAnexo();
    };
    EmpresasIncluirComponent.prototype.carregarEmpresaControladora = function () {
        var _this = this;
        this.empresas = [];
        if (this.ngxTipoEmpresa == 'HOLDING') {
            this.habilitarEmpresaControladora = true;
        }
        else {
            this.habilitarEmpresaControladora = false;
            this.spinner.show();
            this.empresaService.allByEmpresaControladora(this.cdEmpresa)
                .subscribe(function (empresas) {
                if (empresas != null) {
                    for (var _i = 0, empresas_1 = empresas; _i < empresas_1.length; _i++) {
                        var empresa = empresas_1[_i];
                        _this.empresas.push(empresa.empresa);
                    }
                }
                _this.spinner.hide();
            }, function (error) { return console.log(error); });
        }
    };
    EmpresasIncluirComponent.prototype.carregarDominioTipo = function () {
        var _this = this;
        this.dominiosTipo = [];
        this.dominioService.findByTipoOrderByNome(this.tipoDominio)
            .subscribe(function (dominios) {
            if (dominios != null) {
                for (var _i = 0, dominios_1 = dominios; _i < dominios_1.length; _i++) {
                    var dominio = dominios_1[_i];
                    _this.dominiosTipo.push(dominio.dominio);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    EmpresasIncluirComponent.prototype.salvar = function () {
        var _this = this;
        var cdEmpresa = this.formEmpresaIncluir.value.cdEmpresa;
        if (cdEmpresa == undefined || cdEmpresa == null) {
            this.save();
        }
        else {
            this.anexoEmpresaService.findAllByEmpresa(cdEmpresa)
                .subscribe(function (anexos) { return _this.save(anexos); });
        }
    };
    EmpresasIncluirComponent.prototype.save = function (anexos) {
        var _this = this;
        this.spinner.show();
        if (this.formEmpresaIncluir.value.nrParticipacaoCapital == 100) {
            this.participacao = this.formEmpresaIncluir.value.nrParticipacaoCapital;
        }
        else {
            this.participacao = this.formEmpresaIncluir.value.nrParticipacaoCapital == null ? null
                : this.formEmpresaIncluir.value.nrParticipacaoCapital.toString().replace(".", "") / 100;
        }
        this.indexTipoDominio = this.dominiosTipo.findIndex((function (obj) { return obj.cdDominio == _this.ngxTipoDominio; }));
        this.indexEmpresaControladora = this.empresas.findIndex((function (obj) { return obj.cdEmpresa == _this.ngxEmpresaControladora; }));
        this.formEmpresaIncluir.patchValue({
            tipoNorma: this.dominiosTipo[this.indexTipoDominio],
            empresaControladora: this.empresas[this.indexEmpresaControladora],
            nrParticipacaoCapital: this.participacao == 100 ? 100 : this.participacao.toFixed(2).replace(".", ","),
            empresaAnexos: anexos
        });
        this.empresaService.save(this.formEmpresaIncluir.value)
            .subscribe(function (result) {
            _this.empresa = result.empresa;
            _this.cdEmpresa = _this.empresa.cdEmpresa;
            _this.habilitarTabs = false;
            _this.formEmpresaIncluir.patchValue({
                cdEmpresa: _this.cdEmpresa,
                pesquisaLocalidade: null
            });
            if (_this.empresa.tipoNorma != null) {
                _this.ngxTipoDominio = _this.empresa.tipoNorma.cdDominio;
            }
            _this.montForm();
            _this.spinner.hide();
            _this.sweetalertSucesso();
        }, function (error) { return console.log(error); });
    };
    EmpresasIncluirComponent.prototype.sweetalertSucesso = function () {
        swal.fire('Empresa salva com sucesso!', '', 'success');
    };
    EmpresasIncluirComponent.prototype.incluirLocalidade = function () {
        this.indexLocalidade = null;
        this.ngxSituacaoLocalidade = true;
        this.createFormIncluirLocalidade();
    };
    EmpresasIncluirComponent.prototype.editarLocalidade = function (localidade, index) {
        index = this.localidades.findIndex((function (obj) { return obj.dsLocalidade == localidade.dsLocalidade; }));
        this.ngxSituacaoLocalidade = localidade.situacaoLocalidade;
        this.indexLocalidade = index;
        this.localidade = localidade;
        this.montFormIncluirLocalidade();
    };
    EmpresasIncluirComponent.prototype.salvarLocalidade = function () {
        if (this.indexLocalidade == null) {
            this.localidades.push(this.formIncluirLocalidade.value);
        }
        else {
            this.localidades[this.indexLocalidade] = this.formIncluirLocalidade.value;
        }
        this.formEmpresaIncluir.patchValue({
            localidades: this.localidades
        });
        this.indexLocalidade = null;
    };
    EmpresasIncluirComponent.prototype.excluirLocalidade = function (localidade) {
        var _this = this;
        swal.fire({
            title: 'Deseja realmente excluir a localidade?',
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: '#F90808',
            cancelButtonClass: "btn btn-danger",
            cancelButtonText: 'Não',
            confirmButtonColor: '#23AB16',
            confirmButtonClass: "btn btn-success",
            confirmButtonText: 'Sim',
            closeOnConfirm: true,
            closeOnCancel: true
        }).then(function (result) {
            if (result.value) {
                _this.localidades = _this.localidades.filter(function (item) { return item !== localidade; });
                _this.formIncluirLocalidade.patchValue({
                    localidades: _this.localidades
                });
            }
        });
    };
    EmpresasIncluirComponent.prototype.buscarCep = function () {
        var _this = this;
        this.spinner.show();
        this.correioService.buscarCep(this.formIncluirLocalidade.value.vlCep)
            .subscribe(function (correio) {
            if (correio != null) {
                _this.formIncluirLocalidade.patchValue({
                    nmLogradouro: correio.logradouro,
                    nmComplemento: correio.complemento,
                    nmBairro: correio.bairro,
                    nmMunicipio: correio.localidade,
                    nmUf: correio.uf,
                    nmEnderecoRodape: correio.logradouro + ' - ' + correio.cep +
                        ' - ' + correio.bairro + ' - ' + correio.localidade +
                        ',' + correio.uf,
                });
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    EmpresasIncluirComponent.prototype.inativar = function (inativarLocalidade, indexInativar, event) {
        var _this = this;
        this.title = inativarLocalidade.situacaoLocalidade == false ? 'Deseja reativar a localidade?' : 'Deseja realmente inativar a localidade?';
        this.type = inativarLocalidade.situacaoLocalidade == false ? 'info' : 'danger';
        swal.fire({
            title: this.title,
            type: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: '#F90808',
            cancelButtonClass: "btn btn-danger",
            cancelButtonText: 'Não',
            confirmButtonColor: '#23AB16',
            confirmButtonClass: "btn btn-success",
            confirmButtonText: 'Sim',
            closeOnConfirm: true,
            closeOnCancel: true
        }).then(function (result) {
            if (result.value) {
                indexInativar = _this.localidades.findIndex((function (obj) { return obj.dsLocalidade == inativarLocalidade.dsLocalidade; }));
                _this.localidades[indexInativar].situacaoLocalidade = inativarLocalidade.situacaoLocalidade == true ? false : true;
            }
            else {
                event.target.checked = inativarLocalidade.situacaoLocalidade;
            }
        });
    };
    EmpresasIncluirComponent.prototype.getLinkHistorico = function (column) {
        var id = this.route.snapshot.params['id'];
        return this.router.url.replace(id, this.cdEmpresa.toString()) + '/historico' + (column ? '/' + column : '');
    };
    EmpresasIncluirComponent.prototype.desabilitarHistorico = function () {
        var id = this.route.snapshot.params['id'];
        return (!id || id === '0') && this.cdEmpresa == 0;
    };
    EmpresasIncluirComponent.prototype.voltarOrganograma = function () {
        this.router.navigate(['/estrutura/organogramaEmpresas', this.cdEmpresa, true]);
    };
    EmpresasIncluirComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-empresas-incluir',
            template: __webpack_require__(/*! ./empresas.incluir.component.html */ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.html"),
            styles: [__webpack_require__(/*! ./empresas.incluir.component.scss */ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.scss")],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"]]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_7__["EmpresaService"],
            _service_estrutura_dominio_service__WEBPACK_IMPORTED_MODULE_8__["DominioService"],
            _service_correios_correios_service__WEBPACK_IMPORTED_MODULE_1__["CorreiosService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"],
            _service_estrutura_anexo_empresa_service__WEBPACK_IMPORTED_MODULE_11__["AnexoEmpresaService"],
            ngx_filter_pipe__WEBPACK_IMPORTED_MODULE_10__["FilterPipe"]])
    ], EmpresasIncluirComponent);
    return EmpresasIncluirComponent;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.module.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.module.ts ***!
  \**************************************************************************************/
/*! exports provided: EmpresasIncluirModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmpresasIncluirModule", function() { return EmpresasIncluirModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _empresas_incluir_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./empresas.incluir.component */ "./src/app/routes/estrutura/empresas/incluirEmpresas/empresas.incluir.component.ts");
/* harmony import */ var ngx_tabset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-tabset */ "./node_modules/ngx-tabset/esm5/ngx-tabset.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_select_ex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-select-ex */ "./node_modules/ngx-select-ex/esm5/ngx-select-ex.js");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/fesm5/ngx-mask.js");
/* harmony import */ var ngx_filter_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-filter-pipe */ "./node_modules/ngx-filter-pipe/esm5/ngx-filter-pipe.js");
/* harmony import */ var ngx_currency__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-currency */ "./node_modules/ngx-currency/index.js");
/* harmony import */ var _historico_empresa_historico_empresa_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./historico-empresa/historico-empresa.component */ "./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico-empresa.component.ts");
/* harmony import */ var _anexos_anexos_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./anexos/anexos.component */ "./src/app/routes/estrutura/empresas/incluirEmpresas/anexos/anexos.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var routes = [
    { path: '', component: _empresas_incluir_component__WEBPACK_IMPORTED_MODULE_4__["EmpresasIncluirComponent"] },
    { path: 'historico/:column', component: _historico_empresa_historico_empresa_component__WEBPACK_IMPORTED_MODULE_12__["HistoricoEmpresaComponent"] },
    { path: 'historico', component: _historico_empresa_historico_empresa_component__WEBPACK_IMPORTED_MODULE_12__["HistoricoEmpresaComponent"] },
];
var EmpresasIncluirModule = /** @class */ (function () {
    function EmpresasIncluirModule() {
    }
    EmpresasIncluirModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                ngx_tabset__WEBPACK_IMPORTED_MODULE_5__["TabsModule"].forRoot(),
                ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
                ngx_select_ex__WEBPACK_IMPORTED_MODULE_7__["NgxSelectModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_8__["NgxPaginationModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_9__["NgxMaskModule"].forRoot(),
                ngx_filter_pipe__WEBPACK_IMPORTED_MODULE_10__["FilterPipeModule"],
                ngx_currency__WEBPACK_IMPORTED_MODULE_11__["NgxCurrencyModule"]
            ],
            declarations: [
                _empresas_incluir_component__WEBPACK_IMPORTED_MODULE_4__["EmpresasIncluirComponent"],
                _historico_empresa_historico_empresa_component__WEBPACK_IMPORTED_MODULE_12__["HistoricoEmpresaComponent"],
                _anexos_anexos_component__WEBPACK_IMPORTED_MODULE_13__["AnexosComponent"]
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"]]
        })
    ], EmpresasIncluirModule);
    return EmpresasIncluirModule;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico-empresa.component.html":
/*!**************************************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico-empresa.component.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading d-flex\">\r\n  <div class=\"mr-auto\">\r\n    Auditoria\r\n  </div>\r\n  <div>\r\n    <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"goBack()\">\r\n      Voltar\r\n    </button>\r\n  </div>\r\n</div>\r\n<!-- START card-->\r\n<section>\r\n  <div class=\"card border-dark radius-top-only mb-0\">\r\n    <div class=\"card-header bg-dark text-white radius-top-only\">\r\n      <h5 class=\"mb-0 pb-1 pt-1\">\r\n        Auditoria\r\n      </h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"card rounded-0 border-grey\">\r\n    <div class=\"card-body pt-0\">\r\n      <app-historico\r\n        *ngIf=\"auditorias.length > 0\"\r\n        [auditorias]=\"auditorias\"\r\n        [config]=\"getConfig()\">\r\n      </app-historico>\r\n      <div class=\"row mt-2\" *ngIf=\"auditorias.length == 0\">\r\n        <div class=\"col\">\r\n          Não há auditorias para esse registro.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico-empresa.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico-empresa.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: HistoricoEmpresaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoricoEmpresaComponent", function() { return HistoricoEmpresaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _historico_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./historico.config */ "./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico.config.ts");
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
/* harmony import */ var _shared_components_historico_model_auditoria_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../shared/components/historico/model/auditoria.model */ "./src/app/shared/components/historico/model/auditoria.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HistoricoEmpresaComponent = /** @class */ (function () {
    function HistoricoEmpresaComponent(activatedRoute, router, empresaService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.empresaService = empresaService;
        this.auditorias = [];
    }
    HistoricoEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.column = this.activatedRoute.snapshot.paramMap.get('column');
        var id = ['cd_empresa', this.activatedRoute.parent.snapshot.params['id']];
        console.log(id, _historico_config__WEBPACK_IMPORTED_MODULE_3__["historicoConfig"].table[0]);
        this.empresaService.findAuditoria(_historico_config__WEBPACK_IMPORTED_MODULE_3__["historicoConfig"].table[0], id[0], id[1])
            .subscribe(function (auditorias) { return _this.auditorias = _this.transformAuditorias(auditorias); });
    };
    HistoricoEmpresaComponent.prototype.transformAuditorias = function (auditorias) {
        return auditorias.map(function (auditoria) { return new _shared_components_historico_model_auditoria_model__WEBPACK_IMPORTED_MODULE_5__["Auditoria"](auditoria); });
    };
    HistoricoEmpresaComponent.prototype.getConfig = function () {
        this.config = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(_historico_config__WEBPACK_IMPORTED_MODULE_3__["historicoConfig"]);
        if (this.column) {
            this.config.setUniqueColumn(this.column);
        }
        return this.config;
    };
    HistoricoEmpresaComponent.prototype.goBack = function () {
        this.router.navigate([this.router.url.replace('/historico', '')]);
    };
    HistoricoEmpresaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-historico-empresa',
            template: __webpack_require__(/*! ./historico-empresa.component.html */ "./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico-empresa.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_4__["EmpresaService"]])
    ], HistoricoEmpresaComponent);
    return HistoricoEmpresaComponent;
}());



/***/ }),

/***/ "./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico.config.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/routes/estrutura/empresas/incluirEmpresas/historico-empresa/historico.config.ts ***!
  \*************************************************************************************************/
/*! exports provided: historicoConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "historicoConfig", function() { return historicoConfig; });
/* harmony import */ var _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../shared/components/historico/model/historico-config.model */ "./src/app/shared/components/historico/model/historico-config.model.ts");
/* harmony import */ var _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/components/historico/model/column-config.model */ "./src/app/shared/components/historico/model/column-config.model.ts");


var columnsChildrenAnexo = [
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_arquivo', label: 'arquivo', type: 'string', funcoes: 'substring:-' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'date_create', label: 'criação', type: 'date', formatDate: 'medium' }),
];
var columnsChildren = [
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_localidade', label: 'código', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'ds_localidade', label: 'nome da localidade', type: 'string', id: true }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'dt_registro_nire', label: 'data registro nire', type: 'date', formatDate: 'llll', isTimestamp: false }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'fl_sede', label: 'sede', type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_bairro', label: 'bairro/distrito', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_complemento', label: 'complemento', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_endereco_rodape', label: 'endereço rodapé', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_logradouro', label: 'logradouro', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_municipio', label: 'município', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_uf', label: 'UF', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_caixa_postal', label: 'caixa postal', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cnpj', label: 'CNPJ', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_insc_estadual', label: 'ins. estadual', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_insc_municipal', label: 'ins. municipal', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_logradouro', label: 'número', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_telefone', label: 'telefone', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'fl_situacao_localidade', label: 'situação', type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nrnire', label: 'número nire', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'vl_cep', label: 'CEP', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'date_create', label: 'criação', type: 'date', formatDate: 'medium' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'user_create', label: 'usuário criação', type: 'string' }),
];
// Definicao dos filhos
var children = [
    new _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__["HistoricoConfig"]({
        visible: false,
        skipNull: true,
        skipEmpty: false,
        table: ['govc_localidade', 'Sede e filiais'],
        columns: columnsChildren
    }),
    new _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__["HistoricoConfig"]({
        visible: false,
        skipNull: true,
        skipEmpty: false,
        table: ['govc_empresa_anexo', 'Anexos'],
        columns: columnsChildrenAnexo
    })
];
// Definicao das colunas
var columns = [
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_empresa', label: 'código', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_empresa', label: 'nome', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_sigla', label: 'sigla', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_denominacao_social', label: 'denominação social', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'fl_ativo', label: 'situação', type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_participacao_capital', label: 'participação capital', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'tipo_empresa', label: 'tipo de empresa', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_tipo_norma', label: 'tipo de norma', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_empresa_relacionada', label: 'empresa controladora', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_empresa_ebs', label: 'empresa EBS', type: 'number' }),
];
// Definicao principal
var historicoConfig = new _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__["HistoricoConfig"]({
    skipNull: true,
    skipEmpty: false,
    visible: false,
    table: ['govc_empresa', 'Empresas'],
    descricoes: {
        I: 'Criado',
        U: 'Atualizado',
        D: 'Apagado'
    },
    dateFormat: 'hh:mm, DD MMM YYYY',
    nome: 'user_create',
    columns: columns,
    children: children
});


/***/ }),

/***/ "./src/app/service/correios/correios.service.ts":
/*!******************************************************!*\
  !*** ./src/app/service/correios/correios.service.ts ***!
  \******************************************************/
/*! exports provided: CorreiosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CorreiosService", function() { return CorreiosService; });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
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
var CorreiosService = /** @class */ (function () {
    function CorreiosService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].url_correios;
        this.API = this.url;
        console.log('CorreiosService');
    }
    CorreiosService.prototype.buscarCep = function (cep) {
        return this.http.get(this.API.concat(cep + '/json/'));
    };
    CorreiosService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], CorreiosService);
    return CorreiosService;
}());



/***/ }),

/***/ "./src/app/service/estrutura/anexo-empresa.service.ts":
/*!************************************************************!*\
  !*** ./src/app/service/estrutura/anexo-empresa.service.ts ***!
  \************************************************************/
/*! exports provided: AnexoEmpresaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnexoEmpresaService", function() { return AnexoEmpresaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AnexoEmpresaService = /** @class */ (function () {
    function AnexoEmpresaService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url_estrutura;
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
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Accept': 'application/json'
        });
        return this.http.post(this.API + "/uploadFile", formData, { headers: headers });
    };
    AnexoEmpresaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AnexoEmpresaService);
    return AnexoEmpresaService;
}());



/***/ }),

/***/ "./src/app/service/estrutura/dominio.service.ts":
/*!******************************************************!*\
  !*** ./src/app/service/estrutura/dominio.service.ts ***!
  \******************************************************/
/*! exports provided: DominioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DominioService", function() { return DominioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json'
    })
};
var DominioService = /** @class */ (function () {
    function DominioService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].url_estrutura;
        this.API = this.url + '/api/govc/v1/dominios/';
        console.log('DominioService');
    }
    DominioService.prototype.findByTipoOrderByNome = function (tipo) {
        return this.http.get(this.API.concat(tipo))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result == null || result == undefined) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    DominioService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DominioService);
    return DominioService;
}());



/***/ }),

/***/ "./src/app/service/estrutura/empresa.service.ts":
/*!******************************************************!*\
  !*** ./src/app/service/estrutura/empresa.service.ts ***!
  \******************************************************/
/*! exports provided: EmpresaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmpresaService", function() { return EmpresaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json'
    })
};
var EmpresaService = /** @class */ (function () {
    function EmpresaService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].url_estrutura;
        this.API = this.url + '/api/govc/v1/empresas/';
        console.log('EmpresaService');
    }
    EmpresaService.prototype.all = function () {
        return this.http.get(this.API).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result.page.totalElements == 0) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.findById = function (id) {
        return this.http.get(this.API.concat(id.toString()))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result == null) {
                return null;
            }
            return result.empresa;
        }));
    };
    EmpresaService.prototype.findByName = function (nmEmpresa) {
        return this.http.get(this.API.concat('find?name=' + nmEmpresa)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result.page.totalElements == 0) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.allByEmpresas = function (nmEmpresa, nmSigla, tipoEmpresa, situacao) {
        return this.http.get(this.API.concat('find-empresas/empresa/' + nmEmpresa + '/sigla/' + nmSigla + '/tipo/' + tipoEmpresa +
            '/situacao/' + situacao))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result == null) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.allByEmpresaControladora = function (cdEmpresa) {
        return this.http.get(this.API.concat('/find-empresa-controladora/cdEmpresa/' + cdEmpresa))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result == null) {
                return null;
            }
            return result._embedded.content;
        }));
    };
    EmpresaService.prototype.save = function (empresa) {
        return this.http.post(this.API, empresa, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (result) {
            if (result == null) {
                return null;
            }
            return result;
        }));
    };
    EmpresaService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], EmpresaService);
    return EmpresaService;
}());



/***/ })

}]);
//# sourceMappingURL=estrutura-empresas-incluirEmpresas-empresas-incluir-module.js.map