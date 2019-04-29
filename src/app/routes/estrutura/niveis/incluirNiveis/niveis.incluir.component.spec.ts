import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveisIncluirComponent } from './niveis.incluir.component';

describe('NiveisIncluirComponent', () => {
  let component: NiveisIncluirComponent;
  let fixture: ComponentFixture<NiveisIncluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiveisIncluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiveisIncluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
