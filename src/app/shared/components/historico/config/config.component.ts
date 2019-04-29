import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { cloneDeep } from 'lodash'

import { HistoricoConfig } from '../model/historico-config.model'
import { ColumnConfig } from '../model/column-config.model'

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit {

  @Input() config: HistoricoConfig
  @Output() toogleColumn = new EventEmitter<ColumnConfig>()
  @Output() toogleChildren = new EventEmitter<HistoricoConfig>()

  columns: ColumnConfig[] = []
  childrens: HistoricoConfig[] = []

  constructor() { }

  ngOnInit() {
    this.columns = cloneDeep(this.config.columns)
    this.childrens = cloneDeep(this.config.children)
  }

  toogleColumnExibir(column: ColumnConfig){
    column.toogleVisible()
    this.toogleColumn.emit(column)
  }

  toogleChildrenExibir(children: HistoricoConfig){
    children.toogleVisible()
    this.toogleChildren.emit(children)
  }

}
