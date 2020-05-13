import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSeatsComponent } from './seats.component';

describe('SeatsComponent', () => {
  let component: FlightSeatsComponent;
  let fixture: ComponentFixture<FlightSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
