import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaejerciciosComponent } from './consultaejercicios.component';

describe('ConsultaejerciciosComponent', () => {
  let component: ConsultaejerciciosComponent;
  let fixture: ComponentFixture<ConsultaejerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaejerciciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaejerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
