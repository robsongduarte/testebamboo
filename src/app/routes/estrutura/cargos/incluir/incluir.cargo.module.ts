import { IncluirCargoComponent } from './incluir.cargo.component';
import { DatePipe } from '@angular/common'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TabsModule } from 'ngx-tabset'
import { NgxSpinnerModule } from 'ngx-spinner'
import { NgxSelectModule } from 'ngx-select-ex'
import { NgxPaginationModule } from 'ngx-pagination'
import { NgxMaskModule } from 'ngx-mask'
import { FilterPipeModule } from 'ngx-filter-pipe'
import { NgxCurrencyModule } from 'ngx-currency'
import { TreeviewModule } from 'ngx-treeview'

import { SharedModule } from '../../../../shared/shared.module'

const routes: Routes = [
  { path: '', component: IncluirCargoComponent }
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
    TreeviewModule.forRoot()
  ],
  declarations: [
  	IncluirCargoComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DatePipe
  ]
})
export class IncluirCargoModule { }
