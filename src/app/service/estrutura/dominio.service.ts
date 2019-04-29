import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Dominio } from '../../model/dominio';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DominioService {

  private url_estrutura: string = environment.url_estrutura;

  private url_designacoes: string = environment.url_designacoes;

  private readonly API_estrutura = this.url_estrutura+'/api/govc/v1/dominios/';

  private readonly API_designacoes = this.url_designacoes+'/api/govc/v1/dominios/';

  private api: string = null;

  constructor(private http: HttpClient) {}

  findByTipoOrderByNome(tipo: string, tipoServico: string): Observable<Dominio[]> {
    if (tipoServico == 'ESTRUTURA') {
      this.api = this.API_estrutura;
    } else {
      this.api = this.API_designacoes;
    }

    return this.http.get<Dominio[]>(      
      this.api.concat('tipoDominio/' + tipo))
      .pipe(map((result:any)=>{
        if(result == null || result == undefined) {
          return null;
        }
        return result._embedded.content;
      }));    
    
  }

  findById(id: number, tipoServico: string) : Observable<Dominio> {
    if (tipoServico == 'ESTRUTURA') {
      this.api = this.API_estrutura;
    } else {
      this.api = this.API_designacoes;
    }
    return this.http.get<Dominio>(
      this.api.concat(id.toString()))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result.dominio;
      }));
  }

  all(tipoServico: string): Observable<Dominio[]> {
    if (tipoServico == 'ESTRUTURA') {
      this.api = this.API_estrutura;
    } else {
      this.api = this.API_designacoes;
    }    
    return this.http.get<Dominio[]>(this.api).pipe(
      map((result:any)=>{
        if(result.page.totalElements == 0) {
          return null;
        }
        return result._embedded.content;
      }));
    
  }

  findDominiosCargosDisponiveis(tipoNorma: string, tipoServico: string): Observable<Dominio[]> {
    if (tipoServico == 'ESTRUTURA') {
      this.api = this.API_estrutura;
    } else {
      this.api = this.API_designacoes;
    }
    return this.http.get<Dominio[]>(this.api.concat('/find/dominios-cargos-disponiveis/tipo/' + tipoNorma)).pipe(
      map((result:any)=>{
        if(result.page.totalElements == 0) {
          return null;
        }
        return result._embedded.content;
      }));
  }

}
