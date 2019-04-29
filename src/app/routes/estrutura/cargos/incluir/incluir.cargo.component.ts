import { QuadroAssinatura } from './../../../../model/quadro.assinatura';
import { Cargo } from './../../../../model/cargo';
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { CargoService } from '../../../../service/estrutura/cargo.service';
import { DominioService } from '../../../../service/estrutura/dominio.service';
import { Dominio } from '../../../../model/dominio';

const swal = require('sweetalert2');

@Component({
  selector: 'app-incluir-cargo',
  templateUrl: './incluir.cargo.component.html'
})
export class IncluirCargoComponent implements OnInit {

  formIncluirCargo: FormGroup;
  formIncluirQuadro: FormGroup;

  public cargo: Cargo;

  public tipoServico: string = 'ESTRUTURA';
  public tipoQuadro: string = 'TIPO_QUADRO';
  public tipoAssinatura: string = 'TIPO_ASSINATURA';
  public tipoNorma: string = 'TIPO_EMPRESA_NORMA';

  public ngxSituacao: boolean = true;
  public habilitarAssinatura: boolean = true;
  public habilitarCargo: boolean = false;
  public habilitarQuadro: boolean = false;

  public ngxCargo: number = null;
  public ngxQuadro: number = 0;
  public ngxAssinatura: number = 0;
  public cdCargo: number = 0;
  public indexQuadro: number = 0;

  public quadroAssinatura: QuadroAssinatura;

  public dominiosQuadro: Dominio[] = [];
  public dominiosQuadroValidacao: Dominio[] = [];
  public dominiosAssinatura: Dominio[] = [];
  public dominiosAssinaturaValidacao: Dominio[] = [];
  public cargosDisponiveis: Dominio[] = [];
  public quadrosAssinaturas: QuadroAssinatura[] = [];
  public quantidadeQuadros: any[] = [];
  public itemsSituacao: any[] = [{'id':true, 'situacao':'Ativa'},
                                 {'id':false, 'situacao':'Inativa'}];

  public headElements = ['Quadro', 'Assinatura', 'Valor', '',''];
  
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private cargoService: CargoService,
              private dominioService: DominioService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.createForm();
    this.createFormQuadro();
    this.carregarDominios(this.tipoQuadro);
    this.carregarDominios(this.tipoAssinatura);
    this.route.params.subscribe((params)=> {
      this.cdCargo = params['id'];
    });
    
    if(this.cdCargo > 0) {
      this.montForm();
    } else {
      this.carregarCargosDisponiveis();
    }

    this.spinner.hide();
  }

  createForm() {
    this.formIncluirCargo = this.fb
      .group({
        cdCargo: [null],
        tipoCargo: [null, Validators.required],
        flAtivo: [null, Validators.required],
        quadrosAssinaturas: [null],
        modificationTime: [null],
        modifiedByUser: [null],
        creationTime: [null],
        createdByUser: [null]
      });
  }

  createFormQuadro() {
    this.formIncluirQuadro = this.fb
      .group({
        cdQuadroAssinatura: [null],
        tipoQuadro: [null, Validators.required],
        tipoAssinatura: [null],
        valorAssinatura: [null],
        modificationTime: [null],
        modifiedByUser: [null],
        creationTime: [null],
        createdByUser: [null]
      });
  }

  carregarCargosDisponiveis(){
    this.dominioService.findDominiosCargosDisponiveis(this.tipoNorma, this.tipoServico)
    .subscribe(
        (dominios : any) => {               
            if (dominios != null) {
                this.cargosDisponiveis = [];                
                for (let dominio of dominios) {                                           
                    this.cargosDisponiveis.push(dominio.dominio);
                }
                this.spinner.hide();
            }
        },
        error => console.log(error));  
  }

  carregarCargoDominio(){
    this.dominioService.findById(this.ngxCargo, this.tipoServico)
    .subscribe(
        (dominio : Dominio) => {               
            if (dominio != null) {
                this.cargosDisponiveis = [];     
                this.cargosDisponiveis.push(dominio);
                this.spinner.hide();
            }
        },
        error => console.log(error));  
  }

  voltar(){
    this.router.navigate(['/estrutura/cargos'])
  }

  adicionarQuadro(){
    this.indexQuadro = null;
    this.quantidadeQuadros = [];
    this.habilitarAssinatura = true;
    this.habilitarQuadro = false;
    this.ngxQuadro = 0;
    this.ngxAssinatura = 0;
    this.createFormQuadro();
    this.dominiosQuadro = this.dominiosQuadroValidacao;

    if(this.quadrosAssinaturas.length > 0){

      this.quantidadeQuadros.push(this.quadrosAssinaturas.reduce((contador, elem) => Object.assign(contador, {[elem.tipoQuadro.cdDominio]: (contador[elem.tipoQuadro.cdDominio] || 0) + 1}), {}));
      var quadrosJson = [];
      for (let quantidadeQuadro of this.quantidadeQuadros) {
        Object.keys(quantidadeQuadro).forEach(function (item) {
          quadrosJson.push({'dominio': item, 'quantidade': quantidadeQuadro[item]});          
        });
        for (let quadroJson of quadrosJson) {
          if(quadroJson['quantidade'] > 1){
            this.dominiosQuadro = this.dominiosQuadro.filter(quadro => quadro.cdDominio !== parseInt(quadroJson['dominio']));
          }          
        }        
      }
    }
  }

  salvar(){ 
    this.formIncluirCargo.patchValue({
      tipoCargo: this.cargosDisponiveis.find((obj => obj.cdDominio == this.ngxCargo))
    });
    this.cargoService.save(this.formIncluirCargo.value)
      .subscribe(
        (result: any) => {
          this.cargo = result.cargo;
          this.cdCargo = this.cargo.cdCargo;
          this.formIncluirCargo.patchValue({
            cdCargo: this.cdCargo
          });
          this.montForm();
          this.sweetalertSucesso();
        },
        error => console.log(error)
      );
  }

  sweetalertSucesso() {
    swal.fire('Cargo salvo com sucesso!', '', 'success');
  }

  montForm() {
    this.cargoService.findById(this.cdCargo)
      .subscribe(
        (cargo : Cargo) => {
          this.cargo = cargo;
          this.formIncluirCargo.patchValue({
            cdCargo: cargo.cdCargo,
            tipoCargo: cargo.tipoCargo,
            flAtivo: cargo.flAtivo,
            quadrosAssinaturas: cargo.quadrosAssinaturas,
            creationTime: new Date(cargo.creationTime),
            createdByUser: cargo.createdByUser,
            modificationTime: cargo.modificationTime ? new Date(cargo.modificationTime) : null,
            modifiedByUser: cargo.modifiedByUser,
          });
          this.ngxCargo = cargo.tipoCargo.cdDominio;
          this.ngxSituacao = cargo.flAtivo;
          this.quadrosAssinaturas = this.formIncluirCargo.value.quadrosAssinaturas;
          this.habilitarCargo = true;
          this.carregarCargoDominio();
        },
      error => console.log(error));
  }

  carregarDominios(tipo: string) {
    this.dominioService.findByTipoOrderByNome(tipo, this.tipoServico)
      .subscribe(
        (dominios : any[]) => {
          if (dominios != null) {
            for (let dominio of dominios) {
              if (this.tipoQuadro == tipo) {
                this.dominiosQuadro.push(dominio.dominio);
                this.dominiosQuadroValidacao.push(dominio.dominio);
              } else {
                this.dominiosAssinatura.push(dominio.dominio);
                this.dominiosAssinaturaValidacao.push(dominio.dominio);
              }
            }    
          }
        },
      error => console.log(error));
  }

  salvarQuadro(){
    this.formIncluirQuadro.patchValue({
      tipoQuadro: this.dominiosQuadro.find((obj => obj.cdDominio == this.ngxQuadro)),
      tipoAssinatura: this.dominiosAssinatura.find((obj => obj.cdDominio == this.ngxAssinatura))
    });

    if(this.indexQuadro == null) {
      this.quadrosAssinaturas.push(this.formIncluirQuadro.value);
    } else {
      this.quadrosAssinaturas[this.indexQuadro] = this.formIncluirQuadro.value;
    }

    this.formIncluirCargo.patchValue({
      quadrosAssinaturas: this.quadrosAssinaturas
    });
    this.createFormQuadro();
  }

  editarQuadro(quadroAssinaturaEditar: QuadroAssinatura, index: number){
    this.habilitarQuadro = true;
    this.habilitarAssinatura = true;
    this.dominiosAssinatura = this.dominiosAssinaturaValidacao;
    this.ngxQuadro = quadroAssinaturaEditar.tipoQuadro.cdDominio;
    this.ngxAssinatura = quadroAssinaturaEditar.tipoAssinatura.cdDominio;
    this.indexQuadro = index;
    this.quadroAssinatura = quadroAssinaturaEditar;

    this.montFormIncluirQuadro();
  }

  excluirQuadro(quadroAssinaturaExcluir: QuadroAssinatura){
    swal.fire({
      title: 'Deseja realmente excluir o quadro?',
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
        this.quadrosAssinaturas = this.quadrosAssinaturas.filter(item => item !== quadroAssinaturaExcluir);
        this.formIncluirCargo.patchValue({
          quadrosAssinaturas: this.quadrosAssinaturas
        });
      }
    });
  }

  montFormIncluirQuadro() {
    this.formIncluirQuadro.patchValue({
      tipoQuadro: this.quadroAssinatura.tipoQuadro.cdDominio,
      tipoAssinatura: this.quadroAssinatura.tipoAssinatura.cdDominio,
      valorAssinatura: this.quadroAssinatura.valorAssinatura
    });    
  }

  carregarAssinatura(){
    this.habilitarAssinatura = false;
    this.ngxAssinatura = 0;
    this.dominiosAssinatura = this.dominiosAssinaturaValidacao;
    if(this.quadrosAssinaturas.length > 0){
      for (let quadroAssinatura of this.quadrosAssinaturas) {        
        if (quadroAssinatura.tipoQuadro.cdDominio == this.ngxQuadro) {
          this.dominiosAssinatura = this.dominiosAssinatura.filter(item => item !== quadroAssinatura.tipoAssinatura);
        }                
      }            
    }
  }

}