import { ColumnConfig } from './column-config.model'

export class ChildrenConfig {

  constructor(init?: Partial<ChildrenConfig>){
    if(init){
      Object.assign(this, init)
    }
  }

  table: string[]
  columns: ColumnConfig[]

}
