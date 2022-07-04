import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDebitUploadComponent } from './auto-debit-upload.component';

describe('AutoDebitUploadComponent', () => {
  let component: AutoDebitUploadComponent;
  let fixture: ComponentFixture<AutoDebitUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDebitUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDebitUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
