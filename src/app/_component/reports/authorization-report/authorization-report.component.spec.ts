import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationReportComponent } from './authorization-report.component';

describe('AuthorizationReportComponent', () => {
  let component: AuthorizationReportComponent;
  let fixture: ComponentFixture<AuthorizationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
