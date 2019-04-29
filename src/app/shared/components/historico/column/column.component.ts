import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core'
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common'
import { trigger, state, style, animate, transition } from '@angular/animations'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { ColumnValue } from '../model/column-value.model'
import { ColumnConfig } from '../model/column-config.model'
import { ModalComponent } from '../modal/modal.component'

@Component({
  selector: '[app-column]',
  templateUrl: './column.component.html',
  animations: [
    trigger('toggleColumn', [
      state('hidden', style({
        opacity: 0
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden => visible', animate('1000ms 0s ease-in-out'))
    ])
  ]
})
export class ColumnComponent implements OnInit {

  @Input() column: ColumnValue = new ColumnValue({})

  columnState = 'hidden'

  constructor(
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit() {
    this.exibir()
  }

  abrirModal(value: string){
    const modal = this.modalService.open(ModalComponent, { windowClass: 'modal-xg' })
    modal.componentInstance.title = this.column.config.label
    modal.componentInstance.older = value
  }

  isHtml(): boolean {
    try{
      return this.column.config.type === 'html'
    }catch(e){
      return false
    }
  }

  getLabel(): string {
    try{
      const { config = new ColumnConfig({}) } = this.column
      return config.label
    }catch(e){
      return ''
    }
  }

  exibir() {
    setTimeout(() => {
      this.columnState = this.isVisible() ? 'visible' : 'hidden'
    }, 0)
  }

  isVisible(): boolean {
    try{
      const { children, auditoria, config } = this.column
      if(children){
        return children && children.length > 0
      }
      if(auditoria && config){
        const { column, id } = config
        const { dadosNew = {}, dadosOld = {} } = auditoria
        return auditoria.update() && column in dadosNew || id ||
                (auditoria.insert() || auditoria.delete()) && column in dadosOld
      }
    }catch(e){
      console.log('Erro ao exibir coluna: exibir() ', this.column, this.constructor.name)
    }
    return false
  }

  toogleColumns(){
    this.column.visible = !this.column.visible
    if(this.column.children){
      this.column.children.map(column => column[1].visible = this.column.visible)
    }
  }

  update(): boolean{
    try{
      return this.column.auditoria.acao == 'U'
    }catch(e){
      console.log('Erro ao exibir coluna: update() ', this.column, this.constructor.name)
    }
    return false
  }

  isNewer(): boolean{
    const { auditoria, config } = this.column
    if(auditoria && config){
      const { column } = config
      const { dadosNew = {} } = auditoria
      return auditoria.update() && column in dadosNew
    }
    return false
  }

  older(): string {
    const { auditoria, config: {column} } = this.column
    const { dadosOld: {[column]: older} } = auditoria
    return this.format(older)
  }

  newer(): string {
    const { auditoria, config: { column } } = this.column
    const { dadosNew = {} } = auditoria
    const { [column]: newer } = dadosNew
    return this.format(newer)
  }

  format(valor: string): string {
    if(valor === null){
      return 'NULL'
    }
    if(valor == undefined || valor.trim() == ''){
      return ''
    }
    return this.formatType(valor, this.column.config)
  }

  formatType(value: string, columnConfig: ColumnConfig): string {
    switch(columnConfig.type){
      case 'boolean':
        return this.formatBoolean(value, columnConfig.booleanLabel)
      case 'date':
        return this.formatDate(value, columnConfig.formatDate)
      case 'number':
        return this.formatNumber(value, columnConfig.casasDecimais, columnConfig.currency)
      case 'html':
          return value
      default:
        if(columnConfig.funcoes && columnConfig.funcoes.indexOf('substring') > -1){
          const index = columnConfig.funcoes.indexOf('substring')
          const indexEnd = columnConfig.funcoes.indexOf(';', index)
          const substring = columnConfig.funcoes.substring(index, indexEnd > -1 ? indexEnd : columnConfig.funcoes.length)
          const [,param] = substring.split(':')
          return value.substring(value.indexOf(param) + 1)
        }
        return value
    }
  }

  formatBoolean(value: string, labels = ['Verdadeiro', 'Falso']): string {
    return labels[+(!!(value.toLowerCase().startsWith('f')))]
  }

  formatDate(value: string, format = 'medium'): string {
    return this.datePipe.transform(new Date(value), format, this.locale)
  }

  formatNumber(value: string, casasDecimais: number, currency: boolean = false): string {
    const numberInfo = `1.${this.casasDecimais(casasDecimais)[0]}-${this.casasDecimais(casasDecimais)[1]}`
    if(currency){
      return this.currencyPipe.transform(value, '', 'R$', numberInfo, this.locale)
    }
    return this.decimalPipe.transform(value, numberInfo, this.locale)
  }

  casasDecimais(casasDecimais: number): [number, number] {
    return [casasDecimais | 0, (casasDecimais | 0) + 2]
  }

}
