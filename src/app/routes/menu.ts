const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Estrutura = {
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
        },
        {
            text: 'Tipos de Níveis',
            link: '/estrutura/tiponiveis'
        },
        {
            text: 'Cargos',
            link: '/estrutura/cargos'
        }
    ]
};

const Designacao = {
    text: 'Designações',
    link: '/designacoes',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Formulários de Permissão',
            link: '/designacoes/formulariosPermissao'
        },
        {
            text: 'Designações Temporárias de Função (DTF)',
            link: '/designacoes/designacoesTemporarias'
        }
    ]
};



const headingMain = {
    text: '',
    heading: true
};

const headingComponents = {
    text: 'Components',
    heading: true
};

const headingMore = {
    text: 'More',
    heading: true
};

export const menu = [
    headingMain,
    Home,
    Estrutura,
    Designacao,

];
