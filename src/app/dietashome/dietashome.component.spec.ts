import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietashomeComponent } from './dietashome.component';

describe('DietashomeComponent', () => {
  let component: DietashomeComponent;
  let fixture: ComponentFixture<DietashomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietashomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietashomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
