import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioUserComponent } from './user.component';

describe('UserComponent', () => {
  let component: AvioUserComponent;
  let fixture: ComponentFixture<AvioUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
