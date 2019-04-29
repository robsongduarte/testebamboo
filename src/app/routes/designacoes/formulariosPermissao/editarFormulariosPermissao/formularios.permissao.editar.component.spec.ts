import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosPermissaoEditarComponent } from './formularios.permissao.editar.component';

describe('FormularioPermissaoEditarComponent', () => {
  let component: FormulariosPermissaoEditarComponent;
  let fixture: ComponentFixture<FormulariosPermissaoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosPermissaoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosPermissaoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
