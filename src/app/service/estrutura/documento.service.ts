import { Documento } from './../../model/documento';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  private url: string = environment.url_designacoes;

  private readonly API = this.url+'/api/govc/v1/documentos/';

  constructor(private http: HttpClient) {}

  save(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(this.API, documento, httpOptions)
      .pipe(map((result:Documento)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findById(id: number) : Observable<Documento> {
    return this.http.get<Documento>(
      this.API.concat(id.toString()))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result.documento;
      }));
  }

  delete(cdDocumento: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API}/${cdDocumento}`);
  }

}
