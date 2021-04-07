import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarejercicioComponent } from './editarejercicio.component';

describe('EditarejercicioComponent', () => {
  let component: EditarejercicioComponent;
  let fixture: ComponentFixture<EditarejercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarejercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarejercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
