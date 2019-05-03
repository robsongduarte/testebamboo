import { ActivatedRoute, Router } from '@angular/router';
import { DocumentoService } from './../../../../service/estrutura/documento.service';
import { DocumentoAnexo } from './../../../../model/documentoAnexo';
import { DesignacoesNiveis } from './../../../../model/designacoesNiveis';
import { FormularioPermissaoNivelEmpresaDTO } from '../../../../model/formulario.permissao.nivel.empresa.dto';
import { DateRangeValidator } from './../../../../shared/validators/dateRange.validator';
import { Designado } from './../../../../model/designado';
import { DesignacaoService } from './../../../../service/designacoes/designacao.service';
import { FormularioPermissao } from './../../../../model/formularioPermissao';
import { Dominio } from './../../../../model/dominio';
import { DateValidator } from './../../../../shared/validators/date.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Nivel } from './../../../../model/nivel';
import { Empresa } from './../../../../model/empresa';
import { Component, OnInit} from '@angular/core';
import { NivelService } from '../../../../service/estrutura/nivel.service';
import { EmpresaService } from '../../../../service/estrutura/empresa.service';
import { DominioService } from '../../../../service/estrutura/dominio.service';
import { DesignacaoDTO } from '../../../../model/designacao.dto';
import { TitulosSubstituidosDTO } from '../../../../model/titulos.substituidos.dto';
import { SignatarioDTO } from '../../../../model/signatario.dto';
import { Documento } from '../../../../model/documento';

const swal = require('sweetalert2');

@Component({
  selector: 'app-designacoes-temporarias-incluir',
  templateUrl: './designacoes.temporarias.incluir.component.html',
  styleUrls: ['./designacoes.temporarias.incluir.component.scss']
})
export class DesignacoesTemporariasIncluirComponent implements OnInit {  

  formDesignacoesTemporariasIncluir: FormGroup;
  formIncluirFormularioPermissao: FormGroup;
  formEditarSignatario: FormGroup;

  public empresas: Empresa[] = [];
  public niveis: Nivel[] = [];  
  public niveisPermissao: Nivel[] = [];
  public dominiosMotivo: Dominio[] = [];
  public dominiosTipoDesignacao: Dominio[] = [];
  public formulariosPermissoes: FormularioPermissao[] = [];
  public designacoesNiveis: DesignacoesNiveis[];
  public designacaoNivel: DesignacoesNiveis;
  public designacoes: Designado[] = [];
  public designacoesDTO: DesignacaoDTO[] = [];
  public titulosSubstituidosDTO: TitulosSubstituidosDTO[] = [];
  public signatariosDTO: SignatarioDTO[] = [];
  public listaDesignacoes: Designado[] = [];  
  public formulariosPermissoesNiveisEmpresas: FormularioPermissaoNivelEmpresaDTO[] = [];
  public dominioStatus: Dominio[] = [];
  

  public dominioTipoDocumento: Dominio;
  public documento: Documento;
  public nivel: Nivel = null;  
  public signatarioDTO: SignatarioDTO = null;
  public tituloSubstituidoDTO: TitulosSubstituidosDTO = null;
  public designado: Designado = null;
  public formularioPermissaoNivelEmpresa: FormularioPermissaoNivelEmpresaDTO = null;

  public dtInicio: Date = new Date();
  public dtFim: Date = new Date();

  public ngxValueEmpresa: number;  
  public ngxValueEmitente: number;
  public ngxDominioMotivo: number;     
  public ngxValueCdDesignado: number;
  public ngxValueSignatario: number;
  public tipoDocumento: number = 19;
  public cdDocumento: number = 0;
  public p: number;

  public ngxValueEmpresas: any = [];
  public ngxValueNiveis: any = [];

  public habilitarNumero: boolean = true;
  public habilitarVersao: boolean = true;
  public habilitarIncluir: boolean = true;
  public habilitarNumeroCrc: boolean = true;
  public habilitarEmitente: boolean = true;
  public habilitarCampos: boolean = true;
  public habilitarSignatario: boolean = true;
  public habilitarTabs: boolean = true;

  public value: string = null;
  public status: string = null;
  public dataMinima: string = null;
  public dataInicio: string = null;
  public tipoMotivo: string = 'TIPO_MOTIVO';
  public tipoDesignacao: string = 'TIPO_DESIGNACAO';  
  public statusDocumento: string = 'STATUS_DOCUMENTO';  
  public carregarData: string;
  public ngxTipoDesignacao: string = null;
  public ngxValueDesignado: string = null; 
  public empregadoDesignado: string = null;
  public ngxValueTituloSubstituido: string = null;
  public nmAbreviaturaEmitente: string = null;
  public tipoServico: string = 'DESIGNACOES';
  public codigoStatus: string = 'MINUTA';
  public codigoStatusEmAssinatura: string = 'EM_ASSINATURA';

  public headElementsFormulario = ['Nome', 'Tipo Designação', 'Título', ' '];

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private nivelService: NivelService,
              private spinner: NgxSpinnerService,
              private empresaService: EmpresaService,
              private dominioService: DominioService,
              private designacaoService: DesignacaoService,
              private documentoService: DocumentoService) {

  }

  ngOnInit() {
    this.spinner.show();

    this.route.params.subscribe((params)=> {
      this.cdDocumento = params['id'];
    });

    this.dataMinima = new Date().toISOString().substr(0, 10);
    this.carregarData = new Date().toISOString().substr(0, 10).toString();
    this._createForm();
    this.creatFormIncluirFormularioPermissao();
    this.createFormEditarSignatario();
    this.carregarDominios(this.tipoMotivo);
    this.carregarDominios(this.tipoDesignacao);
    this.carregarDominios(this.statusDocumento);    

    if (this.cdDocumento > 0) {
      this.habilitarTabs = false;
      this.montForm();
    } 
  }

  montForm() {
    this.documentoService.findById(this.cdDocumento)
      .subscribe(
        (documento : Documento) => {
          this.documento = documento;
          this.formDesignacoesTemporariasIncluir.patchValue({
            cdDocumento: this.documento.cdDocumento,
            numeroDocumento: this.documento.numeroDocumento,
            cdEmpresa: this.documento.cdEmpresa,
            versao: this.documento.versao,
            referencia: this.documento.referencia,
            dataEmissao: this.documento.dataEmissao,
            status: this.documento.status,
            cdEmitente: this.documento.cdEmitente,      
            nmAbreviaturaEmitente: this.documento.nmAbreviaturaEmitente,
            conteudo: this.documento.conteudo,
            tipoDocumento: this.documento.tipoDocumento,
            tipoMotivo: this.documento.tipoMotivo,
            matriculaAutor: this.documento.matriculaAutor,
            nomeAutor: this.documento.nomeAutor,
            cdMatriculaResponsavel: this.documento.cdMatriculaResponsavel,
            nomeResponsavel: this.documento.nomeResponsavel,
            dsMotivoCancelamento: this.documento.dsMotivoCancelamento,
            formulariosPermissao: this.documento.formulariosPermissao,      
            signatarios: this.documento.signatarios,
            modificationTime: this.documento.modificationTime,
            modifiedByUser: this.documento.modifiedByUser,
            creationTime: this.documento.creationTime,
            createdByUser: this.documento.createdByUser
          });
          
          this.ngxValueEmpresa = this.documento.cdEmpresa;
          this.ngxDominioMotivo = this.documento.tipoMotivo.cdDominio;
          this.ngxValueEmitente = this.documento.cdEmitente;          
          this.status = this.dominioStatus.find((obj => obj.cdDominio == this.formDesignacoesTemporariasIncluir.value.status)).nome;
          this.codigoStatus = this.dominioStatus.find((obj => obj.cdDominio == this.formDesignacoesTemporariasIncluir.value.status)).codigo;
          console.log(this.status);
        },
      error => console.log(error));
  }

  _createForm() {
    this.formDesignacoesTemporariasIncluir = this.fb
    .group({
      cdDocumento: [null],
      numeroDocumento: [null],
      cdEmpresa: [null, Validators.required],
      versao: 1,
      referencia: [null],
      dataEmissao: [this.carregarData, Validators.compose([DateValidator.dateValidator, DateValidator.dataMenorHoje, Validators.required])],
      status: this.codigoStatus,
      cdEmitente: [null, Validators.required],      
      nmAbreviaturaEmitente: [null],
      conteudo: [null],
      tipoDocumento: [null],
      tipoMotivo: [null, Validators.required],
      matriculaAutor: [null],
      nomeAutor: [null],
      cdMatriculaResponsavel: [null],
      nomeResponsavel: [null],
      dsMotivoCancelamento: [null],
      formulariosPermissao: [null],      
      signatarios: [null],
      modificationTime: [null],
      modifiedByUser: [null],
      creationTime: [null],
      createdByUser: [null],
      nmSignatario: [null],      
      cdDesignado: [null]      
    });
  }

  creatFormIncluirFormularioPermissao() {
    this.formIncluirFormularioPermissao = this.fb
    .group({
      cdDesignacao: [null],
      nmSubstituido: [null],
      dsTituloSubstituido: [null],
      tipoDesignacao: [null],
      dtVigenciaInicio: [null, Validators.compose([DateValidator.dateValidator, DateValidator.dataMenorHoje])],
      dtVigenciaFim: [null, Validators.compose([DateValidator.dateValidator, DateValidator.dataInvalida])],
      nmDesignado: [null],
      dsTitulo: [null],
      flContador: [null],
      nrCrc: [null],
      empresas: [null],
      niveis: [null],
      dsObservacao: [null]
    }, { validator: DateRangeValidator.dataInicioMaior('dtVigenciaInicio', 'dtVigenciaFim') });
  }

  createFormEditarSignatario() {
    this.formEditarSignatario = this.fb
      .group({
        cdSignatario: [null, Validators.required]
      });
  }

  removerEmpresa() {    
    this.empresas = [];
    this.titulosSubstituidosDTO = [];
    this.ngxValueEmpresa = null;
    this.ngxValueEmitente = null;
    this.habilitarEmitente = true;
    this.habilitarIncluir = true;
  }

  carregarEmitente() {
    this.habilitarEmitente = false;
    this.habilitarIncluir = false;
    this.allByEmpresa();
    this.niveis = this.niveis.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj.nmAbreviatura).indexOf(obj.nmAbreviatura) === pos;
    });
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

  onKeyUp(event): void {
    this.removerTituloDesignado();
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

  removerEmitente() {
    this.ngxValueEmitente = null;
    this.habilitarSignatario = true;
    this.formDesignacoesTemporariasIncluir.patchValue({
      signatarios:  null,
      nmSignatario:  null
    });

  }

  carregarDominios(tipo: string) {
    this.dominiosMotivo = [];
    this.dominioService.findByTipoOrderByNome(tipo, this.tipoServico)
      .subscribe(
        (dominios : any[]) => {
          if (dominios != null) {
            for (let dominio of dominios) {
              if (this.tipoMotivo == tipo) {
                this.dominiosMotivo.push(dominio.dominio);
              } else if (this.tipoDesignacao == tipo) {
                this.dominiosTipoDesignacao.push(dominio.dominio);
              } else {
                this.dominioStatus.push(dominio.dominio);
              }             
            }  
            if (this.statusDocumento == tipo) {
              this.status = this.dominioStatus.find((obj => obj.codigo == this.codigoStatus)).nome;              
            }          
          }
          this.spinner.hide(); 
        },
      error => console.log(error));
  }

  onKeyUpDesignado(event): void {
    this.value = event.target.value;
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (this.value.length > 0) {
                this.findDesignacaoByNmDesignacao(this.value);
            } else {
                this.designacoes = [];
            }
        }, 2000);
        });
  }

  findDesignacaoByNmDesignacao(nmDesignado: String) {
    this.removerEmpregado();
    this.spinner.show();
    this.designacaoService.findDesignacaoByNmDesignacao(nmDesignado, this.ngxValueEmpresa)
    .subscribe(
        (designacoesDTO : any) => {
            if (designacoesDTO != null) {
                this.designacoesDTO = [];
                for (let designacao of designacoesDTO) {
                    this.designacoesDTO.push(designacao);
                }               
            }
            this.spinner.hide();
        },
        error => console.log(error));
  }

  removerEmpregado() {
    this.ngxTipoDesignacao = null;
    this.removerTituloDesignado();
    this.designacoesDTO = [];
    this.ngxValueDesignado = null;
    this.formIncluirFormularioPermissao.patchValue({
      dsTituloSubstituido: null
    });
    this.habilitarCampos = true;
    this.formulariosPermissoesNiveisEmpresas = [];
  }

  carregarCampos() {
    this.habilitarCampos = false;    
    this.carregarDescricaoTitulo();
  }

  incluirFormularioPermissao() {
    this.designacoes = [];
    this.ngxValueDesignado = null;
    this.ngxTipoDesignacao = null;
    this.habilitarCampos = true;
    this.creatFormIncluirFormularioPermissao();
  }

  salvar() {
    this.spinner.show();
    const { cdDocumento } = this.formDesignacoesTemporariasIncluir.value
    if(cdDocumento == undefined || cdDocumento == null){
      this.save();
    }else{
      /**this.anexoEmpresaService.findAllByEmpresa(cdEmpresa)
        .subscribe(anexos => this.save(anexos)) */
    }
  }

  save(anexos?: DocumentoAnexo[]){   
    this.dominioService.findById(this.tipoDocumento, this.tipoServico)
    .subscribe(
      (dominio : Dominio) => {
        this.dominioTipoDocumento = dominio;          
        this.nmAbreviaturaEmitente = this.niveis.find((obj => obj.cdNivel == this.ngxValueEmitente)).nmAbreviatura;

        this.formDesignacoesTemporariasIncluir.patchValue({
          nmAbreviaturaEmitente: this.nmAbreviaturaEmitente,
          numeroDocumento: this.dominioTipoDocumento.codigo + '-' + this.nmAbreviaturaEmitente + '-' + 'S/N/' + new Date().getFullYear(),
          status: this.dominioStatus.find((obj => obj.codigo == this.codigoStatus)).cdDominio,
          tipoMotivo: this.dominiosMotivo.find((obj => obj.cdDominio == this.ngxDominioMotivo)),
          tipoDocumento: this.dominioTipoDocumento,          
          matriculaAutor : 2345678, //validar matricula autor
          nomeAutor: 'nomeAutor', //validar nome Autor
          cdMatriculaResponsavel: 123456, //validar cd matricula responsavel
          nomeResponsavel: 'nomeResponsavel', // validar nome responsavel
          dsMotivoCancelamento: null, //validar regra motivo cancelamento
          formulariosPermissao: [],
          signatarios: [],
          nmSignatario: [null],      
          cdDesignado: [null]   
        });

        this.documentoService.save(this.formDesignacoesTemporariasIncluir.value)
          .subscribe(
            (result: any) => {
              this.documento = result.documento;
              this.habilitarTabs = false;
              this.cdDocumento = this.documento.cdDocumento;
              this.formDesignacoesTemporariasIncluir.patchValue({
                nmSignatario: [null],      
                cdDesignado: [null]   
              });
              this.montForm();
              this.sweetalertSucesso();
            },
            error => console.log(error)
          );
      },
    error => console.log(error));    
    this.spinner.hide();
  }

  enviarParaAssinatura() {
    this.formDesignacoesTemporariasIncluir.patchValue({
      status: this.dominioStatus.find((obj => obj.codigo == this.codigoStatusEmAssinatura)).cdDominio,
      tipoMotivo: this.dominiosMotivo.find((obj => obj.cdDominio == this.ngxDominioMotivo)),
      nmSignatario: [null],      
      cdDesignado: [null]   
    });
    this.documentoService.save(this.formDesignacoesTemporariasIncluir.value)
    .subscribe(
      (result: any) => {
        this.documento = result.documento;
        this.habilitarTabs = false;
        this.cdDocumento = this.documento.cdDocumento;
        this.formDesignacoesTemporariasIncluir.patchValue({
          nmSignatario: [null],      
          cdDesignado: [null]   
        });
        this.montForm();
        this.sweetalertSucesso();
      },
      error => console.log(error)
    );
  }

  salvarFormularioPermissao() {        
    this.designacoesNiveis = [];
    this.designado = this.designacoes.find((obj => obj.cdDesignacao == this.formIncluirFormularioPermissao.value.nmSubstituido));
    console.log(this.designado);
    var niveis = this.formIncluirFormularioPermissao.value.niveis;    
    for(let nivel of niveis) {
      console.log('nivel ' + nivel);
      this.nivelById(nivel);      
    }
    console.log('teste');
    console.log(this.designacoesNiveis);
    this.formIncluirFormularioPermissao.patchValue({
      nmSubstituido: this.designado.nmDesignado,​​
    });
    this.listaDesignacoes.push(this.formIncluirFormularioPermissao.value);
    console.log(this.listaDesignacoes);
  }

  editarFormularioPermissao(designacao: Designado){
    this.creatFormIncluirFormularioPermissao();
    console.log(designacao);
    this.designacoes.push(designacao);
    this.formIncluirFormularioPermissao.patchValue({
      cdDesignacao: designacao.cdDesignacao,
      nmSubstituido: this.ngxValueDesignado,
      dsTituloSubstituido: designacao.dsTituloSubstituido,
      tipoDesignacao: designacao.tipoDesignacao,
      dtVigenciaInicio: null,
      dtVigenciaFim: null,
      nmDesignado: designacao.nmDesignado,
      dsTitulo: designacao.dsTitulo,
      flContador: designacao.flContador,
      nrCrc: designacao.nrCrc,
      empresas: null,
      niveis: null,
      dsObservacao: designacao.dsObservacao
    });
    console.log(this.formIncluirFormularioPermissao.value);
  }

  excluirFormularioPermissao(designacao: Designado) {
    swal.fire({
      title: 'Deseja realmente excluir o formulário de permissão?',
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
        this.listaDesignacoes = this.listaDesignacoes.filter(item => item !== designacao);
        this.formIncluirFormularioPermissao.patchValue({
          listaDesignacoes: this.listaDesignacoes
        });
      }
    });
  }

  carregarDatainicioVigencia() {
    this.dataInicio = this.formIncluirFormularioPermissao.value.dtVigenciaInicio;
    this.dtInicio = new Date(this.formIncluirFormularioPermissao.value.dtVigenciaInicio);
    this.dtFim = new Date(this.formIncluirFormularioPermissao.value.dtVigenciaFim);
    if (this.dtInicio.getTime() > this.dtFim.getTime()) {
      this.formIncluirFormularioPermissao.patchValue({
        dtVigenciaFim: null
      });
    }
  }

  carregarTituloDesignado() {    
    if (this.ngxValueTituloSubstituido != null && this.ngxTipoDesignacao != null) {
      this.carregarNiveisEmpresas();
      this.tituloSubstituidoDTO = this.titulosSubstituidosDTO.find((obj => obj.nmAbreviatura == this.ngxValueTituloSubstituido));
      if (this.ngxTipoDesignacao == 'Interino') {
        this.empregadoDesignado = ', interino';
      } else {
        this.empregadoDesignado = ', em exercício';
      }
      this.formIncluirFormularioPermissao.patchValue({
        dsTitulo:  this.tituloSubstituidoDTO.dsTitulo + '' + this.empregadoDesignado
      });
    }    
  }

  ativarCrc() {
    if (this.formIncluirFormularioPermissao.value.flContador == true) {
      this.habilitarNumeroCrc = true;
      this.formIncluirFormularioPermissao.patchValue({
        nrCrc: "",
      });
    } else {
      this.habilitarNumeroCrc = false;
    }
  }

  removerTituloDesignado() {
    this.formIncluirFormularioPermissao.patchValue({
      dsTitulo:  null
    });
  }

  carregarNiveisEmpresas() {    
    this.spinner.show();
    this.ngxValueEmpresas = [];
    this.ngxValueNiveis = [];
    this.designacaoService.findFormularioPermissaoNivelEmpresa(this.ngxValueDesignado, this.ngxValueTituloSubstituido)
    .subscribe(
        (niveisEmpresasDTO : any) => {               
          if (niveisEmpresasDTO != null) {
            this.formulariosPermissoesNiveisEmpresas = [];                
            for (let nivelEmpresaDTO of niveisEmpresasDTO) { 
              this.formulariosPermissoesNiveisEmpresas.push(nivelEmpresaDTO);
            }

            for (let formularioNiveisEmpresas of this.formulariosPermissoesNiveisEmpresas) {              
              this.ngxValueEmpresas += formularioNiveisEmpresas.cdEmpresa;
              this.ngxValueNiveis += formularioNiveisEmpresas.cdNivel;
            }
            this.spinner.hide();
          }              
        },
        error => console.log(error));                      
  }

  carregarDescricaoTitulo() {   
    this.designacaoService.findDescricaoTitulo(this.ngxValueDesignado)
    .subscribe(
        (titulosSubstituidosDTO : any) => {               
          if (titulosSubstituidosDTO != null) {
              this.titulosSubstituidosDTO = [];                
              for (let tituloSubstituidoDTO of titulosSubstituidosDTO) { 
                this.titulosSubstituidosDTO.push(tituloSubstituidoDTO);
              }
          }
        },
        error => console.log(error));
  }

  nivelById(cdNivel: string) {
    this.spinner.show();
    this.niveis = [];
    this.nivelService.findById(cdNivel)
    .subscribe(
        (nivel : Nivel) => {
          if (nivel != null) {
            this.nivel = nivel;
          }
          this.spinner.hide();
        },
        error => console.log(error));
  }

  removerTituloSubstituido() {
    this.formulariosPermissoesNiveisEmpresas = [];
    this.removerTituloDesignado();
  }

  removerNiveisEmpresas(event: any, tipo: string) {
    if (tipo == 'nivel') {
      console.log(this.ngxValueEmpresas);
      this.formularioPermissaoNivelEmpresa = this.formulariosPermissoesNiveisEmpresas.find((obj => obj.cdNivel == event));
      console.log(this.formularioPermissaoNivelEmpresa);
      const index = this.ngxValueEmpresas.indexOf(this.formularioPermissaoNivelEmpresa.cdEmpresa);
      console.log(index);
      this.ngxValueEmpresas.splice(index, 1);
    } else {
      this.formularioPermissaoNivelEmpresa = this.formulariosPermissoesNiveisEmpresas.find((obj => obj.cdEmpresa == event));   
      const index = this.ngxValueNiveis.indexOf(this.formularioPermissaoNivelEmpresa.cdNivel);
      this.ngxValueNiveis.splice(index, 1);
    }
  }

  carregarSignatario() {
    this.spinner.show();
    this.designacaoService.findSignatarios(this.ngxValueEmpresa, this.ngxValueEmitente)
    .subscribe(
        (signatariosDTO : any) => {               
          if (signatariosDTO != null) {
            this.signatariosDTO = [];                
            for (let signatarioDTO of signatariosDTO) { 
              this.signatariosDTO.push(signatarioDTO);
            }

            this.formDesignacoesTemporariasIncluir.patchValue({
              signatarios:  this.signatariosDTO.length > 0 ? this.signatariosDTO[0].cdDesignacao : null,
              nmSignatario:  this.signatariosDTO.length > 0 ? this.signatariosDTO[0].nmDesignado : null
            });
            this.habilitarSignatario = false;
            this.spinner.hide();
          }
        },
        error => console.log(error));        
  }

  salvarSignatario() {
    this.signatarioDTO = this.signatariosDTO.find((obj => obj.cdDesignacao == this.ngxValueSignatario));   
    this.formDesignacoesTemporariasIncluir.patchValue({
      signatarios:  this.signatarioDTO.cdDesignacao,
      nmSignatario:  this.signatarioDTO.nmDesignado
    });
  }

  editarSignatario() {
    this.ngxValueSignatario = null;
    this.formEditarSignatario.patchValue({
      cdSignatario:  null
    });
  }

  sweetalertSucesso() {
    swal.fire('Documento salvo com sucesso!', '', 'success');
  }

  sweetalertExclusaoSucesso() {
    swal.fire('Documento excluído com sucesso!', '', 'success');
  }

  excluirDocumento() {
    swal.fire({
      title: 'Deseja realmente excluir o documento?',
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
        this.documentoService.delete(this.cdDocumento)
          .subscribe((deletado: boolean) => {
            if (deletado) {
              this.spinner.hide();
              this.sweetalertExclusaoSucesso();
              this.router.navigate(['/designacoes/designacoesTemporarias']);
            }
          },
          error => console.log(error));
      }
    });
  }
  
}
