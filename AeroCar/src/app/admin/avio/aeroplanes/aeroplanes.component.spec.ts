import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioAeroplanesComponent } from './aeroplanes.component';

describe('AeroplanesComponent', () => {
  let component: AvioAeroplanesComponent;
  let fixture: ComponentFixture<AvioAeroplanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioAeroplanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioAeroplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
