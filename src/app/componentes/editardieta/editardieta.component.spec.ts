import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardietaComponent } from './editardieta.component';

describe('EditardietaComponent', () => {
  let component: EditardietaComponent;
  let fixture: ComponentFixture<EditardietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditardietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
