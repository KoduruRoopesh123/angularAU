import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDebitEodReportComponent } from './auto-debit-eod-report.component';

describe('AutoDebitEodReportComponent', () => {
  let component: AutoDebitEodReportComponent;
  let fixture: ComponentFixture<AutoDebitEodReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDebitEodReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDebitEodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
