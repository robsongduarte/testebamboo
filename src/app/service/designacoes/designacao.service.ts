import { DesignacaoDTO } from './../../model/designacao.dto';
import { FormularioPermissaoNivelEmpresaDTO } from '../../model/formulario.permissao.nivel.empresa.dto';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Designado } from '../../model/designado';
import { Auditoria } from '../../shared/components/historico/model/auditoria.model'
import { designacaoNivelDTO } from '../../model/designacao.nivel.dto';
import { TitulosSubstituidosDTO } from '../../model/titulos.substituidos.dto';
import { SignatarioDTO } from '../../model/signatario.dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DesignacaoService {

  private url: string = environment.url_designacoes;

  private readonly API = this.url+'/api/govc/v1/designacoes/';


  constructor(private http: HttpClient) {}

    ngOnInit() {

    }

  list(termoBusca: string) {
    return this.http.get<Designado[]>(this.API.concat('find?name=' + termoBusca))
      .pipe(
        tap(console.log)
      );
  }

  allaByDesignadoAndEmpresaAndVigencia(nmDesignado: string, cdEmpresa: string, cdNivel: string,
      dtVigenciaInicial: string, dtVigenciaFinal: string): Observable<Designado[]> {
    return this.http.get<Designado[]>(
      this.API.concat('find-designados/designado/'+nmDesignado+'/empresa/'+cdEmpresa+'/nivel/'+cdNivel+
                      '/inicioVigencia/'+dtVigenciaInicial+'/finalVigencia/'+dtVigenciaFinal))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  findById(id: string) : Observable<Designado> {
    return this.http.get<Designado>(
      this.API.concat(id))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result.designacao;
      }));
  }

  save(designado: Designado): Observable<Designado> {
    return this.http.post<Designado>(this.API, designado);
  }

  findAuditoria(table: string, idColumn: string, idValue: string): Observable<Auditoria[]> {
    return this.http.post<Auditoria[]>(`${this.API}auditoria`, {
      table,
      idColumn,
      idValue,
      children: [{
        table: 'govc_designacao_nivel',
        columnParent: 'cd_designacao',
        columnChildren: 'cd_designacao'
      }]
    })
  }

  findByNivelId(idNivel: number) : Observable<designacaoNivelDTO[]> {
    return this.http.get<designacaoNivelDTO[]>(
      this.API.concat('/find/designacao-nivel/nivel/' + idNivel))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findDesignacaoByNmDesignacao(nmDesignado: String, cdEmpresa: number): Observable<DesignacaoDTO[]> {
    return this.http.get<DesignacaoDTO[]>(this.API.concat('find-designacao/designado/' + nmDesignado + '/empersa/' + cdEmpresa)).pipe(
      map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findFormularioPermissaoNivelEmpresa(nmDesignado: string, nmAbreviatura: string) : Observable<FormularioPermissaoNivelEmpresaDTO[]> {
    return this.http.get<FormularioPermissaoNivelEmpresaDTO[]>(
      this.API.concat('/find/designacao-formulario-nivel-empresa/designado/' + nmDesignado + '/abreviatura/' + nmAbreviatura))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findDescricaoTitulo(nmDesignado: string) : Observable<TitulosSubstituidosDTO[]> {
    return this.http.get<TitulosSubstituidosDTO[]>(
      this.API.concat('/find/designacao-descricao-titulo/designado/' + nmDesignado))
      .pipe(map((result:any[])=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findSignatarios(cdNivel: number, cdEmpresa: number) : Observable<SignatarioDTO[]> {
    return this.http.get<SignatarioDTO[]>(
      this.API.concat('/find/designacao-signatario/nivel/' + cdNivel + '/empresa/' + cdEmpresa))
      .pipe(map((result:any[])=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

}
