import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInstaLoanRequestReportComponent } from './pre-insta-loan-request-report.component';

describe('PreInstaLoanRequestReportComponent', () => {
  let component: PreInstaLoanRequestReportComponent;
  let fixture: ComponentFixture<PreInstaLoanRequestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInstaLoanRequestReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInstaLoanRequestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
