import { DesignacoesTemporariasIncluirComponent } from './designacoes.temporarias.incluir.component';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSelectModule } from 'ngx-select-ex'
import {TabsModule} from 'ngx-tabset';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnexosIncluirDesignacoesComponent } from './anexos/anexos.incluir.designacoes.component'


const routes: Routes = [
  { path: '', component: DesignacoesTemporariasIncluirComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    NgxSpinnerModule,
    NgxSelectModule,
    NgxPaginationModule    
  ],
  declarations: [
    DesignacoesTemporariasIncluirComponent,
    AnexosIncluirDesignacoesComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [DatePipe]
})
export class DesignacoesTemporariasIncluirModule { }
