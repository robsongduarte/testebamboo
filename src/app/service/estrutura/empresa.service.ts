import { EmpresaNiveis } from './../../model/empresa.niveis';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { Empresa } from '../../model/empresa';
import { environment } from '../../../environments/environment';
import { long } from 'aws-sdk/clients/cloudfront';
import { Auditoria } from '../../shared/components/historico/model/auditoria.model'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url: string = environment.url_estrutura;

  private readonly API = this.url+'/api/govc/v1/empresas/';

  constructor(private http: HttpClient) {}

  all(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API).pipe(
      map((result:any)=>{
        if(result.page.totalElements == 0) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  findById(id: number) : Observable<Empresa> {
    return this.http.get<Empresa>(
      this.API.concat(id.toString()))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result.empresa;
      }));
  }

  findByName(nmEmpresa: String): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API.concat('find?name=' + nmEmpresa)).pipe(
      map((result:any)=>{
        if(result.page.totalElements == 0) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  allByEmpresas(nmEmpresa: string, nmSigla: string, tipoEmpresa: string,
    situacao: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(
      this.API.concat('find-empresas/empresa/'+nmEmpresa+'/sigla/'+nmSigla+'/tipo/'+tipoEmpresa+
                      '/situacao/'+situacao))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  allByEmpresaControladora(cdEmpresa: long): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(
      this.API.concat('/find-empresa-controladora/cdEmpresa/'+cdEmpresa))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  save(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.API, empresa, httpOptions)
      .pipe(map((result:Empresa)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findAuditoria(table: string, idColumn: string, idValue: string): Observable<Auditoria[]> {
    return this.http.post<Auditoria[]>(`${this.API}auditoria`, {
      table,
      idColumn,
      idValue,
      children: [{
        table: 'govc_localidade',
        columnParent: 'cd_empresa',
        columnChildren: 'cd_empresa'
      },
      {
        table: 'govc_empresa_anexo',
        columnParent: 'cd_empresa',
        columnChildren: 'cd_empresa'
      }]
    })
  }

  findEmpresasFilhaByEmpresaPaiWithLevels(cdEmpresa: long): Observable<EmpresaNiveis[]> {
    return this.http.get<EmpresaNiveis[]>(
      this.API.concat('/find/empresas-filhas-withlevel/'+cdEmpresa))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

}
