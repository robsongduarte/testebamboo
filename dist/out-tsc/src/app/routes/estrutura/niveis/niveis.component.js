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
var empresa_service_1 = require("../../../service/estrutura/empresa.service");
var dateRange_validator_1 = require("../../../shared/validators/dateRange.validator");
var date_validator_1 = require("../../../shared/validators/date.validator");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var ngx_spinner_1 = require("ngx-spinner");
var nivel_service_1 = require("../../../service/estrutura/nivel.service");
var router_1 = require("@angular/router");
var NiveisComponent = /** @class */ (function () {
    function NiveisComponent(spinner, router, fb, empresaService, nivelService) {
        this.spinner = spinner;
        this.router = router;
        this.fb = fb;
        this.empresaService = empresaService;
        this.nivelService = nivelService;
        this.empresas = [];
        this.niveis = [];
        this.itemsSituacao = [{ 'id': true, 'situacao': 'Ativa' },
            { 'id': false, 'situacao': 'Inativa' }];
        this.nivelFilter = [];
        this.headElements = ['Nível', 'Início', 'Fim', '', ''];
        this.ngxSituacao = true;
        this.value = null;
        this.dtInicio = new Date();
        this.dtFim = new Date();
        this.createForm();
    }
    NiveisComponent.prototype.ngOnInit = function () {
        this.dataMinima = new Date().toISOString().substr(0, 10).toString();
    };
    NiveisComponent.prototype.createForm = function () {
        this.carregarData = new Date().toISOString().substr(0, 10).toString();
        this.formNiveis = this.fb
            .group({
            cdEmpresa: [null, forms_1.Validators.required],
            flAtivo: [null],
            dtVigenciaInicio: [this.carregarData, forms_1.Validators.compose([forms_1.Validators.required, date_validator_1.DateValidator.dateValidator, date_validator_1.DateValidator.dataInvalida])],
            dtVigenciaFim: [this.carregarData, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, date_validator_1.DateValidator.dataInvalida])],
        }, { validator: dateRange_validator_1.DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
        this.formPesquisaNivel = this.fb
            .group({ pesquisaNivel: [null] });
    };
    NiveisComponent.prototype.carregarDataInicioVigencia = function () {
        this.dataMinima = this.formNiveis.value.dtVigenciaInicio;
        this.carregarDatas();
    };
    NiveisComponent.prototype.carregarDataFimVigencia = function () {
        this.carregarDatas();
    };
    NiveisComponent.prototype.carregarDatas = function () {
        this.dtFim = new Date(this.formNiveis.value.dtVigenciaFim);
        this.dtInicio = new Date(this.formNiveis.value.dtVigenciaInicio);
    };
    NiveisComponent.prototype.limpar = function () {
        this.createForm();
        this.ngxSituacao = true;
        this.ngxValueEmpresa = 0;
        this.dataMinima = new Date().toISOString().substr(0, 10);
    };
    NiveisComponent.prototype.removerEmpresa = function () {
        this.empresas = [];
        this.ngxValueEmpresa = 0;
        this.formNiveis.patchValue({
            nmEmpresa: null
        });
    };
    NiveisComponent.prototype.onKeyUp = function (event) {
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
    NiveisComponent.prototype.findByName = function (nmEmpresa) {
        var _this = this;
        this.spinner.show();
        this.empresaService.findByName(nmEmpresa)
            .subscribe(function (empresas) {
            if (empresas != null) {
                _this.empresas = [];
                for (var _i = 0, empresas_1 = empresas; _i < empresas_1.length; _i++) {
                    var empresa = empresas_1[_i];
                    _this.empresas.push(empresa.empresa);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    NiveisComponent.prototype.pesquisar = function () {
        var _this = this;
        this.spinner.show();
        this.niveis = [];
        if (this.formNiveis.value.dtVigenciaFim == '') {
            this.formNiveis.value.dtVigenciaFim = null;
        }
        this.nivelService.findNivelByEmpresa(this.formNiveis.value.cdEmpresa, this.formNiveis.value.flAtivo, this.formNiveis.value.dtVigenciaInicio, this.formNiveis.value.dtVigenciaFim)
            .subscribe(function (niveis) {
            if (niveis != null) {
                for (var _i = 0, niveis_1 = niveis; _i < niveis_1.length; _i++) {
                    var nivel = niveis_1[_i];
                    _this.niveis.push(nivel);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
        this.formPesquisaNivel.patchValue({
            pesquisaNivel: null,
        });
    };
    NiveisComponent.prototype.editar = function (niveis) {
        this.router.navigate(['niveis-incluir', niveis.cdNivel]);
    };
    NiveisComponent.prototype.incluirNivel = function () {
        this.router.navigate(['niveis-incluir', 0]);
    };
    NiveisComponent = __decorate([
        core_1.Component({
            selector: 'app-niveis-component',
            templateUrl: './niveis.component.html',
            styleUrls: ['./niveis.component.scss']
        }),
        __metadata("design:paramtypes", [ngx_spinner_1.NgxSpinnerService,
            router_1.Router,
            forms_1.FormBuilder,
            empresa_service_1.EmpresaService,
            nivel_service_1.NivelService])
    ], NiveisComponent);
    return NiveisComponent;
}());
exports.NiveisComponent = NiveisComponent;
//# sourceMappingURL=niveis.component.js.map