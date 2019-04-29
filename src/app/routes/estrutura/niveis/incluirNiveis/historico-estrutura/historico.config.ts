import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'
import { ColumnConfig } from '../../../../../shared/components/historico/model/column-config.model'

let columnsChildrenAnexo = [
  new ColumnConfig({ column: 'nm_arquivo',             label: 'arquivo',            type: 'string',  funcoes: 'substring:-' }),
  new ColumnConfig({ column: 'date_create',            label: 'criação',            type: 'date',    formatDate: 'medium' }),
]

let children = [
  new HistoricoConfig({
    visible: false,
    skipNull: true,
    skipEmpty: false,
    table: ['govc_nivel_anexo', 'Anexos'],
    columns: columnsChildrenAnexo
  })
]

// Definicao das colunas
let columns = [
  new ColumnConfig({ column: 'cd_nivel',                  label: 'código',                type: 'number'}),
  new ColumnConfig({ column: 'nm_nivel',                  label: 'nome',                  type: 'string'}),
  new ColumnConfig({ column: 'nm_abreviatura',            label: 'sigla',                 type: 'string'}),
  new ColumnConfig({ column: 'dt_vigencia_inicio',        label: 'vigência inicial',      type: 'date', formatDate: 'medium', isTimestamp: false }),
  new ColumnConfig({ column: 'dt_vigencia_fim',           label: 'vigência final',        type: 'date', formatDate: 'medium', isTimestamp: false }),
  new ColumnConfig({ column: 'nr_centro_custo',           label: 'centro de custo',       type: 'number'}),
  new ColumnConfig({ column: 'cd_empresa',                label: 'empresa',               type: 'string'}),
  new ColumnConfig({ column: 'cd_tipo_nivel',             label: 'tipo de nível',         type: 'string'}),
  new ColumnConfig({ column: 'cd_nivel_pai',              label: 'estrutura',             type: 'string'}),
  new ColumnConfig({ column: 'cd_localidade',             label: 'localidade',            type: 'string'}),
]

// Definicao principal
export let historicoConfig = new HistoricoConfig({
  skipNull: true,
  skipEmpty: false,
  visible: false,
  table: ['govc_nivel', 'Níveis'],
  descricoes: {
    I:'Criado',
    U:'Atualizado',
    D:'Apagado'
  },
  dateFormat: 'hh:mm, DD MMM YYYY',
  nome: 'user_create',
  columns: columns,
  children: children
})
