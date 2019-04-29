import { AbstractControl, ValidatorFn } from '@angular/forms';

export class DateRangeValidator {
  static dataInicioMaior(inicio: string, fim: string): ValidatorFn {
    return (group: AbstractControl): {[key: string]: boolean} => {
      const inicioVigencia = group.get(inicio)
      const finalVigencia = group.get(fim)
  
      if(!inicioVigencia.value || !finalVigencia.value){
        return undefined
      }
      
      if(new Date(inicioVigencia.value) > new Date(finalVigencia.value)){
        return { dataInicioMaior: true }
      }
  
      return undefined
    }
  }

}
