import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInstaLoanTransactionReportComponent } from './pre-insta-loan-transaction-report.component';

describe('PreInstaLoanTransactionReportComponent', () => {
  let component: PreInstaLoanTransactionReportComponent;
  let fixture: ComponentFixture<PreInstaLoanTransactionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInstaLoanTransactionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInstaLoanTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
