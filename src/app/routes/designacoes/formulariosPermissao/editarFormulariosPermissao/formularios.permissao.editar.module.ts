import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular/main';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxMaskModule} from 'ngx-mask';

import { FormulariosPermissaoEditarComponent } from './formularios.permissao.editar.component';
import { HistoricoFormulariosPermissaoComponent } from './historico-formularios-permissao/historico-formularios-permissao.component'
import { SharedModule } from '../../../../shared/shared.module';

const routes: Routes = [
  { path: '', component: FormulariosPermissaoEditarComponent },
  { path: 'historico/:column', component: HistoricoFormulariosPermissaoComponent },
  { path: 'historico', component: HistoricoFormulariosPermissaoComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxSelectModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    AgGridModule
  ],
  declarations: [
    FormulariosPermissaoEditarComponent,
    HistoricoFormulariosPermissaoComponent
  ],
  exports: [
    RouterModule
  ]
})
export class FormulariosPermissaoEditarModule { }
