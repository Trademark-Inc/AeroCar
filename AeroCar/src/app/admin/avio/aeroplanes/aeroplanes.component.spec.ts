import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroplanesComponent } from './aeroplanes.component';

describe('AeroplanesComponent', () => {
  let component: AeroplanesComponent;
  let fixture: ComponentFixture<AeroplanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeroplanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeroplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
