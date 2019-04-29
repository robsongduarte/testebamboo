import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'
import { ColumnConfig } from '../../../../../shared/components/historico/model/column-config.model'

let columnsChildrenAnexo = [
  new ColumnConfig({ column: 'nm_arquivo',             label: 'arquivo',            type: 'string',  funcoes: 'substring:-' }),
  new ColumnConfig({ column: 'date_create',            label: 'criação',            type: 'date',    formatDate: 'medium' }),
]

let columnsChildren = [
  new ColumnConfig({ column: 'cd_localidade',             label: 'código',              type: 'string' }),
  new ColumnConfig({ column: 'ds_localidade',             label: 'nome da localidade',  type: 'string', id: true }),
  new ColumnConfig({ column: 'dt_registro_nire',          label: 'data registro nire',  type: 'date',    formatDate: 'medium', isTimestamp: false }),
  new ColumnConfig({ column: 'fl_sede',                   label: 'sede',                type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
  new ColumnConfig({ column: 'nm_bairro',                 label: 'bairro/distrito',     type: 'string' }),
  new ColumnConfig({ column: 'nm_complemento',            label: 'complemento',         type: 'string' }),
  new ColumnConfig({ column: 'nm_endereco_rodape',        label: 'endereço rodapé',     type: 'string' }),
  new ColumnConfig({ column: 'nm_logradouro',             label: 'logradouro',          type: 'string' }),
  new ColumnConfig({ column: 'nm_municipio',              label: 'município',           type: 'string' }),
  new ColumnConfig({ column: 'nm_uf',                     label: 'UF',                  type: 'string' }),
  new ColumnConfig({ column: 'nr_caixa_postal',           label: 'caixa postal',        type: 'string' }),
  new ColumnConfig({ column: 'cnpj',                      label: 'CNPJ',                type: 'string' }),
  new ColumnConfig({ column: 'nr_insc_estadual',          label: 'ins. estadual',       type: 'string' }),
  new ColumnConfig({ column: 'nr_insc_municipal',         label: 'ins. municipal',      type: 'string' }),
  new ColumnConfig({ column: 'nr_logradouro',             label: 'número',              type: 'string' }),
  new ColumnConfig({ column: 'nr_telefone',               label: 'telefone',            type: 'string' }),
  new ColumnConfig({ column: 'fl_situacao_localidade',    label: 'situação',            type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
  new ColumnConfig({ column: 'nrnire',                    label: 'número nire',         type: 'string' }),
  new ColumnConfig({ column: 'vl_cep',                    label: 'CEP',                 type: 'string' }),
  new ColumnConfig({ column: 'date_create',               label: 'criação',             type: 'date',    formatDate: 'medium' }),
  new ColumnConfig({ column: 'user_create',               label: 'usuário criação',     type: 'string' }),
]

// Definicao dos filhos
let children = [
  new HistoricoConfig({
    visible: false,
    skipNull: true,
    skipEmpty: false,
    table: ['govc_localidade', 'Sede e filiais'],
    columns: columnsChildren
  }),
  new HistoricoConfig({
    visible: false,
    skipNull: true,
    skipEmpty: false,
    table: ['govc_empresa_anexo', 'Anexos'],
    columns: columnsChildrenAnexo
  })
]

// Definicao das colunas
let columns = [
  new ColumnConfig({ column: 'cd_empresa',                  label: 'código',                type: 'string'}),
  new ColumnConfig({ column: 'nm_empresa',                  label: 'nome',                  type: 'string'}),
  new ColumnConfig({ column: 'nm_sigla',                    label: 'sigla',                 type: 'string'}),
  new ColumnConfig({ column: 'nm_denominacao_social',       label: 'denominação social',    type: 'string'}),
  new ColumnConfig({ column: 'fl_ativo',                    label: 'situação',              type: 'boolean', booleanLabel: ['Sim', 'Não']}),
  new ColumnConfig({ column: 'nr_participacao_capital',     label: 'participação capital',  type: 'string'}),
  new ColumnConfig({ column: 'tipo_empresa',                label: 'tipo de empresa',       type: 'string'}),
  new ColumnConfig({ column: 'cd_tipo_norma',               label: 'tipo de norma',         type: 'string'}),
  new ColumnConfig({ column: 'cd_empresa_relacionada',      label: 'empresa controladora',  type: 'string'}),
  new ColumnConfig({ column: 'cd_empresa_ebs',              label: 'empresa EBS',           type: 'number'}),
]

// Definicao principal
export let historicoConfig = new HistoricoConfig({
  skipNull: true,
  skipEmpty: false,
  visible: false,
  table: ['govc_empresa', 'Empresas'],
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
