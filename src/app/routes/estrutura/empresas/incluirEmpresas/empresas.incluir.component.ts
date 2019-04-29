import { Cargo } from './../../../../model/cargo';
import { CargoService } from './../../../../service/estrutura/cargo.service';
import {DateValidator} from './../../../../shared/validators/date.validator';
import {Correio} from './../../../../model/correio';
import {CorreiosService} from './../../../../service/correios/correios.service';
import {CustomValidators} from 'ng2-validation';
import {Empresa} from './../../../../model/empresa';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {EmpresaService} from '../../../../service/estrutura/empresa.service';
import {DominioService} from '../../../../service/estrutura/dominio.service';
import {Localidade} from '../../../../model/localidade';
import {DatePipe} from '@angular/common';
import {FilterPipe} from 'ngx-filter-pipe';
import { AnexoEmpresaService } from "../../../../service/estrutura/anexo-empresa.service";
import { EmpresaAnexo } from "../../../../model/empresaAnexo";

const swal = require('sweetalert2');

@Component({
  selector: 'app-empresas-incluir',
  templateUrl: './empresas.incluir.component.html',
  styleUrls: ['./empresas.incluir.component.scss'],
  providers: [DatePipe]
})
export class EmpresasIncluirComponent implements OnInit {

  formEmpresaIncluir: FormGroup;
  formIncluirLocalidade: FormGroup;
  formIncluirAnexo: FormGroup;


  public headLocalidade = ['Localidade', 'Endereço', 'Situação', ' ',' '];

  public empresas: Empresa[] = [];
  public cargos: Cargo[] = [];
  public localidades: Localidade[] = [];
  public empresa: Empresa;
  public localidade: Localidade;
  public localidadeFilter: any = [];

  public p: number;
  public participacao: number;

  public habilitarTabs: boolean = true;
  public habilitarEmpresaControladora: boolean = true;
  public status: boolean = true;

  public itemsSituacao: any[] = [{'id':true, 'situacao':'ATIVO'},
                                 {'id':false, 'situacao':'INATIVO'}];

  public itemsTipoEmpresa: any[] = [{'id':'HOLDING', 'tipo':'HOLDING'},
                                    {'id':'OPERACIONALHOLDING', 'tipo':'OPERACIONAL/HOLDING'},
                                    {'id':'OPERACIONAL', 'tipo':'OPERACIONAL'}];

  public ngxSituacao: boolean = true;
  public ngxTipoEmpresa: string = 'HOLDING';
  public ngxEmpresaControladora: number = null;
  public ngxCargo: number = null;
  public ngxSituacaoLocalidade: boolean = true;
  public tipoDominio: string = 'TIPO_EMPRESA_NORMA';
  public sede: string;
  public dataMinima: string;
  public tipoServico: string = 'ESTRUTURA';

  public indexTipoDominio: number;
  public indexEmpresaControladora: number;
  public cdEmpresa: number;
  public indexLocalidade: number = null;
  public index: number;

  public type: string;
  public title: string;
  public organograma: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService,
              private empresaService: EmpresaService,
              private dominioService: DominioService,
              private correioService: CorreiosService,
              private cargoService: CargoService,
              private datePipe: DatePipe,
              private anexoEmpresaService: AnexoEmpresaService,
              private filterPipe: FilterPipe) {

  }

  ngOnInit() {
    this.spinner.show();
    this._createForm();
    this.carregarCargos();

    this.route.params.subscribe((params)=> {
        this.cdEmpresa = params['id'];
        this.organograma = JSON.parse(params['organograma']);
    });

    if (this.cdEmpresa > 0) {
      this.habilitarTabs = false;
      this.montForm();
    } 
  }

  montForm() {
    this.empresaService.findById(this.cdEmpresa)
      .subscribe(
        (empresa : Empresa) => {
          this.empresa = empresa;
          this.participacao = empresa.nrParticipacaoCapital;
          this.formEmpresaIncluir.patchValue({
            cdEmpresa: empresa.cdEmpresa,
            nmEmpresa: empresa.nmEmpresa,
            nmSigla: empresa.nmSigla,
            nmDenominacaoSocial: empresa.nmDenominacaoSocial,
            flAtivo: empresa.flAtivo,
            nrParticipacaoCapital: empresa.nrParticipacaoCapital == null ? null :
                                    empresa.nrParticipacaoCapital.toString().replace(",", "."),
            tipoEmpresa: empresa.tipoEmpresa,
            tipoNorma: empresa.tipoNorma,
            empresaControladora: empresa.empresaControladora,
            localidades: empresa.localidades,
            empresaAnexos: empresa.empresaAnexos,
            codigoEmpresaEbs: empresa.codigoEmpresaEbs,
            creationTime: new Date(empresa.creationTime),
            createdByUser: empresa.createdByUser,
            modificationTime: empresa.modificationTime ? new Date(empresa.modificationTime) : null,
            modifiedByUser: empresa.modifiedByUser,
          });
          this.ngxTipoEmpresa = this.formEmpresaIncluir.value.tipoEmpresa;
          if (this.formEmpresaIncluir.value.empresaControladora != null) {
            this.ngxEmpresaControladora = this.formEmpresaIncluir.value.empresaControladora.cdEmpresa;
          }
          if (this.formEmpresaIncluir.value.tipoNorma != null) {
            this.ngxCargo = this.formEmpresaIncluir.value.tipoNorma.cdCargo;
          }
          this.carregarEmpresaControladora();
          this.localidades = this.formEmpresaIncluir.value.localidades
        },
      error => console.log(error));
  }

  createFormIncluirLocalidade() {
    this.formIncluirLocalidade = this.fb
      .group({
        cdLocalidade: [null],
        flSede: [null],
        dsLocalidade: [null, Validators.required],
        situacaoLocalidade: [this.ngxSituacaoLocalidade, Validators.required],
        vlCep: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
        nmLogradouro: [null],
        nrLogradouro: [null, Validators.required],
        nmComplemento: [null],
        nmBairro: [null],
        nmMunicipio: [null],
        nmUf: [null, Validators.compose([Validators.pattern('^[a-zA-ZÀ-ú ]+$'), Validators.minLength(2)])],
        nrCaixaPostal: [null],
        nrTelefone: [null],
        nmEnderecoRodape: [null, Validators.required],
        CNPJ: [null],
        nrInscEstadual: [null],
        nrInscMunicipal: [null],
        nrNIRE: [null],
        dtRegistroNire: [null, Validators.compose([DateValidator.dateValidator])],
        modificationTime: [null],
        modifiedByUser: [null],
        creationTime: [null],
        createdByUser: [null]
      });
  }

  createFormIncluirAnexo() {
    this.formIncluirAnexo = this.fb
      .group({
        nomeArquivo: [null]
      });
  }

  montFormIncluirLocalidade() {
    this.formIncluirLocalidade.patchValue({
      cdLocalidade: this.localidade.cdLocalidade,
      flSede: this.localidade.flSede,
      dsLocalidade: this.localidade.dsLocalidade,
      situacaoLocalidade: this.localidade.situacaoLocalidade,
      vlCep: this.localidade.vlCep,
      nmLogradouro: this.localidade.nmLogradouro,
      nrLogradouro: this.localidade.nrLogradouro,
      nmComplemento: this.localidade.nmComplemento,
      nmBairro: this.localidade.nmBairro,
      nmMunicipio: this.localidade.nmMunicipio,
      nmUf: this.localidade.nmUf,
      nrCaixaPostal: this.localidade.nrCaixaPostal,
      nrTelefone: this.localidade.nrTelefone,
      nmEnderecoRodape: this.localidade.nmEnderecoRodape,
      CNPJ: this.localidade.CNPJ,
      nrInscEstadual: this.localidade.nrInscEstadual,
      nrInscMunicipal: this.localidade.nrInscMunicipal,
      nrNIRE: this.localidade.nrNIRE,
      dtRegistroNire: this.datePipe.transform(this.localidade.dtRegistroNire, 'yyyy-MM-dd'),
      modificationTime: this.localidade.modificationTime,
      modifiedByUser: this.localidade.modifiedByUser,
      creationTime: this.localidade.creationTime,
      createdByUser: this.localidade.createdByUser
      });
  }

  _createForm() {
    this.formEmpresaIncluir = this.fb.group({
      cdEmpresa: [null],
      nmEmpresa: [null, Validators.required],
      nmSigla: [null, Validators.required],
      nmDenominacaoSocial: [null, Validators.required],
      flAtivo: [null],
      nrParticipacaoCapital: [null, CustomValidators.range([0, 10000])],
      tipoEmpresa: [null],
      tipoNorma: [null],
      empresaControladora: [null],
      localidades: [null],
      empresaAnexos: [null],
      codigoEmpresaEbs: [null],
      pesquisaLocalidade: [null],
      creationTime: [null],
      createdByUser: [null],
      modificationTime: [null],
      modifiedByUser: [null],
    });
    this.createFormIncluirLocalidade();
    this.createFormIncluirAnexo();
  }

  carregarEmpresaControladora() {
    this.empresas = [];
    if (this.ngxTipoEmpresa == 'HOLDING') {
      this.habilitarEmpresaControladora = true;
    } else {
      this.habilitarEmpresaControladora = false;
      this.empresaService.allByEmpresaControladora(this.cdEmpresa)
        .subscribe(
          (empresas : any[]) => {
            if (empresas != null) {
              for (let empresa of empresas) {
                this.empresas.push(empresa.empresa);
              }
            }
            this.spinner.hide();
          },
          error => console.log(error));
    }
  }

  carregarCargos() {
    this.cargos = [];
    this.cargoService.findAllByStatus(this.status)
      .subscribe(
        (cargos : any[]) => {
          if (cargos != null) {
            for (let cargo of cargos) {
              this.cargos.push(cargo.cargo);
            }
          }
        },
      error => console.log(error));
  }

  salvar() {
    this.spinner.show();
    const { cdEmpresa } = this.formEmpresaIncluir.value
    if(cdEmpresa == undefined || cdEmpresa == null){
      this.save()
    }else{
      this.anexoEmpresaService.findAllByEmpresa(cdEmpresa)
        .subscribe(anexos => this.save(anexos))
    }
  }

  save(anexos?: EmpresaAnexo[]){    
    if (this.formEmpresaIncluir.value.nrParticipacaoCapital == 100) {
      this.participacao = this.formEmpresaIncluir.value.nrParticipacaoCapital;
    } else {
      this.participacao = this.formEmpresaIncluir.value.nrParticipacaoCapital == null ? null
                        : this.formEmpresaIncluir.value.nrParticipacaoCapital.toString().replace(".", "") / 100;
    }

    this.indexTipoDominio = this.cargos.findIndex((obj => obj.cdCargo == this.ngxCargo));
    this.indexEmpresaControladora = this.empresas.findIndex((obj => obj.cdEmpresa == this.ngxEmpresaControladora));


    this.formEmpresaIncluir.patchValue({
      tipoNorma: this.cargos[this.indexTipoDominio],
      empresaControladora: this.empresas[this.indexEmpresaControladora],
      nrParticipacaoCapital: this.participacao == 100 ? 100 : this.participacao.toFixed(2).replace(".", ","),
      empresaAnexos: anexos
    });

    this.empresaService.save(this.formEmpresaIncluir.value)
      .subscribe(
        (result: any) => {
          this.empresa = result.empresa;
          this.cdEmpresa = this.empresa.cdEmpresa;
          this.habilitarTabs = false;
          this.formEmpresaIncluir.patchValue({
            cdEmpresa: this.cdEmpresa,
            pesquisaLocalidade: null
          });

          if (this.empresa.tipoNorma != null) {
            this.ngxCargo = this.empresa.tipoNorma.cdCargo;
          }
          this.montForm();
          this.sweetalertSucesso();
        },
        error => console.log(error)
      );
  }

  sweetalertSucesso() {
    swal.fire('Empresa salva com sucesso!', '', 'success');
  }

  incluirLocalidade() {
    this.indexLocalidade = null;
    this.ngxSituacaoLocalidade = true;
    this.createFormIncluirLocalidade();
  }

  editarLocalidade(localidade: Localidade, index: number) {
    index = this.localidades.findIndex((obj => obj.dsLocalidade == localidade.dsLocalidade));
    this.ngxSituacaoLocalidade = localidade.situacaoLocalidade;
    this.indexLocalidade = index;
    this.localidade = localidade;

    this.montFormIncluirLocalidade();
  }

  salvarLocalidade() {
    if(this.indexLocalidade == null) {
      this.localidades.push(this.formIncluirLocalidade.value);
    } else {
      this.localidades[this.indexLocalidade] = this.formIncluirLocalidade.value;
    }

    this.formEmpresaIncluir.patchValue({
      localidades: this.localidades
    });
    this.indexLocalidade = null;
  }

  excluirLocalidade(localidade: Localidade) {
    swal.fire({
      title: 'Deseja realmente excluir a localidade?',
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
        this.localidades = this.localidades.filter(item => item !== localidade);
        this.formIncluirLocalidade.patchValue({
          localidades: this.localidades
        });
      }
    });
  }

  buscarCep() {
    this.spinner.show();
    this.correioService.buscarCep(this.formIncluirLocalidade.value.vlCep)
    .subscribe(
      (correio : Correio) => {
        if (correio != null) {
          this.formIncluirLocalidade.patchValue({
            nmLogradouro: correio.logradouro,
            nmComplemento: correio.complemento,
            nmBairro: correio.bairro,
            nmMunicipio: correio.localidade,
            nmUf: correio.uf,
            nmEnderecoRodape: correio.logradouro + ' - ' + correio.cep +
                              ' - ' + correio.bairro + ' - ' + correio.localidade +
                              ',' + correio.uf,
          });
          this.spinner.hide();
        }
      },
    error => console.log(error));
  }

  inativar(inativarLocalidade: Localidade, indexInativar: number, event: any) {
    this.title = inativarLocalidade.situacaoLocalidade == false ? 'Deseja reativar a localidade?' : 'Deseja realmente inativar a localidade?';
    this.type = inativarLocalidade.situacaoLocalidade == false ? 'info' : 'danger';
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
        indexInativar = this.localidades.findIndex((obj => obj.dsLocalidade == inativarLocalidade.dsLocalidade));
        this.localidades[indexInativar].situacaoLocalidade = inativarLocalidade.situacaoLocalidade == true ? false : true;
      } else {
        event.target.checked = inativarLocalidade.situacaoLocalidade;
      }
    });
  }

  getLinkHistorico(column?: string){
    const id = this.route.snapshot.params['id']
    return this.router.url.replace(id, this.cdEmpresa.toString()) + '/historico' + (column ? '/' + column : '')
  }

  desabilitarHistorico(){
    const id = this.route.snapshot.params['id']
    return (!id || id === '0') && this.cdEmpresa == 0
  }

  voltarOrganograma() {
    this.router.navigate(['/estrutura/organogramaEmpresas', this.cdEmpresa, true]);
  }

}
