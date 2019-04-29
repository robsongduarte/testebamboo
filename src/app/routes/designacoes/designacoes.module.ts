import { DesignacoesTemporariasComponent } from './designacoesTemporarias/designacoes.temporarias.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular/main';
import { NgxSelectModule } from 'ngx-select-ex'
import { FormulariosPermissaoComponent } from './formulariosPermissao/formularios.permissao.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
  { path: 'formulariosPermissao', component: FormulariosPermissaoComponent },
  { path: 'designacoesTemporarias', component: DesignacoesTemporariasComponent },
  { path: 'editar-formularios-permissao/:id/:codigoNivel', loadChildren: './formulariosPermissao/editarFormulariosPermissao/formularios.permissao.editar.module#FormulariosPermissaoEditarModule'},
  { path: 'incluir-designacoes-temporarias/:id', loadChildren: './designacoesTemporarias/incluirDesignacoesTemporarias/designacoes.temporarias.incluir.module#DesignacoesTemporariasIncluirModule'},
  { path: 'incluir-designacoes-temporarias', loadChildren: './designacoesTemporarias/incluirDesignacoesTemporarias/designacoes.temporarias.incluir.module#DesignacoesTemporariasIncluirModule'}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxSelectModule,
    AgGridModule,
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  declarations: [
    FormulariosPermissaoComponent,
    DesignacoesTemporariasComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DesignacoesModule { }
