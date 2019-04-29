import { TestBed } from '@angular/core/testing';

import { AnexoEmpresaService } from './anexo-empresa.service';

describe('AnexoEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnexoEmpresaService = TestBed.get(AnexoEmpresaService);
    expect(service).toBeTruthy();
  });
});
