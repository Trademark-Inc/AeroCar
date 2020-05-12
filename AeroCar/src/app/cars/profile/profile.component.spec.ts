import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: CarsProfileComponent;
  let fixture: ComponentFixture<CarsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
