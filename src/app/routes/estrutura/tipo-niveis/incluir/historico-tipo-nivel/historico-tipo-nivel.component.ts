import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { cloneDeep } from 'lodash'

import { historicoConfig } from './historico.config'
import { TipoNivelService } from '../../../../../service/estrutura/tipo-nivel.service'
import { Auditoria } from '../../../../../shared/components/historico/model/auditoria.model'
import { HistoricoConfig } from '../../../../../shared/components/historico/model/historico-config.model'

@Component({
  selector: 'app-historico-tipo-nivel',
  templateUrl: './historico-tipo-nivel.component.html'
})
export class HistoricoTipoNivelComponent implements OnInit {

  auditorias: Auditoria[] = []
  config: HistoricoConfig
  column: string

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tipoNivelService: TipoNivelService) { }

  ngOnInit() {
    this.column = this.activatedRoute.snapshot.paramMap.get('column')

    const id = ['cd_tipo_nivel', this.activatedRoute.parent.snapshot.params['id']]
    this.tipoNivelService.findAuditoria(historicoConfig.table[0], id[0], id[1])
      .subscribe(auditorias => this.auditorias = this.transformAuditorias(auditorias))
  }

  transformAuditorias(auditorias: Auditoria[]): Auditoria[] {
    return auditorias
            .map(auditoria => new Auditoria(auditoria))
            .map(auditoria => {
              auditoria.dadosOld['teste'] = '<b>Teste HTML Jonas 123!</b>'
              if(auditoria.dadosNew == undefined){
                auditoria.dadosNew = {}
              }
              auditoria.dadosNew['teste'] = `
              <table style="width: 100%;">
                <tbody>
                  <tr>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                    <td style="width: 25.0000%;">
                      <br>
                    </td>
                  </tr>
                </tbody>
              </table>`
              return auditoria
            })
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
