import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { cloneDeep } from 'lodash'

import { historicoConfig } from './historico.config'
import { DesignacaoService } from '../../../../../service/designacoes/designacao.service'
import { Auditoria } from '../../../../../shared/components/historico/model/auditoria.model'
import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'

@Component({
  selector: 'app-historico-formularios-permissao',
  templateUrl: './historico-formularios-permissao.component.html'
})
export class HistoricoFormulariosPermissaoComponent implements OnInit {

  auditorias: Auditoria[] = []
  config: HistoricoConfig
  column: string
  lastUrl: string

  constructor(private activatedRoute: ActivatedRoute,
              private location: Location,
              private designacaoService: DesignacaoService) { }

  ngOnInit() {
    this.column = this.activatedRoute.snapshot.paramMap.get('column')

    const id = ['cd_designacao', this.activatedRoute.parent.snapshot.params['id']]
    this.designacaoService.findAuditoria(historicoConfig.table[0], id[0], id[1])
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
    if(window.history.length > 1){
      this.location.back()
    }
  }

}
