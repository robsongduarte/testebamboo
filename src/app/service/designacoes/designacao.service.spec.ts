import { TestBed, inject } from '@angular/core/testing';

import { DesignacaoService } from './designacao.service';

describe('DesignacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignacaoService]
    });
  });

  it('should be created', inject([DesignacaoService], (service: DesignacaoService) => {
    expect(service).toBeTruthy();
  }));
});
