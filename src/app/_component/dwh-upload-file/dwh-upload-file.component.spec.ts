import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwhUploadFileComponent } from './dwh-upload-file.component';

describe('DwhUploadFileComponent', () => {
  let component: DwhUploadFileComponent;
  let fixture: ComponentFixture<DwhUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DwhUploadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DwhUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
