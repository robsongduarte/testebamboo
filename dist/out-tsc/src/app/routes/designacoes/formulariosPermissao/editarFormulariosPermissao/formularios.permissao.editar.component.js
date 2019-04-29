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
var dateRange_validator_1 = require("./../../../../shared/validators/dateRange.validator");
var date_validator_1 = require("./../../../../shared/validators/date.validator");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var ngx_spinner_1 = require("ngx-spinner");
var empresa_service_1 = require("../../../../service/estrutura/empresa.service");
var nivel_service_1 = require("../../../../service/estrutura/nivel.service");
var designacao_service_1 = require("../../../../service/designacoes/designacao.service");
var ng2_validation_1 = require("ng2-validation");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var historico_config_1 = require("./historico-formularios-permissao/historico.config");
var auditoria_model_1 = require("../../../../shared/components/historico/model/auditoria.model");
var lodash_1 = require("lodash");
var swal = require('sweetalert2');
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
        this.config = historico_config_1.historicoConfig;
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
            .pipe(operators_1.switchMap(function (params) { return _this.designacaoService.findById(params['id']); }))
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
        this.designacaoService.findAuditoria(historico_config_1.historicoConfig.table[0], id[0], id[1])
            .subscribe(function (auditorias) { return _this.auditorias = _this.transformAuditorias(auditorias); });
    };
    FormulariosPermissaoEditarComponent.prototype.transformAuditorias = function (auditorias) {
        return auditorias.map(function (auditoria) { return new auditoria_model_1.Auditoria(auditoria); });
    };
    FormulariosPermissaoEditarComponent.prototype.getConfig = function () {
        var aux = lodash_1.cloneDeep(this.config);
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
            matricula: [null, forms_1.Validators.required],
            nmDesignado: [null, forms_1.Validators.compose([forms_1.Validators.pattern('^[a-zA-ZÀ-ú ]+$'), forms_1.Validators.required])],
            email: [null, forms_1.Validators.compose([ng2_validation_1.CustomValidators.email, forms_1.Validators.required])],
            dsTitulo: [null],
            dsCargo: [null, forms_1.Validators.pattern('^[a-zA-ZÀ-ú .,;:/?]+$')],
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
            dtVigenciaFim: [null, date_validator_1.DateValidator.dateValidator],
            dtVigenciaInicio: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, forms_1.Validators.required])],
            nivel: [null],
            nivelDescricao: [null]
        }, { validator: dateRange_validator_1.DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
        this.montFormAdicionarNivel();
    };
    FormulariosPermissaoEditarComponent.prototype.montFormAdicionarNivel = function () {
        this.formAdicionarNivel = this.fb
            .group({
            empresa: [null, forms_1.Validators.required],
            nivel: [null, forms_1.Validators.required],
            nmAbreviatura: [null],
            dtVigenciaInicio: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, forms_1.Validators.required])],
            dtVigenciaFim: [null, date_validator_1.DateValidator.dateValidator],
            tipoDesignacao: [null],
        }, { validator: dateRange_validator_1.DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
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
            dtVigenciaInicio: [new Date(this.designacaoNivel.dtVigenciaInicio).toISOString().substr(0, 10), forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, forms_1.Validators.required])],
            dtVigenciaFim: [this.designacaoNivel.dtVigenciaFim, date_validator_1.DateValidator.dateValidator],
            nivel: [this.designacaoNivel.nivel.cdNivel],
            nivelDescricao: [this.designacaoNivel.nivel.nmAbreviatura + " - " + this.designacaoNivel.nivel.nmNivel]
        }, { validator: dateRange_validator_1.DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
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
            nmSiglaEmpresa: this.niveis[this.indexNivel].nmSiglaEmpresa,
            modificationTime: this.niveis[this.indexNivel].modificationTime,
            modifiedByUser: this.niveis[this.indexNivel].modifiedByUser,
            creationTime: this.niveis[this.indexNivel].creationTime,
            createdByUser: this.niveis[this.indexNivel].createdByUser
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
            nmSiglaEmpresa: this.empresa.nmSigla,
            modificationTime: this.niveisDesignacoes[this.indexNivel].modificationTime,
            modifiedByUser: this.niveisDesignacoes[this.indexNivel].modifiedByUser,
            creationTime: this.niveisDesignacoes[this.indexNivel].creationTime,
            createdByUser: this.niveisDesignacoes[this.indexNivel].createdByUser
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
        core_1.Component({
            selector: 'app-formularios.permissao.editar',
            templateUrl: './formularios.permissao.editar.component.html',
            styleUrls: ['./formularios.permissao.editar.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            empresa_service_1.EmpresaService,
            nivel_service_1.NivelService,
            designacao_service_1.DesignacaoService,
            router_1.ActivatedRoute,
            ngx_spinner_1.NgxSpinnerService,
            ng_bootstrap_1.NgbModal])
    ], FormulariosPermissaoEditarComponent);
    return FormulariosPermissaoEditarComponent;
}());
exports.FormulariosPermissaoEditarComponent = FormulariosPermissaoEditarComponent;
//# sourceMappingURL=formularios.permissao.editar.component.js.map