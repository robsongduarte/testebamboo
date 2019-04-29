import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment'
import { TipoNivel } from '../../model/tipoNivel'
import { Auditoria } from '../../shared/components/historico/model/auditoria.model'

@Injectable({
  providedIn: 'root'
})
export class TipoNivelService {

  private readonly API = `${environment.url_estrutura}/api/govc/v1/tiponiveis`

  constructor(private http: HttpClient) {}

  findTipoNiveis(params?: any): Observable<TipoNivel[]> {
    return this.http.post<TipoNivel[]>(`${this.API}/findByParameters`, { params })
  }

  findById(id: number): Observable<TipoNivel> {
    return this.http.get<TipoNivel>(`${this.API}/${id}`)
  }

  save(tipoNivel: TipoNivel): Observable<TipoNivel> {
    return this.http.post<TipoNivel>(`${this.API}`, tipoNivel)
  }

  toogleAtivacao(tipoNivel: TipoNivel): Observable<TipoNivel> {
    return this.http.put<TipoNivel>(`${this.API}/toogleAtivacao`, tipoNivel)
  }

  toAssociate(tipoNivel: TipoNivel): Observable<TipoNivel[]> {
    return this.http.post<TipoNivel[]>(`${this.API}/toAssociate`, tipoNivel)
  }

  findAuditoria(table: string, idColumn: string, idValue: string): Observable<Auditoria[]> {
    const children = [{
        table: 'govc_tipo_nivel_rel',
        columnParent: 'cd_tipo_nivel',
        columnChildren: 'cd_tipo_nivel_filho'
    }]
    return this.http.post<Auditoria[]>(`${this.API}/auditoria`, { table, idColumn, idValue, children })
  }

}
