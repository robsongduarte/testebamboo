import { NgxMaskModule } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular/main';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SharedModule } from '../../shared/shared.module';
import { EmpresasComponent } from './empresas/empresas.component';
import { OrganogramaEmpresaComponent } from './organogramaEmpresas/organograma.empresa.component';
import { NiveisComponent } from './niveis/niveis.component';
import { TipoNiveisComponent } from './tipo-niveis/tipo-niveis.component'
import { CargosComponent } from './cargos/cargos.component';

const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'niveis', component: NiveisComponent },
  { path: 'tiponiveis', component: TipoNiveisComponent },
  { path: 'cargos', component: CargosComponent },
  { path: 'organogramaEmpresas/:cdEmpresaNivel/:carregarOrganogramaNivel', component: OrganogramaEmpresaComponent },
  { path: 'tiponiveis-incluir/:id', loadChildren: './tipo-niveis/incluir/incluir-tipo-nivel.module#IncluirTipoNivelModule' },
  { path: 'tiponiveis-incluir', loadChildren: './tipo-niveis/incluir/incluir-tipo-nivel.module#IncluirTipoNivelModule' },
  { path: 'niveis-incluir/:id/:organograma', loadChildren: './niveis/incluirNiveis/niveis.incluir.module#NiveisIncluirModule' },
  { path: 'niveis-incluir', loadChildren: './niveis/incluirNiveis/niveis.incluir.module#NiveisIncluirModule' },
  { path: 'empresas-incluir/:id/:organograma', loadChildren: './empresas/incluirEmpresas/empresas.incluir.module#EmpresasIncluirModule' },
  { path: 'cargos-incluir/:id', loadChildren: './cargos/incluir/incluir.cargo.module#IncluirCargoModule' },
  { path: 'cargos-incluir', loadChildren: './cargos/incluir/incluir.cargo.module#IncluirCargoModule' }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxSelectModule,
    AgGridModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FilterPipeModule,
    Ng2SearchPipeModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    EmpresasComponent,
    OrganogramaEmpresaComponent,
    NiveisComponent,
    TipoNiveisComponent,
    CargosComponent
  ],
  exports: [
    RouterModule
  ]
})
export class EstruturaModule { }
