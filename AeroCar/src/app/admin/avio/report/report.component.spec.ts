import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: AvioReportComponent;
  let fixture: ComponentFixture<AvioReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvioReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
