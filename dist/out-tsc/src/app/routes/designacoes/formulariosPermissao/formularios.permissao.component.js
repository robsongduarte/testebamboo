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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ngx_spinner_1 = require("ngx-spinner");
var empresa_service_1 = require("../../../service/estrutura/empresa.service");
var designacao_service_1 = require("../../../service/designacoes/designacao.service");
var nivel_service_1 = require("../../../service/estrutura/nivel.service");
var date_validator_1 = require("../../../shared/validators/date.validator");
var dateRange_validator_1 = require("../../../shared/validators/dateRange.validator");
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
            inicioVigencia: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, date_validator_1.DateValidator.dataInvalida])],
            finalVigencia: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, date_validator_1.DateValidator.dataInvalida])]
        }, { validator: dateRange_validator_1.DateRangeValidator.dataInicioMaior('inicioVigencia', 'finalVigencia') });
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
        core_1.Component({
            selector: 'app-formularios-permissao-component',
            templateUrl: './formularios.permissao.component.html',
            styleUrls: ['./formularios.permissao.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            empresa_service_1.EmpresaService,
            designacao_service_1.DesignacaoService,
            nivel_service_1.NivelService,
            ngx_spinner_1.NgxSpinnerService])
    ], FormulariosPermissaoComponent);
    return FormulariosPermissaoComponent;
}());
exports.FormulariosPermissaoComponent = FormulariosPermissaoComponent;
//# sourceMappingURL=formularios.permissao.component.js.map