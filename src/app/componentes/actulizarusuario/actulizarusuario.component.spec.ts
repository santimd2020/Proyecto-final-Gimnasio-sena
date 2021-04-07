import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActulizarusuarioComponent } from './actulizarusuario.component';

describe('ActulizarusuarioComponent', () => {
  let component: ActulizarusuarioComponent;
  let fixture: ComponentFixture<ActulizarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActulizarusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActulizarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
