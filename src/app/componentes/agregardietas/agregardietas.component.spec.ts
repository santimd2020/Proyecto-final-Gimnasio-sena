import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregardietasComponent } from './agregardietas.component';

describe('AgregardietasComponent', () => {
  let component: AgregardietasComponent;
  let fixture: ComponentFixture<AgregardietasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregardietasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregardietasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
