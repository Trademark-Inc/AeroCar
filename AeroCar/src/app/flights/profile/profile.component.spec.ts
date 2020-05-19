import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: FlightsProfileComponent;
  let fixture: ComponentFixture<FlightsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
