import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreInstaLoanUploadComponent } from './pre-insta-loan-upload.component';

describe('PreInstaLoanUploadComponent', () => {
  let component: PreInstaLoanUploadComponent;
  let fixture: ComponentFixture<PreInstaLoanUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreInstaLoanUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreInstaLoanUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
