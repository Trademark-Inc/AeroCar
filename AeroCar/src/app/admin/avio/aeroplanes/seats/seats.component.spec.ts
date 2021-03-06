import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioSeatsComponent } from './seats.component';

describe('SeatsComponent', () => {
  let component: AvioSeatsComponent;
  let fixture: ComponentFixture<AvioSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
