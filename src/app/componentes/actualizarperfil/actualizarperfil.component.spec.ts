import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarperfilComponent } from './actualizarperfil.component';

describe('ActualizarperfilComponent', () => {
  let component: ActualizarperfilComponent;
  let fixture: ComponentFixture<ActualizarperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarperfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
