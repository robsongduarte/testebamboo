import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Empresa } from '../../../model/empresa';
import { EmpresaService } from '../../../service/estrutura/empresa.service';

const swal = require('sweetalert2');

@Component({
  selector: 'app-empresas-component',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {
  formEmpresa: FormGroup;

  public empresas: Empresa[] = [];

  public ngxTipoEmpresa: string = 'TODAS';
  public ngxSituacao: string = 'TODAS';
  public type: string;
  public title: string;

  public p: number;
  public index: number;

  public itemsTipoEmpresa: any[] = [{'id':'TODAS', 'tipo':'Todas'},
                                    {'id':'HOLDING', 'tipo':'Holding'},
                                    {'id':'OPERACIONALHOLDING', 'tipo':'Operacional/Holding'},
                                    {'id':'OPERACIONAL', 'tipo':'Operacional'}];

  public itemsSituacao: any[] = [{'id':'TODAS', 'situacao':'Todas'},
                                 {'id':'ATIVA', 'situacao':'Ativa'},
                                 {'id':'INATIVA', 'situacao':'Inativa'}];

  public headElements = ['Empresa', 'Sigla', 'Tipo Empresa', 'Situação', '',''];

  constructor(private fb: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private empresaService: EmpresaService) {
    this.spinner.show();
    this._createForm();
    this.spinner.hide();
  }

  _createForm() {
    this.formEmpresa = this.fb
      .group({
        cdEmpresa: [null],
        nmEmpresa: [null],
        nmSigla: [null],
        tipoEmpresa: [null],
        flAtivo: [null]
      });
  }

  limpar() {
    this._createForm();
    this.ngxTipoEmpresa = 'TODAS';
    this.ngxSituacao = 'TODAS';
  }

  pesquisar () {
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

    this.empresaService.allByEmpresas(this.formEmpresa.value.nmEmpresa,
      this.formEmpresa.value.nmSigla, this.formEmpresa.value.tipoEmpresa, this.formEmpresa.value.flAtivo)
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

  public ngOnInit() {
    this.spinner.show();
    this.spinner.hide();
  }

  public incluirEmpresa() {
    this.router.navigate(['estrutura/empresas-incluir', 0, false]);
  }

  editar(editarEmpresa: Empresa) {
    this.router.navigate(['estrutura/empresas-incluir', editarEmpresa.cdEmpresa, false]);
  }

  inativar(inativarEmpresa: Empresa, indexEmpresa: number, event: any) {
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
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        inativarEmpresa.flAtivo = event.target.checked;
        this.empresaService.save(inativarEmpresa)
          .subscribe(
            (result: Empresa) => {
              this.spinner.hide();
          },
          error => console.log(error)
        );
      } else {
        event.target.checked = inativarEmpresa.flAtivo;
      }
    });
  }

}
