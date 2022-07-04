import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertFileUploadComponent } from './alert-file-upload.component';

describe('AlertFileUploadComponent', () => {
  let component: AlertFileUploadComponent;
  let fixture: ComponentFixture<AlertFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
