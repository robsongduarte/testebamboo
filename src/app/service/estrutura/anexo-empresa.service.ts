import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs/index'
import { EmpresaAnexo } from '../../model/empresaAnexo'
import { Unit } from '../../model/unit.dto'
import { Pair } from '../../model/pair.dto'

@Injectable({
  providedIn: 'root'
})
export class AnexoEmpresaService {

  private url: string = environment.url_estrutura;

  private readonly API = this.url+'/api/govc/v1/empresaAnexos';

  constructor(private http: HttpClient) {}

  download(cdAnexo: number): Observable<Pair> {
    return this.http.get<Pair>(`${this.API}/downloadFile/${cdAnexo}`)
  }

  deleteFile(cdAnexo: number): Observable<Unit> {
    return this.http.delete<Unit>(`${this.API}/deleteFile/${cdAnexo}`)
  }

  delete(cdAnexo: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API}/${cdAnexo}`)
  }

  findAllByEmpresa(cdEmpresa: number): Observable<EmpresaAnexo[]> {
    return this.http.get<EmpresaAnexo[]>(`${this.API}/findAll/${cdEmpresa}`)
  }

  save(anexo: EmpresaAnexo): Observable<Unit> {
    return this.http.post<Unit>(`${this.API}`, anexo)
  }

  upload(arquivo: File): Observable<Unit> {
    let formData: FormData = new FormData()
    formData.append('file', arquivo)
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    })
    return this.http.post<Unit>(`${this.API}/uploadFile`, formData, { headers })
  }
}
