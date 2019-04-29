import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Dominio } from '../../model/dominio';
import { TipoNivel } from '../../model/tipoNivel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TipoNivelService {

  private url: string = environment.url_estrutura;

  private readonly API = this.url+'/api/govc/v1/tiponiveis/';

  constructor(private http: HttpClient) {
    console.log('TipoNivelService');
  }

  all(): Observable<TipoNivel[]> {
    return this.http.get<TipoNivel[]>(this.API).pipe(
      map((result:any)=>{
        if(result.page.totalElements == 0) {
          return null;
        }
        return result._embedded.content;
      }));
  }

}
