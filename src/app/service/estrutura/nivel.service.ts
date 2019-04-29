import { OrganogramaNiveis } from './../../model/organograma.niveis';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Nivel } from '../../model/nivel';
import { environment } from '../../../environments/environment';
import { EstruturaNiveis } from '../../model/estruturaNiveis';
import { Auditoria } from '../../shared/components/historico/model/auditoria.model'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  private url: string = environment.url_estrutura;

  private readonly API = this.url+'/api/govc/v1/niveis/';

  constructor(private http: HttpClient) {}

  allByEmpresa(cdEmpresa: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.API.concat('find/empresa/' + cdEmpresa)).pipe(
      map((result:any)=>{
        if(result.page.totalElements == 0) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  findById(cdNivel: string): Observable<Nivel> {
    return this.http.get<Nivel[]>(this.API.concat(cdNivel)).pipe(
      map((result:Nivel)=>{
        return result;
      }));
  }

  findNivelByPaiAndEmpresaClean(cdEmpresa: number): Observable<OrganogramaNiveis[]> {
    return this.http.get<OrganogramaNiveis[]>(
      this.API.concat('/find/nivel-pai/empresa/'+cdEmpresa))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findNivelByEmpresa(cdEmpresa: number, flAtivo: boolean, dtVigenciaInicio: string, dtVigenciaFim: string)
    : Observable<EstruturaNiveis[]> {
    return this.http.get<EstruturaNiveis[]>(
      this.API.concat('/find/nivel/empresa/' + cdEmpresa + '/ativo/' + flAtivo +
                      '/dataInicio/' + dtVigenciaInicio + '/dataFim/' + dtVigenciaFim))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findNivelByEstrutura(cdNivel: number, adicionarEstrutura: number): Observable<any> {
    return this.http.get<any>(
      this.API.concat('/find/estrutura/nivel/'+cdNivel+'/adicionarEstrutura/'+adicionarEstrutura))
      .pipe(map((result:any[])=>{
        if(result == null) {
          return null;
        }
        return result[0].estrutura;
      }));
  }

  save(nivel: Nivel): Observable<Nivel> {
    return this.http.post<Nivel>(this.API, nivel, httpOptions)
      .pipe(map((result:Nivel)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findAuditoria(table: string, idColumn: string, idValue: string): Observable<Auditoria[]> {
    const children = [{
      table: 'govc_nivel_anexo',
      columnParent: 'cd_nivel',
      columnChildren: 'cd_nivel'
    }]
    return this.http.post<Auditoria[]>(`${this.API}auditoria`, { table, idColumn, idValue, children })
  }

}
