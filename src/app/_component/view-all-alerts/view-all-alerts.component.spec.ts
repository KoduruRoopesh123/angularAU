import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAlertsComponent } from './view-all-alerts.component';

describe('ViewAllAlertsComponent', () => {
  let component: ViewAllAlertsComponent;
  let fixture: ComponentFixture<ViewAllAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
