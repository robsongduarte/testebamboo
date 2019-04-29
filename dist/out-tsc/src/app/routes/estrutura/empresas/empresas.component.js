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
var swal = require('sweetalert2');
var EmpresasComponent = /** @class */ (function () {
    function EmpresasComponent(fb, router, spinner, empresaService) {
        this.fb = fb;
        this.router = router;
        this.spinner = spinner;
        this.empresaService = empresaService;
        this.empresas = [];
        this.ngxTipoEmpresa = 'TODAS';
        this.ngxSituacao = 'TODAS';
        this.itemsTipoEmpresa = [{ 'id': 'TODAS', 'tipo': 'Todas' },
            { 'id': 'HOLDING', 'tipo': 'Holding' },
            { 'id': 'OPERACIONALHOLDING', 'tipo': 'Operacional/Holding' },
            { 'id': 'OPERACIONAL', 'tipo': 'Operacional' }];
        this.itemsSituacao = [{ 'id': 'TODAS', 'situacao': 'Todas' },
            { 'id': 'ATIVA', 'situacao': 'Ativa' },
            { 'id': 'INATIVA', 'situacao': 'Inativa' }];
        this.headElements = ['Empresa', 'Sigla', 'Tipo Empresa', 'Situação', '', ''];
        this.spinner.show();
        this._createForm();
        this.spinner.hide();
    }
    EmpresasComponent.prototype._createForm = function () {
        this.formEmpresa = this.fb
            .group({
            cdEmpresa: [null],
            nmEmpresa: [null],
            nmSigla: [null],
            tipoEmpresa: [null],
            flAtivo: [null]
        });
    };
    EmpresasComponent.prototype.limpar = function () {
        this._createForm();
        this.ngxTipoEmpresa = 'TODAS';
        this.ngxSituacao = 'TODAS';
    };
    EmpresasComponent.prototype.pesquisar = function () {
        var _this = this;
        this.spinner.show();
        this.empresas = [];
        if (this.formEmpresa.value.nmEmpresa == '') {
            this.formEmpresa.value.nmEmpresa = null;
        }
        if (this.formEmpresa.value.nmSigla == '') {
            this.formEmpresa.value.nmSigla = null;
        }
        if (this.formEmpresa.value.tipoEmpresa == '') {
            this.formEmpresa.value.tipoEmpresa = null;
        }
        this.empresaService.allByEmpresas(this.formEmpresa.value.nmEmpresa, this.formEmpresa.value.nmSigla, this.formEmpresa.value.tipoEmpresa, this.formEmpresa.value.flAtivo)
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
    EmpresasComponent.prototype.ngOnInit = function () {
        this.spinner.show();
        this.spinner.hide();
    };
    EmpresasComponent.prototype.incluirEmpresa = function () {
        this.router.navigate(['empresas-incluir', 0, false]);
    };
    EmpresasComponent.prototype.editar = function (editarEmpresa) {
        this.router.navigate(['empresas-incluir', editarEmpresa.cdEmpresa, false]);
    };
    EmpresasComponent.prototype.inativar = function (inativarEmpresa, indexEmpresa, event) {
        var _this = this;
        this.title = inativarEmpresa.flAtivo == false ? 'Deseja reativar a empresa?' : 'Deseja realmente inativar a empresa?';
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
                _this.spinner.show();
                inativarEmpresa.flAtivo = event.target.checked;
                _this.empresaService.save(inativarEmpresa)
                    .subscribe(function (result) {
                    _this.spinner.hide();
                }, function (error) { return console.log(error); });
            }
            else {
                event.target.checked = inativarEmpresa.flAtivo;
            }
        });
    };
    EmpresasComponent = __decorate([
        core_1.Component({
            selector: 'app-empresas-component',
            templateUrl: './empresas.component.html',
            styleUrls: ['./empresas.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            ngx_spinner_1.NgxSpinnerService,
            empresa_service_1.EmpresaService])
    ], EmpresasComponent);
    return EmpresasComponent;
}());
exports.EmpresasComponent = EmpresasComponent;
//# sourceMappingURL=empresas.component.js.map