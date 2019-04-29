import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { EmpresasIncluirComponent } from './empresas.incluir.component';
import {TabsModule} from 'ngx-tabset';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSelectModule } from 'ngx-select-ex'
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxMaskModule} from 'ngx-mask';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxCurrencyModule } from "ngx-currency";
import { HistoricoEmpresaComponent } from './historico-empresa/historico-empresa.component'
import { AnexosComponent } from './anexos/anexos.component'


const routes: Routes = [
  { path: '', component: EmpresasIncluirComponent },
  { path: 'historico/:column', component: HistoricoEmpresaComponent },
  { path: 'historico', component: HistoricoEmpresaComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
    NgxSpinnerModule,
    NgxSelectModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    FilterPipeModule,
    NgxCurrencyModule
  ],
  declarations: [
    EmpresasIncluirComponent,
    HistoricoEmpresaComponent,
    AnexosComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [DatePipe]
})
export class EmpresasIncluirModule { }
