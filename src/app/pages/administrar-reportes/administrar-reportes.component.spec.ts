import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarReportesComponent } from './administrar-reportes.component';

describe('IconsComponent', () => {
  let component: AdministrarReportesComponent;
  let fixture: ComponentFixture<AdministrarReportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarReportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
