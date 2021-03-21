import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarejercicioComponent } from './agregarejercicio.component';

describe('AgregarejercicioComponent', () => {
  let component: AgregarejercicioComponent;
  let fixture: ComponentFixture<AgregarejercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarejercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarejercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
