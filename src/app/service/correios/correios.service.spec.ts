import { CorreiosService } from './correios.service';
import { TestBed, inject } from '@angular/core/testing';

describe('CorreiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorreiosService]
    });
  });

  it('should be created', inject([CorreiosService], (service: CorreiosService) => {
    expect(service).toBeTruthy();
  }));
});
