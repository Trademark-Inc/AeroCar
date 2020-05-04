import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfficesComponent } from './offices.component';

describe('OfficesComponent', () => {
  let component: CarOfficesComponent;
  let fixture: ComponentFixture<CarOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
