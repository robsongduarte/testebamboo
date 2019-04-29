import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'
import { ColumnConfig } from '../../../../../shared/components/historico/model/column-config.model'


// Definicao dos filhos
let children = [
  new HistoricoConfig({
    visible: false,
    skipNull: true,
    skipEmpty: false,
    table: ['govc_designacao_nivel', 'Níveis'],
    columns: [
      new ColumnConfig({ column: 'cd_nivel',           label: 'Nível',      type: 'string' }),
      new ColumnConfig({ column: 'cd_designacao',      label: 'Designação', type: 'string' }),
    ]
  })
]

// Definicao das colunas
let columns = [
  new ColumnConfig({ column: 'cd_designacao',            label: 'código',                type: 'string'}),
  new ColumnConfig({ column: 'cd_matricula',             label: 'matrícula',             type: 'string'}),
  new ColumnConfig({ column: 'cd_matricula_substituido', label: 'matrícula substituído', type: 'string'}),
  new ColumnConfig({ column: 'cd_tipo_designacao',       label: 'tipo de designação',    type: 'string'}),
  new ColumnConfig({ column: 'ds_cargo',                 label: 'cargo',                 type: 'string'}),
  new ColumnConfig({ column: 'ds_cargo_substituido',     label: 'cargo substituído',     type: 'string'}),
  new ColumnConfig({ column: 'ds_observacao',            label: 'observação',            type: 'string'}),
  new ColumnConfig({ column: 'ds_titulo',                label: 'título',                type: 'string'}),
  new ColumnConfig({ column: 'ds_titulo_substituido',    label: 'título Substituído',    type: 'string'}),
  new ColumnConfig({ column: 'email',                    label: 'email',                 type: 'string'}),
  new ColumnConfig({ column: 'fl_contador',              label: 'contador',              type: 'boolean', booleanLabel: ['Sim', 'Não']}),
  new ColumnConfig({ column: 'nm_designado',             label: 'nome',                  type: 'string'}),
  new ColumnConfig({ column: 'nm_substituido',           label: 'nome substituído',      type: 'string'}),
  new ColumnConfig({ column: 'nr_crc',                   label: 'n° CRC',                type: 'string'}),
]

// Definicao principal
export let historicoConfig = new HistoricoConfig({
  skipNull: true,
  skipEmpty: false,
  visible: false,
  table: ['govc_designacao', 'Designações'],
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
