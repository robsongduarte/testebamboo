import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
  static dateValidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
      return { 'dateValidator': true };
    } 
    return null;
  }

  static dataInvalida(AC: AbstractControl) {
    if(AC.value != null && new Date(AC.value) < new Date('2000-01-01')){
      return { dataInvalida: true }
    } 
    return null;
  }

  static dataMenorHoje(AC: AbstractControl) {
    var dataHoje = new Date().toISOString().substr(0, 10);
    if(AC.value != null && new Date(AC.value.toString().substr(0, 10)) < new Date(dataHoje)){
      return { dataMenorHoje: true }
    } 
    return null;
  }
}
