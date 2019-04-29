import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import Swal from 'sweetalert2'

import { TipoNivelService } from '../../../../service/estrutura/tipo-nivel.service'
import { TipoNivel } from '../../../../model/tipoNivel'

@Component({
  selector: 'app-incluir-tipo-nivel',
  templateUrl: './incluir-tipo-nivel.component.html'
})
export class IncluirTipoNivelComponent implements OnInit {

  formIncluir: FormGroup
  cdTipoNivel: number
  toAssociate: TipoNivel[] = []

  constructor(private tipoNivelService: TipoNivelService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show()

    this.formIncluir = new FormGroup({
      cdTipoNivel: this.formBuilder.control(''),
      nmTipoDeNivel: this.formBuilder.control('', [ Validators.required ]),
      nmAbreviatura: this.formBuilder.control('', [ Validators.required ]),
      flAtivo: this.formBuilder.control(false, [ Validators.required ]),
      flExigeCentroDeCusto: this.formBuilder.control(false),
      dsTipoDeNivel: this.formBuilder.control(''),
      flTipoFormal: this.formBuilder.control(undefined, [ Validators.required ]),
      tiposAssociados: this.formBuilder.control([]),
      modificationTime: this.formBuilder.control(''),
      modifiedByUser: this.formBuilder.control(''),
      creationTime: this.formBuilder.control(''),
      createdByUser: this.formBuilder.control(''),
    })

    this.cdTipoNivel = this.activatedRoute.snapshot.params['id']
    this.carregarTipoNivel()
  }

  carregarTipoNivel(){
    if (!this.cdTipoNivel){
      this.loadToAssociated()
      return
    }
    this.tipoNivelService.findById(this.cdTipoNivel)
      .subscribe(tipoNivel => this.formIncluir.patchValue(tipoNivel),
        error => console.log(error),
        () => this.loadToAssociated())
  }

  loadToAssociated(){
    this.limparCamposToAssociate()
    if(this.formIncluir.value.flTipoFormal == undefined){
      this.spinner.hide()
      return
    }
    this.tipoNivelService.toAssociate(this.formIncluir.value)
      .subscribe(toAssociate => this.toAssociate = toAssociate,
        error => console.log(error),
        () => {
          this.criarCamposToAssociate()
          this.spinner.hide()
        })
  }

  limparCamposToAssociate(){
    if(this.toAssociate && this.toAssociate.length > 0){
      this.toAssociate.forEach(associate => {
        this.formIncluir.removeControl(associate.nmAbreviatura)
      })
    }
  }

  criarCamposToAssociate(){
    if(this.toAssociate && this.toAssociate.length > 0){
      this.toAssociate.forEach(associate => {
        const value = !this.cdTipoNivel ? false : this.hasAbreviatura(associate.nmAbreviatura)
        this.formIncluir.addControl(associate.nmAbreviatura, this.formBuilder.control(value))
      })
    }
  }

  hasAbreviatura(abreviatura: string): boolean {
    const { tiposAssociados = [] } = this.formIncluir.value
    const search = tiposAssociados.find(tipo => tipo.nmAbreviatura == abreviatura)
    return search != undefined
  }

  salvar(){
    this.spinner.show()
    this.carregarToAssociate()
    this.tipoNivelService.save(this.formIncluir.value)
      .subscribe(tipoNivel => {
        this.cdTipoNivel = tipoNivel.cdTipoNivel
        this.carregarTipoNivel()
      },
      () => this.sweetalertErro(),
      () => {
        this.spinner.hide()
        this.sweetalertSucesso()
      })
  }

  carregarToAssociate(){
    this.toAssociate.forEach(associate => {
      let { [associate.nmAbreviatura]: field, tiposAssociados = [] } = this.formIncluir.value
      if(field && !this.hasAbreviatura(associate.nmAbreviatura)){
        tiposAssociados.push(associate)
      }
      if(!field && this.hasAbreviatura(associate.nmAbreviatura)){
        const index = tiposAssociados.findIndex(tipo => tipo.nmAbreviatura == associate.nmAbreviatura)
        tiposAssociados.splice(index, 1)
      }
      this.formIncluir.patchValue({ tiposAssociados })
    })
  }

  getLinkHistorico(column?: string){
    const id = this.activatedRoute.snapshot.params['id']
    const { cdTipoNivel = 0 } = this
    if(this.router.url.indexOf(id) > -1){
      return this.router.url
              .replace(id, cdTipoNivel.toString())
              .concat('/historico')
              .concat(column ? '/' + column : '')
    }
    return this.router.url
              .concat('/')
              .concat(cdTipoNivel.toString())
              .concat('/historico')
              .concat(column ? '/' + column : '')
  }

  desabilitarHistorico(){
    const id = this.activatedRoute.snapshot.params['id']
    const { cdTipoNivel = 0 } = this
    return (!id || id === '0') && cdTipoNivel == 0
  }

  sweetalertSucesso() {
    Swal.fire({ title: 'Registro salvo com sucesso!', type: 'success', timer: 3000 })
  }

  sweetalertErro() {
    Swal.fire({ title: 'Ocorreu um erro ao salvar o registro.', type: 'error', timer: 3000 })
  }

  voltar(){
    this.router.navigate(['/estrutura/tiponiveis'])
  }

}
