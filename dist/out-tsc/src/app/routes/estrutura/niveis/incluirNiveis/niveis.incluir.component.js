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
var common_1 = require("@angular/common");
var date_validator_1 = require("./../../../../shared/validators/date.validator");
var dateRange_validator_1 = require("./../../../../shared/validators/dateRange.validator");
var ngx_spinner_1 = require("ngx-spinner");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var nivel_service_1 = require("../../../../service/estrutura/nivel.service");
var localidade_service_1 = require("../../../../service/estrutura/localidade.service");
var angular_tree_component_1 = require("angular-tree-component");
var empresa_service_1 = require("../../../../service/estrutura/empresa.service");
var tipo_nivel_service_1 = require("../../../../service/estrutura/tipo.nivel.service");
var swal = require('sweetalert2');
var actionMapping = {
    mouse: {
        contextMenu: function (tree, node, $event) {
            $event.preventDefault();
            alert("context menu for " + node.data.name);
        },
        click: function (tree, node, $event) {
            $event.shiftKey
                ? angular_tree_component_1.TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
                : angular_tree_component_1.TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
        }
    }
};
var NiveisIncluirComponent = /** @class */ (function () {
    function NiveisIncluirComponent(fb, route, spinner, nivelService, localidadeService, empresaService, tipoNivelService, datePipe) {
        this.fb = fb;
        this.route = route;
        this.spinner = spinner;
        this.nivelService = nivelService;
        this.localidadeService = localidadeService;
        this.empresaService = empresaService;
        this.tipoNivelService = tipoNivelService;
        this.datePipe = datePipe;
        this.empresas = [];
        this.tipoNiveis = [];
        this.localidades = [];
        this.organogramaNiveis = [];
        this.value = null;
        this.dsEstrutura = null;
        this.ngxLocalidade = 0;
        this.ngxValueEmpresa = 0;
        this.childrenOfNivel = {};
        this.dtInicio = new Date();
        this.dtFim = new Date();
        this.edicao = false;
        this.habilitarTipoNivel = true;
        this.habilitarLocalidade = true;
        this.mostrarDescricaoNivel = false;
        this.nodes = null;
        this.customTemplateStringOptions = {
            // displayField: 'subTitle',
            isExpandedField: 'expanded',
            idField: 'uuid',
            actionMapping: actionMapping,
            allowDrag: false
        };
    }
    NiveisIncluirComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        this.creatForm();
        this.route.params.subscribe(function (params) {
            _this.cdNivel = params['id'];
        });
        if (this.cdNivel > 0) {
            this.edicao = true;
            this.montForm();
        }
        this.spinner.hide();
    };
    NiveisIncluirComponent.prototype.creatForm = function () {
        this.formNivelIncluir = this.fb.group({
            cdNivel: [null],
            cdEmpresa: [null],
            tipoNivel: [null, forms_1.Validators.required],
            nmAbreviatura: [null, forms_1.Validators.required],
            flPresidencia: [null],
            nmNivel: [null, forms_1.Validators.required],
            dtVigenciaInicio: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, forms_1.Validators.required, date_validator_1.DateValidator.dataInvalida])],
            dtVigenciaFim: [null, forms_1.Validators.compose([date_validator_1.DateValidator.dateValidator, date_validator_1.DateValidator.dataInvalida])],
            nrCentroDeCusto: [null],
            localidade: [null, forms_1.Validators.required],
            empresa: [null],
            nivelPai: [null],
            enderecoLocalidade: [null],
            dsEstrutura: [null],
            creationTime: [null],
            createdByUser: [null],
            modificationTime: [null],
            modifiedByUser: [null]
        }, { validator: dateRange_validator_1.DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
        this.creatFormNivelEstrutura();
    };
    NiveisIncluirComponent.prototype.creatFormNivelEstrutura = function () {
        this.formNivelEstrutura = this.fb.group({
            estrutura: [null],
            nome: [null],
            inicioVigencia: [null],
            fimVigencia: [null]
        });
    };
    NiveisIncluirComponent.prototype.montForm = function () {
        var _this = this;
        this.spinner.show();
        this.nivelService.findById(this.cdNivel.toString())
            .subscribe(function (nivel) {
            _this.tipoNiveis.push(nivel.nivel.tipoNivel);
            _this.formNivelIncluir.patchValue({
                cdNivel: nivel.nivel.cdNivel,
                tipoNivel: nivel.nivel.tipoNivel,
                nmAbreviatura: nivel.nivel.nmAbreviatura,
                flPresidencia: nivel.nivel.tipoNivel.flPresidencia,
                nmNivel: nivel.nivel.nmNivel,
                dtVigenciaInicio: nivel.nivel.dtVigenciaInicio,
                dtVigenciaFim: nivel.nivel.dtVigenciaFim,
                nrCentroDeCusto: nivel.nivel.nrCentroDeCusto,
                localidade: nivel.nivel.localidade,
                empresa: nivel.nivel.empresa,
                nivelPai: nivel.nivel.nivelPai,
                modificationTime: nivel.nivel.modificationTime,
                modifiedByUser: nivel.nivel.modifiedByUser,
                creationTime: nivel.nivel.creationTime,
                createdByUser: nivel.nivel.createdByUser
            });
            _this.carregarEstruturaNivel(0);
            _this.dataMinima = _this.formNivelIncluir.value.dtVigenciaInicio;
            if (_this.formNivelIncluir.value.tipoNivel != null) {
                _this.ngxTipoNivel = _this.formNivelIncluir.value.tipoNivel.cdTipoNivel;
            }
            if (_this.formNivelIncluir.value.localidade != null) {
                _this.ngxLocalidade = _this.formNivelIncluir.value.localidade.cdLocalidade;
                _this.cdEmpresa = nivel.nivel.empresa.cdEmpresa;
                _this.carregarLocalidade();
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent.prototype.carregarEstruturaNivel = function (adicionarEstrutura) {
        var _this = this;
        this.nivelService.findNivelByEstrutura(this.cdNivel, adicionarEstrutura)
            .subscribe(function (estrutura) {
            _this.formNivelIncluir.patchValue({
                dsEstrutura: estrutura
            });
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent.prototype.carregarDataInicioVigencia = function () {
        this.dataMinima = this.formNivelIncluir.value.dtVigenciaInicio;
        this.dtInicio = new Date(this.formNivelIncluir.value.dtVigenciaInicio);
        this.dtFim = new Date(this.formNivelIncluir.value.dtVigenciaFim);
        if (this.dtInicio.getTime() > this.dtFim.getTime()) {
            this.formNivelIncluir.patchValue({
                dtVigenciaFim: null
            });
        }
    };
    NiveisIncluirComponent.prototype.carregarLocalidade = function () {
        var _this = this;
        this.spinner.show();
        this.localidadeService.allByEmpresa(this.cdEmpresa)
            .subscribe(function (localidades) {
            if (localidades != null) {
                for (var _i = 0, localidades_1 = localidades; _i < localidades_1.length; _i++) {
                    var localidade = localidades_1[_i];
                    _this.localidades.push(localidade.localidade);
                }
            }
            _this.carregarEnderecoLocalidade();
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent.prototype.carregarEnderecoLocalidade = function () {
        var _this = this;
        if (this.ngxLocalidade > 0) {
            this.localidade = this.localidades.find((function (obj) { return obj.cdLocalidade == _this.ngxLocalidade; }));
            this.formNivelIncluir.patchValue({
                enderecoLocalidade: this.localidade.nmLogradouro + ', n° ' +
                    this.localidade.nrLogradouro + ' - ' +
                    this.localidade.vlCep + ' - ' +
                    this.localidade.nmBairro + ' - ' +
                    this.localidade.nmMunicipio + ', ' +
                    this.localidade.nmUf
            });
        }
    };
    NiveisIncluirComponent.prototype.removerEnderecoLocalidade = function () {
        this.formNivelIncluir.patchValue({
            enderecoLocalidade: null
        });
    };
    NiveisIncluirComponent.prototype.salvar = function () {
        var _this = this;
        this.tipoNivel = this.tipoNiveis.find((function (obj) { return obj.cdTipoNivel == _this.ngxTipoNivel; }));
        this.localidade = this.localidades.find((function (obj) { return obj.cdLocalidade == _this.ngxLocalidade; }));
        this.empresa = this.empresas.find((function (obj) { return obj.cdEmpresa == _this.cdEmpresa; }));
        if (this.mostrarDescricaoNivel) {
            this.spinner.show();
            this.nivelService.findById(this.cdNivel.toString())
                .subscribe(function (nivel) {
                _this.nivelPai = nivel.nivel;
                _this.spinner.hide();
                _this.save();
            }, function (error) { return console.log(error); });
        }
        else {
            this.nivelPai = null;
            this.save();
        }
    };
    NiveisIncluirComponent.prototype.save = function () {
        var _this = this;
        this.spinner.show();
        this.tipoNivel.flPresidencia = this.formNivelIncluir.value.flPresidencia;
        this.formNivelIncluir.patchValue({
            tipoNivel: this.tipoNivel,
            localidade: this.localidade,
            empresa: this.empresa,
            nivelPai: this.nivelPai
        });
        this.nivelService.save(this.formNivelIncluir.value)
            .subscribe(function (result) {
            _this.nivel = result.nivel;
            _this.montForm();
            _this.spinner.hide();
            _this.sweetalertSucesso();
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent.prototype.sweetalertSucesso = function () {
        swal.fire('Nível salvo com sucesso!', '', 'success');
    };
    NiveisIncluirComponent.prototype.editarNivelEstrutura = function () {
        var _this = this;
        this.creatFormNivelEstrutura();
        this.item = null;
        this.id = null;
        this.parentId = null;
        this.childrenOfNivel = {};
        this.spinner.show();
        this.nivelService.findNivelByPaiAndEmpresaClean(this.cdEmpresa)
            .subscribe(function (organogramaNiveis) {
            if (organogramaNiveis != null) {
                for (var _i = 0, organogramaNiveis_1 = organogramaNiveis; _i < organogramaNiveis_1.length; _i++) {
                    var organogramaNivel = organogramaNiveis_1[_i];
                    _this.organogramaNiveis.push(organogramaNivel);
                }
                for (_this.index = 0, length = _this.organogramaNiveis.length; _this.index < length; _this.index++) {
                    _this.item = _this.organogramaNiveis[_this.index];
                    _this.id = _this.item["id"];
                    _this.parentId = _this.item["children"] || 0;
                    _this.childrenOfNivel[_this.id] = _this.childrenOfNivel[_this.id] || [];
                    _this.item["children"] = _this.childrenOfNivel[_this.id];
                    _this.childrenOfNivel[_this.parentId] = _this.childrenOfNivel[_this.parentId] || [];
                    _this.childrenOfNivel[_this.parentId].push(_this.item);
                }
                _this.jsonOrganograma = JSON.stringify(_this.childrenOfNivel["EMPRESA_PAI"]);
                _this.jsonOrganograma = _this.jsonOrganograma.substring(1, _this.jsonOrganograma.length - 1);
                _this.nodes = [JSON.parse(_this.jsonOrganograma)];
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent.prototype.salvarNivelEstrutura = function () {
        this.cdNivel = parseInt(this.cdNivelSelecionado, 10);
        if (this.mostrarDescricaoNivel) {
            this.carregarEstruturaNivel(1);
        }
        else {
            this.formNivelIncluir.patchValue({
                dsEstrutura: this.dsEstrutura
            });
        }
    };
    NiveisIncluirComponent.prototype.filterNodes = function (text, tree) {
        tree.treeModel.filterNodes(text, true);
    };
    NiveisIncluirComponent.prototype.onEvent = function (msg) {
        console.log(msg);
    };
    NiveisIncluirComponent.prototype.childrenCount = function (node) {
        return node && node.children.length > 0 ? "(" + node.children.length + ")" : '';
    };
    NiveisIncluirComponent.prototype.descricaoNivel = function (node) {
        this.creatFormNivelEstrutura();
        if (node.data.id > 0) {
            this.cdNivelSelecionado = node.data.id;
            this.mostrarDescricaoNivel = true;
            this.organogramaNivel = this.organogramaNiveis.find((function (obj) { return obj.id == node.data.id; }));
            this.formNivelEstrutura.patchValue({
                nome: this.organogramaNivel.title,
                inicioVigencia: this.datePipe.transform(this.organogramaNivel.dtVigenciaInicio, 'yyyy-MM-dd'),
                fimVigencia: this.datePipe.transform(this.organogramaNivel.dtVigenciaFim, 'yyyy-MM-dd'),
            });
        }
        else {
            console.log(node.data.id);
            this.dsEstrutura = node.data.name;
            this.cdNivelSelecionado = node.data.id;
            this.mostrarDescricaoNivel = false;
        }
    };
    NiveisIncluirComponent.prototype.removerEmpresa = function () {
        this.habilitarTipoNivel = true;
        this.habilitarLocalidade = true;
        this.empresas = [];
        this.tipoNiveis = [];
        this.localidades = [];
        this.ngxValueEmpresa = 0;
        this.ngxTipoNivel = 0;
        this.ngxTipoNivel = 0;
        this.formNivelIncluir.patchValue({
            enderecoLocalidade: null
        });
    };
    NiveisIncluirComponent.prototype.onKeyUp = function (event) {
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
    NiveisIncluirComponent.prototype.findByName = function (nmEmpresa) {
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
    NiveisIncluirComponent.prototype.carregarTipoNivel = function () {
        this.cdEmpresa = this.ngxValueEmpresa;
        this.habilitarTipoNivel = false;
        this.habilitarLocalidade = false;
        this.allByTipoNiveis();
        this.carregarLocalidade();
        this.tipoNiveis = this.tipoNiveis.filter(function (obj, pos, arr) {
            return arr.map(function (mapObj) { return mapObj.nmAbreviatura; }).indexOf(obj.nmAbreviatura) === pos;
        });
    };
    NiveisIncluirComponent.prototype.allByTipoNiveis = function () {
        var _this = this;
        this.spinner.show();
        this.tipoNiveis = [];
        this.tipoNivelService.all()
            .subscribe(function (tipoNiveis) {
            if (tipoNiveis != null) {
                for (var _i = 0, tipoNiveis_1 = tipoNiveis; _i < tipoNiveis_1.length; _i++) {
                    var tipoNivel = tipoNiveis_1[_i];
                    _this.tipoNiveis.push(tipoNivel.tipoNivel);
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent.prototype.findByIdNivel = function (cdNivel) {
        var _this = this;
        this.nivelService.findById(cdNivel.toString())
            .subscribe(function (nivel) {
            _this.nivelPai = nivel.nivel;
        }, function (error) { return console.log(error); });
    };
    NiveisIncluirComponent = __decorate([
        core_1.Component({
            selector: 'app-niveis-incluir',
            templateUrl: './niveis.incluir.component.html',
            styleUrls: ['./niveis.incluir.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.ActivatedRoute,
            ngx_spinner_1.NgxSpinnerService,
            nivel_service_1.NivelService,
            localidade_service_1.LocalidadeService,
            empresa_service_1.EmpresaService,
            tipo_nivel_service_1.TipoNivelService,
            common_1.DatePipe])
    ], NiveisIncluirComponent);
    return NiveisIncluirComponent;
}());
exports.NiveisIncluirComponent = NiveisIncluirComponent;
//# sourceMappingURL=niveis.incluir.component.js.map