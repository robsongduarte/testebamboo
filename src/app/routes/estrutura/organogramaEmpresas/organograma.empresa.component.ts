import { OrganogramaNiveis } from './../../../model/organograma.niveis';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmpresaService } from './../../../service/estrutura/empresa.service';
import {Component, OnInit} from '@angular/core';
import { EmpresaNiveis } from '../../../model/empresa.niveis';
import { NivelService } from '../../../service/estrutura/nivel.service';
import { Router, ActivatedRoute } from '@angular/router';

const swal = require('sweetalert');

require('orgchart');
declare var $: any;

@Component({
  selector: 'app-organograma-empresa-component',
  templateUrl: './organograma.empresa.component.html',
  styleUrls: ['./organograma.empresa.component.scss']
})
export class OrganogramaEmpresaComponent implements OnInit {

  formOrganograma: FormGroup;

  public datasource: any;

  public datasourceEmpresa: any;

  public cdEmpresa: number = 1;

  public empresaNiveis: EmpresaNiveis[] = [];

  public organogramaNiveis: OrganogramaNiveis[] = [];

  public map: {};

  public tree: any = [];
  
  public childrenOf: any = {};

  public childrenOfNivel: any = {};
  
  public item: any;

  public id: number;

  public parentId: number;

  public index: number;

  public oc: any;

  public currentZoom: any;

  public zoomval: any = .8;

  public $chart: any;

  public div:any;

  public jsonOrganograma: string;

  public habilitarOrgNivel: boolean = false;

  public codigoNivelEmpresa: string;

  public carregarOrganogramaNivel: boolean = false;

  public cdEmpresaNivel: number;

  public nivelEmpresaSplit: string[];

  public str: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private empresaService: EmpresaService,
              private nivelService: NivelService,
              private spinner: NgxSpinnerService) { 
  }

  createFormOrganograma() {
    this.spinner.show();
    this.formOrganograma = this.fb
      .group({
        pesquisaOrganograma: [null, Validators.required]
      });
    this.spinner.hide();
  }

  public ngOnInit() {
    
    this.route.params.subscribe((params)=> {
      this.cdEmpresaNivel = params['cdEmpresaNivel'];
      this.carregarOrganogramaNivel = JSON.parse(params['carregarOrganogramaNivel']);
    });

    
    this.createFormOrganograma();
    this.empresaService.findEmpresasFilhaByEmpresaPaiWithLevels(this.cdEmpresa)
    .subscribe(
      (empresaNiveis : EmpresaNiveis[]) => {   
        this.spinner.show();     
        if (empresaNiveis != null) {          
          for (let empresaNivel of empresaNiveis) {
            this.empresaNiveis.push(empresaNivel);
          }

          for (this.index = 0, length = this.empresaNiveis.length; this.index < length; this.index++) {            
            this.item = this.empresaNiveis[this.index];            
            this.id = this.item["id"];            
            this.parentId = this.item["children"] || 0;
            this.childrenOf[this.id] = this.childrenOf[this.id] || [];
            
            this.item["children"] = this.childrenOf[this.id];
            if (this.parentId != 0) {
              this.childrenOf[this.parentId] = this.childrenOf[this.parentId] || [];
              this.childrenOf[this.parentId].push(this.item);
            } else {              
              this.tree.push(this.item);
            }            
          }
          this.jsonOrganograma = JSON.stringify(this.childrenOf[1]);

          this.jsonOrganograma = this.jsonOrganograma.substring(1, this.jsonOrganograma.length-1);
          this.datasource = this.jsonOrganograma;          
          this.datasourceEmpresa = this.jsonOrganograma;  

          this.loadOrgChartEmpresa();  
          
          if (this.carregarOrganogramaNivel) {
            this.habilitarOrgNivel = true;
            this.organogramaNivel(this.cdEmpresaNivel);
            this.abrirOrganogramaNivel();
          }          

        }
        this.spinner.hide();
      },
      error => console.log(error));     
  }

  loadOrgChartEmpresa() {    
    this.oc = $('#chart-container').orgchart({
        'data': JSON.parse(this.datasource),
        'nodeContent': 'title',
        'direction': 'l2r',
        'pan':true,
        'zoom':true
    });
    
    this.recolherOrganograma();
    this.scaleZoom();
    //$('.orgchart').css('overflow','scroll');
  }

  recolherOrganograma() {
    this.oc.hideChildren(this.oc.$chart.find('.node:first'));    
    $('.orgchart').css('transform','');
    this.currentZoom = 1;
    this.createFormOrganograma();
    
  }

  expandirOrganograma() {
    this.cancelarPesquisa();
    var $temp = this.oc.$chart.find('.hidden')
                .removeClass('hidden');
    if ($temp.length > 0) {
      $temp[0].offsetWidth;
      $temp.find(".slide-up, .slide-left, .slide-right")
           .removeClass("slide-up slide-right slide-left"); 
    }        
    this.createFormOrganograma();
  }

  zoomMin(){
    this.zoomval = this.currentZoom -= 0.1;
    this.$chart.css('transform', this.div+" scale(" + this.zoomval + "," + this.zoomval + ")");
  }

  zoomOut() {
    this.zoomval = this.currentZoom += 0.1;
    this.$chart.css('transform', this.div+" scale(" + this.zoomval + "," + this.zoomval + ")");
  }

  scaleZoom() {
    this.$chart = $('.orgchart');
    this.div = this.$chart.css('transform');
    var values = this.div.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];

    this.currentZoom = Math.sqrt(a*a + b*b);
  }

  pesquisaOrganograma() {
    this.cancelarPesquisa();
    var pesquisa = this.formOrganograma.value.pesquisaOrganograma;
    var retornoPesquisa = false;    
    var $chart = $(".orgchart");
    // disalbe the expand/collapse feture
    $chart.addClass("noncollapsable");
    // distinguish the matched nodes and the unmatched nodes according to the given key word
    $chart
      .find(".node")
      .filter(function(index, node) {
        return (
          $(node)
            .text()
            .toLowerCase()
            .indexOf(pesquisa.toLowerCase()) > -1
        );
      })
      .addClass("matched")
      .closest("table")
      .parents("table")
      .find("tr:first")
      .find(".node")
      .addClass("retained");
    // hide the unmatched nodes      
    $chart.find(".matched,.retained").each(function(index, node) {
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
    $chart.find(".matched").each(function(index, node) {
      if (
        !$(node)
          .closest("tr")
          .siblings(":last")
          .find(".matched").length
      ) {
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
  }

  cancelarPesquisa() {
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
  }

  organogramaNivel(cdEmpresa: number) {   
    this.item = null;            
    this.id = null;            
    this.parentId = null;    
    this.childrenOfNivel = {};
    this.spinner.show();
    this.nivelService.findNivelByPaiAndEmpresaClean(cdEmpresa)
    .subscribe(
      (organogramaNiveis : OrganogramaNiveis[]) => {        
        if (organogramaNiveis != null) {    

          for (let organogramaNivel of organogramaNiveis) {
            this.organogramaNiveis.push(organogramaNivel);
          }
          
          for (this.index = 0, length = this.organogramaNiveis.length; this.index < length; this.index++) {       
            this.item = this.organogramaNiveis[this.index];            
            this.id = this.item["id"];            
            this.parentId = this.item["children"] || 0;
            this.childrenOfNivel[this.id] = this.childrenOfNivel[this.id] || [];
            
            this.item["children"] = this.childrenOfNivel[this.id];
            
            if (this.parentId != 0) {              
              this.childrenOfNivel[this.parentId] = this.childrenOfNivel[this.parentId] || [];
              this.childrenOfNivel[this.parentId].push(this.item);                        
            } else {     
              this.tree.push(this.item);
            }            
          }
          
          this.jsonOrganograma = JSON.stringify(this.childrenOfNivel["EMPRESA_PAI"]);

          this.jsonOrganograma = this.jsonOrganograma.substring(1, this.jsonOrganograma.length-1);
          this.datasource = this.jsonOrganograma;
          this.loadOrgChartNivel();
        }
        
        this.spinner.hide();
      },
      error => console.log(error)); 
  }

  loadOrgChartNivel() {
    this.oc.init({ 'data': JSON.parse(this.datasource) });
    this.recolherOrganograma();
    this.carregarOrganogramaNivel = false;
    this.scaleZoom();
  }

  abrirOrganogramaNivel() {

    this.str=this.oc.getHierarchy();

    var $codigoEmpresa = $('#chart-container').find('.node.focused');
    if ($codigoEmpresa.length > 0) {
      if (!this.habilitarOrgNivel) {
        this.habilitarOrgNivel = true;
        this.organogramaNivel(this.carregarOrganogramaNivel ? this.cdEmpresaNivel : $codigoEmpresa[0].id);        
      } else {
        this.codigoNivelEmpresa = $codigoEmpresa[0].id;
        if (!!+this.codigoNivelEmpresa) {
          this.router.navigate(['estrutura/niveis-incluir', this.codigoNivelEmpresa, true]);
        } else {
          this.nivelEmpresaSplit = this.codigoNivelEmpresa.split('-');
          this.router.navigate(['estrutura/empresas-incluir', this.carregarOrganogramaNivel ? 
                               this.cdEmpresaNivel : this.nivelEmpresaSplit[0], 
                               true]);
        }        
      }   
    }      
  }

  voltarOrganograma() {
    this.habilitarOrgNivel = false;
    this.oc.init({ 'data': JSON.parse(this.datasourceEmpresa) });
    this.recolherOrganograma();
  }
  
}
 