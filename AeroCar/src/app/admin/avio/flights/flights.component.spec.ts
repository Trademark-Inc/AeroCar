import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioFlightsComponent } from './flights.component';

describe('FlightsComponent', () => {
  let component: AvioFlightsComponent;
  let fixture: ComponentFixture<AvioFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
