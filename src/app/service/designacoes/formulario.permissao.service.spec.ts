import { FormularioPermissaoService } from './formulario.permissao.service';
import { TestBed, inject } from '@angular/core/testing';

describe('FormularioPermissaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormularioPermissaoService]
    });
  });

  it('should be created', inject([FormularioPermissaoService], (service: FormularioPermissaoService) => {
    expect(service).toBeTruthy();
  }));
});
