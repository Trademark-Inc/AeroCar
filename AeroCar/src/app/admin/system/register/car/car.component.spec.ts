import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCarComponent } from './car.component';

describe('CarComponent', () => {
  let component: SystemCarComponent;
  let fixture: ComponentFixture<SystemCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
