import { Cargo } from './../../model/cargo';
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
export class CargoService {

  private url: string = environment.url_estrutura;

  private readonly API = this.url+'/api/govc/v1/cargos/';

  constructor(private http: HttpClient) {}

  save(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.API, cargo, httpOptions)
      .pipe(map((result:Cargo)=>{
        if(result == null) {
          return null;
        }
        return result;
      }));
  }

  findAllByStatus(status: boolean): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(
      this.API.concat('find/status/' + status))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  findCargos(nmCargo: string, status: boolean): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(
      this.API.concat('/find/cargo/' + nmCargo + '/status/' + status))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result._embedded.content;
      }));
  }

  findById(id: number) : Observable<Cargo> {
    return this.http.get<Cargo>(
      this.API.concat(id.toString()))
      .pipe(map((result:any)=>{
        if(result == null) {
          return null;
        }
        return result.cargo;
      }));
  }

}
