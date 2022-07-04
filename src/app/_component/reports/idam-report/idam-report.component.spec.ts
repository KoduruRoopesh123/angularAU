import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdamReportComponent } from './idam-report.component';

describe('IdamReportComponent', () => {
  let component: IdamReportComponent;
  let fixture: ComponentFixture<IdamReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdamReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
