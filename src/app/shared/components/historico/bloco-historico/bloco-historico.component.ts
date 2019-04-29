import { Component, OnInit, Input } from '@angular/core'

import * as moment from 'moment'

import { HistoricoConfig } from '../model/historico-config.model'
import { Auditoria } from '../model/auditoria.model'

@Component({
  selector: '[app-bloco-historico]',
  templateUrl: './bloco-historico.component.html'
})
export class BlocoHistoricoComponent implements OnInit {

  @Input() auditoria: Auditoria
  @Input() config: HistoricoConfig

  constructor() {}

  ngOnInit() {}

  exibir(): boolean {
    return this.auditoria.isVisible(this.config)
  }

  getDataFormatada(): string {
    moment.locale('pt-br')
    return moment(new Date(this.auditoria.timestampClk)).format(this.config.dateFormat || 'lll')
  }

}
