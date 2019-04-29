import { Cargo } from './../../../model/cargo';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import { CargoService } from '../../../service/estrutura/cargo.service';
import { Router } from '@angular/router';

const swal = require('sweetalert2');

@Component({
  selector: 'app-cargos-component',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {
  
  formCargo: FormGroup;

  public title: string;
  public ngxSituacao: string = 'TODAS';
  
  public itemsSituacao: any[] = [{'id':'TODAS', 'situacao':'Todas'},
                                 {'id':'ATIVA', 'situacao':'Ativa'},
                                 {'id':'INATIVA', 'situacao':'Inativa'}];

  public headElements = ['Cargo', 'Situação', '',''];

  public cargos: Cargo[] = [];

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private cargoService: CargoService,
              private router: Router) {
    this._createForm();
  }

  public ngOnInit() {
  }

  _createForm() {
    this.formCargo = this.fb
      .group({
        nmCargo: [null],
        flAtivo: [null]
      });
  }

  incluirCargo(){
    this.router.navigate(['estrutura/cargos-incluir']);
  }

  limpar() {
    this._createForm();
    this.ngxSituacao = 'TODAS';
  }

  pesquisar(){
    this.spinner.show();
    this.cargos = [];

    if (this.formCargo.value.nmCargo == '') {
      this.formCargo.value.nmCargo = null;
    }

    this.cargoService.findCargos(this.formCargo.value.nmCargo, this.formCargo.value.flAtivo)
        .subscribe(
          (cargos : any) => {
              if (cargos != null) {
                  for (let cargo of cargos) {
                      this.cargos.push(cargo.cargo);
                  }
              }
              this.spinner.hide();
          },
        error => console.log(error));
  }

  editar(editarCargo: Cargo) {
    this.router.navigate(['estrutura/cargos-incluir', editarCargo.cdCargo]);
  }

  inativar(inativarCargo: Cargo, indexCargo: number, event: any) {
    this.title = inativarCargo.flAtivo == false ? 'Deseja reativar o cargo?' : 'Deseja realmente inativar o cargo?';
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
        inativarCargo.flAtivo = event.target.checked;
        this.cargoService.save(inativarCargo)
          .subscribe(
            (result: Cargo) => {
              this.spinner.hide();
          },
          error => console.log(error)
        );
      } else {
        event.target.checked = inativarCargo.flAtivo;
      }
    });
  }
  
}
