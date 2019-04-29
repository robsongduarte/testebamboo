"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layout_component_1 = require("../layout/layout.component");
var lock_component_1 = require("./pages/lock/lock.component");
var error404_component_1 = require("./pages/error404/error404.component");
var error500_component_1 = require("./pages/error500/error500.component");
exports.routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            //Designações
            { path: 'designacoes', loadChildren: './designacoes/designacoes.module#DesignacoesModule' },
            { path: 'editar-formularios-permissao/:id', loadChildren: './designacoes/formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.module#FormulariosPermissaoEditarModule' },
            //Estrutura
            { path: 'estrutura', loadChildren: './estrutura/estrutura.module#EstruturaModule' },
            { path: 'empresas-incluir/:id/:organograma', loadChildren: './estrutura/empresas/incluirEmpresas/empresas.incluir.module#EmpresasIncluirModule' },
            { path: 'niveis-incluir/:id', loadChildren: './estrutura/niveis/incluirNiveis/niveis.incluir.module#NiveisIncluirModule' }
        ]
    },
    // Not lazy-loaded routes
    { path: 'lock', component: lock_component_1.LockComponent },
    { path: '404', component: error404_component_1.Error404Component },
    { path: '500', component: error500_component_1.Error500Component },
    // Not found
    { path: '**', redirectTo: 'home' }
];
//# sourceMappingURL=routes.js.map