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
var date_validator_1 = require("./../../../../shared/validators/date.validator");
var correios_service_1 = require("./../../../../service/correios/correios.service");
var ng2_validation_1 = require("ng2-validation");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ngx_spinner_1 = require("ngx-spinner");
var empresa_service_1 = require("../../../../service/estrutura/empresa.service");
var dominio_service_1 = require("../../../../service/estrutura/dominio.service");
var common_1 = require("@angular/common");
var ngx_filter_pipe_1 = require("ngx-filter-pipe");
var anexo_empresa_service_1 = require("../../../../service/estrutura/anexo-empresa.service");
var swal = require('sweetalert2');
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
            dsLocalidade: [null, forms_1.Validators.required],
            situacaoLocalidade: [this.ngxSituacaoLocalidade, forms_1.Validators.required],
            vlCep: [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
            nmLogradouro: [null],
            nrLogradouro: [null, forms_1.Validators.required],
            nmComplemento: [null],
            nmBairro: [null],
            nmMunicipio: [null],
            nmUf: [null, forms_1.Validators.compose([forms_1.Validators.pattern('^[a-zA-ZÀ-ú ]+$'), forms_1.Validators.minLength(2)])],
            nrCaixaPostal: [null],
            nrTelefone: [null],
            nmEnderecoRodape: [null, forms_1.Validators.required],
            CNPJ: [null],
            nrInscEstadual: [null],
            nrInscMunicipal: [null],
            nrNIRE: [null],
            dtRegistroNire: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator])],
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
            nmEmpresa: [null, forms_1.Validators.required],
            nmSigla: [null, forms_1.Validators.required],
            nmDenominacaoSocial: [null, forms_1.Validators.required],
            flAtivo: [null],
            nrParticipacaoCapital: [null, ng2_validation_1.CustomValidators.range([0, 10000])],
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
        core_1.Component({
            selector: 'app-empresas-incluir',
            templateUrl: './empresas.incluir.component.html',
            styleUrls: ['./empresas.incluir.component.scss'],
            providers: [common_1.DatePipe]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            router_1.Router,
            ngx_spinner_1.NgxSpinnerService,
            empresa_service_1.EmpresaService,
            dominio_service_1.DominioService,
            correios_service_1.CorreiosService,
            common_1.DatePipe,
            anexo_empresa_service_1.AnexoEmpresaService,
            ngx_filter_pipe_1.FilterPipe])
    ], EmpresasIncluirComponent);
    return EmpresasIncluirComponent;
}());
exports.EmpresasIncluirComponent = EmpresasIncluirComponent;
//# sourceMappingURL=empresas.incluir.component.js.map