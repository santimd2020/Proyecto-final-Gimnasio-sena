import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarrutinaComponent } from './editarrutina.component';

describe('EditarrutinaComponent', () => {
  let component: EditarrutinaComponent;
  let fixture: ComponentFixture<EditarrutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarrutinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarrutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
