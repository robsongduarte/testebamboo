"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var historico_config_model_1 = require("../../../../../shared/components/historico/model/historico-config.model");
var column_config_model_1 = require("../../../../../shared/components/historico/model/column-config.model");
// Definicao dos filhos
var children = [
    new historico_config_model_1.HistoricoConfig({
        visible: false,
        skipNull: true,
        skipEmpty: false,
        table: ['govc_designacao_nivel', 'Níveis'],
        columns: [
            new column_config_model_1.ColumnConfig({ column: 'cd_nivel', label: 'Nível', type: 'string' }),
            new column_config_model_1.ColumnConfig({ column: 'cd_designacao', label: 'Designação', type: 'string' }),
        ]
    })
];
// Definicao das colunas
var columns = [
    new column_config_model_1.ColumnConfig({ column: 'cd_designacao', label: 'código', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'cd_matricula', label: 'matrícula', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'cd_matricula_substituido', label: 'matrícula substituído', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'cd_tipo_designacao', label: 'tipo de designação', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'ds_cargo', label: 'cargo', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'ds_cargo_substituido', label: 'cargo substituído', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'ds_observacao', label: 'observação', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'ds_titulo', label: 'título', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'ds_titulo_substituido', label: 'título Substituído', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'email', label: 'email', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'fl_contador', label: 'contador', type: 'boolean', booleanLabel: ['Sim', 'Não'] }),
    new column_config_model_1.ColumnConfig({ column: 'nm_designado', label: 'nome', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'nm_substituido', label: 'nome substituído', type: 'string' }),
    new column_config_model_1.ColumnConfig({ column: 'nr_crc', label: 'n° CRC', type: 'string' }),
];
// Definicao principal
exports.historicoConfig = new historico_config_model_1.HistoricoConfig({
    skipNull: true,
    skipEmpty: false,
    visible: false,
    table: ['govc_designacao', 'Designações'],
    descricoes: {
        I: 'Criado',
        U: 'Atualizado',
        D: 'Apagado'
    },
    dateFormat: 'hh:mm, DD MMM YYYY',
    nome: 'user_create',
    columns: columns,
    children: children
});
//# sourceMappingURL=historico.config.js.map