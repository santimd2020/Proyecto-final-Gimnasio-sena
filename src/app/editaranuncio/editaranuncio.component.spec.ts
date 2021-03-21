import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaranuncioComponent } from './editaranuncio.component';

describe('EditaranuncioComponent', () => {
  let component: EditaranuncioComponent;
  let fixture: ComponentFixture<EditaranuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaranuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaranuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
