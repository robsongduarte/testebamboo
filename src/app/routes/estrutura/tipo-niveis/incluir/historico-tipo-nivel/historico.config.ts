import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'
import { ColumnConfig } from '../../../../../shared/components/historico/model/column-config.model'

let columnsChildren = [
  new ColumnConfig({ column: 'cd_tipo_nivel_pai',             label: 'tipo nível',              type: 'string' })
]

// Definicao dos filhos
let children = [
  new HistoricoConfig({
    visible: false,
    skipNull: true,
    skipEmpty: false,
    table: ['govc_tipo_nivel_rel', 'Incluir abaixo'],
    columns: columnsChildren
  })
]

// Definicao das colunas
let columns = [
  new ColumnConfig({ column: 'cd_tipo_nivel',       label: 'código',                type: 'number'}),
  new ColumnConfig({ column: 'nm_tipo_nivel',       label: 'nome',                  type: 'string'}),
  new ColumnConfig({ column: 'nm_abreviatura',      label: 'abreviatura',           type: 'string'}),
  new ColumnConfig({ column: 'fl_ativo',            label: 'situação',              type: 'boolean', booleanLabel: ['Ativa', 'Inativa']}),
  new ColumnConfig({ column: 'fl_centro_custo',     label: 'exige centro de custo', type: 'boolean', booleanLabel: ['Sim', 'Não']}),
  new ColumnConfig({ column: 'fl_formal',           label: 'tipo',                  type: 'boolean', booleanLabel: ['Jurídico/Contábil', 'RH/Administrativo']}),
  new ColumnConfig({ column: 'ds_tipo_nivel',       label: 'descrição',             type: 'string'}),
  new ColumnConfig({ column: 'teste',               label: 'teste',                 type: 'html'})
]

// Definicao principal
export let historicoConfig = new HistoricoConfig({
  skipNull: true,
  skipEmpty: false,
  visible: false,
  table: ['govc_tipo_nivel', 'Tipo de Nível'],
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
