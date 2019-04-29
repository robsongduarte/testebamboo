import { Correio } from './../../model/correio';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  private url: string = environment.url_correios;

  private readonly API = this.url;


  constructor(private http: HttpClient) {}

  buscarCep(cep: string) {
    return this.http.get<Correio>(this.API.concat(cep + '/json/'));
  }
}
