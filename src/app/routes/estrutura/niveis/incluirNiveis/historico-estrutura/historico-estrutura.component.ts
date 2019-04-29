import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { cloneDeep } from 'lodash'

import { historicoConfig } from './historico.config'
import { NivelService } from '../../../../../service/estrutura/nivel.service'
import { Auditoria } from '../../../../../shared/components/historico/model/auditoria.model'
import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'


@Component({
  selector: 'app-historico-estrutura',
  templateUrl: './historico-estrutura.component.html'
})
export class HistoricoEstruturaComponent implements OnInit {

  auditorias: Auditoria[] = []
  config: HistoricoConfig
  column: string

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private nivelService: NivelService) { }

  ngOnInit() {
    this.column = this.activatedRoute.snapshot.paramMap.get('column')

    const id = ['cd_nivel', this.activatedRoute.parent.snapshot.params['id']]
    console.log(id, historicoConfig.table[0])
    this.nivelService.findAuditoria(historicoConfig.table[0], id[0], id[1])
      .subscribe(auditorias => this.auditorias = this.transformAuditorias(auditorias))
  }

  transformAuditorias(auditorias: Auditoria[]): Auditoria[] {
    return auditorias.map(auditoria => new Auditoria(auditoria))
  }

  getConfig(): HistoricoConfig {
    this.config = cloneDeep(historicoConfig)
    if(this.column){
      this.config.setUniqueColumn(this.column)
    }
    return this.config
  }

  goBack(){
    this.router.navigate([this.router.url.replace('/historico','')])
  }

}
