import { AnexosNivelComponent } from './anexos/anexos.nivel.component';
import { NiveisIncluirComponent } from './niveis.incluir.component';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { TabsModule } from 'ngx-tabset';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSelectModule } from 'ngx-select-ex'
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxCurrencyModule } from "ngx-currency";
import { TreeModule } from 'angular-tree-component';
import { HistoricoEstruturaComponent } from './historico-estrutura/historico-estrutura.component'

const routes: Routes = [
  { path: '', component: NiveisIncluirComponent },
  { path: 'historico/:column', component: HistoricoEstruturaComponent },
  { path: 'historico', component: HistoricoEstruturaComponent },
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
    NgxCurrencyModule,
    TreeModule.forRoot()
  ],
  declarations: [
  	NiveisIncluirComponent,
    HistoricoEstruturaComponent,
    AnexosNivelComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [DatePipe]
})
export class NiveisIncluirModule { }
