import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Empresa } from '../../../model/empresa';
import { Nivel } from '../../../model/nivel';
import { Designacao } from '../../../model/designacao';
import { Designado } from '../../../model/designado';
import { EmpresaService } from '../../../service/estrutura/empresa.service';
import { DesignacaoService } from '../../../service/designacoes/designacao.service';
import { NivelService } from '../../../service/estrutura/nivel.service';
import { integer } from 'aws-sdk/clients/lightsail';

import { DateValidator } from '../../../shared/validators/date.validator';
import { DateRangeValidator } from '../../../shared/validators/dateRange.validator';

@Component({
  selector: 'app-formularios-permissao-component',
  templateUrl: './formularios.permissao.component.html',
  styleUrls: ['./formularios.permissao.component.scss']
})
export class FormulariosPermissaoComponent implements OnInit {

    model;
    formPermissao: FormGroup;

    public isCollapsed = true;
    public indiceTabela: number = null;

    public empresas: Empresa[] = [];
    public niveis: Nivel[] = [];
    public designados: Designacao[] = [];
    public ngxValue: number = 0;
    public ngxValueNivel: number = 0;
    public headElements = ['Designado', 'Tipo de Designação', 'Título', ' '];
    public headNivel = ['Empresa', 'Nivel', 'Início', 'Fim'];
    public firstItemIndex;
    public lastItemIndex;
    public value: string = null;
    public dataMinima: string;
    public p: integer = 1;

    public dtInicio: Date = new Date();
    public dtFim: Date = new Date();

    public habilitarNivel: boolean = true;

    constructor(private fb: FormBuilder,
                private router: Router,
                private empresaService: EmpresaService,
                private designacaoService: DesignacaoService,
                private nivelService: NivelService,
                private spinner: NgxSpinnerService) {
        
    }

    _createForm() {
      this.formPermissao = this.fb
        .group({
          designado: [null],
          empresa: [0],
          nivel: [0],
          inicioVigencia: [null, Validators.compose([DateValidator.dateValidator, DateValidator.dataInvalida])],
          finalVigencia: [null, Validators.compose([DateValidator.dateValidator, DateValidator.dataInvalida])]
        }, { validator: DateRangeValidator.dataInicioMaior ('inicioVigencia', 'finalVigencia') });
        this.spinner.hide();
    }

    public ngOnInit() {
        this.spinner.show();
        this._createForm();
    }

    limpar() {
        this._createForm();
        this.ngxValue = 0;
        this.ngxValueNivel = 0;
        this.habilitarNivel = true;
    }

    carregarNivel() {
        this.habilitarNivel = false;
        this.allByEmpresa();

        //Array.from(new Set(this.niveis.map((item: any) => item.nmAbreviatura)));

        this.niveis = this.niveis.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj.nmAbreviatura).indexOf(obj.nmAbreviatura) === pos;
        });
    }

    removerEmpresa() {
        this.empresas = [];
        this.niveis = [];
        this.ngxValue = 0;
        this.habilitarNivel = true;
        this.ngxValueNivel = 0;
    }

    removerNivel() {
        this.ngxValueNivel = 0;
    }

    pesquisar () {
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

        this.designacaoService.allaByDesignadoAndEmpresaAndVigencia(this.formPermissao.value.designado,
            this.formPermissao.value.empresa, this.formPermissao.value.nivel, this.formPermissao.value.inicioVigencia,
            this.formPermissao.value.finalVigencia)
        .subscribe(
            (designados : any) => {
                if (designados != null) {
                    for (let designado of designados) {
                        this.designados.push(designado.designacao);
                    }
                }
                this.spinner.hide();
            },
            error => console.log(error));
    }

    editar(editarDesignado : Designado) {
        this.router.navigate(['designacoes/editar-formularios-permissao', editarDesignado.cdDesignacao, 0]);
    }

    _all() {
        this.spinner.show();
        this.empresas = [];
        this.empresaService.all()
        .subscribe(
            (empresas : any) => {
                if (empresas != null) {
                    for (let empresa of empresas) {
                        this.empresas.push(empresa.empresa);
                    }
                }
                this.spinner.hide();
            },
            error => console.log(error));
    }

    allByEmpresa() {
        this.spinner.show();
        this.niveis = [];
        this.nivelService.allByEmpresa(this.ngxValue)
        .subscribe(
            (niveis : any[]) => {
                if (niveis != null) {
                    for (let nivel of niveis) {
                        this.niveis.push(nivel.nivel);
                    }
                }
                this.spinner.hide();
            },
            error => console.log(error));
    }

    onKeyUp(event): void {
        this.value = event.target.value;
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.value.length > 0) {
                    this.findByName(this.value);
                } else {
                    this.empresas = [];
                }
            }, 2000);
            });
    }

    findByName(nmEmpresa: String) {
        this.removerEmpresa();
        this.spinner.show();
        this.empresaService.findByName(nmEmpresa)
        .subscribe(
            (empresas : any) => {
                if (empresas != null) {
                    this.empresas = [];
                    for (let empresa of empresas) {
                        this.empresas.push(empresa.empresa);
                    }
                }
                this.spinner.hide();
            },
            error => console.log(error));
    }

    carregarDatainicioVigencia() {
        this.dataMinima = this.formPermissao.value.inicioVigencia;
        this.carregarDatas()
    }

    carregarDataFimVigencia() {
      this.carregarDatas()
    }

    carregarDatas() {
      this.dtFim = new Date(this.formPermissao.value.finalVigencia);
      this.dtInicio = new Date(this.formPermissao.value.inicioVigencia);
    }

    abrirNiveis(indice: number) {
        this.isCollapsed = !this.isCollapsed;
        if (this.indiceTabela != null && this.indiceTabela != indice && this.isCollapsed) {
            this.isCollapsed = !this.isCollapsed;
        }
        this.indiceTabela = indice;
    }

    mudancaPagina() {
        this.isCollapsed = true;
        this.indiceTabela = null;
    }
}
