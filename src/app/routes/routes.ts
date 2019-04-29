import { LayoutComponent } from '../layout/layout.component';

import { LockComponent } from './pages/lock/lock.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';

import { AuthGuardService } from '../guards/auth-guard.service';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            //Designações
            { path: 'designacoes', loadChildren: './designacoes/designacoes.module#DesignacoesModule'},
            //Estrutura
            { path: 'estrutura', loadChildren: './estrutura/estrutura.module#EstruturaModule'}
        ]
    },

    // Not lazy-loaded routes
    { path: 'lock', component: LockComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },

    // Not found
    { path: '**', redirectTo: 'home' }

];
