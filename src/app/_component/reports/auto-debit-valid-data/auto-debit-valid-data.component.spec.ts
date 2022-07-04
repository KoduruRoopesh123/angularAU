import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDebitValidDataComponent } from './auto-debit-valid-data.component';

describe('AutoDebitValidDataComponent', () => {
  let component: AutoDebitValidDataComponent;
  let fixture: ComponentFixture<AutoDebitValidDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDebitValidDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDebitValidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
