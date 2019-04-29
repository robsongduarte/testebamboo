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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var common_1 = require("@angular/common");
var anexo_empresa_service_1 = require("../../../../../service/estrutura/anexo-empresa.service");
var sweetalert2_1 = require("sweetalert2");
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
        }, function () { return sweetalert2_1.default.fire(_this.error({
            text: 'Houve um erro ao salvar o arquivo.'
        })); });
    };
    AnexosComponent.prototype.salvarAnexo = function (nomeArquivo) {
        var _this = this;
        this.anexoEmpresaService.save(this.createEmpresaAnexo(nomeArquivo))
            .subscribe(function () {
            _this.carregarAnexos();
            _this.clearFileSelected();
        }, function () { return sweetalert2_1.default.fire(_this.error({
            text: 'Houve um erro ao salvar o anexo.'
        })); }, function () { return sweetalert2_1.default.fire(_this.success({
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
        }, function () { return sweetalert2_1.default.fire(_this.error({
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
        sweetalert2_1.default.fire(this.modal()).then(function (result) {
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
            .subscribe(function () { return _this.carregarAnexos(); }, function () { return sweetalert2_1.default.fire(_this.error({
            text: 'Houve um erro ao excluir o anexo.'
        })); }, function () { return sweetalert2_1.default.fire(_this.success({
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
        core_1.Input(),
        __metadata("design:type", Number)
    ], AnexosComponent.prototype, "cdEmpresa", void 0);
    AnexosComponent = __decorate([
        core_1.Injectable(),
        core_1.Component({
            selector: 'app-anexos',
            templateUrl: './anexos.component.html',
            providers: [common_1.DatePipe]
        }),
        __param(2, core_1.Inject(common_1.DOCUMENT)),
        __param(3, core_1.Inject(core_1.LOCALE_ID)),
        __metadata("design:paramtypes", [anexo_empresa_service_1.AnexoEmpresaService,
            ng_bootstrap_1.NgbModal, Object, String, common_1.DatePipe])
    ], AnexosComponent);
    return AnexosComponent;
}());
exports.AnexosComponent = AnexosComponent;
//# sourceMappingURL=anexos.component.js.map