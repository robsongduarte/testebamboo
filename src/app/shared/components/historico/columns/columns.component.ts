import { Component, OnInit, Input } from '@angular/core'

import { ColumnValue } from '../model/column-value.model'
import { HistoricoConfig } from '../model/historico-config.model'
import { ColumnConfig } from '../model/column-config.model'
import { Auditoria } from '../model/auditoria.model'

@Component({
  selector: '[app-columns]',
  templateUrl: './columns.component.html'
})
export class ColumnsComponent implements OnInit {

  @Input() isChildren: boolean = false
  @Input() auditoria: Auditoria
  @Input() config: HistoricoConfig

  columns: ColumnValue[] = []

  constructor() {}

  ngOnInit() {
    this.montarColunas()
  }

  montarColunas() {
    if(!this.config){
      return
    }
    this.columns = [...this.colunas(), ...this.childrens()]
  }

  colunas(): ColumnValue[] {
    return this.config.columns
            .filter(config => config != undefined)
            .filter(config => this.filtro(config))
            .map(config => this.columnValue(config))
  }

  columnValue(config: ColumnConfig): ColumnValue {
    const { label: title } = config
    return new ColumnValue({ config, title, auditoria: this.auditoria })
  }

  filtro(config: ColumnConfig): boolean {
    const { column, id } = config
    const { dadosOld: older , dadosNew: newer, acao } = this.auditoria
    const { skipNull = false, skipEmpty = false } = this.config
    return (acao == 'U' && newer[column]) || id ||
            ((acao == 'I' || acao == 'D') && (!skipNull || older[column] != null) && (!skipEmpty || older[column]))
  }

  childrens(): ColumnValue[] {
    const { filhos } = this.auditoria
    if(!filhos){
      return []
    }
    return this.config.children
            .filter(child => child != undefined)
            .map(child => this.columnValueChildren(child, filhos))
            .filter(child => child.children.length > 0)
  }

  columnValueChildren(child: HistoricoConfig, filhos: object): ColumnValue {
    const { table: [ auditorias, title ] } = child
    return new ColumnValue({
      visible: child.visible,
      title: title,
      children: this.montarChildrens(filhos[auditorias], child)
    })
  }

  montarChildrens(auditorias: Auditoria[], config: HistoricoConfig): Array<[Auditoria, HistoricoConfig]> {
    if(!auditorias){
      return []
    }
    return auditorias
            .map(auditoria => new Auditoria(auditoria))
            .map(auditoria => this.montarTupla(auditoria, config))
            .filter(tupla => tupla[0].isVisible(config))
  }

  montarTupla(auditoria: Auditoria, config: HistoricoConfig): [Auditoria, HistoricoConfig] {
    return [auditoria, config]
  }

}
