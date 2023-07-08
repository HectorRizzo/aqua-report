import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarMedidoresComponent } from './administrar-medidores.component';

describe('TableListComponent', () => {
  let component: AdministrarMedidoresComponent;
  let fixture: ComponentFixture<AdministrarMedidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarMedidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarMedidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
