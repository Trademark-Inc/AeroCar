import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: CarUserComponent;
  let fixture: ComponentFixture<CarUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
