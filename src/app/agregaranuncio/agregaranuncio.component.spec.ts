import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaranuncioComponent } from './agregaranuncio.component';

describe('AgregaranuncioComponent', () => {
  let component: AgregaranuncioComponent;
  let fixture: ComponentFixture<AgregaranuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaranuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaranuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
