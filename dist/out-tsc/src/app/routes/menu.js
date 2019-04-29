"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};
var Estrutura = {
    text: 'Estrutura',
    link: '/estrutura',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Empresas',
            link: '/estrutura/empresas'
        },
        {
            text: 'Organograma de Empresas',
            link: '/estrutura/organogramaEmpresas/0/false'
        },
        {
            text: 'Níveis',
            link: '/estrutura/niveis'
        }
    ]
};
var Designacao = {
    text: 'Designações',
    link: '/designacoes',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Formulários de Permissão',
            link: '/designacoes/formulariosPermissao'
        }
    ]
};
var headingMain = {
    text: '',
    heading: true
};
var headingComponents = {
    text: 'Components',
    heading: true
};
var headingMore = {
    text: 'More',
    heading: true
};
exports.menu = [
    headingMain,
    Home,
    Estrutura,
    Designacao,
];
//# sourceMappingURL=menu.js.map