import { FormularioPermissao } from './../../model/formularioPermissao';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FormularioPermissaoService {

  private url: string = environment.url_designacoes;

  private readonly API = this.url+'/api/govc/v1/formulariosPermissao/';


  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  allByFormulariosPermissao(cdEmpresa: string, cdEmitente: string, numeroDocumento: string,
                            status: string, nmDesignado: string): Observable<FormularioPermissao[]> {
    return this.http.get<FormularioPermissao[]>(
      this.API.concat('find-formularios-permissao/empresa/'+cdEmpresa+'/emitente/'+cdEmitente+'/documento/'+numeroDocumento+
                      '/status/'+status+'/designado/'+nmDesignado))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

}
