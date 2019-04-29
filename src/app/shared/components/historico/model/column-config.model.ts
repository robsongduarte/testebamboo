import { isEqual } from 'lodash'

export class ColumnConfig {

  constructor(init:Partial<ColumnConfig>){
    Object.assign(this, init)
  }

  column: string
  id: boolean
  label: string
  type: string
  formatDate: string
  currency: boolean
  decimal: boolean
  casasDecimais: number
  booleanLabel: string[]
  isTimestamp: boolean
  visible: boolean
  funcoes: string

  toogleVisible(){
    this.visible = !(this.visible || !('visible' in this))
  }

  equals(column: ColumnConfig): boolean {
    return isEqual(this, column)
  }

  public static compareSort({ label: l1 }: ColumnConfig, { label: l2 }: ColumnConfig): number {
    return l1.toLowerCase().localeCompare(l2.toLowerCase())
  }
}
