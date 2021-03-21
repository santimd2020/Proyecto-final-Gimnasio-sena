import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarrutinasComponent } from './agregarrutinas.component';

describe('AgregarrutinasComponent', () => {
  let component: AgregarrutinasComponent;
  let fixture: ComponentFixture<AgregarrutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarrutinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarrutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
