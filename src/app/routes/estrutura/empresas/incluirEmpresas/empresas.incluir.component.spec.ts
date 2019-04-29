import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasIncluirComponent } from './empresas.incluir.component';

describe('EmpresasIncluirComponent', () => {
  let component: EmpresasIncluirComponent;
  let fixture: ComponentFixture<EmpresasIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
