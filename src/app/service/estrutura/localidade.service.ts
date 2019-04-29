import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Dominio } from '../../model/dominio';
import { Localidade } from '../../model/localidade';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocalidadeService {

  private url: string = environment.url_estrutura;

  private readonly API = this.url+'/api/govc/v1/localidades/';

  constructor(private http: HttpClient) {}

  allByEmpresa(cdEmpresa: number): Observable<Localidade[]> {
    return this.http.get<Localidade[]>(
      this.API.concat('/find/empresa/' + cdEmpresa))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

}
