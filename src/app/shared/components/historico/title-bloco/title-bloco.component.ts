import { Component, OnInit, Input } from '@angular/core'

import { HistoricoConfig } from '../model/historico-config.model'
import { Auditoria } from '../model/auditoria.model'

@Component({
  selector: '[app-title-bloco]',
  templateUrl: './title-bloco.component.html'
})
export class TitleBlocoComponent implements OnInit {

  @Input() auditoria: Auditoria = new Auditoria()
  @Input() config: HistoricoConfig = new HistoricoConfig()

  constructor() {}

  ngOnInit() {}

  getNome(): string {
    try{
      const { [this.config.nome]: nome = '' } = this.auditoria.dadosOld
      return nome.toLowerCase()
    }catch(e){
      console.log('Erro ao tentar carregar a coluna: getNome(), ', e, this.constructor.name)
    }
    return ''
  }

  getDescricao(): string {
    try{
      const { [this.auditoria.acao]: acao = '' } = this.config.descricoes
      return acao.toLowerCase()
    }catch(e){
      console.log('Erro ao tentar carregar a coluna: getDescricao() ', e, this.constructor.name)
    }
    return ''
  }

  toogleDetalhe() {
    this.config.visible = !this.config.visible
  }

}
