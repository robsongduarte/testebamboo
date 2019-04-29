import { FormularioPermissaoService } from './../../../service/designacoes/formulario.permissao.service';
import { FormularioPermissao } from './../../../model/formularioPermissao';
import { Dominio } from './../../../model/dominio';
import { Nivel } from './../../../model/nivel';
import { EmpresaService } from './../../../service/estrutura/empresa.service';
import { Empresa } from './../../../model/empresa';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import { NivelService } from '../../../service/estrutura/nivel.service';
import { DominioService } from '../../../service/estrutura/dominio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designacoes-temporarias-component',
  templateUrl: './designacoes.temporarias.component.html',
  styleUrls: ['./designacoes.temporarias.component.scss']
})
export class DesignacoesTemporariasComponent implements OnInit {

  formDesignacoes: FormGroup;

  public empresas: Empresa[] = [];
  public niveis: Nivel[] = [];
  public dominiosStatus: Dominio[] = [];
  public formulariosPermnissao: FormularioPermissao[] = [];

  public value: string = null;
  public tipoDominio: string = 'STATUS_DOCUMENTO';
  public tipoServico: string = 'DESIGNACOES';

  public ngxValueEmpresa: number = 0;
  public ngxValueEmitente: number = 0;
  public ngxDominioStatus: number = 0;

  public habilitarEmitente: boolean = true;

  public headElements = ['Número', 'Versão', 'Emitente', 'Motivo', 'Status', 'Responsável', ' '];

  constructor(private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private empresaService: EmpresaService,
              private nivelService: NivelService,
              private dominioService: DominioService,
              private formularioPermissaoService: FormularioPermissaoService) {        
  }

  public ngOnInit() {
    this.spinner.show();
    this._createForm();
    this.carregarDominioStatus();
  }

  _createForm() {
    this.formDesignacoes = this.fb
    .group({
      cdEmpresa: [null],
      cdEmitente: [null],
      numeroDocumento: [null],
      status: [null],
      nmDesignado: [null]
    });
  }

  removerEmpresa() {
    this.empresas = [];
    this.ngxValueEmpresa = 0;
    this.habilitarEmitente = true;
  }

  removerEmitente() {
    this.ngxValueEmitente = 0;
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

  carregarEmitente() {
    this.habilitarEmitente = false;
    this.allByEmpresa();
    this.niveis = this.niveis.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj.nmAbreviatura).indexOf(obj.nmAbreviatura) === pos;
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

  allByEmpresa() {
    this.spinner.show();
    this.niveis = [];
    this.nivelService.allByEmpresa(this.ngxValueEmpresa)
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

  incluirDesignacoesTemporarias() {
    this.router.navigate(['designacoes/incluir-designacoes-temporarias']);
  }

  limpar() {
    this._createForm();
    this.ngxValueEmpresa = 0;
    this.ngxValueEmitente = 0;
    this.ngxDominioStatus = 0;
    this.habilitarEmitente = true;
  }

  pesquisar() {
    this.spinner.show();
    this.formulariosPermnissao = [];

    if (this.formDesignacoes.value.cdEmpresa == null) {
      this.formDesignacoes.value.cdEmpresa = 0;
    }

    if (this.formDesignacoes.value.cdEmitente == null) {
      this.formDesignacoes.value.cdEmitente = 0;
    }

    if (this.formDesignacoes.value.numeroDocumento == '') {
      this.formDesignacoes.value.numeroDocumento = null;
    }

    if (this.formDesignacoes.value.status == null) {
      this.formDesignacoes.value.status = 0;
    }

    if (this.formDesignacoes.value.nmDesignado == '') {
      this.formDesignacoes.value.nmDesignado = null;
    }

    this.formularioPermissaoService.allByFormulariosPermissao(this.formDesignacoes.value.cdEmpresa,
        this.formDesignacoes.value.cdEmitente, this.formDesignacoes.value.numeroDocumento, this.formDesignacoes.value.status,
        this.formDesignacoes.value.nmDesignado)
    .subscribe(
        (formulariosPermissoes : any) => {
            if (formulariosPermissoes != null) {
                for (let formularioPermissao of formulariosPermissoes) {
                    this.formulariosPermnissao.push(formularioPermissao.formularioPermissao);
                }
            }
            this.spinner.hide();
        },
        error => console.log(error));
  }

  carregarDominioStatus() {
    this.dominiosStatus = [];
    this.dominioService.findByTipoOrderByNome(this.tipoDominio, this.tipoServico)
      .subscribe(
        (dominios : any[]) => {
          if (dominios != null) {
            for (let dominio of dominios) {
              this.dominiosStatus.push(dominio.dominio);
            }            
          }
          this.spinner.hide(); 
        },
      error => console.log(error));
  }

}
