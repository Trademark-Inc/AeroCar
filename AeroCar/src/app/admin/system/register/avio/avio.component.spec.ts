import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAvioComponent } from './avio.component';

describe('AvioComponent', () => {
  let component: SystemAvioComponent;
  let fixture: ComponentFixture<SystemAvioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAvioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
