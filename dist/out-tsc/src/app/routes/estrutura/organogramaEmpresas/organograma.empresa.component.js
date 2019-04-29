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
var forms_1 = require("@angular/forms");
var ngx_spinner_1 = require("ngx-spinner");
var empresa_service_1 = require("./../../../service/estrutura/empresa.service");
var core_1 = require("@angular/core");
var nivel_service_1 = require("../../../service/estrutura/nivel.service");
var router_1 = require("@angular/router");
var swal = require('sweetalert');
require('orgchart');
var OrganogramaEmpresaComponent = /** @class */ (function () {
    function OrganogramaEmpresaComponent(fb, router, route, empresaService, nivelService, spinner) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.empresaService = empresaService;
        this.nivelService = nivelService;
        this.spinner = spinner;
        this.cdEmpresa = 1;
        this.empresaNiveis = [];
        this.organogramaNiveis = [];
        this.tree = [];
        this.childrenOf = {};
        this.childrenOfNivel = {};
        this.zoomval = .8;
        this.habilitarOrgNivel = false;
        this.carregarOrganogramaNivel = false;
    }
    OrganogramaEmpresaComponent.prototype.createFormOrganograma = function () {
        this.spinner.show();
        this.formOrganograma = this.fb
            .group({
            pesquisaOrganograma: [null, forms_1.Validators.required]
        });
        this.spinner.hide();
    };
    OrganogramaEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.cdEmpresaNivel = params['cdEmpresaNivel'];
            _this.carregarOrganogramaNivel = JSON.parse(params['carregarOrganogramaNivel']);
        });
        this.createFormOrganograma();
        this.empresaService.findEmpresasFilhaByEmpresaPaiWithLevels(this.cdEmpresa)
            .subscribe(function (empresaNiveis) {
            _this.spinner.show();
            if (empresaNiveis != null) {
                for (var _i = 0, empresaNiveis_1 = empresaNiveis; _i < empresaNiveis_1.length; _i++) {
                    var empresaNivel = empresaNiveis_1[_i];
                    _this.empresaNiveis.push(empresaNivel);
                }
                for (_this.index = 0, length = _this.empresaNiveis.length; _this.index < length; _this.index++) {
                    _this.item = _this.empresaNiveis[_this.index];
                    _this.id = _this.item["id"];
                    _this.parentId = _this.item["children"] || 0;
                    _this.childrenOf[_this.id] = _this.childrenOf[_this.id] || [];
                    _this.item["children"] = _this.childrenOf[_this.id];
                    if (_this.parentId != 0) {
                        _this.childrenOf[_this.parentId] = _this.childrenOf[_this.parentId] || [];
                        _this.childrenOf[_this.parentId].push(_this.item);
                    }
                    else {
                        _this.tree.push(_this.item);
                    }
                }
                _this.jsonOrganograma = JSON.stringify(_this.childrenOf[1]);
                _this.jsonOrganograma = _this.jsonOrganograma.substring(1, _this.jsonOrganograma.length - 1);
                _this.datasource = _this.jsonOrganograma;
                _this.datasourceEmpresa = _this.jsonOrganograma;
                _this.loadOrgChartEmpresa();
                if (_this.carregarOrganogramaNivel) {
                    _this.habilitarOrgNivel = true;
                    _this.organogramaNivel(_this.cdEmpresaNivel);
                    _this.abrirOrganogramaNivel();
                }
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    OrganogramaEmpresaComponent.prototype.loadOrgChartEmpresa = function () {
        this.oc = $('#chart-container').orgchart({
            'data': JSON.parse(this.datasource),
            'nodeContent': 'title',
            'direction': 'l2r',
            'pan': true,
            'zoom': true
        });
        this.recolherOrganograma();
        this.scaleZoom();
        //$('.orgchart').css('overflow','scroll');
    };
    OrganogramaEmpresaComponent.prototype.recolherOrganograma = function () {
        this.oc.hideChildren(this.oc.$chart.find('.node:first'));
        $('.orgchart').css('transform', '');
        this.currentZoom = 1;
        this.createFormOrganograma();
    };
    OrganogramaEmpresaComponent.prototype.expandirOrganograma = function () {
        this.cancelarPesquisa();
        var $temp = this.oc.$chart.find('.hidden')
            .removeClass('hidden');
        if ($temp.length > 0) {
            $temp[0].offsetWidth;
            $temp.find(".slide-up, .slide-left, .slide-right")
                .removeClass("slide-up slide-right slide-left");
        }
        this.createFormOrganograma();
    };
    OrganogramaEmpresaComponent.prototype.zoomMin = function () {
        this.zoomval = this.currentZoom -= 0.1;
        this.$chart.css('transform', this.div + " scale(" + this.zoomval + "," + this.zoomval + ")");
    };
    OrganogramaEmpresaComponent.prototype.zoomOut = function () {
        this.zoomval = this.currentZoom += 0.1;
        this.$chart.css('transform', this.div + " scale(" + this.zoomval + "," + this.zoomval + ")");
    };
    OrganogramaEmpresaComponent.prototype.scaleZoom = function () {
        this.$chart = $('.orgchart');
        this.div = this.$chart.css('transform');
        var values = this.div.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        this.currentZoom = Math.sqrt(a * a + b * b);
    };
    OrganogramaEmpresaComponent.prototype.pesquisaOrganograma = function () {
        this.cancelarPesquisa();
        var pesquisa = this.formOrganograma.value.pesquisaOrganograma;
        var retornoPesquisa = false;
        var $chart = $(".orgchart");
        // disalbe the expand/collapse feture
        $chart.addClass("noncollapsable");
        // distinguish the matched nodes and the unmatched nodes according to the given key word
        $chart
            .find(".node")
            .filter(function (index, node) {
            return ($(node)
                .text()
                .toLowerCase()
                .indexOf(pesquisa.toLowerCase()) > -1);
        })
            .addClass("matched")
            .closest("table")
            .parents("table")
            .find("tr:first")
            .find(".node")
            .addClass("retained");
        // hide the unmatched nodes      
        $chart.find(".matched,.retained").each(function (index, node) {
            retornoPesquisa = true;
            $(node)
                .removeClass("slide-up")
                .closest(".nodes")
                .removeClass("hidden")
                .siblings(".lines")
                .removeClass("hidden");
            var $unmatched = $(node)
                .closest("table")
                .parent()
                .siblings()
                .find(".node:first:not(.matched,.retained)")
                .closest("table")
                .parent()
                .addClass("hidden");
            $unmatched
                .parent()
                .prev()
                .children()
                .slice(1, $unmatched.length * 2 + 1)
                .addClass("hidden");
        });
        // hide the redundant descendant nodes of the matched nodes
        $chart.find(".matched").each(function (index, node) {
            if (!$(node)
                .closest("tr")
                .siblings(":last")
                .find(".matched").length) {
                $(node)
                    .closest("tr")
                    .siblings()
                    .addClass("hidden");
            }
        });
        if (!retornoPesquisa) {
            swal(this.habilitarOrgNivel ? "Nivel não encontrado!" : "Empresa não encontrada!");
            this.recolherOrganograma();
        }
    };
    OrganogramaEmpresaComponent.prototype.cancelarPesquisa = function () {
        $(".orgchart")
            .removeClass("noncollapsable")
            .find(".node")
            .removeClass("matched retained")
            .end()
            .find(".hidden")
            .removeClass("hidden")
            .end()
            .find(".slide-up, .slide-left, .slide-right")
            .removeClass("slide-up slide-right slide-left");
    };
    OrganogramaEmpresaComponent.prototype.organogramaNivel = function (cdEmpresa) {
        var _this = this;
        this.item = null;
        this.id = null;
        this.parentId = null;
        this.childrenOfNivel = {};
        this.spinner.show();
        this.nivelService.findNivelByPaiAndEmpresaClean(cdEmpresa)
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
                    if (_this.parentId != 0) {
                        _this.childrenOfNivel[_this.parentId] = _this.childrenOfNivel[_this.parentId] || [];
                        _this.childrenOfNivel[_this.parentId].push(_this.item);
                    }
                    else {
                        _this.tree.push(_this.item);
                    }
                }
                _this.jsonOrganograma = JSON.stringify(_this.childrenOfNivel["EMPRESA_PAI"]);
                _this.jsonOrganograma = _this.jsonOrganograma.substring(1, _this.jsonOrganograma.length - 1);
                _this.datasource = _this.jsonOrganograma;
                _this.loadOrgChartNivel();
            }
            _this.spinner.hide();
        }, function (error) { return console.log(error); });
    };
    OrganogramaEmpresaComponent.prototype.loadOrgChartNivel = function () {
        this.oc.init({ 'data': JSON.parse(this.datasource) });
        this.recolherOrganograma();
        this.carregarOrganogramaNivel = false;
        this.scaleZoom();
    };
    OrganogramaEmpresaComponent.prototype.abrirOrganogramaNivel = function () {
        this.str = this.oc.getHierarchy();
        var $codigoEmpresa = $('#chart-container').find('.node.focused');
        if ($codigoEmpresa.length > 0) {
            if (!this.habilitarOrgNivel) {
                this.habilitarOrgNivel = true;
                this.organogramaNivel(this.carregarOrganogramaNivel ? this.cdEmpresaNivel : $codigoEmpresa[0].id);
            }
            else {
                this.codigoNivelEmpresa = $codigoEmpresa[0].id;
                if (!!+this.codigoNivelEmpresa) {
                    console.log('nivel');
                }
                else {
                    this.nivelEmpresaSplit = this.codigoNivelEmpresa.split('-');
                    this.router.navigate(['empresas-incluir', this.carregarOrganogramaNivel ?
                            this.cdEmpresaNivel : this.nivelEmpresaSplit[0],
                        true]);
                }
            }
        }
    };
    OrganogramaEmpresaComponent.prototype.voltarOrganograma = function () {
        this.habilitarOrgNivel = false;
        this.oc.init({ 'data': JSON.parse(this.datasourceEmpresa) });
        this.recolherOrganograma();
    };
    OrganogramaEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'app-organograma-empresa-component',
            templateUrl: './organograma.empresa.component.html',
            styleUrls: ['./organograma.empresa.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            router_1.ActivatedRoute,
            empresa_service_1.EmpresaService,
            nivel_service_1.NivelService,
            ngx_spinner_1.NgxSpinnerService])
    ], OrganogramaEmpresaComponent);
    return OrganogramaEmpresaComponent;
}());
exports.OrganogramaEmpresaComponent = OrganogramaEmpresaComponent;
//# sourceMappingURL=organograma.empresa.component.js.map