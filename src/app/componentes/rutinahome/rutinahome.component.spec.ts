import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinahomeComponent } from './rutinahome.component';

describe('RutinahomeComponent', () => {
  let component: RutinahomeComponent;
  let fixture: ComponentFixture<RutinahomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutinahomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
