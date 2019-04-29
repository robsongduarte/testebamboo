import { Component, OnInit, Input } from '@angular/core'
import { cloneDeep } from 'lodash'
import { trigger, state, style, animate, transition } from '@angular/animations'

import { HistoricoConfig } from '../model/historico-config.model'
import { ColumnConfig } from '../model/column-config.model'
import { Auditoria } from '../model/auditoria.model'

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  animations: [
    trigger('toggleConfig', [
      state('hidden', style({
        opacity: 0,
        'max-width': '0px',
        display: 'none'
      })),
      state('visible', style({
        opacity: 1,
        'max-width': '300px',
        display: 'block'
      })),
      transition('hidden => visible', animate('500ms 500ms ease-in-out')),
      transition('visible => hidden', animate('0ms 0ms ease-in-out'))
    ])
  ]
})
export class HistoricoComponent implements OnInit {

  @Input() config: HistoricoConfig
  @Input() auditorias: Auditoria[] = []

  configs: [Auditoria, HistoricoConfig][] = []
  exibir: boolean = false
  configurar: boolean = false
  configuracao: HistoricoConfig

  configState = 'hidden'

  constructor() {}

  ngOnInit() {
    this.makeConfigsInit()
    this.configuracao = cloneDeep(this.config)
    this.configuracao.setVisible(true)
    this.configuracao.columns = [...this.configuracao.columns, ...this.configuracao._columns]
    this.configuracao.children = [...this.configuracao.children, ...this.configuracao._children]
    this.configuracao.order()
  }

  makeConfigsInit() {
    this.configs = []
    this.auditorias.forEach(auditoria => this.configs.push([auditoria, cloneDeep(this.config)]))
  }

  refresh() {
    const configs = cloneDeep(this.configs)
    this.configs = []
    configs.forEach(config => this.configs.push(config))
  }

  toogleExibir(){
    this.exibir = !this.exibir
    this.configs.forEach(([,config]) => config.setVisible(this.exibir))
    this.refresh()
  }

  toogleColumnExibir(column: ColumnConfig){
    this.showHideColumn(column.visible, column.column)
    this.refresh()
  }

  toogleChildrenExibir(children: HistoricoConfig){
    this.showHideChildren(children.visible, children.table[0])
    this.refresh()
  }

  showHideColumn(visible: boolean, name: string){
    this.configs.forEach(([,config]) => config.showHideColumn(name, visible))
  }

  showHideChildren(visible: boolean, name: string){
    this.configs.forEach(([,config]) => config.showHideChildren(name, visible))
  }

  toogleConfigurar(){
    this.configurar = !this.configurar
    this.configState = this.configState == 'hidden' ? 'visible' : 'hidden'
  }

}
