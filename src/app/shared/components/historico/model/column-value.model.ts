import { Auditoria } from './auditoria.model'
import { HistoricoConfig } from './historico-config.model'
import { ColumnConfig } from './column-config.model'

export class ColumnValue {

  constructor(init?:Partial<ColumnValue>){
    if(init){
      Object.assign(this, init)
    }
  }

  title: string
  auditoria: Auditoria
  children: [Auditoria, HistoricoConfig][]
  config: ColumnConfig
  visible: boolean

}
