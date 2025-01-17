import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUsuariosComponent } from './gestionar-usuarios.component';

describe('TypographyComponent', () => {
  let component: GestionarUsuariosComponent;
  let fixture: ComponentFixture<GestionarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
