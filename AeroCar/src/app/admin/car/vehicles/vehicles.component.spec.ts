import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarVehiclesComponent } from './vehicles.component';

describe('VehiclesComponent', () => {
  let component: CarVehiclesComponent;
  let fixture: ComponentFixture<CarVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
