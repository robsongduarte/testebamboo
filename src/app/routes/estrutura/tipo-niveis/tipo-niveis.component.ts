import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import Swal from 'sweetalert2'

import { TipoNivel } from '../../../model/tipoNivel'
import { TipoNivelService } from '../../../service/estrutura/tipo-nivel.service'

@Component({
  selector: 'app-tipo-niveis',
  templateUrl: './tipo-niveis.component.html'
})
export class TipoNiveisComponent implements OnInit {

  formTipoNiveis: FormGroup
  formPesquisaTipoNivel: FormGroup
  tipoNiveis: TipoNivel[] = []
  headTable = [
    { name: 'Nome', class: '' },
    { name: 'Abreviatura', class: 'text-center' },
    { name: 'Situação', class: 'text-center' },
    { name: '', class: '' }
  ]
  tipoNivelFilter = {} as TipoNivel
  situacoes = [ { id: true, situacao:'Ativa'}, { id: false, situacao: 'Inativa' }];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private tipoNivelService: TipoNivelService) {}

  ngOnInit() {
    this.formTipoNiveis = new FormGroup({
      nome: this.formBuilder.control(''),
      abreviatura: this.formBuilder.control(''),
      situacao: this.formBuilder.control('')
    })

    this.formPesquisaTipoNivel = new FormGroup({
      pesquisaTipoNivel: this.formBuilder.control('', [ Validators.required ])
    })
  }

  limpar() {
    this.limparFiltro()
    this.limparFiltroTabela()
    this.limparLista()
  }

  limparLista(){
    this.tipoNiveis = []
  }

  limparFiltro(){
    this.formTipoNiveis.reset()
  }

  limparFiltroTabela(){
    this.formPesquisaTipoNivel.reset()
  }

  pesquisar() {
    this.limparFiltroTabela()
    this.carregarRegistros()
  }

  carregarRegistros(){
    this.limparLista()
    this.spinner.show()
    this.tipoNivelService.findTipoNiveis(this.formTipoNiveis.value)
        .subscribe(tipoNiveis => this.tipoNiveis = tipoNiveis,
          error => console.log(error),
          () => this.spinner.hide())
  }

  editar(tipoNivel: TipoNivel){
    this.router.navigate(['estrutura/tiponiveis-incluir', tipoNivel.cdTipoNivel])
  }

  goToNew(){
    this.router.navigate(['estrutura/tiponiveis-incluir'])
  }

}
