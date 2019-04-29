import { HistoricoConfig } from './historico-config.model'
import { ColumnConfig } from './column-config.model'

export class Auditoria {

  constructor(init?: Partial<Auditoria>){
    if(init){
      Object.assign(this, init)
    }
  }

  id: number
  schema: string
  table: string
  relid: number
  user: string
  timestampClk: number
  transacaoId: number
  aplicacao: string
  query: string
  acao: string
  dadosOld: object
  dadosNew: object
  statementOnly: boolean
  filhos: object

  isVisible(config: HistoricoConfig): boolean {
    const { columns, children, skipNull, skipEmpty } = config
    return this.hasColumns(columns, skipNull, skipEmpty) || this.hasChildrens(children)
  }

  hasChildrens(configs: HistoricoConfig[] = []): boolean {
    return this.filhos &&
            configs
            .filter(config => config != undefined)
            .filter(config => config.table[0] in this.filhos)
            .map(config => [this.filhos[config.table[0]], config])
            .map(config => {
              return config[0]
                      .map(auditoria => new Auditoria(auditoria).isVisible(config[1]))
                      .reduce((b1,b2) => b1 || b2, false)
            })
            .reduce((b1,b2) => b1 || b2, false)
  }

  hasColumns(columns: ColumnConfig[] = [], skipNull: boolean, skipEmpty: boolean): boolean {
    return !this.isEmpty() &&
              columns
              .filter(config => config != undefined)
              .map(config => config.column )
              .map(column => (this.update() && column in this.dadosNew) ||
                        ((this.insert() || this.delete()) && column in this.dadosOld &&
                        (!skipNull || this.dadosOld[column] != null) &&
                        (!skipEmpty || this.dadosOld[column])))
              .reduce((b1, b2) => b1 || b2, false)
  }

  isEmpty(): boolean {
    return !this.dadosOld || (!this.dadosNew && this.update())
  }

  insert(): boolean {
    return this.acao == 'I'
  }

  update(): boolean {
    return this.acao == 'U'
  }

  delete(): boolean {
    return this.acao == 'D'
  }

}
