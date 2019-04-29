import { ColumnConfig } from './column-config.model'

export class HistoricoConfig {

  constructor(init?: Partial<HistoricoConfig>){
    if(init){
      Object.assign(this, init)
      this.indexarColuns()
      this.order()
    }
  }

  skipNull: boolean
  skipEmpty: boolean
  visible: boolean
  table: [string, string]
  descricoes: object = {I: 'Criado', U: 'Atualizado', D: 'Deletado'}
  dateFormat: string
  nome: string
  columns: ColumnConfig[] = []
  _columns: ColumnConfig[] = []
  children: HistoricoConfig[] = []
  _children: HistoricoConfig[] = []

  indexarColuns(){
    this.columns.forEach(({column, visible = true}) => this.showHideColumn(column, visible))
    this.children.forEach(child => child.indexarColuns())
    this._children.forEach(child => child.indexarColuns())
  }

  showHideChildren(name: string, visible: boolean){
    const children = this.deleteChildren(visible ? this._children : this.children, name)
    if(children){
      visible ? this.children.push(children) : this._children.push(children)
    }
    this.order()
  }

  deleteChildren(children: HistoricoConfig[], childName: string): HistoricoConfig {
    const index = children.findIndex(({table:[name]}) => name == childName)
    return index > -1 ? children.splice(index, 1)[0] : undefined
  }

  showHideColumn(name: string, visible: boolean){
    const column = this.deleteColumn(visible ? this._columns : this.columns, name)
    if(column){
      visible ? this.columns.push(column) : this._columns.push(column)
    }
    this.order()
  }

  deleteColumn(columns: ColumnConfig[], name: string): ColumnConfig {
    const index = columns.findIndex(({column}) => name == column)
    return index > -1 ? columns.splice(index, 1)[0] : undefined
  }

  setVisible(visible: boolean){
    this.visible = visible
    this.children.forEach(config => config.setVisible(visible))
    this._children.forEach(config => config.setVisible(visible))
  }

  order(){
    this.orderColumns()
    this.orderChildrens()
  }

  orderColumns() {
    this.columns = this.columns.sort(ColumnConfig.compareSort)
  }

  orderChildrens() {
    this.children = this.children.sort(this.compareSort)
  }

  compareSort({table:[,l1]}: HistoricoConfig, {table:[,l2]}: HistoricoConfig): number {
    return l1.toLowerCase().localeCompare(l2.toLowerCase())
  }

  setUniqueColumn(column: string){
    let indexColumn = this.columns.findIndex(({ column: col }) => col == column)
    if(indexColumn > -1){
      this.columns = this.columns.slice(indexColumn, indexColumn + 1)
      this._columns = []
      this.children = []
      this._children = []
      return
    }
    let index_Column = this._columns.findIndex(({ column: col }) => col == column)
    if(index_Column > -1){
      this._columns = this.columns.slice(index_Column, index_Column + 1)
      this.columns = []
      this.children = []
      this._children = []
      return
    }
    let indexChildren = this.children.findIndex(({ table: [col] }) => col == column)
    if(indexChildren > -1){
      this.children = this.children.slice(indexChildren, indexChildren + 1)
      this.columns = []
      this._columns = []
      this._children = []
      return
    }
    let index_Children = this._children.findIndex(({ table: [col] }) => col == column)
    if(index_Children > -1){
      this._children = this._children.slice(index_Children, index_Children + 1)
      this.columns = []
      this._columns = []
      this.children = []
      return
    }
  }

  toogleVisible(){
    this.visible = !(this.visible || !('visible' in this))
  }

}
