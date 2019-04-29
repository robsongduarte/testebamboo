import { DateRangeValidator } from './../../../../shared/validators/dateRange.validator';
import { DateValidator } from './../../../../shared/validators/date.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Designado } from '../../../../model/designado';
import { Nivel } from '../../../../model/nivel';
import { Empresa } from '../../../../model/empresa';
import { DesignacoesNiveis } from '../../../../model/designacoesNiveis';
import { TipoDesignacao } from '../../../../model/tipoDesignacao';
import { EmpresaService } from '../../../../service/estrutura/empresa.service';
import { NivelService } from '../../../../service/estrutura/nivel.service';
import { DesignacaoService } from '../../../../service/designacoes/designacao.service';
import { CustomValidators } from 'ng2-validation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { historicoConfig } from './historico-formularios-permissao/historico.config'
import { Auditoria } from '../../../../shared/components/historico/model/auditoria.model'
import { HistoricoConfig } from '../../../../shared/components/historico/model/historico-config.model'
import { cloneDeep } from 'lodash'

const swal = require('sweetalert2');

@Component({
  selector: 'app-formularios.permissao.editar',
  templateUrl: './formularios.permissao.editar.component.html',
  styleUrls: ['./formularios.permissao.editar.component.scss']
})
export class FormulariosPermissaoEditarComponent implements OnInit {
  formEditar: FormGroup;
  formDesignacaoNivel: FormGroup;
  formAdicionarNivel: FormGroup;

  auditorias: Auditoria[] = []
  config: HistoricoConfig = historicoConfig

  public designado: Designado;
  public niveis: Nivel[] = [];
  public niveisDesignacoes: Nivel[] = [];
  public nivel: Nivel;
  public empresas: Empresa[] = [];
  public empresa: Empresa;
  public designacaoNivel: DesignacoesNiveis = null;
  public tipoDesignacao: TipoDesignacao;
  public designacoesNiveis: DesignacoesNiveis[] = [];
  public ngxValueNivel: number;
  public ngxValueEmpresa: number;
  public dataMinima: string;

  public tipoDesignacaoNome: String = null;
  public titulo: String = null;
  public value: string = null;
  public index: number = null;
  public indexNivel: number = null;
  public indexEmpresa: number = null;
  public cdNivel: number = 0;
  public cdDesignado: number = 0;

  public habilitarNivel: boolean = true;
  public habilitarNumeroCrc: boolean = true;

  public dtInicio: Date = new Date();
  public dtFim: Date = new Date();

  public headElements = ['Empresa', 'Nivel', 'Início', 'Fim', ''];

  constructor(private fb: FormBuilder,
              private router: Router,
              private empresaService: EmpresaService,
              private nivelService: NivelService,
              private designacaoService: DesignacaoService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.spinner.show();
    this.getLinkHistorico()
    this._createForm();    

    this.route.params.subscribe((params)=> {
      this.cdDesignado = params['id'];
      this.cdNivel = params['codigoNivel'];
    });

    this.designacaoService.findById(this.cdDesignado.toString())
      .subscribe((designado: Designado) => {
        if(designado != null) {
          this.designado = designado;
          this.tipoDesignacao = designado.tipoDesignacao;

          for (let designacoesNiveis of designado.designacoesNiveis) {
            this.designacoesNiveis.push(designacoesNiveis);
            this.niveis.push(designacoesNiveis.nivel);
            this.ngxValueNivel = this.niveis[0].cdNivel;
          }

          this.tipoDesignacaoNome = designado.tipoDesignacao.nome;
          this.titulo = designado.dsTitulo;
          this.montForm();
        }
      });

      const id = ['cd_designacao', this.route.snapshot.params['id']]
      this.designacaoService.findAuditoria(historicoConfig.table[0], id[0], id[1])
        .subscribe(auditorias => {
          this.auditorias = this.transformAuditorias(auditorias);          
          this.spinner.hide();
        },
          error => this.spinner.hide()
        );
      
  }

  transformAuditorias(auditorias: Auditoria[]): Auditoria[] {
    return auditorias.map(auditoria => new Auditoria(auditoria))
  }

  getConfig(): HistoricoConfig {
    const aux = cloneDeep(this.config)
    /*if(this.column){
      aux.setUniqueColumn(this.column)
    }*/
    return aux
  }

  montForm () {
    this.formEditar.patchValue({
      cdDesignacao: this.designado.cdDesignacao,
      matricula: this.designado.matricula,
      nmDesignado: this.designado.nmDesignado,
      email: this.designado.email,
      dsTitulo: this.designado.dsTitulo,
      dsCargo: this.designado.dsCargo,
      nrCrc: this.designado.nrCrc,
      dsObservacao: this.designado.dsObservacao,
      flContador: this.designado.flContador,
      tipoDesignacao: this.tipoDesignacao,
      tipoDesignacaoNome: this.tipoDesignacaoNome,
      designacoesNiveis: this.designacoesNiveis,
      createdByUser: this.designado.createdByUser,
      creationTime: new Date(this.designado.creationTime),
      modificationTime: this.designado.modificationTime ? new Date(this.designado.modificationTime) : null,
      modifiedByUser: this.designado.modifiedByUser
    });
    if (this.formEditar.value.flContador == true) {
      this.habilitarNumeroCrc = false;
    }
  }

  _createForm() {
    this.formEditar = this.fb
      .group({
        cdDesignacao: [null],
        matricula: [null, Validators.required],
        nmDesignado: [null, Validators.compose([Validators.pattern('^[a-zA-ZÀ-ú ]+$'), Validators.required])],
        email: [null, Validators.compose([CustomValidators.email, Validators.required])],
        dsTitulo: [null],
        dsCargo: [null, Validators.pattern('^[a-zA-ZÀ-ú .,;:/?]+$')],
        nrCrc: [null],
        dsObservacao: [null],
        flContador: [null],
        tipoDesignacao: [null],
        tipoDesignacaoNome: [null],
        designacoesNiveis: [null],
        createdByUser: [null],
        creationTime: [null],
        modificationTime: [null],
        modifiedByUser: [null]
      });

      this.formDesignacaoNivel = this.fb
        .group({
          cdDesignacaoNivel: [null],
          dtVigenciaFim: [null, DateValidator.dateValidator],
          dtVigenciaInicio: [null, Validators.compose([DateValidator.dateValidator, Validators.required])],
          nivel: [null],
          nivelDescricao: [null]
        }, { validator: DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
      this.montFormAdicionarNivel();
  }

    montFormAdicionarNivel() {
      this.formAdicionarNivel = this.fb
        .group({
          empresa: [null, Validators.required],
          nivel: [null, Validators.required],
          nmAbreviatura: [null],
          dtVigenciaInicio: [null, Validators.compose([DateValidator.dateValidator, Validators.required])],
          dtVigenciaFim: [null, DateValidator.dateValidator],
          tipoDesignacao: [null],
        }, { validator: DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
    }

  excluir(cdDesignacaoNivel: number, index: number) {
    swal.fire({
      title: 'Deseja realmente excluir?',
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
        this.designacoesNiveis.splice(index, 1);
        this.formEditar.patchValue({
          designacoesNiveis: this.designacoesNiveis
        });
      }
    });
  }

  editar(designacaoNivel: DesignacoesNiveis) {
    this.designacaoNivel = designacaoNivel;
    this.niveis = [];
    this.niveis.push(this.designacaoNivel.nivel);
    this.montFormDesignacaoNivel();
    this.ngxValueNivel = this.formDesignacaoNivel.value.nivel;
    this.dataMinima = this.formDesignacaoNivel.value.dtVigenciaInicio;
  }

  montFormDesignacaoNivel() {
    this.formDesignacaoNivel = this.fb
    .group({
      cdDesignacaoNivel: [this.designacaoNivel.cdDesignacaoNivel],
      dtVigenciaInicio: [new Date(this.designacaoNivel.dtVigenciaInicio).toISOString().substr(0, 10), Validators.compose([DateValidator.dateValidator, Validators.required])],
      dtVigenciaFim: [this.designacaoNivel.dtVigenciaFim, DateValidator.dateValidator],
      nivel: [this.designacaoNivel.nivel.cdNivel],
      nivelDescricao: [this.designacaoNivel.nivel.nmAbreviatura + " - " + this.designacaoNivel.nivel.nmNivel]
    }, { validator: DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
  }

  carregarDatainicioVigencia(validarForm: string) {
    if (validarForm == 'formDesignacaoNivel') {
      this.dataMinima = this.formDesignacaoNivel.value.dtVigenciaInicio;
      this.dtInicio = new Date(this.formDesignacaoNivel.value.dtVigenciaInicio);
      this.dtFim = new Date(this.formDesignacaoNivel.value.dtVigenciaFim);
      if (this.dtInicio.getTime() > this.dtFim.getTime()) {
        this.formDesignacaoNivel.patchValue({
          dtVigenciaFim: null
        });
      }
    } else {
      this.dataMinima = this.formAdicionarNivel.value.dtVigenciaInicio;
      this.dtInicio = new Date(this.formAdicionarNivel.value.dtVigenciaInicio);
      this.dtFim = new Date(this.formAdicionarNivel.value.dtVigenciaFim);
      if (this.dtInicio.getTime() > this.dtFim.getTime()) {
        this.formAdicionarNivel.patchValue({
          dtVigenciaFim: null
        });
      }
    }
  }

  salvar() {
    this.spinner.show();

    this.designado = this.formEditar.value;

    this.designacaoService.save(this.designado)
      .subscribe(
        (result) => {          
          this.sweetalertSucesso();
          this.spinner.hide();
        },
        error => console.log(error)
      );
  }

  salvarNivel() {
    this.indexNivel = 0;
    this.nivel = {
      empresa: this.niveis[this.indexNivel].empresa,
      cdNivel: this.niveis[this.indexNivel].cdNivel,
      nivelPai: this.niveis[this.indexNivel].nivelPai,
      localidade: this.niveis[this.indexNivel].localidade,
      tipoNivel: this.niveis[this.indexNivel].tipoNivel,
      dtVigenciaFim: this.niveis[this.indexNivel].dtVigenciaFim,
      dtVigenciaInicio: this.niveis[this.indexNivel].dtVigenciaInicio,
      nmAbreviatura: this.niveis[this.indexNivel].nmAbreviatura,
      nmEmpresa: this.niveis[this.indexNivel].nmEmpresa,
      nmNivel: this.niveis[this.indexNivel].nmNivel,
      nmSiglaEmpresa: this.niveis[this.indexNivel].nmSiglaEmpresa,
      nivelAnexos: this.niveis[this.indexNivel].nivelAnexos,
      modificationTime: this.niveis[this.indexNivel].modificationTime,
      modifiedByUser: this.niveis[this.indexNivel].modifiedByUser,
      creationTime: this.niveis[this.indexNivel].creationTime,
      createdByUser: this.niveis[this.indexNivel].createdByUser
    }

    this.index = this.designacoesNiveis.findIndex((obj => obj.cdDesignacaoNivel == this.formDesignacaoNivel.value.cdDesignacaoNivel));
    this.designacoesNiveis[this.index] = this.formDesignacaoNivel.value;
    this.designacoesNiveis[this.index].nivel = this.nivel;

    this.formEditar.patchValue({
      designacoesNiveis: this.designacoesNiveis
    });
  }

  adicionarNivel() {
    this.niveisDesignacoes = [];
    this.empresas = [];
    this.habilitarNivel = true;
    this.montFormAdicionarNivel();
  }

  carregarNivel() {
    this.habilitarNivel = false;
    this.ngxValueNivel = null;
    this.formAdicionarNivel.patchValue({
      nmAbreviatura: null,
      tipoDesignacao: null
    });
    this.allByEmpresa();
  }

  montarNivel() {
    this.indexNivel = this.niveisDesignacoes.findIndex((obj => obj.cdNivel == this.ngxValueNivel));
    this.formAdicionarNivel.patchValue({
      nmAbreviatura: this.niveisDesignacoes[this.indexNivel].nmAbreviatura,
      tipoDesignacao: 'Titular'
    });
  }

  removerEmpresa() {
    this.ngxValueNivel = null;
    this.habilitarNivel = true;
    this.formAdicionarNivel.patchValue({
      nmAbreviatura: null,
      tipoDesignacao: null
    });
  }

  removerNivel() {
    this.ngxValueNivel = null;
    this.formAdicionarNivel.patchValue({
      nmAbreviatura: null,
      tipoDesignacao: null
    });
  }

  adicionar() {
    this.indexNivel = this.niveisDesignacoes.findIndex((obj => obj.cdNivel == this.ngxValueNivel));
    this.indexEmpresa = this.empresas.findIndex((obj => obj.cdEmpresa == this.ngxValueEmpresa));
    this.empresa = this.empresas[this.indexEmpresa];

    this.nivel = {
      empresa: this.empresa,
      cdNivel: this.niveisDesignacoes[this.indexNivel].cdNivel,      
      nivelPai: this.niveisDesignacoes[this.indexNivel].nivelPai,
      localidade: this.niveisDesignacoes[this.indexNivel].localidade,
      tipoNivel: this.niveisDesignacoes[this.indexNivel].tipoNivel,
      dtVigenciaFim: this.niveisDesignacoes[this.indexNivel].dtVigenciaFim,
      dtVigenciaInicio: this.niveisDesignacoes[this.indexNivel].dtVigenciaInicio,
      nmAbreviatura: this.niveisDesignacoes[this.indexNivel].nmAbreviatura,
      nmEmpresa: this.empresa.nmEmpresa,
      nmNivel: this.niveisDesignacoes[this.indexNivel].nmNivel,
      nmSiglaEmpresa: this.empresa.nmSigla,
      nivelAnexos: this.niveisDesignacoes[this.indexNivel].nivelAnexos,
      modificationTime: this.niveisDesignacoes[this.indexNivel].modificationTime,
      modifiedByUser: this.niveisDesignacoes[this.indexNivel].modifiedByUser,
      creationTime: this.niveisDesignacoes[this.indexNivel].creationTime,
      createdByUser: this.niveisDesignacoes[this.indexNivel].createdByUser
    }

    this.designacaoNivel = {
      cdDesignacaoNivel: null,
      dtVigenciaFim: this.formAdicionarNivel.value.dtVigenciaFim,
      dtVigenciaInicio: this.formAdicionarNivel.value.dtVigenciaInicio,
      nivel: this.nivel,
      designacao: null
    }

    this.designacoesNiveis.push(this.designacaoNivel);
    this.niveis.push(this.nivel);
  }

  _all() {
    this.empresas = [];
    this.empresaService.all()
    .subscribe(
        (empresas : any) => {
          if (empresas != null) {
            for (let empresa of empresas) {
              this.empresas.push(empresa.empresa);
           }
          }
        },
        error => console.log(error));
  }

  allByEmpresa() {
    this.niveis = [];
    this.nivelService.allByEmpresa(this.ngxValueEmpresa)
    .subscribe(
        (niveis : any[]) => {
          if (niveis != null) {
            for (let nivel of niveis) {
              this.niveisDesignacoes.push(nivel.nivel);
            }
          }
        },
        error => console.log(error));
  }

  allByCdNivel(cdNivel: string) {
    this.niveisDesignacoes = [];
    this.nivelService.findById(cdNivel)
    .subscribe(
      (niveis : any) => {
        this.niveisDesignacoes.push(niveis);
      },
      error => console.log(error)
    );
  }

  sweetalertSucesso() {
    swal.fire('Designação salva com sucesso!', '', 'success');
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
    this.empresaService.findByName(nmEmpresa)
    .subscribe(
        (empresas : any) => {
            if (empresas != null) {
                this.empresas = [];
                for (let empresa of empresas) {
                    this.empresas.push(empresa.empresa);
                }
            }
        },
        error => console.log(error));
}

ativarCrc() {
  if (this.formEditar.value.flContador == true) {
    this.habilitarNumeroCrc = true;
    this.formEditar.patchValue({
      nrCrc: "",
    });
  } else {
    this.habilitarNumeroCrc = false;
  }
}

  getLinkHistorico(column?: string){
    return this.router.url + '/historico' + (column ? '/' + column : '')
  }

  openHistoricoModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      console.log(`Closed with: ${result}`)
    }, (reason) => {
      console.log(`Dismissed ${reason}`)
    });
  }

  voltarNivel() {
    this.router.navigate(['estrutura/niveis-incluir', this.cdNivel, false]);
  }

}
