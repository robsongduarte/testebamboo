(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["designacoes-formulariosPermissao-editarFormulariosPermissao-formularios-permissao-editar-module"],{

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.html":
/*!********************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading d-flex\">\r\n    <div class=\"mr-auto\">\r\n      Designação\r\n    </div>\r\n    <div >\r\n      <app-button-historico label=\"Auditoria\" [link]=\"getLinkHistorico()\"></app-button-historico>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- START card-->\r\n  <section>\r\n    <div class=\"card border-dark radius-top-only mb-0\">\r\n      <div class=\"card-header bg-dark text-white radius-top-only\">\r\n        <h5 class=\"mb-0 pb-1 pt-1\">\r\n          Formulário de Permissão\r\n        </h5>\r\n      </div>\r\n    </div>\r\n    <div class=\"card rounded-0 border-grey\">\r\n      <div class=\"card-body\">\r\n        <form [formGroup]=\"formEditar\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n          <!--Matricula - Nome-->\r\n          <fieldset>\r\n            <div class=\"row\">\r\n                <div class=\"col-md-3\">\r\n                  <label class=\"col-form-label text-left\">Matrícula*</label>\r\n                  <input class=\"form-control\" type=\"text\" formControlName=\"matricula\" mask=\"00000000000000000000\"/>\r\n                </div>\r\n                <div class=\"col\">\r\n                  <label class=\"col-form-label text-left\">Nome*</label>\r\n                  <input class=\"form-control\" type=\"text\" maxlength=\"100\" formControlName=\"nmDesignado\" [formControl]=\"formEditar.controls['nmDesignado']\"/>\r\n                  <span class=\"text-danger\" *ngIf=\"formEditar.controls['nmDesignado'].hasError('pattern')\">Permitido somente texto.</span>\r\n                </div>\r\n            </div>\r\n          </fieldset>\r\n          <!--Email-->\r\n          <fieldset>\r\n            <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <label class=\"col-form-label text-left\">Email*</label>\r\n                  <input type=\"email\" class=\"form-control\" placeholder=\"mail@example.com\" maxlength=\"100\" formControlName=\"email\" [formControl]=\"formEditar.controls['email']\">\r\n                  <span class=\"text-danger\" *ngIf=\"formEditar.controls['email'].hasError('email') && (formEditar.controls['email'].dirty || formEditar.controls['email'].touched)\">Digite um email valido.</span>\r\n                </div>\r\n            </div>\r\n          </fieldset>\r\n          <!--Descrição do titulo e cargo-->\r\n          <fieldset>\r\n            <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <label class=\"col-form-label text-right\">Título</label>\r\n                  <input class=\"form-control\" type=\"text\" maxlength=\"100\" formControlName=\"dsTitulo\"/>\r\n                </div>\r\n              <div class=\"col\">\r\n                <label class=\"col-form-label text-right\">Cargo</label>\r\n                <input class=\"form-control\" type=\"text\" maxlength=\"100\" formControlName=\"dsCargo\" [formControl]=\"formEditar.controls['dsCargo']\"/>\r\n                <span class=\"text-danger\" *ngIf=\"formEditar.controls['dsCargo'].hasError('pattern')\">Permitido somente texto.</span>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <!--Contador e Número do CRC-->\r\n          <fieldset>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-2\">\r\n                  <br><br>\r\n                  <div class=\"form-check mb-1 mr-sm-2\">\r\n                    <div class=\"checkbox c-checkbox\">\r\n                      <label>\r\n                        <input type=\"checkbox\" (click)=\"ativarCrc()\" formControlName=\"flContador\"/>\r\n                        <span class=\"fa fa-check\"></span>Contador\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                  <label class=\"col-form-label text-left\">Número do CRC</label>\r\n                  <input class=\"form-control\" type=\"text\" [readonly]=\"habilitarNumeroCrc\" maxlength=\"20\" formControlName=\"nrCrc\" />\r\n                </div>\r\n              </div>\r\n          </fieldset>\r\n          <!--Tipo de Designação-->\r\n          <fieldset>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                  <label class=\"col-form-label text-left\">Tipo de Designação</label>\r\n                  <input class=\"form-control\" type=\"text\" formControlName=\"tipoDesignacaoNome\" readonly/>\r\n                </div>\r\n            </div>\r\n          </fieldset>\r\n          <!--Observação-->\r\n          <fieldset>\r\n            <div class=\"row\">\r\n              <div class=\"col\">\r\n                <label class=\"col-form-label text-left\">Observação</label>\r\n                <textarea class=\"form-control\" formControlName=\"dsObservacao\" maxlength=\"4000\" rows=\"3\"></textarea>\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <!--Tabela de Designações Niveis-->\r\n          <div class=\"card mb-0 border-dark radius-top-only\">\r\n            <div class=\"card-header bg-dark text-white radius-top-only\">\r\n              <h5 class=\"mb-0 pb-1 pt-1\">\r\n                <i class=\"fa fa-table\"></i>\r\n                Designações Níveis\r\n              </h5>\r\n            </div>\r\n          </div>\r\n          <div class=\"card rounded-0 border-grey\">\r\n            <div class=\"table-responsive\">\r\n                <div class=\"card\">\r\n                  <table class=\"table table-striped\">\r\n                    <thead>\r\n                        <tr>\r\n                          <th *ngFor=\"let head of headElements; let i = index\" scope=\"col\">\r\n                            {{head}}\r\n                          </th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let designacaoNivel of designacoesNiveis; let i = index\">\r\n                          <td>{{designacaoNivel.nivel.nmEmpresa}}</td>\r\n                          <td>{{designacaoNivel.nivel.nmAbreviatura}}</td>\r\n                          <td>{{designacaoNivel.dtVigenciaInicio | date:'dd/MM/yyyy'}}</td>\r\n                          <td>{{designacaoNivel.dtVigenciaFim | date:'dd/MM/yyyy'}}</td>\r\n                          <!--td>\r\n                            <div class=\"text-right\">\r\n                              <button type=\"button\" class=\"btn btn-info btn-sm mr-1\" (click)=\"editar(designacaoNivel)\" data-toggle=\"modal\" data-target=\"#nivelModal\">\r\n                                <i class=\"fa fa-edit\"></i>\r\n                              </button>\r\n                              <button type=\"button\" class=\"btn btn-danger btn-sm mr-1\" (click)=\"excluir(designacaoNivel.cdDesignacaoNivel, i)\">\r\n                                <i class=\"icon-trash\"></i>\r\n                              </button>\r\n                            </div>\r\n                          </td-->\r\n                        </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n            </div>\r\n            <!--Botão adicionar nivel>\r\n            <div class=\"panel-footer text-right mb-4\">\r\n              <button type=\"button\" class=\"btn btn-info mr-1\" (click)=\"adicionarNivel()\" data-toggle=\"modal\" data-target=\"#addNivelModal\">\r\n                <i class=\"fa fa-plus-square\"></i>\r\n                Adicionar\r\n              </button>\r\n            </div-->\r\n          </div>\r\n          <!--Botões-->\r\n          <div class=\"panel-footer text-right\">\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-light\" onClick=\"history.go(-1)\">Voltar</button>\r\n              <button style=\"margin: 0 5px;\" type=\"button\" class=\"btn btn-success\" [disabled]=\"formEditar.invalid\" (click)=\"salvar()\">Salvar</button>\r\n          </div>\r\n          <div class=\"panel-footer text-right\">\r\n          \t<span class=\"text-danger\" *ngIf=\"formEditar.invalid\">*Preencher todos os campos obrigatórios.</span>\r\n          </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</section>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade bd-nivel-modal-lg\" id=\"nivelModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"nivelModalLabel\" aria-hidden=\"true\">\r\n  <form [formGroup]=\"formDesignacaoNivel\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header bg-dark text-white pt-3 pb-3\">\r\n          <h5 class=\"modal-title\" id=\"modal-basic-title\" class=\"mb-0\">\r\n            <i class=\"fa fa-table\"></i> Editar Designação Nível\r\n          </h5>\r\n          <button type=\"button\" class=\"close text-white pt-2 pb-2\" data-dismiss=\"modal\" aria-label=\"Fechar\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <fieldset>\r\n            <!--Vigência Inicial e Final-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Vigência Inicial*</label>\r\n                <input class=\"form-control\" type=\"date\" (change)=\"carregarDatainicioVigencia('formDesignacaoNivel')\" formControlName=\"dtVigenciaInicio\" [formControl]=\"formDesignacaoNivel.controls['dtVigenciaInicio']\"/>\r\n                <span\r\n                  class=\"text-danger\"\r\n                  *ngIf=\"formDesignacaoNivel.controls['dtVigenciaInicio'].invalid && (formDesignacaoNivel.controls['dtVigenciaInicio'].dirty || formDesignacaoNivel.controls['dtVigenciaInicio'].touched)\">\r\n                  Digite uma data válida.\r\n                </span>\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <label class=\"col-form-label text-left\">Vigência Final</label>\r\n                <input class=\"form-control\" type=\"date\" [min]=\"dataMinima\" formControlName=\"dtVigenciaFim\" [formControl]=\"formDesignacaoNivel.controls['dtVigenciaFim']\"/>\r\n                <span\r\n                  class=\"text-danger\"\r\n                  *ngIf=\"formDesignacaoNivel.controls['dtVigenciaFim'].hasError('dateValidator') && (formDesignacaoNivel.controls['dtVigenciaFim'].dirty || formDesignacaoNivel.controls['dtVigenciaFim'].touched)\">\r\n                  Digite uma data válida.\r\n                </span>\r\n                <span\r\n                  class=\"text-danger\"\r\n                  *ngIf=\"formDesignacaoNivel.hasError('dataInicioMaior')\">\r\n                  Data fim menor que a data de início.\r\n                </span>\r\n              </div>\r\n            </div>\r\n            <!--Nivel-->\r\n            <div class=\"row\">\r\n              <div class=\"col\">\r\n                <label class=\"col-form-label text-left\">Nivel</label>\r\n                <input class=\"form-control\" type=\"text\" formControlName=\"nivelDescricao\" name=\"nivelDescricao\" readonly>\r\n                <input class=\"form-control\" type=\"hidden\" formControlName=\"nivel\" name=\"nivel\" [(ngModel)]=\"ngxValueNivel\">\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n        </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Fechar</button>\r\n            <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" [disabled]=\"formDesignacaoNivel.invalid\" (click)=\"salvarNivel()\">Salvar alterações</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n  <!-- Modal -->\r\n  <div class=\"modal fade bd-nivel-modal-lg\" id=\"nivelModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"nivelModalLabel\" aria-hidden=\"true\">\r\n    <form [formGroup]=\"formDesignacaoNivel\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n      <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header bg-dark text-white pt-3 pb-3\">\r\n            <h5 class=\"modal-title\" id=\"modal-basic-title\" class=\"mb-0\">\r\n              <i class=\"fa fa-table\"></i> Editar Designação Nível\r\n            </h5>\r\n            <button type=\"button\" class=\"close text-white pt-2 pb-2\" data-dismiss=\"modal\" aria-label=\"Fechar\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <fieldset>\r\n              <!--Vigência Inicial e Final-->\r\n              <div class=\"row\">\r\n                <div class=\"col-md-6\">\r\n                  <label class=\"col-form-label text-left\">Vigência Inicial*</label>\r\n                  <input class=\"form-control\" type=\"date\" (change)=\"carregarDatainicioVigencia('formDesignacaoNivel')\" formControlName=\"dtVigenciaInicio\" [formControl]=\"formDesignacaoNivel.controls['dtVigenciaInicio']\"/>\r\n                  <span\r\n                    class=\"text-danger\"\r\n                    *ngIf=\"formDesignacaoNivel.controls['dtVigenciaInicio'].invalid && (formDesignacaoNivel.controls['dtVigenciaInicio'].dirty || formDesignacaoNivel.controls['dtVigenciaInicio'].touched)\">\r\n                    Digite uma data válida.\r\n                  </span>\r\n                </div>\r\n                <div class=\"col-md-6\">\r\n                  <label class=\"col-form-label text-left\">Vigência Final</label>\r\n                  <input class=\"form-control\" type=\"date\" [min]=\"dataMinima\" formControlName=\"dtVigenciaFim\" [formControl]=\"formDesignacaoNivel.controls['dtVigenciaFim']\"/>\r\n                  <span\r\n                    class=\"text-danger\"\r\n                    *ngIf=\"formDesignacaoNivel.controls['dtVigenciaFim'].hasError('dateValidator') && (formDesignacaoNivel.controls['dtVigenciaFim'].dirty || formDesignacaoNivel.controls['dtVigenciaFim'].touched)\">\r\n                    Digite uma data válida.\r\n                  </span>\r\n                  <span\r\n                    class=\"text-danger\"\r\n                    *ngIf=\"formDesignacaoNivel.hasError('dataInicioMaior')\">\r\n                    Data fim menor que a data de início.\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <!--Nivel-->\r\n              <div class=\"row\">\r\n                <div class=\"col\">\r\n                  <label class=\"col-form-label text-left\">Nivel</label>\r\n                  <input class=\"form-control\" type=\"text\" formControlName=\"nivelDescricao\" name=\"nivelDescricao\" readonly>\r\n                  <input class=\"form-control\" type=\"hidden\" formControlName=\"nivel\" name=\"nivel\" [(ngModel)]=\"ngxValueNivel\">\r\n                </div>\r\n              </div>\r\n            </fieldset>\r\n          </div>\r\n            <div class=\"modal-footer\">\r\n              <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Fechar</button>\r\n              <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" [disabled]=\"formDesignacaoNivel.invalid\" (click)=\"salvarNivel()\">Salvar alterações</button>\r\n            </div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n\r\n  <!-- Modal Nivel -->\r\n  <div class=\"modal fade bd-nivel-modal-lg\" id=\"addNivelModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addNivelModalLabel\" aria-hidden=\"true\">\r\n      <form [formGroup]=\"formAdicionarNivel\" class=\"form-horizontal\" method=\"get\" action=\"/\">\r\n        <!--Spinner-->\r\n        <ngx-spinner\r\n              bdColor = \"rgba(245,238,238,0.8)\"\r\n              size = \"default\"\r\n              color = \"#00f2f2\"\r\n              type = \"ball-clip-rotate\"\r\n              >\r\n        </ngx-spinner>\r\n        <div class=\"modal-dialog modal-lg\" role=\"document\">\r\n          <div class=\"modal-content\">\r\n            <div class=\"modal-header bg-dark text-white pt-3 pb-3\">\r\n              <h5 class=\"modal-title\" id=\"modal-basic-title\" class=\"mb-0\">\r\n                <i class=\"fa fa-table\"></i> Adicionar Nível\r\n              </h5>\r\n              <button type=\"button\" class=\"close text-white pt-2 pb-2\" data-dismiss=\"modal\" aria-label=\"Fechar\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n              </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n              <fieldset>\r\n                <!--Empresa-->\r\n                <div class=\"row\">\r\n                  <div class=\"col\">\r\n                    <label class=\"col-form-label text-left\">Empresa*</label>\r\n                      <ngx-select [allowClear]=\"true\"\r\n                                  [(items)]=\"empresas\"\r\n                                  [disabled]=\"false\"\r\n                                  [(ngModel)]=\"ngxValueEmpresa\"\r\n                                  [ngModelOptions]=\"{standalone: true}\"\r\n                                  optionValueField=\"cdEmpresa\" optionTextField=\"nmEmpresa\"\r\n                                  (select)=\"carregarNivel()\"\r\n                                  (remove)=\"removerEmpresa()\"\r\n                                  (keyup)=\"onKeyUp($event)\"\r\n                                  placeholder=\"Digite o nome da empresa\">\r\n                      </ngx-select>\r\n                      <input type=\"hidden\" formControlName=\"empresa\" name=\"empresa\" [(ngModel)]=\"ngxValueEmpresa\">\r\n                  </div>\r\n                </div>\r\n                <!--Nivel-->\r\n                <div class=\"row\">\r\n                  <div class=\"col\">\r\n                    <label class=\"col-form-label text-left\">Nível*</label>\r\n                    <ngx-select [allowClear]=\"true\"\r\n                                [(items)]=\"niveisDesignacoes\"\r\n                                [disabled]=\"habilitarNivel\"\r\n                                [(ngModel)]=\"ngxValueNivel\"\r\n                                [ngModelOptions]=\"{standalone: true}\"\r\n                                optionValueField=\"cdNivel\" optionTextField=\"nmAbreviatura\"\r\n                                (select)=\"montarNivel()\"\r\n                                (remove)=\"removerNivel()\"\r\n                                placeholder=\"Nenhum nível selecionado\">\r\n                                <ng-template ngx-select-option ngx-select-option-selected let-option let-text=\"text\">\r\n                                  {{option.data.nmAbreviatura}} - {{option.data.nmNivel}}\r\n                                </ng-template>\r\n                    </ngx-select>\r\n                    <input type=\"hidden\" formControlName=\"nivel\" name=\"nivel\" [(ngModel)]=\"ngxValueNivel\">\r\n                  </div>\r\n                </div>\r\n                <!--Nome Abreviatura e Tipo Designação-->\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-6\">\r\n                    <label class=\"col-form-label text-left\">Nome Abreviatura</label>\r\n                    <input class=\"form-control\" type=\"text\" formControlName=\"nmAbreviatura\" readonly/>\r\n                  </div>\r\n                  <div class=\"col-md-6\">\r\n                    <label class=\"col-form-label text-left\">Tipo Designação</label>\r\n                    <input class=\"form-control\" type=\"text\" formControlName=\"tipoDesignacao\" readonly/>\r\n                  </div>\r\n                </div>\r\n                <!--Vigência Inicial e Final-->\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-6\">\r\n                    <label class=\"col-form-label text-left\">Vigência Inicial*</label>\r\n                    <input class=\"form-control\" type=\"date\" (change)=\"carregarDatainicioVigencia('formAdicionarNivel')\" formControlName=\"dtVigenciaInicio\" [formControl]=\"formAdicionarNivel.controls['dtVigenciaInicio']\"/>\r\n                    <span\r\n                      class=\"text-danger\"\r\n                      *ngIf=\"formAdicionarNivel.controls['dtVigenciaInicio'].invalid && (formAdicionarNivel.controls['dtVigenciaInicio'].dirty || formAdicionarNivel.controls['dtVigenciaInicio'].touched)\">\r\n                      Digite uma data válida.\r\n                    </span>\r\n                  </div>\r\n                  <div class=\"col-md-6\">\r\n                    <label class=\"col-form-label text-left\">Vigência Final</label>\r\n                    <input class=\"form-control\" type=\"date\" [min]=\"dataMinima\" formControlName=\"dtVigenciaFim\"/>\r\n                    <span\r\n                      class=\"text-danger\"\r\n                      *ngIf=\"formAdicionarNivel.controls['dtVigenciaFim'].hasError('dateValidator') && (formAdicionarNivel.controls['dtVigenciaFim'].dirty || formAdicionarNivel.controls['dtVigenciaFim'].touched)\">\r\n                      Digite uma data válida.\r\n                    </span>\r\n                    <span\r\n                      class=\"text-danger\"\r\n                      *ngIf=\"formAdicionarNivel.hasError('dataInicioMaior')\">\r\n                      Data fim menor que a data de início.\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n              <!--Botões-->\r\n              <div class=\"modal-footer\">\r\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Fechar</button>\r\n                <button type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" [disabled]=\"formAdicionarNivel.invalid\" (click)=\"adicionar()\">Adicionar</button>\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n\r\n  <ng-template #content let-d=\"dismiss\" let-c=\"close\">\r\n    <div class=\"modal-header bg-dark text-white pt-3 pb-3 rounded-0\">\r\n      <h5 class=\"modal-title\" id=\"modal-basic-title\" class=\"mb-0\">\r\n        <i class=\"fa fa-heading\"></i> Histórico Designação Nível\r\n      </h5>\r\n      <button type=\"button\" class=\"close text-white pt-2 pb-2\" aria-label=\"Close\" (click)=\"d('Cross click')\">\r\n        <span aria-hidden=\"true\">&times;</span>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body pt-0\">\r\n      <app-historico\r\n        *ngIf=\"auditorias.length > 0\"\r\n        [auditorias]=\"auditorias\"\r\n        [config]=\"getConfig()\">\r\n      </app-historico>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"c('Save click')\">Save</button>\r\n    </div>\r\n  </ng-template>\r\n"

/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.scss":
/*!********************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.scss ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JvdXRlcy9kZXNpZ25hY29lcy9mb3JtdWxhcmlvc1Blcm1pc3Nhby9lZGl0YXJGb3JtdWxhcmlvc1Blcm1pc3Nhby9mb3JtdWxhcmlvcy5wZXJtaXNzYW8uZWRpdGFyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: FormulariosPermissaoEditarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormulariosPermissaoEditarComponent", function() { return FormulariosPermissaoEditarComponent; });
/* harmony import */ var _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../../shared/validators/dateRange.validator */ "./src/app/shared/validators/dateRange.validator.ts");
/* harmony import */ var _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../shared/validators/date.validator */ "./src/app/shared/validators/date.validator.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../service/estrutura/empresa.service */ "./src/app/service/estrutura/empresa.service.ts");
/* harmony import */ var _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../service/estrutura/nivel.service */ "./src/app/service/estrutura/nivel.service.ts");
/* harmony import */ var _service_designacoes_designacao_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../service/designacoes/designacao.service */ "./src/app/service/designacoes/designacao.service.ts");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-validation */ "./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ng2_validation__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _historico_formularios_permissao_historico_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./historico-formularios-permissao/historico.config */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico.config.ts");
/* harmony import */ var _shared_components_historico_model_auditoria_model__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/components/historico/model/auditoria.model */ "./src/app/shared/components/historico/model/auditoria.model.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_14__);
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
var FormulariosPermissaoEditarComponent = /** @class */ (function () {
    function FormulariosPermissaoEditarComponent(fb, router, empresaService, nivelService, designacaoService, route, spinner, modalService) {
        this.fb = fb;
        this.router = router;
        this.empresaService = empresaService;
        this.nivelService = nivelService;
        this.designacaoService = designacaoService;
        this.route = route;
        this.spinner = spinner;
        this.modalService = modalService;
        this.auditorias = [];
        this.config = _historico_formularios_permissao_historico_config__WEBPACK_IMPORTED_MODULE_12__["historicoConfig"];
        this.niveis = [];
        this.niveisDesignacoes = [];
        this.empresas = [];
        this.designacaoNivel = null;
        this.designacoesNiveis = [];
        this.tipoDesignacaoNome = null;
        this.titulo = null;
        this.value = null;
        this.index = null;
        this.indexNivel = null;
        this.indexEmpresa = null;
        this.habilitarNivel = true;
        this.habilitarNumeroCrc = true;
        this.dtInicio = new Date();
        this.dtFim = new Date();
        this.headElements = ['Empresa', 'Nivel', 'Início', 'Fim', ''];
    }
    FormulariosPermissaoEditarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getLinkHistorico();
        this._createForm();
        this.spinner.show();
        this.route.params
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (params) { return _this.designacaoService.findById(params['id']); }))
            .subscribe(function (designado) {
            if (designado != null) {
                _this.designado = designado;
                _this.tipoDesignacao = designado.tipoDesignacao;
                for (var _i = 0, _a = designado.designacoesNiveis; _i < _a.length; _i++) {
                    var designacoesNiveis = _a[_i];
                    _this.designacoesNiveis.push(designacoesNiveis);
                    _this.niveis.push(designacoesNiveis.nivel);
                    _this.ngxValueNivel = _this.niveis[0].cdNivel;
                }
                _this.tipoDesignacaoNome = designado.tipoDesignacao.nome;
                _this.titulo = designado.dsTitulo;
                _this.montForm();
            }
            _this.spinner.hide();
        });
        var id = ['cd_designacao', this.route.snapshot.params['id']];
        this.designacaoService.findAuditoria(_historico_formularios_permissao_historico_config__WEBPACK_IMPORTED_MODULE_12__["historicoConfig"].table[0], id[0], id[1])
            .subscribe(function (auditorias) { return _this.auditorias = _this.transformAuditorias(auditorias); });
    };
    FormulariosPermissaoEditarComponent.prototype.transformAuditorias = function (auditorias) {
        return auditorias.map(function (auditoria) { return new _shared_components_historico_model_auditoria_model__WEBPACK_IMPORTED_MODULE_13__["Auditoria"](auditoria); });
    };
    FormulariosPermissaoEditarComponent.prototype.getConfig = function () {
        var aux = Object(lodash__WEBPACK_IMPORTED_MODULE_14__["cloneDeep"])(this.config);
        /*if(this.column){
          aux.setUniqueColumn(this.column)
        }*/
        return aux;
    };
    FormulariosPermissaoEditarComponent.prototype.montForm = function () {
        this.formEditar.patchValue({
            cdDesignacao: this.designado.cdDesignacao,
            matricula: this.designado.matricula,
            nmDesignado: this.designado.nmDesignado,
            email: this.designado.email,
            dsTitulo: this.designado.dsTitulo,
            dsCargo: this.designado.dsCargo,
            nrCrc: this.designado.nrCrc,
            dsObservacao: this.designado.dsObservacao,
            flContador: this.designado.flContador,
            tipoDesignacao: this.tipoDesignacao,
            tipoDesignacaoNome: this.tipoDesignacaoNome,
            designacoesNiveis: this.designacoesNiveis,
            createdByUser: this.designado.createdByUser,
            creationTime: new Date(this.designado.creationTime),
            modificationTime: this.designado.modificationTime ? new Date(this.designado.modificationTime) : null,
            modifiedByUser: this.designado.modifiedByUser
        });
        if (this.formEditar.value.flContador == true) {
            this.habilitarNumeroCrc = false;
        }
    };
    FormulariosPermissaoEditarComponent.prototype._createForm = function () {
        this.formEditar = this.fb
            .group({
            cdDesignacao: [null],
            matricula: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            nmDesignado: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('^[a-zA-ZÀ-ú ]+$'), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            email: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([ng2_validation__WEBPACK_IMPORTED_MODULE_10__["CustomValidators"].email, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            dsTitulo: [null],
            dsCargo: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('^[a-zA-ZÀ-ú .,;:/?]+$')],
            nrCrc: [null],
            dsObservacao: [null],
            flContador: [null],
            tipoDesignacao: [null],
            tipoDesignacaoNome: [null],
            designacoesNiveis: [null],
            createdByUser: [null],
            creationTime: [null],
            modificationTime: [null],
            modifiedByUser: [null]
        });
        this.formDesignacaoNivel = this.fb
            .group({
            cdDesignacaoNivel: [null],
            dtVigenciaFim: [null, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__["DateValidator"].dateValidator],
            dtVigenciaInicio: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__["DateValidator"].dateValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            nivel: [null],
            nivelDescricao: [null]
        }, { validator: _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_0__["DateRangeValidator"].dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
        this.montFormAdicionarNivel();
    };
    FormulariosPermissaoEditarComponent.prototype.montFormAdicionarNivel = function () {
        this.formAdicionarNivel = this.fb
            .group({
            empresa: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            nivel: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            nmAbreviatura: [null],
            dtVigenciaInicio: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__["DateValidator"].dateValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            dtVigenciaFim: [null, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__["DateValidator"].dateValidator],
            tipoDesignacao: [null],
        }, { validator: _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_0__["DateRangeValidator"].dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
    };
    FormulariosPermissaoEditarComponent.prototype.excluir = function (cdDesignacaoNivel, index) {
        var _this = this;
        swal.fire({
            title: 'Deseja realmente excluir?',
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
                _this.designacoesNiveis.splice(index, 1);
                _this.formEditar.patchValue({
                    designacoesNiveis: _this.designacoesNiveis
                });
            }
        });
    };
    FormulariosPermissaoEditarComponent.prototype.editar = function (designacaoNivel) {
        this.designacaoNivel = designacaoNivel;
        this.niveis = [];
        this.niveis.push(this.designacaoNivel.nivel);
        this.montFormDesignacaoNivel();
        this.ngxValueNivel = this.formDesignacaoNivel.value.nivel;
        this.dataMinima = this.formDesignacaoNivel.value.dtVigenciaInicio;
    };
    FormulariosPermissaoEditarComponent.prototype.montFormDesignacaoNivel = function () {
        this.formDesignacaoNivel = this.fb
            .group({
            cdDesignacaoNivel: [this.designacaoNivel.cdDesignacaoNivel],
            dtVigenciaInicio: [new Date(this.designacaoNivel.dtVigenciaInicio).toISOString().substr(0, 10), _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].compose([_shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__["DateValidator"].dateValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required])],
            dtVigenciaFim: [this.designacaoNivel.dtVigenciaFim, _shared_validators_date_validator__WEBPACK_IMPORTED_MODULE_1__["DateValidator"].dateValidator],
            nivel: [this.designacaoNivel.nivel.cdNivel],
            nivelDescricao: [this.designacaoNivel.nivel.nmAbreviatura + " - " + this.designacaoNivel.nivel.nmNivel]
        }, { validator: _shared_validators_dateRange_validator__WEBPACK_IMPORTED_MODULE_0__["DateRangeValidator"].dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
    };
    FormulariosPermissaoEditarComponent.prototype.carregarDatainicioVigencia = function (validarForm) {
        if (validarForm == 'formDesignacaoNivel') {
            this.dataMinima = this.formDesignacaoNivel.value.dtVigenciaInicio;
            this.dtInicio = new Date(this.formDesignacaoNivel.value.dtVigenciaInicio);
            this.dtFim = new Date(this.formDesignacaoNivel.value.dtVigenciaFim);
            if (this.dtInicio.getTime() > this.dtFim.getTime()) {
                this.formDesignacaoNivel.patchValue({
                    dtVigenciaFim: null
                });
            }
        }
        else {
            this.dataMinima = this.formAdicionarNivel.value.dtVigenciaInicio;
            this.dtInicio = new Date(this.formAdicionarNivel.value.dtVigenciaInicio);
            this.dtFim = new Date(this.formAdicionarNivel.value.dtVigenciaFim);
            if (this.dtInicio.getTime() > this.dtFim.getTime()) {
                this.formAdicionarNivel.patchValue({
                    dtVigenciaFim: null
                });
            }
        }
    };
    FormulariosPermissaoEditarComponent.prototype.salvar = function () {
        var _this = this;
        this.spinner.show();
        this.designado = this.formEditar.value;
        this.designacaoService.save(this.designado)
            .subscribe(function (result) {
            _this.spinner.hide();
            _this.sweetalertSucesso();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoEditarComponent.prototype.salvarNivel = function () {
        var _this = this;
        this.indexNivel = 0;
        this.nivel = {
            empresa: this.niveis[this.indexNivel].empresa,
            cdNivel: this.niveis[this.indexNivel].cdNivel,
            nivelPai: this.niveis[this.indexNivel].nivelPai,
            localidade: this.niveis[this.indexNivel].localidade,
            tipoNivel: this.niveis[this.indexNivel].tipoNivel,
            dtVigenciaFim: this.niveis[this.indexNivel].dtVigenciaFim,
            dtVigenciaInicio: this.niveis[this.indexNivel].dtVigenciaInicio,
            nmAbreviatura: this.niveis[this.indexNivel].nmAbreviatura,
            nmEmpresa: this.niveis[this.indexNivel].nmEmpresa,
            nmNivel: this.niveis[this.indexNivel].nmNivel,
            nmSiglaEmpresa: this.niveis[this.indexNivel].nmSiglaEmpresa
        };
        this.index = this.designacoesNiveis.findIndex((function (obj) { return obj.cdDesignacaoNivel == _this.formDesignacaoNivel.value.cdDesignacaoNivel; }));
        this.designacoesNiveis[this.index] = this.formDesignacaoNivel.value;
        this.designacoesNiveis[this.index].nivel = this.nivel;
        this.formEditar.patchValue({
            designacoesNiveis: this.designacoesNiveis
        });
    };
    FormulariosPermissaoEditarComponent.prototype.adicionarNivel = function () {
        this.niveisDesignacoes = [];
        this.empresas = [];
        this.habilitarNivel = true;
        this.montFormAdicionarNivel();
    };
    FormulariosPermissaoEditarComponent.prototype.carregarNivel = function () {
        this.habilitarNivel = false;
        this.ngxValueNivel = null;
        this.formAdicionarNivel.patchValue({
            nmAbreviatura: null,
            tipoDesignacao: null
        });
        this.allByEmpresa();
    };
    FormulariosPermissaoEditarComponent.prototype.montarNivel = function () {
        var _this = this;
        this.indexNivel = this.niveisDesignacoes.findIndex((function (obj) { return obj.cdNivel == _this.ngxValueNivel; }));
        this.formAdicionarNivel.patchValue({
            nmAbreviatura: this.niveisDesignacoes[this.indexNivel].nmAbreviatura,
            tipoDesignacao: 'Titular'
        });
    };
    FormulariosPermissaoEditarComponent.prototype.removerEmpresa = function () {
        this.ngxValueNivel = null;
        this.habilitarNivel = true;
        this.formAdicionarNivel.patchValue({
            nmAbreviatura: null,
            tipoDesignacao: null
        });
    };
    FormulariosPermissaoEditarComponent.prototype.removerNivel = function () {
        this.ngxValueNivel = null;
        this.formAdicionarNivel.patchValue({
            nmAbreviatura: null,
            tipoDesignacao: null
        });
    };
    FormulariosPermissaoEditarComponent.prototype.adicionar = function () {
        var _this = this;
        this.indexNivel = this.niveisDesignacoes.findIndex((function (obj) { return obj.cdNivel == _this.ngxValueNivel; }));
        this.indexEmpresa = this.empresas.findIndex((function (obj) { return obj.cdEmpresa == _this.ngxValueEmpresa; }));
        this.empresa = this.empresas[this.indexEmpresa];
        this.nivel = {
            empresa: this.empresa,
            cdNivel: this.niveisDesignacoes[this.indexNivel].cdNivel,
            nivelPai: this.niveisDesignacoes[this.indexNivel].nivelPai,
            localidade: this.niveisDesignacoes[this.indexNivel].localidade,
            tipoNivel: this.niveisDesignacoes[this.indexNivel].tipoNivel,
            dtVigenciaFim: this.niveisDesignacoes[this.indexNivel].dtVigenciaFim,
            dtVigenciaInicio: this.niveisDesignacoes[this.indexNivel].dtVigenciaInicio,
            nmAbreviatura: this.niveisDesignacoes[this.indexNivel].nmAbreviatura,
            nmEmpresa: this.empresa.nmEmpresa,
            nmNivel: this.niveisDesignacoes[this.indexNivel].nmNivel,
            nmSiglaEmpresa: this.empresa.nmSigla
        };
        this.designacaoNivel = {
            cdDesignacaoNivel: null,
            dtVigenciaFim: this.formAdicionarNivel.value.dtVigenciaFim,
            dtVigenciaInicio: this.formAdicionarNivel.value.dtVigenciaInicio,
            nivel: this.nivel
        };
        this.designacoesNiveis.push(this.designacaoNivel);
        this.niveis.push(this.nivel);
    };
    FormulariosPermissaoEditarComponent.prototype._all = function () {
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
    FormulariosPermissaoEditarComponent.prototype.allByEmpresa = function () {
        var _this = this;
        this.spinner.show();
        this.niveis = [];
        this.nivelService.allByEmpresa(this.ngxValueEmpresa)
            .subscribe(function (niveis) {
            if (niveis != null) {
                for (var _i = 0, niveis_1 = niveis; _i < niveis_1.length; _i++) {
                    var nivel = niveis_1[_i];
                    _this.niveisDesignacoes.push(nivel.nivel);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoEditarComponent.prototype.allByCdNivel = function (cdNivel) {
        var _this = this;
        this.spinner.show();
        this.niveisDesignacoes = [];
        this.nivelService.findById(cdNivel)
            .subscribe(function (niveis) {
            _this.niveisDesignacoes.push(niveis);
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    FormulariosPermissaoEditarComponent.prototype.sweetalertSucesso = function () {
        swal.fire('Designação salva com sucesso!', '', 'success');
    };
    FormulariosPermissaoEditarComponent.prototype.onKeyUp = function (event) {
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
    FormulariosPermissaoEditarComponent.prototype.findByName = function (nmEmpresa) {
        var _this = this;
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
    FormulariosPermissaoEditarComponent.prototype.ativarCrc = function () {
        if (this.formEditar.value.flContador == true) {
            this.habilitarNumeroCrc = true;
            this.formEditar.patchValue({
                nrCrc: "",
            });
        }
        else {
            this.habilitarNumeroCrc = false;
        }
    };
    FormulariosPermissaoEditarComponent.prototype.getLinkHistorico = function (column) {
        return this.router.url + '/historico' + (column ? '/' + column : '');
    };
    FormulariosPermissaoEditarComponent.prototype.openHistoricoModal = function (content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(function (result) {
            console.log("Closed with: " + result);
        }, function (reason) {
            console.log("Dismissed " + reason);
        });
    };
    FormulariosPermissaoEditarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-formularios.permissao.editar',
            template: __webpack_require__(/*! ./formularios.permissao.editar.component.html */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.html"),
            styles: [__webpack_require__(/*! ./formularios.permissao.editar.component.scss */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _service_estrutura_empresa_service__WEBPACK_IMPORTED_MODULE_7__["EmpresaService"],
            _service_estrutura_nivel_service__WEBPACK_IMPORTED_MODULE_8__["NivelService"],
            _service_designacoes_designacao_service__WEBPACK_IMPORTED_MODULE_9__["DesignacaoService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_11__["NgbModal"]])
    ], FormulariosPermissaoEditarComponent);
    return FormulariosPermissaoEditarComponent;
}());



/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.module.ts":
/*!***************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.module.ts ***!
  \***************************************************************************************************************************/
/*! exports provided: FormulariosPermissaoEditarModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormulariosPermissaoEditarModule", function() { return FormulariosPermissaoEditarModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ag-grid-angular/main */ "./node_modules/ag-grid-angular/main.js");
/* harmony import */ var ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_select_ex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-select-ex */ "./node_modules/ngx-select-ex/esm5/ngx-select-ex.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-mask */ "./node_modules/ngx-mask/fesm5/ngx-mask.js");
/* harmony import */ var _formularios_permissao_editar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formularios.permissao.editar.component */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.component.ts");
/* harmony import */ var _historico_formularios_permissao_historico_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./historico-formularios-permissao/historico-formularios-permissao.component */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico-formularios-permissao.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    { path: '', component: _formularios_permissao_editar_component__WEBPACK_IMPORTED_MODULE_6__["FormulariosPermissaoEditarComponent"] },
    { path: 'historico/:column', component: _historico_formularios_permissao_historico_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_7__["HistoricoFormulariosPermissaoComponent"] },
    { path: 'historico', component: _historico_formularios_permissao_historico_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_7__["HistoricoFormulariosPermissaoComponent"] },
];
var FormulariosPermissaoEditarModule = /** @class */ (function () {
    function FormulariosPermissaoEditarModule() {
    }
    FormulariosPermissaoEditarModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes),
                ngx_select_ex__WEBPACK_IMPORTED_MODULE_3__["NgxSelectModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerModule"],
                ngx_mask__WEBPACK_IMPORTED_MODULE_5__["NgxMaskModule"].forRoot(),
                ag_grid_angular_main__WEBPACK_IMPORTED_MODULE_2__["AgGridModule"]
            ],
            declarations: [
                _formularios_permissao_editar_component__WEBPACK_IMPORTED_MODULE_6__["FormulariosPermissaoEditarComponent"],
                _historico_formularios_permissao_historico_formularios_permissao_component__WEBPACK_IMPORTED_MODULE_7__["HistoricoFormulariosPermissaoComponent"]
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], FormulariosPermissaoEditarModule);
    return FormulariosPermissaoEditarModule;
}());



/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico-formularios-permissao.component.html":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico-formularios-permissao.component.html ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading d-flex\">\r\n  <div class=\"mr-auto\">\r\n    Auditoria\r\n  </div>\r\n  <div>\r\n    <button type=\"button\" class=\"btn btn-outline-primary\" (click)=\"goBack()\">\r\n      Voltar\r\n    </button>\r\n  </div>\r\n</div>\r\n<!-- START card-->\r\n<section>\r\n  <div class=\"card border-dark radius-top-only mb-0\">\r\n    <div class=\"card-header bg-dark text-white radius-top-only\">\r\n      <h5 class=\"mb-0 pb-1 pt-1\">\r\n        Auditoria\r\n      </h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"card rounded-0 border-grey\">\r\n    <div class=\"card-body pt-0\">\r\n      <app-historico\r\n        *ngIf=\"auditorias.length > 0\"\r\n        [auditorias]=\"auditorias\"\r\n        [config]=\"getConfig()\">\r\n      </app-historico>\r\n      <div class=\"row mt-2\" *ngIf=\"auditorias.length == 0\">\r\n        <div class=\"col\">\r\n          Não há auditorias para esse registro.\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico-formularios-permissao.component.ts":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico-formularios-permissao.component.ts ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: HistoricoFormulariosPermissaoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoricoFormulariosPermissaoComponent", function() { return HistoricoFormulariosPermissaoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _historico_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./historico.config */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico.config.ts");
/* harmony import */ var _service_designacoes_designacao_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../service/designacoes/designacao.service */ "./src/app/service/designacoes/designacao.service.ts");
/* harmony import */ var _shared_components_historico_model_auditoria_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../shared/components/historico/model/auditoria.model */ "./src/app/shared/components/historico/model/auditoria.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HistoricoFormulariosPermissaoComponent = /** @class */ (function () {
    function HistoricoFormulariosPermissaoComponent(activatedRoute, location, designacaoService) {
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.designacaoService = designacaoService;
        this.auditorias = [];
    }
    HistoricoFormulariosPermissaoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.column = this.activatedRoute.snapshot.paramMap.get('column');
        var id = ['cd_designacao', this.activatedRoute.parent.snapshot.params['id']];
        this.designacaoService.findAuditoria(_historico_config__WEBPACK_IMPORTED_MODULE_4__["historicoConfig"].table[0], id[0], id[1])
            .subscribe(function (auditorias) { return _this.auditorias = _this.transformAuditorias(auditorias); });
    };
    HistoricoFormulariosPermissaoComponent.prototype.transformAuditorias = function (auditorias) {
        return auditorias.map(function (auditoria) { return new _shared_components_historico_model_auditoria_model__WEBPACK_IMPORTED_MODULE_6__["Auditoria"](auditoria); });
    };
    HistoricoFormulariosPermissaoComponent.prototype.getConfig = function () {
        this.config = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["cloneDeep"])(_historico_config__WEBPACK_IMPORTED_MODULE_4__["historicoConfig"]);
        if (this.column) {
            this.config.setUniqueColumn(this.column);
        }
        return this.config;
    };
    HistoricoFormulariosPermissaoComponent.prototype.goBack = function () {
        if (window.history.length > 1) {
            this.location.back();
        }
    };
    HistoricoFormulariosPermissaoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-historico-formularios-permissao',
            template: __webpack_require__(/*! ./historico-formularios-permissao.component.html */ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico-formularios-permissao.component.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["Location"],
            _service_designacoes_designacao_service__WEBPACK_IMPORTED_MODULE_5__["DesignacaoService"]])
    ], HistoricoFormulariosPermissaoComponent);
    return HistoricoFormulariosPermissaoComponent;
}());



/***/ }),

/***/ "./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico.config.ts":
/*!****************************************************************************************************************************************!*\
  !*** ./src/app/routes/designacoes/formulariosPermissao/editarFormulariosPermissao/historico-formularios-permissao/historico.config.ts ***!
  \****************************************************************************************************************************************/
/*! exports provided: historicoConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "historicoConfig", function() { return historicoConfig; });
/* harmony import */ var _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../shared/components/historico/model/historico-config.model */ "./src/app/shared/components/historico/model/historico-config.model.ts");
/* harmony import */ var _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared/components/historico/model/column-config.model */ "./src/app/shared/components/historico/model/column-config.model.ts");


// Definicao dos filhos
var children = [
    new _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__["HistoricoConfig"]({
        visible: false,
        skipNull: true,
        skipEmpty: false,
        table: ['govc_designacao_nivel', 'Níveis'],
        columns: [
            new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_nivel', label: 'Nível', type: 'string' }),
            new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_designacao', label: 'Designação', type: 'string' }),
        ]
    })
];
// Definicao das colunas
var columns = [
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_designacao', label: 'código', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_matricula', label: 'matrícula', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_matricula_substituido', label: 'matrícula substituído', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'cd_tipo_designacao', label: 'tipo de designação', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'ds_cargo', label: 'cargo', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'ds_cargo_substituido', label: 'cargo substituído', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'ds_observacao', label: 'observação', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'ds_titulo', label: 'título', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'ds_titulo_substituido', label: 'título Substituído', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'email', label: 'email', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'fl_contador', label: 'contador', type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_designado', label: 'nome', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nm_substituido', label: 'nome substituído', type: 'string' }),
    new _shared_components_historico_model_column_config_model__WEBPACK_IMPORTED_MODULE_1__["ColumnConfig"]({ column: 'nr_crc', label: 'n° CRC', type: 'string' }),
];
// Definicao principal
var historicoConfig = new _shared_components_historico_model_historico_config_model__WEBPACK_IMPORTED_MODULE_0__["HistoricoConfig"]({
    skipNull: true,
    skipEmpty: false,
    visible: false,
    table: ['govc_designacao', 'Designações'],
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


/***/ })

}]);
//# sourceMappingURL=designacoes-formulariosPermissao-editarFormulariosPermissao-formularios-permissao-editar-module.js.map